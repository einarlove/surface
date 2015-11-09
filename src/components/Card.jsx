import React, { Component, PropTypes } from 'react'
import IconSVG from 'svg-inline-loader/lib/component'
import classnames from 'classnames'
import RelevanceInformation from './RelevanceInformation'
import once from 'lodash/function/once'

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

const Cover = ({cover, style, onLoad}) => (
  <div className={style.cover}>
    <img onLoad={onLoad} src={covers(cover.src)} alt={cover.alt} />
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
    relevance: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.updateHeightOnceOnInitial = once(this.props.registerHeightUpdate)
  }

  componentDidUpdate() {
    this.updateHeightOnceOnInitial()
  }

  render() {
    const {
      title,
      description,
      action,
      cover,
      layout = 'vertical',
      relevance,
    } = this.props

    const actionType = action && action.type
    const style = layouts(`./${layout}`)
    const className = classnames(
      style.card,
    )

    return (

      <div>
        <div className={className} style={{
          opacity: relevance.score >= 0.4 ? 1 : 0.5,
        }}>
          <div className={style.body}>
            {title && <Title title={title} style={style}/>}
            {description && <Description description={description} style={style}/>}
            {action && <Action action={action} style={style}/>}
          </div>
          <div className={style.figure}>
            {cover && <Cover cover={cover} style={style} onLoad={this.props.registerHeightUpdate} />}
            {action && <Action action={action} style={style}/>}
          </div>
        </div>

        <RelevanceInformation relevance={relevance} />
      </div>
    )
  }
}
