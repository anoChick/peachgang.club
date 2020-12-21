import next from 'next'
import functions from 'firebase-functions'
const NEXT_DIR = '.next'

const func = functions.region('asia-northeast1')

export const helloWorld = func.https.onRequest((request, response) => {
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

exports.nextjsFunc = func.https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res))
})
