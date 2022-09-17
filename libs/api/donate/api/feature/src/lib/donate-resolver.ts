import { Resolver, Query, Args } from '@nestjs/graphql';
import { DonateEntity } from '@charity-spot/api/donate/service/feature';
import { DonateService } from '@charity-spot/api/donate/service/feature';
import { catagory, quality } from '@prisma/client';
@Resolver()
export class DonateResolver {
    constructor(private readonly DonateService: DonateService) {}

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
        console.log(category);
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

        console.log(condition);
        console.log(Condition(condition) + "eee");


        const returnV = await this.DonateService.donate(id, name, quantity, Category(category), Condition(condition), descr);

        // if(picBase64 != "undefined"){

        //     var imgType = picBase64.substring(
        //         picBase64.indexOf("/") + 1, 
        //         picBase64.lastIndexOf(";")
        //     );

        //     let imgName = "DonatedItems/" + returnV.ItemID + '.' + imgType;

        //     await this.DonateService.setItemPicName(id, name, imgName);

        //     await this.FirebaseService.uploadFile(picBase64, imgName);

        //     let downLink = await this.FirebaseService.getURLByFilePath(imgName);

        //     console.log(downLink);

        // }
        // else{
        //     await this.DonateService.setItemPicName(id, name, "undefined");
        // }

        return returnV;
        
    }

    @Query(() => DonateEntity)
    async getItemPicLink(
        @Args("itemID") itemID: string
    ) {

        // let imgDirec = await this.DonateService.getItemPicDirec(itemID);

        // if(imgDirec.Name == "undefined"){
        //     return imgDirec;
        // }

        // let downLink = await this.FirebaseService.getURLByFilePath(imgDirec.Name);

        // imgDirec.Name = downLink;

        // console.log("testtt");
        // console.log(imgDirec.Name);

        // return imgDirec;

        return null;
    }

    @Query(() => DonateEntity)
    async donateHistory(
        @Args("id") id: string
    ) {
        return await this.DonateService.history(id);
    }
}
