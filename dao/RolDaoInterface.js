const implementjs = require('implement-js')
const { Interface, type } = implementjs;

const RolDaoInterface = Interface('RolDaoInterface')({
    getMenuPorNivel:type('function')
},{error: true});

module.exports={RolDaoInterface};