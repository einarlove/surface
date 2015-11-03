import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setCurrentFlight, setTimeToDeparture } from '../../actions/flights'
import ReactSlider from 'react-slider'
import getFormData from 'get-form-data'
import mapValues from 'lodash/object/mapValues'
import moment from 'moment'

import { Radio, Checkbox } from './panelElements'
import styles from '../../styles/debug/Panels'

@connect(state => ({
  flight: state.flights.current,
}))

export default class FlightPanel extends Component {
  static propTypes = {
    flight: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      hours: this.toHours(this.props.flight.toDeparture),
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.flight.toDeparture) {
      this.setState({
        hours: this.toHours(nextProps.flight.toDeparture),
      })
    }
  }

  toHours(duration) {
    return moment.duration(duration).asHours()
  }

  onChange({currentTarget}) {
    const data = mapValues(getFormData(currentTarget), value => value === 'on' ? true : value)
    this.props.dispatch(setCurrentFlight({
      ...this.props.flight,
      international: false,
      ...data,
    }))
  }

  onSliderChange(hours) {
    this.setState({ hours })
  }

  onSliderAfterChange(hours) {
    const duration = moment.duration(hours, 'hours').toISOString()
    this.props.dispatch(setTimeToDeparture(duration))
  }

  render() {
    const { direction, international } = this.props.flight
    const total = 3 * 24

    return (
      <form className={styles.panel} onChange={::this.onChange}>
        <h1 className={styles.panelTitle}>Flight</h1>
        <Radio name="direction" value={direction} options={['departure', 'arrival']}/>
        <Checkbox name="international" value={international} />

        <div className={styles.group}>
          <h2 className={styles.sliderLabel}>Departure {moment.duration(this.state.hours, 'hours').humanize(true)}</h2>
          <ReactSlider
            max={total}
            min={0.5}
            step={0.5}
            value={this.state.hours}
            onChange={::this.onSliderChange}
            onAfterChange={::this.onSliderAfterChange}
            className={styles.slider}
            handleClassName={styles.sliderHandle}
            invert />
        </div>
      </form>
    )
  }
}
