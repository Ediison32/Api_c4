const generator = require("password-generator"); // genera clave de forma generica
const cryptoJS = require("crypto-js");           // incripta las contraseñas creadas



import { /* inject, */ BindingScope, injectable} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class AuthService {
  constructor(/* Add @inject to inject parameters */) {}

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



}





