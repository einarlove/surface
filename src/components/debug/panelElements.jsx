import React from 'react'
import startCase from 'lodash/string/startCase'
import styles from '../../styles/debug/Panels'

export const LabelWithInput = props => {
  return (
  <label>
    <input {...props} onChange={()=>{}}/>
    <span className={styles.labelText}>{props.label || startCase(props.name)}</span>
  </label>
)}

export const Checkbox = props => (
  <LabelWithInput label={props.label} name={props.name} checked={Boolean(props.value)} type="checkbox" />
)

export const Radio = props => (
  <div className={styles.group}>
    {props.options.map(option => {
      return (
        <LabelWithInput
          name={props.name}
          label={option}
          key={option}
          value={option}
          checked={option === props.value}
          type="radio"
        />)
    })}
  </div>
)

export const Select = props => {
  const options = [
    <option key="default" value="">{startCase(props.name)}</option>,
    ...props.options.map(option => (
      <option key={option} value={option}>{startCase(option)}</option>
    )
  )]

  return (
    <label className={styles.selectItem}>
      <select name={props.name} value={props.value} onChange={()=>{}}>
        {options}
      </select>
    </label>
  )
}
