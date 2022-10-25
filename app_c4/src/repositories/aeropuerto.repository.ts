import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Aeropuerto, AeropuertoRelations} from '../models';

export class AeropuertoRepository extends DefaultCrudRepository<
  Aeropuerto,
  typeof Aeropuerto.prototype.id,
  AeropuertoRelations
> {
  constructor(
    @inject('datasources.mongo_DB') dataSource: MongoDbDataSource,
  ) {
    super(Aeropuerto, dataSource);
  }
}
