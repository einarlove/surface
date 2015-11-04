import React, { Component, PropTypes } from 'react'
import IconSVG from 'svg-inline-loader/lib/component'
import classnames from 'classnames'
import map from 'lodash/collection/map'

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

const Relevance = ({relevance: {score, basis}, style}) => (
  <div className={style.description}>
    <h2>Score: <strong>{score}</strong></h2>
    {map(basis, (value, property) => (
      <div key={property}> {`${property} ${value}`}</div>
    ))}
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
    meta: PropTypes.object,
    relevance: PropTypes.object,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {
      title,
      description,
      action,
      cover,
      meta,
      relevance,
      layout = 'vertical',
    } = this.props

    const actionType = action && action.type
    const style = layouts(`./${layout}`)
    const className = classnames(
      style.card,
    )

    return (
      <div className={className} style={{opacity: relevance.score > 0.3 ? 1 : 0.5}}>
        <div className={style.body}>
          {title && <Title title={title} style={style}/>}

          {relevance && <Relevance relevance={relevance} style={style} />}
          {description && <Description description={description} style={style}/>}
          <div className={style.description}>
            {map(meta, (value, property) =>
              <div key={property}>{property} <strong>{value}</strong></div>
            )}
          </div>
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
