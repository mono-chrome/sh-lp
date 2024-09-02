import {Hono} from 'hono';
import {renderer} from './renderer';
import { Bindings } from './global';

const app = new Hono<{Bindings: Bindings}>();
const recognizedCommands = ['help'];

app.use(renderer);

const defaultData = {"title":"Homepage","copy":"This is some introtext"};

app.get('/api/clients/ph/:id', async (c) => {
  const kvIndex = c.req.param('id');
  let output;
  const data = await c.env.KV.get(kvIndex);
  if (!data) {
    await c.env.KV.put('index', JSON.stringify(defaultData))
    output = defaultData;
  } else {
    output = JSON.parse(data);
    console.log('got it')
  }
  console.log(output)
  return c.json(output)
})

app.get('*', (c) => {
  const path = c.req.path.split('/');
  const instructions = path.filter((elem) => elem.trim() !== '');
  let isRegisteredCommand = false;
  if (instructions.length) {
    isRegisteredCommand = instructions.some((instruction) =>
      recognizedCommands.includes(instruction)
    );
  }
  const command = commands(instructions);
  return c.render(
    <section>
      <h1>sbstn.sh</h1>
      {instructions.length ? (
        isRegisteredCommand ? (
          <h3>{command}</h3>
        ) : (
          <h2>{command}</h2>
        )
      ) : null}
    </section>,
    {title: `sbstn.sh`}
  );
});


function commands(instructions: Array<string>): string {
  if (instructions.includes('help')) {
    return 'try another command';
  }

  return instructions.join('>');
}
export default app;
