import React, { Component, PropTypes } from 'react'
import StackedItem from './StackedItem'
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
    this.props.dispatch(addItem({
      text: 'bob',
    }))
  }

  renderItems() {
    let offset = 0
    return this.props.items.map(({item, id}) => {
      const y = offset + MARGIN
      offset = y + this.state.heightMap[id] || 0

      return (
        <StackedItem
          item={item}
          y={y}
          key={id}
          registerHeight={this.registerItemHeight.bind(this, id)}
          removeSelf={() => {
            this.props.dispatch(removeItem(id))
          }}
        />
      )
    })
  }

  render() {
    const height = this.props.items.reduce((total, item) => {
      return total + MARGIN + this.state.heightMap[item.id] || 0
    }, MARGIN)

    const style = {
      position: 'relative',
      backgroundColor: '#efefef',
      height: height,
    }
    return (
      <div style={{margin: '1em'}}>
        <button onClick={::this.addItem}>Add item</button>
          <div style={style}>
            {this.renderItems()}
          </div>
      </div>
    )
  }
}

