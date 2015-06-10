'use strict'

const koa = require('koa')
const app = koa()

app.use(function*() {
  this.body = {
    message: 'success'
  }
})

app.listen(3000)
