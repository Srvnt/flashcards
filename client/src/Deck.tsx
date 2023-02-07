
  // return <div>hello world</div>  



import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { createDeck } from './api/createDeck'
import { deleteDeck } from './api/deleteDeck'
import { getDecks, TDeck } from './api/getDecks'
import { createCard } from './api/createCard'
import './App.css'
import { getDeck } from './api/getDeck'
import { deleteCard } from './api/deleteCard'




export default function Deck(){
  const [deck, setDeck] = useState<TDeck | undefined>()
    const [cards, setCards] = useState<string[]>([])
    const [text, setText] = useState("")
    const { deckId } = useParams()
    async function handleCreateDeck(e: React.FormEvent) {
      e.preventDefault()
      const {cards: serverCards} = await createCard(deckId!, text)
      setCards(serverCards) 
      // const deck = await createCard(deckId!, text)
      // setDecks([...decks, deck])
      setText("")
    }

    async function handleDeleteCard(index: number) {
      if (!deckId) return
      const newDeck =  await deleteCard(deckId, index)
      setCards(newDeck.cards)
    }

    useEffect(() => {
      if (!deckId) return
      async function fetchDecks(){
       const newDeck = await getDeck(deckId!)
       setDeck(newDeck)
       setCards(newDeck.cards)
      }
      fetchDecks()
      }, [deckId])

    return (
    <div className="App">
      <div className="decks">{
        cards.map((card, index) => (
          <li key={index}>
            <button onClick={() => handleDeleteCard(index)}>X</button>
            {/* <Link to={`decks/${deck._id}`}>{deck.title}</Link> */}
            {card}
          </li>
        ))
      }</div>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor='card-text'>Card Text</label>
        <input value={text} id='deck-title' 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value)
          }}
        />
        <button onClick={handleCreateDeck}>Create Card</button>
      </form>
    </div>
  )
}


