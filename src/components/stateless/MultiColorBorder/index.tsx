import React, { CSSProperties } from 'react'

import styles from './index.module.less'

interface MultiColorBorderProps {
  text: string
  wrapperStyles?: CSSProperties
  contentStyles?: CSSProperties
}

const MultiColorBorder = ({
  text,
  wrapperStyles = { color: '#fff' },
  contentStyles = { color: '#fff' }
}: MultiColorBorderProps) => (
  <>
    <section
      className={styles.multiWrapper}
      style={{
        ...wrapperStyles
      }}
    >
      <section className={styles.multiContent} style={{ ...contentStyles }}>
        {text}
      </section>
    </section>
  </>
)

export default MultiColorBorder
