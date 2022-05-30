import { Resolver, Query, Args } from '@nestjs/graphql';
import { DonateEntity } from '@charity-spot/api/donate/service/feature';
import { DonateService } from '@charity-spot/api/donate/service/feature';
import { catagory, quality } from '@prisma/client';

import { FirebaseService } from '@charity-spot/api/shared/services/prisma';

@Resolver()
export class DonateResolver {
    constructor(private readonly DonateService: DonateService, private readonly FirebaseService: FirebaseService) {}

    @Query(() => DonateEntity)
    async donate(
        @Args("userID") id: string,
        @Args("name") name: string,
        @Args("quantity") quantity: number,
        @Args("category") category: string,
        @Args("condition") condition: string,
        @Args("descr") descr: string,
        @Args("picture") picBase64: string,
        @Args("pic_format") format: string
    ) {
        const Category = (category) : catagory => {
            switch(category) {
                case 'Food':
                    return 'FOOD';
                case 'Clothes':
                    return 'CLOTHING';
                case 'Tech':
                    return 'TECH';
                case 'Hygiene':
                    return 'HYGIENE';
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
        

        const picRef =  picBase64 + '.' + format;//await this.FirebaseService.uploadFile(picBase64, id + "_" +  String(Math.floor(Math.random() * (1000 - 1) + 1)) + "_" + name, format);

        return await this.DonateService.donate(id, name, quantity, Category(category), Condition(condition), descr, picRef);
    }
}
