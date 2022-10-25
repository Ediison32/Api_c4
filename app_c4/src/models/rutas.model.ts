import {Entity, model, property} from '@loopback/repository';

@model()
export class Rutas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Source: string;

  @property({
    type: 'string',
    required: true,
  })
  Destiny: string;

  @property({
    type: 'number',
    required: true,
  })
  Time: number;


  constructor(data?: Partial<Rutas>) {
    super(data);
  }
}

export interface RutasRelations {
  // describe navigational properties here
}

export type RutasWithRelations = Rutas & RutasRelations;
