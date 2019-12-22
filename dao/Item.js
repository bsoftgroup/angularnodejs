const objectjs = require('object-js')
const  { Obj } = objectjs;
let { Conexion } = require('./Conexion');
const util = require('util');

class Item extends Obj {


    constructor(id,parentid,displayName,disabled,iconName,route,nivel,children) {
      super();
      this.id=id;
      this.parentid=parentid;
      this.displayName=displayName;
      this.disabled=disabled;
      this.iconName=iconName;
      this.route=route;    
      this.nivel=nivel;
      this.children=children;
    }

    async hasChilds(){
      await this.loadChilds();
     if(this.children) return true;
     else return false;
    }

    async loadChilds(){
        //String query = "Select id,displayName,disabled,iconName,route,parentid,nivel from dbmenu.menu m WHERE m.parentid = ? and m.nivel=? ORDER BY id";
        let conexion = new Conexion();
        let conn=null;
        try {
        conn = conexion.getConection();
        conn.connect();
        } catch (error) {
          throw(error);
        }

        try {
            let query = util.promisify(conn.query).bind(conn);
        let results = await query('Select id,displayName,disabled,iconName,route,parentid,nivel from dbroles.menu m where m.parentid = ? and m.nivel=? ORDER BY id',[this.id,this.nivel]);
         //console.log('resultado=',results);
        for(let i=0;i<results.length;i++){

            let item=new Item(
                results[i].id,
                results[i].parentid,
                results[i].displayName,
                results[i].disabled,
                results[i].iconName,
                results[i].route,
                results[i].nivel,
                new Array()
                );
                
                await item.hasChilds();
                //console.log("CHILDREN",this.children);
                this.children.push(item); 
               // console.log(item);
        }
            
        } catch (error) {
            throw(error);
            
        } finally{
            conn.end();
        }
        

/*            conn.query('Select id,displayName,disabled,iconName,route,parentid,nivel from dbroles.menu m where m.parentid = ? and m.nivel=? ORDER BY id',[this.parentid,this.nivel],function (error, results, fields) {
                    if (error) throw error;
                    console.log(results);
                    for(let i=0;i<results.length;i++){

                        let item=new Item(
                            results[i].id,
                            results[i].parentid,
                            results[i].displayName,
                            results[i].disabled,
                            results[i].iconName,
                            results[i].route,
                            results[i].nivel,
                            new Array()
                            );
                            
                            item.hasChilds();
                            //console.log("CHILDREN",this.children);
                            //this.children.push(item); 
                            
                    }

                });
               */
                //conn.end();
                //console.log("no parentid",lstmenu);
                
    } 
}
/*
let item = new Item(null,2,'','','','',1,new Array());
//console.log(item);
item.loadChilds();*/
module.exports = { Item };
