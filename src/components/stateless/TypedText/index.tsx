import React, { memo, useState, useEffect, PropsWithChildren } from 'react'

type TypedTextProps = PropsWithChildren<{
  delay?: number
  children: string
}>

const TypedText = ({ children, delay = 110 }: TypedTextProps) => {
  const [revealedLetters, setRevealedLetters] = useState(0)
  const interval = setInterval(() => setRevealedLetters(l => l + 1), delay)

  useEffect(() => {
    if (revealedLetters === children.length) clearInterval(interval)
  }, [children, interval, revealedLetters])

  useEffect(() => () => clearInterval(interval), [interval])

  return <>{children && children.substring(0, revealedLetters)}</>
}

export default memo(TypedText)
