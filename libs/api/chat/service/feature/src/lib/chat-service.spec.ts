import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals'

import { ChatService } from './chat.service';
import { ChatEntity } from './chat.entity';


import { ChatRepository } from '@charity-spot/api/chat/repository/feature'
import { PrismaService } from '@charity-spot/api/shared/services/prisma';
import { async } from '@firebase/util';


const chatEntity = new ChatEntity();

describe ( 'Chat Service', () => {
    let service: ChatService;
    let repository: ChatRepository;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [ChatService, ChatRepository,ChatEntity, PrismaService],
        }).compile();

        service = module.get<ChatService>(ChatService);

  });
  it('Chat service should be defined', () => {
    expect(service).toBeDefined();
  });
});


let resolver: ChatService;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: 
    [ChatService, 
      ChatRepository,
      ChatEntity, 
      PrismaService, 
    ],
  }).compile();
  resolver = module.get<ChatService>(ChatService);
});

it('Sends a message', async () => {
    jest
        .spyOn(resolver,'Send')
        .mockImplementation((): Promise<ChatEntity> => Promise.resolve(chatEntity));
        expect(resolver.Send).not.toHaveBeenCalled();
        expect(await resolver.Send("to", "from","identity","message")).toMatchObject(chatEntity);
        expect(resolver.Send).toHaveBeenCalled();
});
