const generator = require("password-generator"); // genera clave de forma generica
const cryptoJS = require("crypto-js");           // incripta las contraseñas creadas
//la que sigue es configuracion
import {setting} from '../config/config';
import {Usuario} from '../models';
const jwt = require('jsonwebtoken');
import {UsuarioRepository} from '../repositories';
import {repository} from '@loopback/repository';


import { /* inject, */ BindingScope, injectable} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class AuthService {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository) {}


  /*
   * Add service methods here
   */

  // generaracion de claves
//generarClave
keyGeneration(){
  let key = generator(8,false);
  return key;

}
// cifrarClave
codeKey(key:String){
  let keyCode= cryptoJS.MD5(key).toString();
  return keyCode;
}

//JWT   ---> generamos el metodo codificado
generarTokenJWT(usuario: Usuario) {
  let token = jwt.sign({
    data: {
      id: usuario.id,
      correo: usuario.Email,
      nombre: usuario.Name + " " + usuario.Surnames
    }
    // clave 
  }, setting.claveJWT)

  return token
}
// --> con este metodo verificamoso la informacion
//validarTokenJWT
validateTokenJWT(token: string) {
  try {
    let datos = jwt.verify(token, setting.claveJWT);
    return datos;
  } catch (error) {
    return false;
  }
}

// ---->

//Autenticacion------>identificarPersona
identifyPerson(Email: string, Password: string) {
  try {
    let user = this.usuarioRepository.findOne({where:
                        {Email: Email,
                         Password: Password
                        }})
    if (user) {
      return user;
    }
    return false;
  } catch {
    return false;
  }
}



}





