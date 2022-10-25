import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongo_DB',
  connector: 'mongodb',
  url: 'mongodb+srv://MisionTic:Edison_@misionticed.ugpithw.mongodb.net/test',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongo_DB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongo_DB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
