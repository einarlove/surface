import React, { Component, PropTypes } from 'react'
import IconSVG from 'svg-inline-loader/lib/component'
import classnames from 'classnames'

import styles from 'styles/Card'
const covers = require.context('../assets/covers', false)
const icons = require.context('../assets/icons', false)

const Title = ({title}) => {
  return <h1 className={styles.title}>{title}</h1>
}

const Description = ({description}) => (
  <div className={styles.description}>
    {description.split('\n').map((paragraph, key) => {
      return <p className={styles.paragraph} key={key}>{paragraph}</p>
    })}
  </div>
)

const Action = ({action}) => {
  return (
    <div className={styles.action}>
      {action.icon &&
        <IconSVG src={icons(action.icon)} className={styles.actionIcon} />
      }
      <div className={styles.actionLabel}>{action.label}</div>
    </div>
  )
}

const Cover = ({cover}) => (
  <div className={styles.cover}>
    <img src={covers(cover.src)} alt={cover.alt} />
  </div>
)

export default class Card extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    action: PropTypes.shape({
      label: PropTypes.string.isRequired,
    }),
    cover: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }),
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {title, description, action, cover} = this.props
    const actionType = action && action.type
    const className = classnames(styles.card, {
      [actionType]: actionType,
    })

    return (
      <div className={className}>
        {title && <Title title={title} />}
        {description && <Description description={description} />}
        {cover && <Cover cover={cover}/>}
        {action && <Action action={action}/>}
      </div>
    )
  }
}
