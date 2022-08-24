import express, { Request, Response } from 'express'
import { loop, promise, workerThreadLoop } from './service';
const app = express();

app.use(express.json());

app.get('/loop', (req: Request, res: Response) => {
  const message = loop()
  res.send({ message })
})

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Hello World!' })
})

app.get('/promise', async (req: Request, res: Response) => {
  return promise(req, res);
})

app.get('/worker-thread', async(req, res) => {
  return res.send({message: await workerThreadLoop()});
})


app.listen(3000)