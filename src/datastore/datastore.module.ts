import { Module } from '@nestjs/common';
import { DataStoreService } from './datastore.service';
import { AppConfigModule } from '../config';
import { EthereumModule } from '../ethereum'

@Module({
  imports: [AppConfigModule, EthereumModule],
  providers: [DataStoreService],
  exports: [DataStoreService],
})
export class DataStoreModule {}
