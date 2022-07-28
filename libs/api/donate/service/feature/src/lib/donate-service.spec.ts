import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals'

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
          providers: [DonateService, DonateRepository, DonateEntity, PrismaService],
        }).compile();

        service = module.get<DonateService>(DonateService);

  });
  it('Donate service should be defined', () => {
    expect(service).toBeDefined();
  });
});

let resolver: DonateService;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: 
    [DonateService, 
      DonateRepository,
      DonateEntity, 
      PrismaService, 
    ],
  }).compile();
  resolver = module.get<DonateService>(DonateService);
});

// PART 1 - START

//getItemPicDirec(itemID : string)
it('Should retireve organisation picture',async () => {
  jest
    .spyOn(resolver,'getItemPicDirec')
    .mockImplementation( (): Promise<DonateEntity> => Promise.resolve(donateEntity));
    expect(resolver.getItemPicDirec).not.toHaveBeenCalled();
    expect(await resolver.getItemPicDirec("asdd13dw5a")).toMatchObject(donateEntity);
    expect(resolver.getItemPicDirec).toHaveBeenCalled();

});


//history(id: string)
it('Should return history of a user', async () => {
  jest
    .spyOn(resolver,'history')
    .mockImplementation( (): Promise<DonateEntity> => Promise.resolve(donateEntity));
    expect(resolver.history).not.toHaveBeenCalled();
    expect(await resolver.history("cl62huz0m0002f6ynu0z40get")).toMatchObject(donateEntity);
    expect(resolver.history).toHaveBeenCalled();
});

//donate(id: string, name: string, quantity: number, category: catagory, condition: quality, descr: string)
it('Should allow a user to donate an item', async () => {
  jest
    .spyOn(resolver,'donate')
    .mockImplementation( (): Promise<DonateEntity> => Promise.resolve(donateEntity));
    expect(resolver.donate).not.toHaveBeenCalled();
    expect(await resolver.donate("cl62huz0m0002f6ynu0z40get","Jeans",2,catagory.CLOTHING,quality.USED,"This is a pair of old jeans.")).toMatchObject(donateEntity);
    expect(resolver.donate).toHaveBeenCalled();
});

// PART 1 - END


// PART 2 - START

  const record = {testid: "cl62huz0m0002f6ynu0z40get",testName:"org 1",testQuantity:3,testCatagoty:catagory.CLOTHING,
                  testCondition:quality.NEW,testEmail:"lk@gmail.com",testPass: "acdvdf",testOrgNum:"1",
                  testDesc:" this is a test description for org 1",testAdress:"123 test Address 1",
                  testPicture:"asdd13dw5a",testItemID:"sad254"};
  const recordUpdate = {testid: "cl62huz0m0002f6ynu0z40get",testName:"org 1",testQuantity:3,testCatagoty:catagory.FURNITURE,
                        testCondition:quality.USED,testEmail:"lk@gmail.com",testPass: "acdvdf",testOrgNum:"2",
                        testDesc:" this is a test description for org 2",testAdress:"456 test Address 2",
                        testPicture:"sdkjdi9",testItemID:"dcxa214"};

  export class DonateServiceMock
    {
      getItemPicDirec(itemID : string)
        {
          const ret = new DonateEntity();
          ret.Name = "asdd13dw5a";
          return ret;
        }
        
        
      history(id: string)
        {
          const ret = new DonateEntity();
          ret.Donations = [];

            const donateItem = new DonateEntity();

            donateItem.ID = id;
            donateItem.ItemID = record.testItemID;
            donateItem.Name = record.testName;
            donateItem.Picture = record.testPicture;
            donateItem.Quantity = record.testQuantity;
            donateItem.Description = record.testDesc;
            donateItem.Quality = record.testCondition.toString();
            donateItem.Category = record.testCatagoty.toString();
            ret.Donations.push(donateItem);

            return ret;
        }


      donate(id: string, name: string, quantity: number, category: catagory, condition: quality, descr: string)
        {
          const ret = new DonateEntity();

          ret.ItemID = "sad254";
          ret.ID = id;
          ret.Name = name;
          ret.Description = descr;

          return ret;
        }
    }



// PART 2 - END



// PART 3 - START

const servicemock = new DonateServiceMock();

describe('Donate Service Mock', () => {

//getItemPicDirec(itemID : string){
describe ('getItemPictureDirec()', () => 
  {
    it('Successfully retrieved organisation picture ', async () => 
      {
        const expectedVal = new DonateEntity();
        expectedVal.Name = "asdd13dw5a";
        const val = servicemock.getItemPicDirec(record.testPicture);
        expect(expectedVal).toMatchObject(val);
      });
  });
