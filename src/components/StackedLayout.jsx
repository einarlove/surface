import React, { Component, PropTypes } from 'react'
import { TransitionMotion, spring, presets } from 'react-motion'
import StackedItem from './StackedItem'
import map from 'lodash/collection/map'
import reduce from 'lodash/collection/reduce'
import { connect } from 'react-redux'
import { addItem, removeItem } from '../actions'

const MARGIN = 20

@connect(state => ({
  items: state.items,
}))
export default class StackedLayout extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      heightMap: {},
    }
  }

  registerItemHeight(key, height) {
    const mappedHeight = this.state.heightMap[key]

    if (height !== mappedHeight) {
      this.setState({
        heightMap: {...this.state.heightMap, [key]: height},
      })
    }
  }

  addItem() {
    this.props.dispatch(addItem())
  }

  itemWillLeave(key, transition) {
    return {
      id: key,
      height: spring(0),
      item: transition.item,
    }
  }

  getStyles() {
    let lastStyle = null
    let accumulatedPosition = 0
    return reduce(this.props.items, (styles, item) => {
      let x = 0
      if (lastStyle && lastStyle.height) {
        accumulatedPosition += lastStyle.height + MARGIN
        x = accumulatedPosition
      }

      lastStyle = styles[item.id] = {
        item,
        x: spring(x, presets.stiff),
        height: this.state.heightMap[item.id],
      }

      return styles
    }, {})
  }

  renderItem({item, x}) {
    return (
      <StackedItem
        item={item}
        x={x}
        key={item.id}
        registerHeight={this.registerItemHeight.bind(this, item.id)}
        removeSelf={() => {
          this.props.dispatch(removeItem(item.id))
        }}
      />
    )
  }

  render() {
    const style = {
      position: 'relative',
      backgroundColor: '#efefef',
    }

    return (
      <div>
        <button style={{padding: 20}} onClick={::this.addItem}>Add item</button>
        <TransitionMotion
          styles={::this.getStyles}
        >
          {transition => {
            return (
              <div style={style}>
                {map(transition, ::this.renderItem)}
              </div>
            )
          }}
        </TransitionMotion>
      </div>
    )
  }
}

