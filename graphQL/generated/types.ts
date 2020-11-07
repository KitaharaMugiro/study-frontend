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

export type LoginInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
};

export type RegisterInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type CreateStudyThemeInput = {
  userId: Scalars['String'];
  title: Scalars['String'];
  listId: ListId;
  clientUpdatedAt: Scalars['String'];
};

export type DeleteStudyThemeInput = {
  userId: Scalars['String'];
  studyThemeId: Scalars['String'];
};

export type UpdateStudyThemeInput = {
  userId: Scalars['String'];
  studyThemeId: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  listId?: Maybe<ListId>;
  clientUpdatedAt?: Maybe<Scalars['String']>;
};

export type StartStudyInput = {
  userId: Scalars['String'];
  studyThemeId: Scalars['String'];
};

export type PauseStudyInput = {
  userId: Scalars['String'];
  studyThemeId: Scalars['String'];
  studyRecordId: Scalars['String'];
};

export type EndStudyInput = {
  userId: Scalars['String'];
  studyThemeId: Scalars['String'];
  studyRecordId: Scalars['String'];
};

export type ResumeStudyInput = {
  userId: Scalars['String'];
  studyThemeId: Scalars['String'];
  studyRecordId: Scalars['String'];
};

export enum StudyStatusOperation {
  Start = 'START',
  End = 'END',
  Pause = 'PAUSE',
  Resume = 'RESUME'
}

export type User = {
  __typename?: 'User';
  userId: Scalars['String'];
  name: Scalars['String'];
  totalStudyTime: Scalars['Int'];
};

export type StudyList = {
  __typename?: 'StudyList';
  listId?: Maybe<ListId>;
};

export type StudyTheme = {
  __typename?: 'StudyTheme';
  studyThemeId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  listId?: Maybe<ListId>;
  clientUpdatedAt?: Maybe<Scalars['String']>;
  studyingTime?: Maybe<Scalars['Int']>;
  records?: Maybe<Array<Maybe<StudyRecord>>>;
};

export type StudyRecord = {
  __typename?: 'StudyRecord';
  studyRecordId?: Maybe<Scalars['String']>;
  studyThemeId?: Maybe<Scalars['String']>;
  learned?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  studyTime?: Maybe<Scalars['Int']>;
};

export enum ListId {
  Todo = 'TODO',
  Doing = 'DOING',
  Done = 'DONE'
}

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<LoginOutput>;
  registerUser?: Maybe<LoginOutput>;
  createStudyTheme?: Maybe<StudyTheme>;
  deleteStudyTheme?: Maybe<StudyTheme>;
  updateStudyTheme?: Maybe<StudyTheme>;
  startStudy?: Maybe<StudyRecord>;
  pauseStudy?: Maybe<StudyRecord>;
  resumeStudy?: Maybe<StudyRecord>;
  endStudy?: Maybe<StudyRecord>;
};


export type MutationLoginArgs = {
  input?: Maybe<LoginInput>;
};


export type MutationRegisterUserArgs = {
  input?: Maybe<RegisterInput>;
};


export type MutationCreateStudyThemeArgs = {
  input?: Maybe<CreateStudyThemeInput>;
};


export type MutationDeleteStudyThemeArgs = {
  input?: Maybe<DeleteStudyThemeInput>;
};


export type MutationUpdateStudyThemeArgs = {
  input?: Maybe<UpdateStudyThemeInput>;
};


export type MutationStartStudyArgs = {
  input?: Maybe<StartStudyInput>;
};


export type MutationPauseStudyArgs = {
  input?: Maybe<PauseStudyInput>;
};


export type MutationResumeStudyArgs = {
  input?: Maybe<ResumeStudyInput>;
};


export type MutationEndStudyArgs = {
  input?: Maybe<EndStudyInput>;
};

export type Query = {
  __typename?: 'Query';
  User?: Maybe<User>;
  StudyThemes?: Maybe<Array<Maybe<StudyTheme>>>;
  StudyTheme?: Maybe<StudyTheme>;
  StudyRecord?: Maybe<StudyRecord>;
};


export type QueryUserArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type QueryStudyThemesArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type QueryStudyThemeArgs = {
  userId?: Maybe<Scalars['String']>;
  studyThemeId?: Maybe<Scalars['String']>;
};


export type QueryStudyRecordArgs = {
  studyThemeId?: Maybe<Scalars['String']>;
  studyRecordId?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

