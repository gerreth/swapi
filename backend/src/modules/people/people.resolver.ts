import { Query, Args, Context, Resolver } from "@nestjs/graphql";

import { People } from "../../graphql";
import SWApi from "../../swapi";

interface Context {
  req: Request;
  dataSources: { swapi: SWApi };
}

@Resolver("People")
export default class PeopleResolver {
  @Query("people")
  async people(
    @Args("id") id: string,

    @Context() context: Context,
  ): Promise<People> {
    const result = await context.dataSources.swapi.getPeople(id);

    console.log(result);

    return result;
  }

  @Query("allPeople")
  async allPeople(
    @Args("page") page: number,

    @Context() context: Context,
  ): Promise<People[]> {
    const data = await context.dataSources.swapi.getAllPeople(page);

    console.log(data);

    return data.results;
  }
}
