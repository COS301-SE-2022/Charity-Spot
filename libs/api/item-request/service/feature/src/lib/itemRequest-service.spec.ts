import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals'

import { itemRequestService } from './itemRequest.service';
import { itemRequestEntity } from './itemRequest.entity';

import { itemRequestRepository } from '@charity-spot/api/item-request/repository/feature';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

const ItemRequestEntity = new itemRequestEntity();


describe('item Request Service', () => {

    let service: itemRequestService;
    let repository: itemRequestRepository;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [itemRequestService, itemRequestRepository, itemRequestEntity, PrismaService],
        }).compile();

        service = module.get<itemRequestService>(itemRequestService);

  });
  it('item Request service should be defined', () => {
    expect(service).toBeDefined();
  });
});
