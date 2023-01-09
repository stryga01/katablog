import React from 'react'
import { Spin } from 'antd'

import s from './Spinner.module.scss'

const Spinner = ({ styles }) => {
  return (
    <div className={styles ? s.spinner : null}>
      <Spin size="large" />
    </div>
  )
}

export default Spinner
