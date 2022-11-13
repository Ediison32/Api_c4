// verificar
import {AuthenticationStrategy} from '@loopback/authentication';  //genera la autentificacion
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AuthService} from '../services';  // clase 

export class AdministradorStrategy implements AuthenticationStrategy {
  name: string = 'admins';

  constructor(
    @service(AuthService)
    public serviceAuth: AuthService,) {

  }

  async authenticate(request: Request): Promise<UserProfile | undefined> { // metodo authenticate recibe una solicitud "request", se envia toda la informacion
    const token = parseBearerToken(request);
    if (!token) {
      throw new HttpErrors[401]("No existe un token en la solicitud No mames.")
    }

    let information = this.serviceAuth.validateTokenJWT(token); // valida el token por medio de validateTokenJWT

    if (information) {
      let perfil: UserProfile = Object.assign({
        name: information.data.Name
      });
      return perfil;
    } else {
      throw new HttpErrors[401]("El token es válido, pero no tiene los permisos suficientes para ejecutar esta acción.")
    }
  }
}

/*



export class AdministradorStrategy implements
AuthenticationStrategy{
  name: string = 'admins';

  constructor(
    @service(AuthService)
    public serviceAuth : AuthService,){

    }

    async authenticate(request: Request):  Promise<UserProfile | undefined>{

    const token = parseBearerToken(request);
    if (!token){
      throw new HttpErrors[401](" no mames no existe un token en la solicitud ")
    }
    let information= this.serviceAuth.validateTokenJWT(token);
    if (information){
      let perfil:UserProfile= Object.assign({
        name : information.data.name
      });
      //return perfil;

    }else {
      throw new HttpErrors[401](" No mames otra vez. El token es valido, pero no tiene los permisos suficientes para ejecutar esta accion")

    }

  }

}

*/
