import {service} from '@loopback/core';
import {AuthService} from '../services';
import axios from 'axios';


import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository : UsuarioRepository,

    //dependencia del servicio de autentificacion
    @service(AuthService)
    public servicioAuth: AuthService

  ) {}

  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    // creamos la clave antes de crear la usario


    //return this.usuarioRepository.create(usuario); --- se replaza por lo deabajo


  let key = this.servicioAuth.keyGeneration();
  let codeKey = this.servicioAuth.codeKey(key);
  usuario.Password = codeKey;
  let p = await this.usuarioRepository.create(usuario);

    // Notificamos al usuario por correo
  let destino = usuario.Email;
   // Notifiamos al usuario por telefono y cambiar la url por send_sms
  //let destino = usuario.Number;

  let asunto = 'Platform user registration';
  let contenido = `Hello, ${usuario.Name} ${usuario.Surnames} your password on the portal is, usando la APP creada por edison_A: ${key}`
  axios({
    method: 'post',
    url: 'http://localhost:5000/send_email', //Si quiero enviar por mensaje cambiar a send_sms

    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      data: {
        destino: destino,
        asunto: asunto,
        contenido: contenido
      }
    }).then((data: any) => {
      console.log(data)
    }).catch((err: any) => {
      console.log(err)
    })
    //let destino = usuario.Number;
  axios({
    method: 'post',
    url: 'http://localhost:5000/send_sms', //Si quiero enviar por mensaje cambiar a send_sms

    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      data: {
        destino: destino,
        asunto: asunto,
        contenido: contenido
      }
      }).then((data: any) => {
        console.log(data)
      }).catch((err: any) => {
        console.log(err)
      })

  return p;



  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }
}
