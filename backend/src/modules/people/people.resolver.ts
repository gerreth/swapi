import {
  Query,
  Args,
  Context,
  Resolver,
  ResolveField,
  Parent,
} from "@nestjs/graphql";

import { AllPeople, Gender, People } from "../../graphql";
import SWApi from "../../swapi";

interface Context {
  req: Request;
  dataSources: { swapi: SWApi };
}

@Resolver("People")
export default class PeopleResolver {
  @ResolveField()
  id(@Parent() people: People) {
    const urlParts = people.url.split("/");

    const id = urlParts[urlParts.length - 2];

    return id;
  }

  @ResolveField()
  async filmsInfo(@Parent() people: People, @Context() context: Context) {
    const films = people.films.map((film) => {
      const urlParts = film.split("/");

      const id = urlParts[urlParts.length - 2];

      return context.dataSources.swapi.getFilm(id);
    });

    return await Promise.all(films);
  }

  @ResolveField()
  gender(@Parent() people: People) {
    switch (people.gender) {
      case "male":
        return Gender.male;
      case "female":
        return Gender.female;
      default:
        return Gender.notAvailable;
    }
  }

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
  ): Promise<AllPeople> {
    const data = await context.dataSources.swapi.getAllPeople(page);

    console.log(data);

    return { totalCount: data.count, people: data.results };
  }
}
