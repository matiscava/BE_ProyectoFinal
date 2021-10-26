
const express = require('express');
const productosRouter = require('./serverProductos');
const carritoRouter = require('./serverCarrito');
const app = express();

const { Router } = express;
const router = Router();


const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('views', './views');

app.use(express.static('public'));


app.get('/', (req,res)=>{   
    res.send('Bienvenido')
});

app.use('/api/carrito', carritoRouter);

app.use('/api/productos', productosRouter);

app.use((req, res) => {
    res.status(404).json(
        {error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`}
    )
})

app.listen(PORT , ()=>{
    console.log(`Servidor funcionando en le puerto: ${PORT}`);
})


