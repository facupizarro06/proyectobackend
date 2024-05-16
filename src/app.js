import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import config from "./config.js";
//  import ProductManager from "./src/ProductManager.js";

// Importamos los routes de la api
import productsRouter  from './routes/products.router.js'
import cartRouter from './routes/cartManager.router.js'
import viewsRouter from './routes/views.routes.js'
import ProductManager from "./ProductManager.js";

const manager = new ProductManager("./src/Productos.json")

// const PORT = 8080
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`); //si no funciona corregir la ruta src/views
app.set('view engine', 'handlebars');
app.use('/', viewsRouter);
app.use('/realtimeproducts', viewsRouter);

// Acceso a vistas (plantillas Handlebars)
app.use('/', viewsRouter);


//con DIRNAME tenemos la ruta absoluta
app.use(express.static(config.DIRNAME +'/public'))

// http://localhost:8080/api/products
app.use('/api/products', productsRouter)

// http://localhost:8080/api/carts
app.use('/api/carts', cartRouter)

const httpServer = app.listen(config.PORT, () => {
   console.log(`Escuchando el puerto ${config.PORT}`)
})

const socketServer = new Server(httpServer)

app.set ("socketServer", socketServer)

socketServer.on('connection', client => {

   console.log(`Cliente conectado, id ${client.id} desde ${client.handshake.address}`);

   client.on("newProduct", async (product) => {
       const result = await manager.addProduct(product);
       if (!result.err) {
           // Devuelvo al cliente que cree nuevo producto
           socketServer.emit("addedProduct", product);
       
       }
       socketServer.emit("response", result);
   });

   client.on("deleteProduct", async (id) => {
       const result = await manager.deleteProduct(id);
       if (!result.err) {
           socketServer.emit("deletedProduct", id);
           
       }
       socketServer.emit("response", result);
   });


});