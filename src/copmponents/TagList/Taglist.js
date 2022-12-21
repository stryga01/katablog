import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Tag } from 'antd'

import { cut } from '../../utils/cut'
import s from '../ArticleItem/ArticleItem.module.scss'

const Taglist = ({ tagList }) => {
  return (
    <>
      {tagList ? (
        <ul className={s.article__tagList}>
          {tagList
            .map((tag) => {
              if (!tag) return
              return (
                <li key={uuidv4()}>
                  <Tag>
                    <a href="#">{cut(tag, 20)}</a>
                  </Tag>
                </li>
              )
            })
            .slice(0, 5)}
        </ul>
      ) : null}
    </>
  )
}

export default Taglist
