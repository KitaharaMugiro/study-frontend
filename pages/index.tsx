import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Board from '../components/organism/Board/Board';
import VerticalIcons from "../components/molecule/VerticalIcons";
import LoginFormDialog from '../components/templates/LoginFormDialog';
import { Query, StudyTheme } from '../graphQL/generated/types';
import { ListStudyThemeQuery } from '../graphQL/StudyThemeStatements';
import { aggregateCardsByList } from "../models/logics/aggregateCards";
import useLocal from '../models/hooks/useLocal';
import useGraphQLSubscription from "../graphQL/useGraphQLSubscription";
const Index = () => {
  const [openLogin, setOpenLogin] = useState(false)
  const { data, loading, refetch: refetchStudyThemes } = useQuery<Query>(ListStudyThemeQuery)
  const cards = (data?.StudyThemes || []) as Required<StudyTheme[]>
  const lists = aggregateCardsByList(cards)

  const { message, loading: messageLoading } = useGraphQLSubscription.newMessage()
  console.log({ message })

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

      <RightBottom>
        <VerticalIcons />
      </RightBottom>
    </div>
  )
};

export default Index;

const RightBottom = styled.div`
  position:fixed;
  right:20px;
  bottom:0px;
`