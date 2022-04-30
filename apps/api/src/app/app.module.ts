import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoginApiFeatureModule } from '@charity-spot/login/api/feature'

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';



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
