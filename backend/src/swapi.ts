import { RESTDataSource } from "apollo-datasource-rest";

export default class SWAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://swapi.dev/api";
  }

  async getPeople(id: string) {
    return this.get(`people/${id}`);
  }

  async getAllPeople(page = 1) {
    return this.get(`people?page=${page}`);
  }
}
