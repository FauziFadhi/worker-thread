import { parentPort } from "worker_threads";
import { loop } from "./service";

parentPort?.on('message', (content) => {
  const result = loop()
  parentPort?.postMessage(result);
});