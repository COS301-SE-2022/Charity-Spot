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

//RetrieveThread(userID: string, with_ID: string, id: string)
it('Retrieves a thread', async () => {
    jest
        .spyOn(resolver,'RetrieveThread')
        .mockImplementation((): Promise<ChatEntity> => Promise.resolve(chatEntity));
        expect(resolver.RetrieveThread).not.toHaveBeenCalled();
        expect(await resolver.RetrieveThread("cl62huz0m0002f6ynu0z40get", "lv52awdkjfmn0m0002f6ynu0z40get","vnc7uz0wdalm6ynu0z40get")).toMatchObject(chatEntity);
        expect(resolver.RetrieveThread).toHaveBeenCalled();
});

//RetrieveThreads(userID: string, id: string) => chatEntity
it('Retrieves multiple threads', async () => {
    jest
        .spyOn(resolver,'RetrieveThreads')
        .mockImplementation((): Promise<ChatEntity> => Promise.resolve(chatEntity));
        expect(resolver.RetrieveThreads).not.toHaveBeenCalled();
        expect(await resolver.RetrieveThreads("cl62huz0m0002f6ynu0z40get", "lv52awdkjfmn0m0002f6ynu0z40get")).toMatchObject(chatEntity);
        expect(resolver.RetrieveThreads).toHaveBeenCalled();
})

const record = {testTo: "test to", testFrom: "test from", testIdentity: "test identity ",testMessage: "some test message",testid: "cl62huz0m0002f6ynu0z40get",testid2: "lv52awdkjfmn0m0002f6ynu0z40get",testid3:"vnc7uz0wdalm6ynu0z40get"};
const recordUpdate = {testTo: "test to update", testFrom: "test from update", testIdentity: "test identity update",testMessage: " some test message update",testid: "cl62huz0m0002f6ynu0z40get",testid2: "lv52awdkjfmn0m0002f6ynu0z40get",testid3:"vnc7uz0wdalm6ynu0z40get"};

export class ChatServiceMock
    {
        Send(to: string, from: string, identify: string, message: string)
            {
                const ret = new ChatEntity();
                ret.Reciever = to;
                ret.Sender = from;
                ret.Message = message;
                return ret;
            }      

            RetrieveThread(userID: string, with_ID: string, id: string)
                {
                    const ret = new ChatEntity();
                    ret.Reciever = with_ID;
                    ret.Sender = userID;
                    ret.Message = "some test message";
                    return ret; 
                }

            RetrieveThreads(userID: string, id: string)
                {
                    const ret = new ChatEntity();
                    ret.Threads = [];
                    ret.Threads.push(id);
                    ret.Threads.push(recordUpdate.testid2);
                    ret.Threads.push(recordUpdate.testid3);
                    return ret;
                }
    }

const servicemock = new ChatServiceMock();

describe('Chat Service Mock', () => {
    describe('Send a message', () => {
        it('It should send a message', async () => {
        const expectedVal = new ChatEntity();
        expectedVal.Reciever = "test to";
        expectedVal.Sender = "test from";
        expectedVal.Message = "some test message";
        //Send(to: string, from: string, identify: string, message: string) => chatEntity
        const val = servicemock.Send(record.testTo,record.testFrom,record.testIdentity,record.testMessage);
        expect(expectedVal).toMatchObject(val);
        });
    });

    describe('Retrieve a thread', () => {
        it('It should retrieve a thread', async () => {
            //RetrieveThread(userID: string, with_ID: string, id: string)
            const expectedVal = new ChatEntity();
            expectedVal.Reciever = record.testid2;
            expectedVal.Sender = record.testid;
            expectedVal.Message = "some test message";
            const val = servicemock.RetrieveThread(record.testid,record.testid2,record.testid3);
            expect(expectedVal).toMatchObject(val);
        });
    });

    describe('Retrieve all threads', () => {
        it('It should retrieve multiple threads', async () => {
            const expectedVal = new ChatEntity();
            expectedVal.Threads = [];
            
            expectedVal.Threads.push("cl62huz0m0002f6ynu0z40get");
            expectedVal.Threads.push("lv52awdkjfmn0m0002f6ynu0z40get");
            expectedVal.Threads.push("vnc7uz0wdalm6ynu0z40get");

            const val = servicemock.RetrieveThreads("cl62huz0m0002f6wdadhb","cl62huz0m0002f6ynu0z40get");
            
            expect(expectedVal).toMatchObject(val);
        });
    });
});
