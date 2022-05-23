import { Injectable } from '@nestjs/common';
import { DonateEntity } from './donate.entity';
import { DonateRepository } from '@charity-spot/api/donate/repository/data-access'

@Injectable()
export class DonateService {
    constructor(private LoginRepository: DonateRepository) {}

    async coolFunc(){

        let temp = new DonateEntity();
        temp.ID = "Donate Working!";
        return temp;
    }
}