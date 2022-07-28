import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals'

import { itemRequestService } from './itemRequest.service';
import { itemRequestEntity } from './itemRequest.entity';

import { itemRequestRepository } from '@charity-spot/api/item-request/repository/feature';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

const ItemRequestEntity = new itemRequestEntity();
