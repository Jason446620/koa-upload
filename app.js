/*
 * @Description: koa.js app
 * @Version: 0.0.1
 * @Company: hNdt
 * @Author: xiaWang1024
 * @Date: 2020-02-21 09:40:43
 * @LastEditTime: 2020-02-21 15:05:17
 */
const Koa = require('koa')
const app = new Koa()
const path = require('path')
const koaBody = require('koa-body');

/**
 * post 数据解析
 */
//const bodyParser = require('koa-bodyparser')
//app.use(bodyParser())
app.use(koaBody({ multipart: true, uploadDir: '.' }));
/**
 * 加载路由
 */
const router = require('./router/index')
app.use(router.routes(), router.allowedMethods())

/**
 * 挂载静态资源
 */
const compress = require('koa-compress') /**开启gzip */
app.use(compress({threshold:'2kb'}))
const serve = require('koa-static')
app.use(serve(path.join(__dirname, './static')), {  })


app.use(async ctx => {
    ctx.body = 'hello ka'
})

app.listen(process.env.Port || 3000, () => {
    console.log(`koa server is running at http://localhost:3000`)
})