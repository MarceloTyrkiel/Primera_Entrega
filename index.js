const express = require('express');
const { create } = require('express-handlebars');

const productRoutes = require('./routes/producto');
const carritoRoutes = require('./routes/carrito');
const indexRoutes = require('./routes/index');

const app = express();
const PORT = 8401;


const hbs = create({
    extname: ".hbs",
})

//  aca le decimos que usamos handlebars como motor de plantilla
app.engine('.hbs', hbs.engine);

// establecemos el motor de plantillas que vamos a usar 
app.set('view engine', '.hbs');

// establecemos el directorio donde estan nuestra plantillas 
app.set('views', './views');

// establecemos la carpeta donde estan nuestro achivos publicos
app.use(express.static('public'))

// Permite recibir parámetros en formato JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRoutes);
app.use("/api/producto", productRoutes);
app.use("/api/carrito", carritoRoutes);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});


