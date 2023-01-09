import React from 'react'
import { Alert } from 'antd'

import s from './AlertMessage.module.scss'

const AlertMessage = ({ text }) => {
  return (
    <div className={s.alert}>
      <Alert message={text} type="warning" style={{ width: 800, height: 50 }} />
    </div>
  )
}

export default AlertMessage
