import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals'

import { NotificationService } from './notification.service';
import { NotificationEntity } from './notification.entity';


import { NotificationRepository } from '@charity-spot/api/notification/repository/feature'
import { PrismaService } from '@charity-spot/api/shared/services/prisma';
import { async } from '@firebase/util';


const notificationEntity = new NotificationEntity();

describe ( 'Notification Service', () => {
    let service: NotificationService;
    let repository: NotificationRepository;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [NotificationService, NotificationRepository,NotificationEntity, PrismaService],
        }).compile();

        service = module.get<NotificationService>(NotificationService);

  });
  it('Notification service should be defined', () => {
    expect(service).toBeDefined();
  });
});

let resolver: NotificationService;

beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: 
      [NotificationService, 
        NotificationRepository,
        NotificationEntity, 
        PrismaService, 
      ],
    }).compile();
    resolver = module.get<NotificationService>(NotificationService);
  });

  //getNotifications(u_id: string, id: string)
  it('getNotifications', async () => {
    jest
