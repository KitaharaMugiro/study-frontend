import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from 'react';
import Board from '../components/organism/Board';
import LoginFormDialog from '../components/templates/LoginFormDialog';
import { Query, StudyTheme } from '../graphQL/generated/types';
import { ListStudyThemeQuery } from '../graphQL/StudyThemeStatements';
import { aggregateCards } from "../models/aggregateCards";
import useLocal from '../models/hooks/useLocal';

export default () => {
  const [openLogin, setOpenLogin] = useState(false)
  const { data, loading, refetch: refetchStudyThemes } = useQuery<Query>(ListStudyThemeQuery)
  const cards = (data?.StudyThemes || []) as Required<StudyTheme[]>
  const lists = aggregateCards(cards)

  useEffect(() => {
    const userId = useLocal("USER_ID")
    if (userId) {
      //signin
      setOpenLogin(false)
      refetchStudyThemes({ userId })
    } else {
      //no signin
      setOpenLogin(true)
    }
  }, [])

  const refetch = () => {
    const userId = useLocal("USER_ID")
    refetchStudyThemes({ userId })
  }

  return (
    <div>
      <LoginFormDialog open={openLogin} handleOpen={setOpenLogin} />
      <Board
        refetch={refetch}
        lists={lists}></Board>
    </div>
  )
}