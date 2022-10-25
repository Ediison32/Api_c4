import {Entity, model, property} from '@loopback/repository';

@model()
export class Vuelos extends Entity {
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
  Start_date: string;

  @property({
    type: 'number',
    required: true,
  })
  Start_time: number;

  @property({
    type: 'string',
    required: true,
  })
  Finish_date: string;

  @property({
    type: 'number',
    required: true,
  })
  Ending_time: number;

  @property({
    type: 'number',
    required: true,
  })
  Seats_sold: number;

  @property({
    type: 'string',
    required: true,
  })
  Pilot_s_name: string;

  @property({
    type: 'string',
    required: true,
  })
  Route: string;


  constructor(data?: Partial<Vuelos>) {
    super(data);
  }
}

export interface VuelosRelations {
  // describe navigational properties here
}

export type VuelosWithRelations = Vuelos & VuelosRelations;
