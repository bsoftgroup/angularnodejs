var express = require('express');
var HttpStatus = require('http-status-codes');
const { rolBusiness } = require('../business/RolBusiness');
var cors = require('cors');
var app = express();
app.use(cors());


app.get('/nivel/:nivel/parent/:parentid', (req,res)=>{
    var nivel = req.params.nivel;
    var parentid = req.params.parentid;

    rolBusiness.getMenuPorNivel(nivel,parentid).
   then(
    menu=>{
    console.log('12' + menu);
    res.status(HttpStatus.OK)
    .json(menu);
    },
 error=>{console.log("ERROR DE PROCESO",error)}
).
catch((err)=>{console.log(err)})

});

app.get('/nivel/:nivel', (req,res)=>{
    var nivel = req.params.nivel;
    rolBusiness.getMenuPorNivel(nivel,null).
   then(
    menu=>{
    console.log('12' + menu);
    res.status(HttpStatus.OK)
    .json(menu);
    },
 error=>{console.log("ERROR DE PROCESO",error)}
).
catch((err)=>{console.log(err)})

});
module.exports=app;
