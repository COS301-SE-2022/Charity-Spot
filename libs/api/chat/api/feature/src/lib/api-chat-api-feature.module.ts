import { Module } from '@nestjs/common';
import { ApiChatServiceFeatureModule } from '@charity-spot/api/chat/service/feature';
import { ChatService } from '@charity-spot/api/chat/service/feature';
import { ChatResolver } from './chat-resolver';
import { ChatRepository } from '@charity-spot/api/chat/repository/feature';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Module({
  controllers: [],
  imports: [ApiChatServiceFeatureModule],
  providers: [ChatResolver, ChatService, ChatRepository, PrismaService],
})
export class ApiChatApiFeatureModule {}
