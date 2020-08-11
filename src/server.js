import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

const log = (req, res, next) => {
  console.log('Logging')
  next()
}

// CRUD
app.get('/data', (req, res, next) => {
  res.send({ message: 'HELLO' })
})

app.put('/data', (req, res) => {
  res.send(req.body)
})

app.delete()

app.post('/data', log, (req, res) => {
  res.send(req.body)
})

export const start = () => {
  app.listen(3000, () => {
    console.log('server is on 3000')
  })
}
