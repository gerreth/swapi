import { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum Gender {
  Female = 'female',
  Male = 'male',
  NotAvailable = 'notAvailable'
}

export type People = {
  __typename?: 'People';
  birth_year: Scalars['String'];
  eye_color: Scalars['String'];
  gender: Gender;
  hair_color: Scalars['String'];
  height: Scalars['Int'];
  id: Scalars['String'];
  mass: Scalars['Int'];
  name: Scalars['String'];
  skin_color: Scalars['String'];
  url: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allPeople: Array<People>;
  people: People;
};


export type QueryAllPeopleArgs = {
  page: Scalars['Int'];
};


export type QueryPeopleArgs = {
  id: Scalars['String'];
};

export type PeopleQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PeopleQuery = { __typename?: 'Query', people: { __typename?: 'People', id: string, name: string, gender: Gender, birth_year: string, height: number, mass: number, hair_color: string, skin_color: string, eye_color: string } };

export type AllPeopleQueryVariables = Exact<{
  page: Scalars['Int'];
}>;


export type AllPeopleQuery = { __typename?: 'Query', allPeople: Array<{ __typename?: 'People', id: string, name: string, gender: Gender, birth_year: string }> };

export type BasicPeopleInfoFragment = { __typename?: 'People', id: string, name: string, gender: Gender, birth_year: string };

export type ExtendedPeopleInfoFragment = { __typename?: 'People', height: number, mass: number, hair_color: string, skin_color: string, eye_color: string };



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Gender: Gender;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  People: ResolverTypeWrapper<People>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Int: Scalars['Int'];
  People: People;
  Query: {};
  String: Scalars['String'];
};

export type PeopleResolvers<ContextType = any, ParentType extends ResolversParentTypes['People'] = ResolversParentTypes['People']> = {
  birth_year?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  eye_color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gender?: Resolver<ResolversTypes['Gender'], ParentType, ContextType>;
  hair_color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mass?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  skin_color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allPeople?: Resolver<Array<ResolversTypes['People']>, ParentType, ContextType, RequireFields<QueryAllPeopleArgs, 'page'>>;
  people?: Resolver<ResolversTypes['People'], ParentType, ContextType, RequireFields<QueryPeopleArgs, 'id'>>;
};

export type Resolvers<ContextType = any> = {
  People?: PeopleResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};


export const BasicPeopleInfoFragmentDoc = gql`
    fragment BasicPeopleInfo on People {
  id
  name
  gender
  birth_year
}
    `;
export const ExtendedPeopleInfoFragmentDoc = gql`
    fragment ExtendedPeopleInfo on People {
  height
  mass
  hair_color
  skin_color
  eye_color
}
    `;
export const PeopleDocument = gql`
    query People($id: String!) {
  people(id: $id) {
    ...BasicPeopleInfo
    ...ExtendedPeopleInfo
  }
}
    ${BasicPeopleInfoFragmentDoc}
${ExtendedPeopleInfoFragmentDoc}`;

/**
 * __usePeopleQuery__
 *
 * To run a query within a React component, call `usePeopleQuery` and pass it any options that fit your needs.
 * When your component renders, `usePeopleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePeopleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePeopleQuery(baseOptions: Apollo.QueryHookOptions<PeopleQuery, PeopleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PeopleQuery, PeopleQueryVariables>(PeopleDocument, options);
      }
export function usePeopleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PeopleQuery, PeopleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PeopleQuery, PeopleQueryVariables>(PeopleDocument, options);
        }
export type PeopleQueryHookResult = ReturnType<typeof usePeopleQuery>;
export type PeopleLazyQueryHookResult = ReturnType<typeof usePeopleLazyQuery>;
export type PeopleQueryResult = Apollo.QueryResult<PeopleQuery, PeopleQueryVariables>;
export const AllPeopleDocument = gql`
    query AllPeople($page: Int!) {
  allPeople(page: $page) {
    ...BasicPeopleInfo
  }
}
    ${BasicPeopleInfoFragmentDoc}`;

/**
 * __useAllPeopleQuery__
 *
 * To run a query within a React component, call `useAllPeopleQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPeopleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPeopleQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useAllPeopleQuery(baseOptions: Apollo.QueryHookOptions<AllPeopleQuery, AllPeopleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPeopleQuery, AllPeopleQueryVariables>(AllPeopleDocument, options);
      }
export function useAllPeopleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPeopleQuery, AllPeopleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPeopleQuery, AllPeopleQueryVariables>(AllPeopleDocument, options);
        }
export type AllPeopleQueryHookResult = ReturnType<typeof useAllPeopleQuery>;
export type AllPeopleLazyQueryHookResult = ReturnType<typeof useAllPeopleLazyQuery>;
export type AllPeopleQueryResult = Apollo.QueryResult<AllPeopleQuery, AllPeopleQueryVariables>;