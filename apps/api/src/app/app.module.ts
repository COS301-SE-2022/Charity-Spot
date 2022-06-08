import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

import { LoginApiFeatureModule } from '@charity-spot/api/login/api/feature'
import { RegistrationApiFeatureModule } from '@charity-spot/api/registration/api/feature'
import { ApiOrganisationProfileApiFeatureModule } from '@charity-spot/api/organisation-profile/api/feature'
import { ApiDonateApiFeatureModule} from '@charity-spot/api/donate/api/feature'
import { ApiHomeApiFeatureModule} from '@charity-spot/api/home/api/feature'


@Module({
  imports: [ 
    GraphQLModule.forRoot({
    autoSchemaFile: true,
    driver: ApolloDriver,
    }),
    LoginApiFeatureModule, 
    RegistrationApiFeatureModule,
    ApiOrganisationProfileApiFeatureModule,
    ApiDonateApiFeatureModule,
    ApiHomeApiFeatureModule,
    ConfigModule.forRoot()
  ]
})
export class AppModule {}
