import React, { Component } from 'react'
import propTypes from './propTypes'

import styles from 'styles/Card/vertical'

import { Title, Description, Action, Cover } from './elements'

export default class Vertical extends Component {
  static propTypes = {
    title: propTypes.title,
    description: propTypes.description,
    action: propTypes.action,
    cover: propTypes.cover,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { title, description, action, cover } = this.props

    return (
      <div>
        {title &&
          <Title className={styles.title}>{title}</Title>}
        {description &&
          <Description className={styles.description}>{description}</Description>}
        {cover &&
          <Cover className={styles.cover} cover={cover} />}
        {action &&
          <Action classNames={styles} action={action} />}
      </div>
    )
  }
}
