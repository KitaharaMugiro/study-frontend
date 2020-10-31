import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from 'react';
import Board from '../components/organism/Board';
import MyCard from '../components/organism/MyCard';
import CountingScreen from '../components/templates/CountingScreen';
import CreateCardModal from '../components/templates/CreateCardModal';
import LoginFormDialog from '../components/templates/LoginFormDialog';
import { Query, StudyTheme } from '../graphQL/generated/types';
import { CreateStudyThemeMutation, ListStudyThemeQuery } from '../graphQL/StudyThemeStatements';
import useLocal from '../models/hooks/useLocal';
import Time from '../models/Time';

export default () => {
  const [openLogin, setOpenLogin] = useState(false)
  const { data, loading, refetch: refetchStudyThemes } = useQuery<Query>(ListStudyThemeQuery)
  const cards = (data?.studyThemes || []) as Required<StudyTheme[]>

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
        lists={[
          {
            listId: "TODO",
            listTitle: "TODO",
            cards: cards
          },
          {
            listId: "DOING",
            listTitle: "DOING",
            cards: cards
          },
          {
            listId: "DONE",
            listTitle: "DONE",
            cards: cards
          }
        ]}></Board>
    </div>
  )
}