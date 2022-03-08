
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface People {
    name: string;
}

export interface IQuery {
    allPeople(page: number): Nullable<Nullable<People>[]> | Promise<Nullable<Nullable<People>[]>>;
    people(id: string): Nullable<People> | Promise<Nullable<People>>;
}

type Nullable<T> = T | null;
