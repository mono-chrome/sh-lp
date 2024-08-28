import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(
    <section>
      <h1>sbstn-sh</h1>
    </section>,
    { title: 'home' }
  )
})

export default app
