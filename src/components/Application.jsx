import React, { Component } from 'react'

import 'styles/reset'
import 'styles/fonts'
import { application } from 'styles/Application'

import PanelsContainer from './debug/PanelsContainer'
import CardContainer from './CardContainer'

export default class Application extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={application}>
        <PanelsContainer />
        <CardContainer />
      </div>
    )
  }
}
