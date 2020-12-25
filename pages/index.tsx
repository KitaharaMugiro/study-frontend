import { useQuery } from "@apollo/client";
import { useAtom } from "jotai";
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import CoachMarks from "../components/atoms/coachmarks/CoachMarks";
import VerticalIcons from "../components/molecule/VerticalIcons";
import Board from '../components/organism/Board/Board';
import LoginFormDialog from '../components/templates/LoginFormDialog';
import SignupFormDialog from "../components/templates/SignupFormDialog";
import { Query, StudyTheme } from '../graphQL/generated/types';
import { ListStudyThemeQuery } from '../graphQL/StudyThemeStatements';
import { openSigninModalAtom, openSignupModalAtom, tutorialRef } from "../models/atoms/openSigninModalAtom";
import useLocal from '../models/hooks/useLocal';
import { aggregateCardsByList } from "../models/logics/aggregateCards";
import checkLogin from "../models/logics/user/checkLogin";
import useRegisterTemporaryUser from "../models/logics/user/useRegisterTemporaryUser";

const Index = () => {
  const { data, loading, refetch: refetchStudyThemes } = useQuery<Query>(ListStudyThemeQuery)
  const cards = (data?.StudyThemes || []) as Required<StudyTheme[]>
  const lists = aggregateCardsByList(cards)
  const regiseterTemporaryUser = useRegisterTemporaryUser()

  const [openSignin, setOpenSigninModalAtom] = useAtom(openSigninModalAtom)
  const [openSignup, setOpenSignupModalAtom] = useAtom(openSignupModalAtom)


  useEffect(() => {
    //check sign in 
    checkLogin(
      (userId: string) => {
        //login
        refetchStudyThemes({ userId })
      },
      async () => {
        //no login
        //temporary register user
        const userId = await regiseterTemporaryUser()
        refetchStudyThemes({ userId })
      },
      (userId: string) => {
        //temporary login
        refetchStudyThemes({ userId })
      }
    )
  }, [])

  const refetch = () => {
    const userId = useLocal("USER_ID")
    refetchStudyThemes({ userId })
  }

  return (
    <Scrollable>
      <LoginFormDialog open={openSignin} handleOpen={setOpenSigninModalAtom} />
      <SignupFormDialog open={openSignup} handleOpen={setOpenSignupModalAtom} />

      <Board
        refetch={refetch}
        lists={lists}></Board>
      <RightBottom>
        <VerticalIcons />
      </RightBottom>
    </Scrollable>
  )
};

export default Index;

const RightBottom = styled.div`
  position:fixed;
  right:20px;
  bottom:0px;
`

const Scrollable = styled.div`
  overflow-x:scroll;
`