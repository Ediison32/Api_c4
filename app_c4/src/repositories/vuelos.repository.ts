import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Vuelos, VuelosRelations} from '../models';

export class VuelosRepository extends DefaultCrudRepository<
  Vuelos,
  typeof Vuelos.prototype.id,
  VuelosRelations
> {
  constructor(
    @inject('datasources.mongo_DB') dataSource: MongoDbDataSource,
  ) {
    super(Vuelos, dataSource);
  }
}
