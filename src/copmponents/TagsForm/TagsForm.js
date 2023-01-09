import React from 'react'
import { useFieldArray } from 'react-hook-form'

import s from '../TagsForm/TagsForm.module.scss'

const TagsForm = ({ register, control }) => {
  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  })

  return (
    <>
      <label className={s.tags__label}>Tags</label>
      <div className={s.tags}>
        <ul className={s.tags__list}>
          {fields.map((field, index) => {
            return (
              <li key={field.id} className={s.tags__item}>
                <div className={s.tags__tagsItem}>
                  <input
                    id={`tagList.${index}`}
                    className={`${s.tags__field}`}
                    type="text"
                    placeholder="Tag"
                    {...register(`tagList.${index}`)}
                  />
                  <button onClick={() => remove(index)} type="button" className={`${s.tags__btn} ${s.tags__btn_red}`}>
                    Delete
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
        <button onClick={() => append('')} type="button" className={`${s.tags__btn} ${s.tags__btn_blue}`}>
          Add tag
        </button>
      </div>
    </>
  )
}

export default TagsForm
