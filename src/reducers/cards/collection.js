import dummyCards from '../../data/dummy-cards.json'
import uniqueId from 'lodash/utility/uniqueId'
import offers from '../../data/offers.json'
import facilities from '../../data/facilities.json'

const cards = [...offers, ...facilities].map(card => {
  card.id = uniqueId('card_')
  return card
})

export default function collection(state = cards, action) {
  switch (action.type) {

  default:
    return state
  }
}
