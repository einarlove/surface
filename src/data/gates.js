import times from 'lodash/utility/times'
import without from 'lodash/array/without'

export default without([
  ...times(60),
  ...'ABCD'.split('').map(ll => 14 + ll),
  ...'ABCDEFGH'.split('').map(ll => 19 + ll),
  ...'AB'.split('').map(ll => 35 + ll),
  ...'ABC'.split('').map(ll => 37 + ll),
  ...'ABCDEF'.split('').map(ll => 47 + ll),
  ...'ABCDEF'.split('').map(ll => 58 + ll),
], 0, 1, 14, 19, 35, 37, 47, 58).sort((aa, bb) => {
  const right = parseInt(aa, 10) === parseInt(bb, 10) ? aa.replace(/[0-9]/g, '') : parseInt(aa, 10)
  const left = parseInt(aa, 10) === parseInt(bb, 10) ? bb.replace(/[0-9]/g, '') : parseInt(bb, 10)
  return right > left ? 1 : -1
})
