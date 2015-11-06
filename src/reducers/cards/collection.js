import dummyCards from '../../data/dummy-cards.json'
import uniqueId from 'lodash/utility/uniqueId'
dummyCards.forEach(card => {
  card.id = uniqueId('card_')
})

export default function collection(state = dummyCards, action) {
  switch (action.type) {

  default:
    return state
  }
}
