import { Test, TestingModule } from '@nestjs/testing';

import { ChatService } from './chat.service';
import { ChatEntity } from './chat.entity';

import { ChatRepository } from '@charity-spot/api/chat/repository/feature'
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

import { direct } from '@charity-spot/api/shared/auth';

describe( 'Chat Service', () => {

    let service : ChatService;
    let repository : ChatRepository;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [ChatService, PrismaService, ChatRepository],
        }).compile();

        service = module.get<ChatService>(ChatService);
        repository = module.get<ChatRepository>(ChatRepository);
    });

    //Send(to: string, from: string, identify: string, message: string)
    describe('Send', () => {
        it('Sends a Message', async () => {
            jest.spyOn(service, 'Send').mockImplementation(() : Promise<any> => Promise.resolve(true));
            expect(await service.Send("f2x1d36f","w2d4w56","w1w4a2s4","Can i get a pair of jeans")).toEqual(true);
        })
    });

    //RetrieveThread(userID: string, with_ID: string, id: string)
    describe('RetrieveThread', () => {
        it('Retrieves a thread', async () => {
            jest.spyOn(service, 'RetrieveThread').mockImplementation(() : Promise<any> => Promise.resolve(true));
            expect(await service.RetrieveThread("f2x1d36f","w2d4w56","w1w4a2s4")).toEqual(true);
        })
    });

    //RetrieveThreads(userID: string, id: string)
    describe('RetrieveThreads', () => {
        it('Retrieves threads', async () => {
            jest.spyOn(service, 'RetrieveThreads').mockImplementation(() : Promise<any> => Promise.resolve(true));
            expect(await service.RetrieveThreads("f2x1d36f","w2d4w56")).toEqual(true);
        })
    });
