import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

import { LoginApiFeatureModule } from '@charity-spot/login/api/feature'

@Module({
  imports: [ 
    GraphQLModule.forRoot({
    autoSchemaFile: true,
    driver: ApolloDriver,
    }),
    LoginApiFeatureModule, 
    ConfigModule.forRoot()
  ]
})
export class AppModule {}
