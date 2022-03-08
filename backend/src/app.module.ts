import { join } from "path";

import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import { PeopleModule } from "./modules/people/people.module";
import SWApi from "./swapi";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      dataSources: () => ({
        swapi: new SWApi(),
      }),
      typePaths: ["./**/*.graphql"],
      definitions: {
        path: join(process.cwd(), "src/graphql.ts"),
      },
    }),
    PeopleModule,
  ],
})
export class AppModule {}
