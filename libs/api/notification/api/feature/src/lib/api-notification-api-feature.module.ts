import { Module } from '@nestjs/common';
import { ApiNotificationServiceFeatureModule } from '@charity-spot/api/notification/service/feature'
import { NotificationService } from '@charity-spot/api/notification/service/feature'
import { NotificationRepository } from '@charity-spot/api/notification/repository/feature'
import { PrismaService } from '@charity-spot/api/shared/services/prisma'
import { NotificationResolver} from './notification.resolver'
import { ChatRepository } from '@charity-spot/api/chat/repository/feature';

@Module({
  controllers: [],
  imports: [ApiNotificationServiceFeatureModule],
  providers: [NotificationResolver, NotificationService, NotificationRepository, ChatRepository, PrismaService],
})
export class ApiNotificationApiFeatureModule {}
