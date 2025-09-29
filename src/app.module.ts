import { Module } from '@nestjs/common';
import { ApiModule } from './modules/api/api.module';
import { WorkerPeModule } from './worker-pe/worker-pe.module';
import { WorkerClModule } from './worker-cl/worker-cl.module';
import { WorkerCommonModule } from './worker-common/worker-common.module';

@Module({
  imports: [ApiModule, WorkerPeModule, WorkerClModule, WorkerCommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
