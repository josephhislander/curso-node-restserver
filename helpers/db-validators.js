const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol});

    if ( !existeRol) {
      throw new Error(`El rol ${rol} no esta registrado en la BD `)
    }
  }


const emailExiste = async(correo = '') => {

    const existeEmail = await Usuario.findOne({correo});

    if( existeEmail){
    throw new Error(`El email ${correo} ya esta registrado en la BD `)
    // return res.status(400).json({
    //   msg: ' Ese correo ya esta registrado'
    // });
  }
}

const existeUsuarioPorId = async( id ) => {

  const existeUsuario = await Usuario.findById(id);

  if( !existeUsuario){
  throw new Error(`El id ${id} no existe `);
  // return res.status(400).json({
  //   msg: ' Ese correo ya esta registrado'
  // });
}
}

  
  module.exports = {
      esRoleValido,
      emailExiste,
      existeUsuarioPorId
  }