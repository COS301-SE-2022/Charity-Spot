import { Resolver, Query, Args } from '@nestjs/graphql';
import { DonateEntity } from '@charity-spot/api/donate/service/feature';
import { DonateService } from '@charity-spot/api/donate/service/feature';

import { FirebaseService } from '@charity-spot/api/shared/services/prisma';

@Resolver()
export class DonateResolver {
    constructor(private readonly DonateService: DonateService, private readonly FirebaseService: FirebaseService) {}

    @Query(() => DonateEntity)
    uploadImage(@Args('base64') base64: string) : boolean{

        this.FirebaseService.uploadFile(base64);

        return true;
    }
}