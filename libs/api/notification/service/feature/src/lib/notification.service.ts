import { Injectable } from '@nestjs/common';
import { NotificationEntity } from './notification.entity'
import { NotificationRepository } from '@charity-spot/api/notification/repository/feature'

@Injectable()
export class NotificationService {
    constructor(private NotificationRepository: NotificationRepository) {}

    async Test(){

        let temp = new NotificationEntity();

        temp.temp = "Notification Working!"

        return temp
    }

}