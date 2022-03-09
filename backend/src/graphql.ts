
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
