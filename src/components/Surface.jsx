import React, { Component } from 'react'
import StackedItems from './StackedItems'

// import 'styles/Surface'

class Card extends Component {
  componentDidMount() {
    this.registerHeight()
  }

  registerHeight() {
    this.props.registerHeight(this.refs.card.offsetHeight)
  }

  render() {
    return (
      <div ref="card">
        <h1 onClick={() => this.registerHeight()}>{this.props.title}</h1>
      </div>
    )
  }
}

export default class Surface extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <StackedItems items={items}>
        {(item, registerHeight) => <Card registerHeight={registerHeight} {...item.item} />}
      </StackedItems>
    )
  }
}
