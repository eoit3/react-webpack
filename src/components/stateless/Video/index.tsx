import React, { useEffect, useRef, PropsWithChildren } from 'react'
import videojs from 'video.js'
import Player from 'video.js/dist/types/player'
import 'video.js/dist/video-js.css'

interface VideoProps extends PropsWithChildren {
  options: any
  onReady: (player: any) => void
}

export const VideoJS = (props: VideoProps) => {
  const videoRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<Player | null>(null)
  const { options, onReady } = props

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement('video-js')

      videoElement.classList.add('vjs-big-play-centered')
      videoRef?.current?.appendChild(videoElement)

      // eslint-disable-next-line no-multi-assign
      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready')
        // eslint-disable-next-line no-unused-expressions
        onReady && onReady(player)
      }))

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current

      player.autoplay(options.autoplay)
      player.src(options.sources)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, videoRef])

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [playerRef])

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  )
}

export default VideoJS
