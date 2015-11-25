import React, { Component, PropTypes } from 'react'
import propTypes from './propTypes'
import { connect } from 'react-redux'
import { answerQuestion } from '../../actions/cards'

import styles from 'styles/Card/Question'

import { Title } from './elements'

@connect()
export default class Question extends Component {
  static propTypes = {
    title: propTypes.title,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })),
    dispatch: PropTypes.func.isRequired,
  }

  onAnswer(value) {
    this.props.dispatch(answerQuestion(this.props.name, value))
  }

  renderOption(option) {
    return (
      <button
        key={option.label}
        className={styles.option}
        children={option.label}
        onClick={this.onAnswer.bind(this, option)}
      />
    )
  }

  render() {
    const {title, options } = this.props

    return (
      <div className={styles.body}>
        <Title className={styles.title}>{title}</Title>
        <div className={styles.options}>
          {options.map(option => this.renderOption(option))}
        </div>
      </div>
    )
  }
}
