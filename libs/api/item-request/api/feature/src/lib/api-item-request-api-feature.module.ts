import { Module } from '@nestjs/common';
import { ApiItemRequestServiceFeatureModule } from '@charity-spot/api/item-request/service/feature'
import { itemRequestService } from '@charity-spot/api/item-request/service/feature';
import { ItemRequestResolver } from './itemRequest.resolver';
import { itemRequestRepository } from '@charity-spot/api/item-request/repository/feature'
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Module({
  controllers: [],
  imports: [ApiItemRequestServiceFeatureModule],
  providers: [ItemRequestResolver, itemRequestService, itemRequestRepository, PrismaService]
})
export class ApiItemRequestApiFeatureModule {}
