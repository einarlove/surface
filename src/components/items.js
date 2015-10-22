import reduce from 'lodash/collection/reduce'
import omit from 'lodash/object/omit'

let items = reduce(Array(5), (list, item, key) => {
  const id = 'item_' + key
  list[id] = {id}
  return list
}, {})

export default items

export function remove(id) {
  items = omit(items, id)
}
