const {response, request} = require('express')



  const usuariosGet = (req = request, res = response) => {

    const {q,nombre,apikey} = req.query;
    
    res.json({
        msg: "get API - controlador ",
        q,
        nombre,
        apikey
    });
  }

  const usuariosPost = (req, res) => {

    const {nombre,edad} = req.body;

    res.status(201).json({
        msg: "post Api - controlador",
        nombre,
        edad
    });
  }

  const usuariosPut = (req, res) => {

    const {id} = req.params;

    res.status(400).json({
        msg: "put Api - controlador",
        id
    });
  }

  const usuariosPatch = (req, res) => {
    res.status(201).json({
        msg: "patch Api - controlador"
    });
  }

  const usuariosDelete = (req, res) => {
    res.json({
        msg: "delete Api - controlador"
    });
  }





  module.exports = {
      usuariosGet,
      usuariosPost,
      usuariosPut,
      usuariosPatch,
      usuariosDelete

  }