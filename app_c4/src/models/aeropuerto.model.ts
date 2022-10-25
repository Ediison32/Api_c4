import {Entity, model, property} from '@loopback/repository';

@model()
export class Aeropuerto extends Entity {
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
  Name: string;

  @property({
    type: 'string',
    required: true,
  })
  City: string;

  @property({
    type: 'string',
    required: true,
  })
  Country: string;

  @property({
    type: 'string',
    required: true,
  })
  Cordenated_x: string;

  @property({
    type: 'string',
    required: true,
  })
  Cordenate_y: string;

  @property({
    type: 'string',
    required: true,
  })
  Acronym: string;

  @property({
    type: 'string',
    required: true,
  })
  Type: string;


  constructor(data?: Partial<Aeropuerto>) {
    super(data);
  }
}

export interface AeropuertoRelations {
  // describe navigational properties here
}

export type AeropuertoWithRelations = Aeropuerto & AeropuertoRelations;
