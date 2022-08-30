import { Request, Response } from 'express'
import { join } from 'path'
import { Worker, isMainThread, parentPort } from 'worker_threads'


export const promise = async (_: any, res: any) => {
  const result = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({mantap: '123'})
    }, 3000)
  })

  res.send(result)
}

export const loop = () => {
  let i = 0;
  for (let index = 0; index < 5_000_000_000; index++) {
    i++;
  }
  return i
}

function test() {
  promise('asd', 'sdf')
  .then((resp) => {
    return {id: 1, name: 'Fauzi'};
  })
  .then((resp) => {
    const id = resp.id;

    return {name: resp.name}
  })
}

async function test1() {
  const user = await promise('name', 'id');

  const user1 = {
    id: 1,
    name: 'Fauzi',
  }

  const id = user1.id;

  return {name: user1.name}
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