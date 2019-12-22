const implementjs = require('implement-js');
const implement = implementjs.default;
const { RolBusinessInterface } =  require('./RolBusinessInterface');
const { rolDao } = require('../dao/RolDao');

let RolBusiness={

    async getMenuPorNivel(nivel,parentid){
        let menu = new Array();
        try {
       
            menu = await rolDao.getMenuPorNivel(nivel,parentid);
            return menu;
        } catch (error) {
            throw error;
        }
        
    }
}


let rolBusiness = implement(RolBusinessInterface)(RolBusiness);
/*rolBusiness.getMenuPorNivel(1,2).then(
    value=>{console.log(value[0])}
);*/
module.exports = { rolBusiness };