import express, { Request, Response} from 'express'
import mongoose from 'mongoose';
import { config } from 'dotenv'
import Deck from "./models/Deck"
import cors from "cors"
import { createDeckController } from './controllers/createDeckController';
import { getDecksController } from './controllers/getDecksController';
import { deleteDeckController } from './controllers/deleteDeckController';
import { createCardForDeckController } from './controllers/createCardForDeckController';
config();
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.get('/decks', getDecksController)
app.post('/decks', createDeckController)
app.delete('/decks/:deckId', deleteDeckController)
app.post('/decks/:deckId/cards', createCardForDeckController)

mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`Example app listening on port ${port}`)
    app.listen(port)
})