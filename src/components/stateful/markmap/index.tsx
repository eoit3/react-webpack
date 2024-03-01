import React, { useRef, useEffect, MutableRefObject, PropsWithChildren } from 'react'
import { Transformer } from 'markmap-lib'
import { Markmap } from 'markmap-view'

const transformer = new Transformer()

interface MarkmapProps extends PropsWithChildren {
  markmap: string
}

const MarkmapHooks = ({ markmap }: MarkmapProps) => {
  const refSvg = useRef() as MutableRefObject<SVGSVGElement>
  const refMm = useRef<Markmap>()

  useEffect(() => {
    const mm = Markmap.create(refSvg.current)
    refMm.current = mm
    return () => {
      mm.destroy()
    }
  }, [])

  useEffect(() => {
    const mm = refMm.current
    // if (!mm) return
    const { root } = transformer.transform(markmap)
    mm?.setData(root)
    mm?.fit()
  }, [markmap])

  return (
    <>
      <svg style={{ width: '100%', minHeight: 400 }} ref={refSvg} />
    </>
  )
}

export default MarkmapHooks
