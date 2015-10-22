import shallowCompare from 'react/lib/shallowCompare'

function shouldComponentUpdate(nextProps, nextState) {
  return shallowCompare(this, nextProps, nextState)
}

export default function pureRenderDecorator(component) {
  component.prototype.shouldComponentUpdate = shouldComponentUpdate
}
