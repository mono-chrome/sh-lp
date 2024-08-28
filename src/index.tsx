import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { renderer } from './renderer'

const app = new Hono()

export const customLogger = (message: string, ...rest: string[]) => {
  console.log(message, ...rest)
}

app.use(renderer)

app.use(logger(customLogger))

app.get('/', (c) => {
  const domainArray = c.req.url.split('.');
  console.log(domainArray)
  // customLogger('incoming connection', JSON.stringify(c))
  return c.render(
    <section>
      <h1>sbstn-sh</h1>
    </section>,
    { title: 'command not found: www' }
  )
})

export default app
