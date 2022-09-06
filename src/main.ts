import express, { Request, Response } from 'express'
import { loop, promise, workerThreadLoop } from './service';
const app = express();

app.use(express.json());

/**
 * main thread standard loop
 */
app.get('/main-thread-loop', (req: Request, res: Response) => {
  const message = loop()
  res.send({ message })
})

/**
 * LOOP WITH WORKER THREADS
 */
app.get('/worker-thread-loop', async(req, res) => {
  return res.send({message: await workerThreadLoop()});
})

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Hello World!' })
})

app.get('/promise', async (req: Request, res: Response) => {
  return res.send(promise());
})


app.get('/loop-parallel-promise', async (req: Request, res: Response) => {
  // const longProm = promise(10000);

  // await promise(2000)

  const loop = [1, 2];

  const user = await Promise.all(loop.map(async () => {
    return await promise()
  }))
    
    // await longProm
    // await promise(1000);
    res.send(user)
})

app.get('/loop-promise', async (req: Request, res: Response) => {
  // const longProm = await promise(10000);
  
  // await promise(1000)
  // await promise(2000)
  
  const loop = [1, 2];
  
  const user: any[] = [];
  for (const v of loop) {
    user.push(
      await promise()
      )
    
  }
  res.send(user)
})


app.listen(3000)