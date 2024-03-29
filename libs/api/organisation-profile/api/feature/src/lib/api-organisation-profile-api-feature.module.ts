import { Module } from '@nestjs/common';


import { OrganisationService } from '@charity-spot/api/organisation-profile/service/feature';
import { OrgResolver } from './organisation-resolver'
import { OrganisationRepository } from '@charity-spot/api/organisation-profile/repository/data-access';

import { PrismaService } from '@charity-spot/api/shared/services/prisma';

import {CommentRatingRepository} from '@charity-spot/api/comment-rating/repository/data-access';

import { RegistrationService } from '@charity-spot/api/registration/service/feature'

import { RegistrationRepository } from '@charity-spot/api/registration/repository/data-access'

@Module({
  controllers: [],
  providers: [OrganisationService, OrgResolver, OrganisationRepository, PrismaService, CommentRatingRepository, RegistrationService, RegistrationRepository],
})
export class ApiOrganisationProfileApiFeatureModule {}
