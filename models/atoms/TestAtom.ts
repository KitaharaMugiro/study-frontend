import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { atom } from 'jotai'
import { Query } from '../../graphQL/generated/types'
import { ListStudyThemeQuery } from '../../graphQL/StudyThemeStatements'

import { request, gql } from 'graphql-request'

const query = gql`
  {
    User(userId:"89505fa0-d0d6-48fd-9b2f-a49ac5ee9477") {
        name
    }
  }
`

const testResponse = atom<any>(null)

export const fetchResponse = atom(
  get => { console.log("get test response"); get(testResponse) },
  async (_get, set, url) => {
    const response = await request('https://mojybntbl2.execute-api.ap-northeast-1.amazonaws.com/dev/graphql', query)
    console.log({ response })
    set(testResponse, response)
  }
)
