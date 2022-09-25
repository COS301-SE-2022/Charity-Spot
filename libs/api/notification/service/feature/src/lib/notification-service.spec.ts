import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals'

import { NotificationService } from './notification.service';
import { NotificationEntity } from './notification.entity';


import { NotificationRepository } from '@charity-spot/api/notification/repository/feature'
import { PrismaService } from '@charity-spot/api/shared/services/prisma';
import { async } from '@firebase/util';


const notificationEntity = new NotificationEntity();


describe( 'Comment Rating Service', () => {

  let service : NotificationService;
  let repository : NotificationRepository;


  beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [NotificationService, PrismaService, NotificationRepository],
      }).compile();

      service = module.get<NotificationService>(NotificationService);
      repository = module.get<NotificationRepository>(NotificationRepository);
  });

//getNotifications(u_id: string, id: string)
describe('getNotifications', () => {
  it('Gets notifications', async () => {
      jest.spyOn(service, 'getNotifications').mockImplementation(() : Promise<any> => Promise.resolve(true));
      expect(await service.getNotifications("awdad4754","4wad4a5")).toEqual(true);
  })
});

//getReceiver(r_id: string)
describe('getReceiver', () => {
  it('', async () => {
      jest.spyOn(service, 'getReceiver').mockImplementation(() : Promise<any> => Promise.resolve(true));
      expect(await service.getReceiver("wda445d")).toEqual(true);
  })
});

//checkNot(id: string, type: string)
describe('checkNot', () => {
  it('', async () => {
      jest.spyOn(service, 'checkNot').mockImplementation(() : Promise<any> => Promise.resolve(true));
      expect(await service.checkNot("wadadw1","dfg454f")).toEqual(true);
  })
});
 


});
