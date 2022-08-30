import { Request, Response } from 'express'
import { join } from 'path'
import { Worker, isMainThread, parentPort } from 'worker_threads'


export const promise = async (_: Request, res: Response) => {
  const result = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({mantap: '123'})
    }, 3000)
  })

  res.send(result)
}

export const loop = () => {
  let i = 0;
  for (let index = 0; index < 5e9; index++) {
    i++;
  }
  return i
}

export const workerThreadLoop = async () => {
    const worker = new Worker(join(__dirname, '..', 'dist/src', 'worker.js'));
    worker?.postMessage({
      message: 'test'
    })
    return new Promise((resolve, rejects) => {
      worker.once('message', (value) => {
        resolve(value);
      })
      worker.once('error', (error) => {
        rejects(error)
      })
    })
}