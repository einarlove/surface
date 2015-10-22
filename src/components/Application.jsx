import React, { Component } from 'react'
import fastclick from 'fastclick'

import 'styles/reset'
import 'styles/fonts'
import { application } from 'styles/Application'

import StackedLayout from './StackedLayout'

export default class Application extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    fastclick.attach(document.body)
  }

  render() {
    return (
      <div className={application}>
        <StackedLayout />
      </div>
    )
  }
}
