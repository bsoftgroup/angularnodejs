const mysql = require('mysql');
const objectjs = require('object-js');
const  { Obj } = objectjs;

class Conexion extends Obj{

    constructor() {
        super();
    }

    getConection(){
        let conn = mysql.createConnection({
            host     : '3.15.179.197',
            user     : 'root',
            password : '123456',
            database : 'dbroles'
          });

          //console.log("conexion",conn);
          
        return conn;
    }

    
}
/*
let conn = new Conexion().getConection();
conn.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + conn.threadId);
  });*/


module.exports = { Conexion };