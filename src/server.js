import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import config from './config'
import { connect } from 'mongoose'
import userRouter from './resources/user/user.router'
import listRouter from './resources/list/list.router'
import itemRouter from './resources/item/item.router'
import { signup, signin, protect } from './utils/auth'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))
app.post('/signup', signup)
app.post('/sigin', signin)

app.use('/api', protect)
app.use('/api/user', userRouter)
app.use('/api/item', itemRouter)
app.use('/api/list', listRouter)

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`REST API on https://localhost:${config.port}`)
    })
  } catch (e) {
    console.error(e)
  }
}
