import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Rutas, RutasRelations} from '../models';

export class RutasRepository extends DefaultCrudRepository<
  Rutas,
  typeof Rutas.prototype.id,
  RutasRelations
> {
  constructor(
    @inject('datasources.mongo_DB') dataSource: MongoDbDataSource,
  ) {
    super(Rutas, dataSource);
  }
}
