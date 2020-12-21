import next from 'next'
import { https } from 'firebase-functions'
const NEXT_DIR = '.next'

export const helloWorld = https.onRequest((request, response) => {
  response.send('ok')
})

const isDev = process.env.NODE_ENV !== 'production'

const nextjsServer = next({
  dev: isDev,
  conf: {
    distDir: NEXT_DIR,
  },
})
const nextjsHandle = nextjsServer.getRequestHandler()

exports.nextjsFunc = https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res))
})
