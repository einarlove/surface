import React, { Component, PropTypes } from 'react'
import { setEmphasis } from '../actions/cards'
import { setCurrentFlight } from '../actions/flights'
import { connect } from 'react-redux'
import startCase from 'lodash/string/startCase'
import classnames from 'classnames'
import getFormData from 'get-form-data'
import mapValues from 'lodash/object/mapValues'

import styles from 'styles/PriorityPanel'

function applyProperty(property, name) {
  return {
    name,
    value: property[name],
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
  emphasis: state.cards.emphasis,
  questions: state.cards.questions,
  flight: state.flights.current,
}))
export default class PriorityPanel extends Component {
  static propTypes = {
    emphasis: PropTypes.object.isRequired,
    questions: PropTypes.object.isRequired,
    flight: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    right: PropTypes.bool,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(setEmphasis({
      children: 0.8,
    }))

    this.props.dispatch(setCurrentFlight({
      direction: 'departure',
      international: true,
      scheduleTime: '2015-11-05T15:30:00',
    }))

    console.log(this.props.questions)
  }

  onFlightChange({ currentTarget }) {
    const data = mapValues(getFormData(currentTarget), value => value === 'on' ? true : value)
    this.props.dispatch(setCurrentFlight(data))
  }

  onQuestionsChange({ currentTarget }) {
    const data = mapValues(getFormData(currentTarget), value => value === 'on' ? true : value)

    if (data.toddlers) {
      data.children = true
    }

    this.props.dispatch(setEmphasis(data))
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
    const { emphasis, flight } = this.props
    const className = classnames(styles.container, {
      [styles.rightAligned]: this.props.right,
    })

    return (
      <div className={className} >
        <form className={styles.form} onChange={::this.onFlightChange}>
          <h1>Flight</h1>
          <Radio options={['departure', 'arrival']} {...applyProperty(flight, 'direction')} />
          <Checbox {...applyProperty(flight, 'international')} />
        </form>

        <form className={styles.form} onChange={::this.onQuestionsChange}>
          <h1>Questions</h1>
          <Radio options={['Children', 'No children']} {...applyProperty(emphasis, 'children')} />
        </form>
      </div>
    )
  }
}
