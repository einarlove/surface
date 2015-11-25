import React, { Component } from 'react'
import propTypes from './propTypes'

import styles from 'styles/Card/horizontal'

import { Title, Description, Action, Cover } from './elements'

export default class Horizontal extends Component {
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
      <div className={styles.body}>
        <div className={styles.content}>
          {title &&
            <Title className={styles.title}>{title}</Title>}
          {description &&
            <Description className={styles.description}>{description}</Description>}
          {action &&
            <Action classNames={styles} action={action} />}
        </div>

        <div className={styles.figure}>
          {cover &&
            <Cover className={styles.cover} cover={cover} />}
        </div>
      </div>
    )
  }
}
