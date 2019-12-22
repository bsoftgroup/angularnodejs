require('./config/Config');
const express = require('express');
const app = express();

//routes
var rolRoutes = require('./routes/RolRoutes');


app.get("/",(req,res)=>{
    res.send('invocando el metodo get');
})

app.use('/rol', rolRoutes);


const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
 });