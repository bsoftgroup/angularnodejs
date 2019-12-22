const implementjs = require('implement-js')
const { Interface, type } = implementjs;

const RolBusinessInterface = Interface('RolBusinessInterface')({
    getMenuPorNivel:type('function')
},{error: true});

module.exports={RolBusinessInterface};