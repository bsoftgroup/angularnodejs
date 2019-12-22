const implementjs = require('implement-js');
const implement = implementjs.default;
const { RolDaoInterface } =  require('./RolDaoInterface');
let { Conexion } = require('./Conexion');
const util = require('util');
let { Item } = require('./Item');




let RolDao={

    async getMenuPorNivel(nivel,parentid){
        let conexion = new Conexion();
        let conn=null;
        try {
        conn = conexion.getConection();
        conn.connect();
        } catch (error) {
          throw(error);
        }
        let lstmenu = null;
        let menus = new Array();
        //console.log("INICIOANDO",menus );
        let query = util.promisify(conn.query).bind(conn);
        try {
            if(parentid===null) {
            
            lstmenu = await query('Select id,displayName,disabled,iconName,route,parentid,nivel from dbroles.menu m where m.parentid is NULL and m.nivel=?',nivel);
            
            }
            else{
                lstmenu = await query('Select id,displayName,disabled,iconName,route,parentid,nivel from dbroles.menu m where m.parentid = ? and m.nivel=?',[parentid,nivel]);
            }
            
            

            
            if(lstmenu){
                 //console.log(lstmenu);
                
                for(i=0;i<lstmenu.length;i++){
                    //console.log(lstmenu[i].displayName);
                   
                    let item=new Item(
                        lstmenu[i].id,
                        lstmenu[i].parentid,
                        lstmenu[i].displayName,
                        lstmenu[i].disabled,
                        lstmenu[i].iconName,
                        lstmenu[i].route,
                        lstmenu[i].nivel,
                        new Array()
                        );

                        await item.hasChilds();
                        menus.push(item); 
                }
            }
            
            return menus;
        } catch (error) {
          
          throw(error);
          
        } finally{
            conn.end();
        }       
      }

    }



let rolDao = implement(RolDaoInterface)(RolDao);
/*rolDao.getMenuPorNivel(1,2).then(
    value=>{console.log(value[0])}
);*/
module.exports = { rolDao };