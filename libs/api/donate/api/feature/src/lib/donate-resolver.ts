import { Resolver, Query, Args } from '@nestjs/graphql';
import { DonateEntity } from '@charity-spot/api/donate/service/feature';
import { DonateService } from '@charity-spot/api/donate/service/feature';
import { catagory, quality } from '@prisma/client';

import { FirebaseService } from '@charity-spot/api/shared/services/prisma';

@Resolver()
export class DonateResolver {
    constructor(private readonly DonateService: DonateService, private readonly FirebaseService: FirebaseService) {}

    @Query(() => DonateEntity)

    donate(
        @Args("userID") id: string,
        @Args("name") name: string,
        @Args("quantity") quantity: number,
        @Args("category") category: string,
        @Args("condition") condition: string,
        @Args("descr") descr: string
    ) {
        const Category = (category) : catagory => {
            switch(category) {
                case 'Food':
                    return 'FOOD';
                case 'Clothes':
                    return 'CLOTHING';
                case 'Tech':
                    return 'TECH';
                //case 'Hygiene':
                    //return 'TOILETRIES';
                case 'Stationary':
                    return 'STATIONARY';
                case 'Furniture':
                    return 'FURNITURE'
                case 'Kitchen':
                    return 'KITCHEN';

                default:
                    return null;
            }
        }

        //Moloko: fix your values in donate page form = donate-box4

        const Condition = (condition) : quality => {
            switch(condition) {
                case 'New':
                    return 'NEW';
                case 'Used':
                    return 'USED';

                default:
                    return null;
            }
        }
        
        //     uploadImage(@Args('base64') base64: string) : boolean{

//         //idOfitem should be the id of the item in the db
//         //this will be used as the name of the image
//         let idOfItem = Math.floor(Math.random() * (1000 - 1) + 1);

//         this.FirebaseService.uploadFile(base64, idOfItem);

//         return true;


        return this.DonateService.donate(id, name, quantity, Category(category), Condition(condition), descr);
    }
}
