
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Gender {
    male = "male",
    female = "female",
    notAvailable = "notAvailable"
}

export interface People {
    id: string;
    url: string;
    name: string;
    gender: Gender;
    birth_year: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    films: string[];
    filmsInfo: Film[];
}

export interface Film {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    created: string;
    edited: string;
    url: string;
}

export interface IQuery {
    allPeople(page: number): AllPeople | Promise<AllPeople>;
    people(id: string): People | Promise<People>;
}

export interface AllPeople {
    totalCount: number;
    people: People[];
}

type Nullable<T> = T | null;
