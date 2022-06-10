import { Test, TestingModule } from '@nestjs/testing';

import { DonateService } from './donate.service';
import { DonateEntity } from './donate.entity';

import { DonateRepository } from '@charity-spot/api/donate/repository/data-access';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';
import { catagory, quality } from '@prisma/client';


const donateEntity = new DonateEntity();

describe ( 'DonateService', () => {

    let service: DonateService;
    let repository: DonateRepository;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [DonateService, DonateRepository, PrismaService],
        }).compile();

        service = module.get<DonateService>(DonateService);

  });
          
          
          
