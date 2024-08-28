import {Hono} from 'hono';
import {renderer} from './renderer';

const app = new Hono();
const recognizedCommands = ['help'];

app.use(renderer);

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
