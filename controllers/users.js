const {response, request} = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');



  const usuariosGet = async(req = request, res = response) => {

    // const {q,nombre,apikey} = req.query;
    const { limite = 5, desde = 0 } = req.query;

    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments({ estado: true}),
      Usuario.find({ estado: true})
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
      total,
      usuarios
    });
  }

  const usuariosPost = async(req, res) => {
   

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol});

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardando en BD
    await usuario.save();

    res.status(201).json({
        msg: "post Api - controlador",
       usuario
    });
  }

  const usuariosPut = async(req, res) => {

    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    // To do validar contra base de datos
    if( password){
          //Encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto)

    res.status(400).json({
        msg: "put Api - controlador",
        usuario
    });
  }

  const usuariosPatch = (req, res) => {
    res.status(201).json({
        msg: "patch Api - controlador"
    });
  }

  const usuariosDelete = async(req, res) => {
    
    const { id} = req.params;

  //  Borrado fisicamente
  // const usuario = await Usuario.findByIdAndDelete( id);

  const usuario = await Usuario.findByIdAndUpdate( id, { estado : false} );

    res.json({
       usuario
    });
  }





  module.exports = {
      usuariosGet,
      usuariosPost,
      usuariosPut,
      usuariosPatch,
      usuariosDelete

  }