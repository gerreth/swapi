import { Module } from "@nestjs/common";

import SWApi from "../../swapi";

import PeopleResolver from "./people.resolver";

@Module({
  providers: [PeopleResolver, SWApi],
})
export class PeopleModule {}
