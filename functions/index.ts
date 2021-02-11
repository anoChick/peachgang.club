import * as functions from 'firebase-functions'
import next from 'next'

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('ok')
})

const isDev = process.env.NODE_ENV !== 'production'

const nextjsServer = next({
  dev: isDev,
})
const nextjsHandle = nextjsServer.getRequestHandler()

exports.nextjsFunc = functions.https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res))
})
