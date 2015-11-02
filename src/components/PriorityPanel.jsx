import React, { Component, PropTypes } from 'react'
import { setPriority } from '../actions/cards'
import { connect } from 'react-redux'
import startCase from 'lodash/string/startCase'
import classnames from 'classnames'
import getFormData from 'get-form-data'
import mapValues from 'lodash/object/mapValues'
import gates from '../data/gates'

import styles from 'styles/PriorityPanel'

function applyPriority(priorities, name) {
  return {
    name,
    value: priorities[name],
  }
}

const Group = props => (
  <div className={classnames(styles.item, props.className)}>
    {props.children}
  </div>
)

const LabelWithInput = props => {
  return (
  <label>
    <input {...props} onChange={()=>{}}/>
    <span className={styles.labelText}>{props.label || startCase(props.name)}</span>
  </label>
)}

const Checbox = props => (
  <LabelWithInput label={props.label} name={props.name} checked={Boolean(props.value)} type="checkbox" />
)

const Radio = props => (
  <Group>
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
  </Group>
)

const Select = props => {
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


@connect(state => ({
  priorities: state.cards.priorities,
}))
export default class PriorityPanel extends Component {
  static propTypes = {
    priorities: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    right: PropTypes.bool,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(setPriority({
      children: true,
      international: true,
    }))
  }

  onChange({ currentTarget }) {
    const data = mapValues(getFormData(currentTarget), value => value === 'on' ? true : value)

    if (data.toddlers) {
      data.children = true
    }

    this.props.dispatch(setPriority(data))
  }

  renderCheckbox() {
    return (
      <label className={styles.item}>
        <span className={styles.labelText}>International</span>
        <input type="checkbox" name="international" />
      </label>
    )
  }

  render() {
    const { priorities } = this.props
    const className = classnames(styles.form, {
      [styles.rightAligned]: this.props.right,
    })

    return (
      <form className={className} onChange={::this.onChange}>
        <Group>
          <Checbox label="Has eaten" {...applyPriority(priorities, 'has eaten')} />
        </Group>
        <Group>
          <Checbox {...applyPriority(priorities, 'companions')} />
          <Checbox {...applyPriority(priorities, 'children')} />
          <Checbox {...applyPriority(priorities, 'toddlers')} />
        </Group>
        <Select options={['business', 'holiday']} {...applyPriority(priorities, 'trip-type')} />
        <Checbox {...applyPriority(priorities, 'international')} />
        <Radio options={['departure', 'arrival']} {...applyPriority(priorities, 'direction')} />
        <Select options={gates} {...applyPriority(priorities, 'gate')} />
      </form>
    )
  }
}
