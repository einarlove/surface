import express from 'express'

const app = express()

app.use((req, res, next) => {
  if (req.path.indexOf('.') === -1) {
    req.url = '/index.html'
  }

  next()
})

app.use(express.static('./build'))

if (!module.parent) {
  app.listen(process.env.PORT || 5000)
}

module.exports = app
