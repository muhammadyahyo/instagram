const Express = require('express');
const CookieParser = require('cookie-parser')
const Path = require('path')
const Fs = require('fs')
require('dotenv').config({ path: Path.join(__dirname, ".env")})
const PORT = process.env.PORT

if(!PORT){
    throw new ReferenceError("PORT is not defined")
}
console.log(PORT);
const application = Express()

//Middlewares
application.use(Express.json())
application.use(Express.urlencoded( { extended: true}))
application.use(CookieParser())

// Setting
application.listen(PORT)
application.set('view engine', 'ejs')
application.set('views', Path.join(__dirname, "views"))
application.use(Express.static(Path.join(__dirname, "public")))
application.use(Express.static(Path.join(__dirname, "public", "img")))


//Routes
// application.get('/', (_, res) => res.render('index'))

const RoutesPath = Path.join(__dirname, "routes")
Fs.readdir(RoutesPath, (err, files) => {
    if(err) throw new Error(err)
    files.forEach(route => {
        const RoutesPath = Path.join(__dirname, "routes", route)
        
        const Route = require(RoutesPath)
        
        if(Route.path && Route.router) application.use(Route.path, Route.router)
        
    })
})
