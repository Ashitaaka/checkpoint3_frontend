import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Continent = {
  __typename?: 'Continent';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Country = {
  __typename?: 'Country';
  code: Scalars['String'];
  continent?: Maybe<Continent>;
  emoji: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addContinent: Continent;
  addCountry: Country;
};


export type MutationAddContinentArgs = {
  data: NewContinentInput;
};


export type MutationAddCountryArgs = {
  data: NewCountryInput;
};

export type NewContinentInput = {
  name: Scalars['String'];
};

export type NewCountryInput = {
  code: Scalars['String'];
  continent?: InputMaybe<ObjectId>;
  emoji: Scalars['String'];
  name: Scalars['String'];
};

export type ObjectId = {
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  continents: Array<Continent>;
  countries: Array<Country>;
  country: Country;
};


export type QueryCountryArgs = {
  code: Scalars['String'];
};

export type AddCountryMutationVariables = Exact<{
  data: NewCountryInput;
}>;


export type AddCountryMutation = { __typename?: 'Mutation', addCountry: { __typename?: 'Country', code: string, name: string, emoji: string, id: number, continent?: { __typename?: 'Continent', name: string, id: number } | null } };

export type ListCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListCountriesQuery = { __typename?: 'Query', countries: Array<{ __typename?: 'Country', name: string, emoji: string, code: string }> };

export type CountryQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type CountryQuery = { __typename?: 'Query', country: { __typename?: 'Country', name: string, emoji: string, code: string, id: number, continent?: { __typename?: 'Continent', name: string } | null } };

export type ListContinentsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListContinentsQuery = { __typename?: 'Query', continents: Array<{ __typename?: 'Continent', name: string, id: number }> };


export const AddCountryDocument = gql`
    mutation AddCountry($data: NewCountryInput!) {
  addCountry(data: $data) {
    code
    name
    emoji
    continent {
      name
      id
    }
    id
  }
}
    `;
export type AddCountryMutationFn = Apollo.MutationFunction<AddCountryMutation, AddCountryMutationVariables>;

/**
 * __useAddCountryMutation__
 *
 * To run a mutation, you first call `useAddCountryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCountryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCountryMutation, { data, loading, error }] = useAddCountryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddCountryMutation(baseOptions?: Apollo.MutationHookOptions<AddCountryMutation, AddCountryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCountryMutation, AddCountryMutationVariables>(AddCountryDocument, options);
      }
export type AddCountryMutationHookResult = ReturnType<typeof useAddCountryMutation>;
export type AddCountryMutationResult = Apollo.MutationResult<AddCountryMutation>;
export type AddCountryMutationOptions = Apollo.BaseMutationOptions<AddCountryMutation, AddCountryMutationVariables>;
export const ListCountriesDocument = gql`
    query ListCountries {
  countries {
    name
    emoji
    code
  }
}
    `;

/**
 * __useListCountriesQuery__
 *
 * To run a query within a React component, call `useListCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListCountriesQuery(baseOptions?: Apollo.QueryHookOptions<ListCountriesQuery, ListCountriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListCountriesQuery, ListCountriesQueryVariables>(ListCountriesDocument, options);
      }
export function useListCountriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListCountriesQuery, ListCountriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListCountriesQuery, ListCountriesQueryVariables>(ListCountriesDocument, options);
        }
export type ListCountriesQueryHookResult = ReturnType<typeof useListCountriesQuery>;
export type ListCountriesLazyQueryHookResult = ReturnType<typeof useListCountriesLazyQuery>;
export type ListCountriesQueryResult = Apollo.QueryResult<ListCountriesQuery, ListCountriesQueryVariables>;
export const CountryDocument = gql`
    query Country($code: String!) {
  country(code: $code) {
    name
    emoji
    continent {
      name
    }
    code
    id
  }
}
    `;

/**
 * __useCountryQuery__
 *
 * To run a query within a React component, call `useCountryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountryQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useCountryQuery(baseOptions: Apollo.QueryHookOptions<CountryQuery, CountryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountryQuery, CountryQueryVariables>(CountryDocument, options);
      }
export function useCountryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountryQuery, CountryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountryQuery, CountryQueryVariables>(CountryDocument, options);
        }
export type CountryQueryHookResult = ReturnType<typeof useCountryQuery>;
export type CountryLazyQueryHookResult = ReturnType<typeof useCountryLazyQuery>;
export type CountryQueryResult = Apollo.QueryResult<CountryQuery, CountryQueryVariables>;
export const ListContinentsDocument = gql`
    query ListContinents {
  continents {
    name
    id
  }
}
    `;

/**
 * __useListContinentsQuery__
 *
 * To run a query within a React component, call `useListContinentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListContinentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListContinentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListContinentsQuery(baseOptions?: Apollo.QueryHookOptions<ListContinentsQuery, ListContinentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListContinentsQuery, ListContinentsQueryVariables>(ListContinentsDocument, options);
      }
export function useListContinentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListContinentsQuery, ListContinentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListContinentsQuery, ListContinentsQueryVariables>(ListContinentsDocument, options);
        }
export type ListContinentsQueryHookResult = ReturnType<typeof useListContinentsQuery>;
export type ListContinentsLazyQueryHookResult = ReturnType<typeof useListContinentsLazyQuery>;
export type ListContinentsQueryResult = Apollo.QueryResult<ListContinentsQuery, ListContinentsQueryVariables>;