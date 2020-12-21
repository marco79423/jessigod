import httpProxyMiddleware from 'next-http-proxy-middleware'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default (req, res) => (
  httpProxyMiddleware(req, res, {
    target: 'http://localhost:8000',
  })
)
