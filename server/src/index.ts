import express, { Request, Response} from 'express'
import mongoose from 'mongoose';
import { config } from 'dotenv'
import Deck from "./models/Deck"
config();
const app = express()
const port = 3000
app.use(express.json())


app.post('/decks', async (req: Request, res: Response) => {
    const newDeck = new Deck({
    title: req.body.title
  })
  const createdDecl = await newDeck.save()
  res.json(createdDecl)
})

mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`Example app listening on port ${port}`)
    app.listen(port)
})