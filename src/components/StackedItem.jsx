import React, { Component, PropTypes } from 'react'
import pureRender from '../utils/pureRender'

@pureRender
export default class StackedItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    x: PropTypes.number,
    registerHeight: PropTypes.func.isRequired,
    removeSelf: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      expanded: false,
    }
  }

  componentDidMount() {
    this.registerHeight()
  }

  componentDidUpdate() {
    this.registerHeight()
  }

  registerHeight() {
    const { item: refItem } = this.refs

    if (refItem) {
      this.props.registerHeight(refItem.offsetHeight)
    }
  }

  expand() {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const style = {
      backgroundColor: '#aaa',
      width: '20em',
      position: 'absolute',
      top: 0,
      left: 0,
      transform: `translate3d(0, ${this.props.x}px, 0)`,
    }

    return (
      <div
        ref="item"
        style={style}
      >
        <div
          style={{height: '8em', background: '#999'}}
          onClick={this.props.removeSelf}
        />
        <div
          style={{height: this.state.expanded ? '8em' : '2em'}}
          onClick={::this.expand}
        />
      </div>
    )
  }
}
