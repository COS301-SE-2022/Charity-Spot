import { Module } from '@nestjs/common';


import { OrganisationService } from '@charity-spot/api/organisation-profile/service/feature';
import { OrgResolver } from './organisation-resolver'
import { OrganisationRepository } from '@charity-spot/api/organisation-profile/repository/data-access';

import { PrismaService } from '@charity-spot/api/shared/services/prisma';

@Module({
  controllers: [],
  providers: [OrganisationService, OrgResolver, OrganisationRepository, PrismaService],
})
export class ApiOrganisationProfileApiFeatureModule {}
