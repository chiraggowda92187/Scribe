import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { env } from 'hono/adapter'
import { use } from 'hono/jsx'
import { sign, verify } from 'hono/jwt'
import { z } from 'zod'
import { user } from './routes/user'
import { blog } from './routes/blog'
import { cors } from 'hono/cors'
import { verifyRouter } from './routes/verify'

type VariablesType = {
  userId : string
}
const app = new Hono<{
  Bindings : {
    DATABASE_URL : string,
    JWT_SECRET :string, 
    userId : string
  },
  // SYNTAX 1 for using variables in the hono app 
  // Variables:{
  //   userId :string
  // } 
  Variables : VariablesType
}>()






app.use("/*",cors())
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const userRouter = user
const blogRouter = blog

app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)
app.route("api/v1/verify", verifyRouter)






export default app
