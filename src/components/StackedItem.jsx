import React, { Component, PropTypes } from 'react'
import pureRender from '../utils/pureRender'
import { Motion, spring, presets } from 'react-motion'

@pureRender
export default class StackedItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    y: PropTypes.number,
    registerHeight: PropTypes.func.isRequired,
    removeSelf: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      expanded: false,
      height: 100,
    }
  }

  componentDidMount() {
    this.registerHeight()
  }

  componentDidUpdate() {
    this.registerHeight(this.state.height)
  }

  registerHeight(height) {
    if (this.itemRef) {
      this.props.registerHeight(height || this.itemRef.offsetHeight)
    }
  }

  expand() {
    this.setState({
      expanded: !this.state.expanded,
      height: this.state.expanded ? 100 : 150,
     })
  }

  render() {
    return (
      <Motion style={{
        y: spring(this.props.y, [120, 15]),
        height: spring(this.state.height, [120, 15]),
      }}>
        {({y, height}) => (
          <div
            ref={ref => this.itemRef = ref}
            style={{
              backgroundColor: '#aaa',
              width: '20em',
              position: 'absolute',
              top: 0,
              left: 0,
              height: height,
              transform: `translate3d(0, ${y}px, 0)`,
            }}
            onClick={::this.expand}
          >
            <div
              style={{height: '2em', background: '#999'}}
              onClick={this.props.removeSelf}
            />
          </div>
        )}
      </Motion>
    )
  }
}
