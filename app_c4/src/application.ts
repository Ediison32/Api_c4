import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
}
from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';

// estrategia de proyecto

import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
import {AdministradorStrategy} from './strategies/admins.strategy';


export {ApplicationConfig};

export class AppC4Application extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    //Registramos la estrategia para la autentificacion
  registerAuthenticationStrategy(this, AdministradorStrategy);
  this.component(AuthenticationComponent);

  }
}

// para ensayar la autentificacion
// abrimos posman
// debemos de tener o generar el token


// en posman --->  Authorization --> Bearer Token --> ponemos el toquen
// en el ensayo se uso con "  get 127.0.0.1:3000/usuarios   "


// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjM2NmVjMjMzZWRhN2E2NGU0MmNlNmNmIiwiY29ycmVvIjoiZWRpc29uYWx2YXJlejMyQGdtYWlsLmNvbSIsIm5vbWJyZSI6IkVkaXNvbiBBbHZhcmV6IFJhdmUifSwiaWF0IjoxNjY4MzYwOTgxfQ.yL6GMzGbvF2z94o-pwR4ZQf_nulWolNU1LSxT8LaWrY"
