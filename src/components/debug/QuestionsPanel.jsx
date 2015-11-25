import React, { Component, PropTypes } from 'react'
import { answerQuestion, removeQuestionAnswer } from '../../actions/cards'
import some from 'lodash/collection/some'
import { connect } from 'react-redux'

import styles from '../../styles/debug/Panels'

@connect(state => ({
  questions: state.cards.questions,
}))

export default class questionsPanel extends Component {
  static propTypes = {
    questions: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  }

  onAnswer(name, answer) {
    if (some(this.props.questions, {name, answer})) {
      this.props.dispatch(removeQuestionAnswer(name))
    } else {
      this.props.dispatch(answerQuestion(name, answer))
    }
  }

  renderQuestion({name, options, answer}) {
    return (
      <div className={styles.group} key={name}>
        <h2 className={styles.labelText}>{name}</h2>
        {options.map(option => (
          <button
            key={option.label}
            type="button"
            className={answer && answer.value === option.value ? styles.optionButtonActive : styles.optionButton}
            onClick={this.onAnswer.bind(this, name, option)}
          >{option.label}</button>
        ))}
      </div>
    )
  }

  render() {
    return (
      <div className={styles.panel}>
        <h1 className={styles.panelTitle}>questions</h1>
        {this.props.questions.map(::this.renderQuestion)}
      </div>
    )
  }
}
