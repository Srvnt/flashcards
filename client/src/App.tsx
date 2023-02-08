import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createDeck } from "./api/createDeck";
import { deleteDeck } from "./api/deleteDeck";
import { getDecks, TDeck } from "./api/getDecks";
import "./App.css";

function App() {
    const [decks, setDecks] = useState<TDeck[]>([]);
    const [title, setTitle] = useState("");

    async function handleCreateDeck(e: React.FormEvent) {
        e.preventDefault();
        const deck = await createDeck(title);
        setDecks([...decks, deck]);
        setTitle("");
    }

    async function handleDeleteDeck(deckId: string) {
        await deleteDeck(deckId);
        setDecks(decks.filter((deck) => deck._id !== deckId));
    }

    useEffect(() => {
        async function fetchDecks() {
            const newDecks = await getDecks();
            setDecks(newDecks);
        }
        fetchDecks();
    }, []);

    return (
        <div className='App'>
            <div className='decks'>
                {decks.map((deck) => (
                    <li key={deck._id}>
                        <button onClick={() => handleDeleteDeck(deck._id)}>
                            X
                        </button>
                        <Link className='Linker' to={`decks/${deck._id}`}>
                            {deck.title}
                        </Link>
                    </li>
                ))}
            </div>
            <form onSubmit={handleCreateDeck}>
                <label className='deck-text' htmlFor='deck-title'>
                    Deck Title
                </label>
                <input
                    value={title}
                    id='deck-title'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setTitle(e.target.value);
                    }}
                />
                <button className='button-create' onClick={handleCreateDeck}>
                    Create Deck
                </button>
            </form>
        </div>
    );
}

export default App;
