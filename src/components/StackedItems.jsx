import React, { Component, PropTypes } from 'react'
import reduce from 'lodash/collection/reduce'
import map from 'lodash/collection/map'
import sum from 'lodash/collection/sum'
import shallowEqual from 'react-redux/lib/utils/shallowEqual'
import { TransitionMotion, spring } from 'react-motion'

export default class StackedItems extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
    })).isRequired,
    children: PropTypes.func.isRequired,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      registeredHeights: {},
    }

    this.heightUpdates = {}
  }

  registerItemHeight(key, height) {
    const prevHeight = this.state.registeredHeights[key]

    if (height !== prevHeight) {
      this.heightUpdates[key] = height
      this.setState({registeredHeights: this.heightUpdates})
    }
  }

  itemWillLeave(key, transition) {
    return {
      id: key,
      height: spring(0),
      item: transition.item,
    }
  }


  getStyles() {
    return reduce(this.props.items, (styles, item) => {
      const position = sum(styles, 'height') || 0

      styles[item.id] = {
        item,
        position: spring(position, [50, 12]),
        height: this.state.registeredHeights[item.id],
      }

      return styles
    }, {})
  }

  render() {
    const style = {
      position: 'relative',
      height: sum(this.state.registeredHeights),
    }

    return (
      <TransitionMotion styles={::this.getStyles}>
        {transition => (
          <div style={style} className={this.props.className}>
            {map(transition, trans => (
              <StackedItem
                {...trans}
                key={trans.item.id}
                children={this.props.children}
                registerItemHeight={this.registerItemHeight.bind(this, trans.item.id)}
                />
            ))}
          </div>
        )}
      </TransitionMotion>
    )
  }
}

/* eslint-disable react/no-multi-comp */
class StackedItem extends Component {
  static propTypes = {
    position: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired,
    registerItemHeight: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps.item, this.props.item) ||
      this.props.position !== nextProps.position
  }

  onHeightUpdate() {
    if (this.refs.item) {
      this.props.registerItemHeight(this.refs.item.offsetHeight)
    }
  }

  render() {
    const {position, item, children} = this.props
    const style = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      willChange: 'transform',
      transform: `translate3d(0, ${position}px, 0)`,
    }

    return (
      <div style={style} ref="item">
        {children(item, ::this.onHeightUpdate)}
      </div>
    )
  }
}
