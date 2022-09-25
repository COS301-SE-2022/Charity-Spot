import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals'

import { ScheduleDeliveryService } from './scheduleDelivery.service';
import { ScheduleDeliveryEntity } from './scheduleDelivery.entity';

import { ScheduleDeliveryRepository } from '@charity-spot/api/schedule-delivery/repository/feature';
import { PrismaService } from '@charity-spot/api/shared/services/prisma';

describe( 'ScheduleDelivery Service', () => {

    let service : ScheduleDeliveryService;
    let repository : ScheduleDeliveryRepository;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [ScheduleDeliveryService, PrismaService, ScheduleDeliveryRepository],
        }).compile();

        service = module.get<ScheduleDeliveryService>(ScheduleDeliveryService);
        repository = module.get<ScheduleDeliveryRepository>(ScheduleDeliveryRepository);
    });

    /*Sched(
        assis_id: string,
        needing_id: string,
        ite_id: string,
        location: string,
        date: string,
        time: string
    )*/

    describe('Sched', () => {
        it('Makes the schedule', async () => {
            jest.spyOn(service, 'Sched').mockImplementation(() : Promise<any> => Promise.resolve(true));
            expect(await service.Sched("wadad5aw5d1","awdad4554","wadd465","1234 Pretorius Street","01-03-2022","15:30")).toEqual(true);
        })
    });

    //History( userid: string)
    describe('History', () => {
        it('Gets the history', async () => {
            jest.spyOn(service, 'History').mockImplementation(() : Promise<any> => Promise.resolve(true));
            expect(await service.History("awdwd2145")).toEqual(true);
        })
    });


    //getAvailItems( userid: string)
    describe('getAvailItems', () => {
        it('Gets all available items', async () => {
            jest.spyOn(service, 'getAvailItems').mockImplementation(() : Promise<any> => Promise.resolve(true));
            expect(await service.getAvailItems("rfrg2356")).toEqual(true);
        })
    });

    
    //getDelSchedule( Userid : string, type : string)
    describe('getDelSchedule', () => {
        it('Gets a delivery schedule', async () => {
            jest.spyOn(service, 'getDelSchedule').mockImplementation(() : Promise<any> => Promise.resolve(true));
            expect(await service.getDelSchedule("11wad457","Clothing")).toEqual(true);
        })
    });

    //getItemName( itemID : string)
    describe('getItemName', () => {
        it('Gets an items name', async () => {
            jest.spyOn(service, 'getItemName').mockImplementation(() : Promise<any> => Promise.resolve(true));
            expect(await service.getItemName("12rgd4g5")).toEqual(true);
        })
    });


    //getAverageRatings(ratings : number[])
    describe('getAverageRatings', () => {
        it('Gets the average ratings', async () => {
            jest.spyOn(service, 'getAverageRatings').mockImplementation(() : Promise<any> => Promise.resolve(true));
            const val = [2,3,1,4,5];
            expect(await service.getAverageRatings(val)).toEqual(true);
        })
    });
