import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type DummyInput = {
  firstInput: Scalars['String'];
  secondInput: Scalars['String'];
};

export enum StudyThemeStatus {
  Create = 'CREATE',
  Start = 'START',
  End = 'END',
  Delete = 'DELETE'
}

export type DummyObject = {
  __typename?: 'DummyObject';
  firstItem: Scalars['String'];
  secondItem: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  userId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  hourlyWage?: Maybe<Scalars['String']>;
  totalMoney?: Maybe<Scalars['String']>;
};

export type StudyTheme = {
  __typename?: 'StudyTheme';
  studyThemeId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<User>;
  registerUser?: Maybe<User>;
  StudyTheme?: Maybe<StudyTheme>;
};


export type MutationLoginArgs = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


export type MutationRegisterUserArgs = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


export type MutationStudyThemeArgs = {
  userId?: Maybe<Scalars['String']>;
  studyThemeId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  status?: Maybe<StudyThemeStatus>;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  studyThemes?: Maybe<Array<Maybe<StudyTheme>>>;
};


export type QueryUserArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type QueryStudyThemesArgs = {
  userId?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

