import React, { Component } from 'react'

import 'styles/reset'
import 'styles/fonts'
import { application } from 'styles/Application'

import Surface from './Surface'

export default class Application extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={application}>
        <Surface />
      </div>
    )
  }
}
