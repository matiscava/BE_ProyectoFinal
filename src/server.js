require('dotenv').config();

const express = require('express');
const app = express();

const productosRouter = require('./router/routeProductos');
const carritoRoute = require('./router/routeCarrito')

const { Router } = express;

// const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.set('views', './views');



app.get('/', (req,res)=>{   
    res.send('Bienvenido')
});

app.use('/api/productos', productosRouter);

app.use( '/api/carrito', carritoRoute);

app.use((req, res) => {
    res.status(404).json(
        {error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`}    
    )
})

// PORT =  process.env.PORT || 8080;
// app.listen(PORT, ()=>{
//     console.log(`Servidor funcionando en el puerto: ${PORT}`);
// });
export default app
