import React, { PropsWithChildren } from 'react'
import styles from './index.module.less'

const AlignCenter = ({ children }: PropsWithChildren) => (
  <div className={styles.alignCenter}>{children}</div>
)

export default AlignCenter
