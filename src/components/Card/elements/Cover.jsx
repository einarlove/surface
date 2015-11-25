import React, { Component, PropTypes } from 'react'
const covers = require.context('../../../assets/covers', false)

export default class Cover extends Component {
  static propTypes = {
    className: PropTypes.string,
    cover: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }),
  }

  render() {
    const { className, cover } = this.props

    return (
      <div className={className}>
        <img src={covers(cover.src)} alt={cover.alt} />
      </div>
    )
  }
}
