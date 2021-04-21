const { Router} = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste,existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosPatch, 
        usuariosDelete } = require('../controllers/users');

const router = Router();


  router.get('/', usuariosGet);


  router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener mas de 6 caracteres').isLength( {min: 6}),
    // check('correo', 'El valor no es un correo').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
  ],
   usuariosPost );

  router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRoleValido ),
    validarCampos
  ],usuariosPut);

  router.patch('/', usuariosPatch);

  router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
  ],usuariosDelete );


module.exports = router;