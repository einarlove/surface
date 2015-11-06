import React, { Component, PropTypes } from 'react'
import IconSVG from 'svg-inline-loader/lib/component'
import classnames from 'classnames'

const layouts = require.context('styles/Card', false)
const covers = require.context('../assets/covers', false)
const icons = require.context('../assets/icons', false)

const Title = ({title, style}) => {
  return <h1 className={style.title}>{title}</h1>
}

const Description = ({description, style}) => (
  <div className={style.description}>
    {description.split('\n').map((paragraph, key) => {
      return (
        <p className={style.paragraph} key={key}>
          {paragraph}
        </p>
      )
    })}
  </div>
)

const Action = ({action, style}) => {
  return (
    <div className={style.action}>
      {action.icon &&
        <IconSVG src={icons(action.icon)} className={style.actionIcon} />
      }
      <div className={style.actionLabel}>{action.label}</div>
    </div>
  )
}

const Cover = ({cover, style}) => (
  <div className={style.cover}>
    <img src={covers(cover.src)} alt={cover.alt} />
  </div>
)

export default class Card extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    layout: PropTypes.string,
    action: PropTypes.shape({
      label: PropTypes.string.isRequired,
    }),
    cover: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }),
    registerHeightUpdate: PropTypes.func,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.registerHeightUpdate()
  }

  componentDidUpdate() {
    this.props.registerHeightUpdate()
  }

  render() {
    const {
      title,
      description,
      action,
      cover,
      layout = 'vertical',
    } = this.props

    const actionType = action && action.type
    const style = layouts(`./${layout}`)
    const className = classnames(
      style.card,
    )

    return (
      <div className={className}>
        <div className={style.body}>
          {title && <Title title={title} style={style}/>}
          {description && <Description description={description} style={style}/>}
          {action && <Action action={action} style={style}/>}
        </div>
        <div className={style.figure}>
          {cover && <Cover cover={cover} style={style}/>}
          {action && <Action action={action} style={style}/>}
        </div>
      </div>
    )
  }
}
