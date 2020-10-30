import React, { useEffect, useState } from 'react';
import PlusButton from '../components/atoms/buttons/PlusButton';
import Spacer from '../components/atoms/Spacer';
import VerticalSpacer from '../components/atoms/VerticalSpacer';
import { FlexBox } from '../components/container/FlexBox';
import { Padding10 } from '../components/container/PaddingContainer';
import CreateCardModal from '../components/templates/CreateCardModal';
import MyCard from '../components/organism/MyCard';
import CountingScreen from '../components/templates/CountingScreen';
import LoginFormDialog from '../components/templates/LoginFormDialog';
import useLocal from '../models/hooks/useLocal';
import { useMutation, useQuery } from "@apollo/client";
import { CreateStudyThemeMutation, ListStudyThemeQuery } from '../graphQL/StudyThemeStatements';

export default () => {
  const [openCreateCard, setOpenCreateCard] = useState(false)
  const [openCountingTime, setOpenCoutingTime] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  //const [cards, setCards] = useState<string[]>([])
  const { data, loading, refetch: refetchStudyThemes } = useQuery(ListStudyThemeQuery)
  const cards = data?.studyThemes || []
  const [createStudyThemes] = useMutation(CreateStudyThemeMutation)

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

  const onClickPlus = () => {
    setOpenCreateCard(true)
  }

  const onRegister = async (title: string) => {
    const userId = useLocal("USER_ID")
    await createStudyThemes({ variables: { userId, title } })
    refetchStudyThemes({ userId })
    //setCards([...cards, title])
  }

  const renderCards = () => {
    return cards.map((card: { title: string, studyThemeId: string }) => {
      return <MyCard title={card.title} studyThemeId={card.studyThemeId} onClickStartStudy={() => setOpenCoutingTime(true)} />
    })
  }



  return (
    <div>
      <LoginFormDialog open={openLogin} handleOpen={setOpenLogin} />
      <CountingScreen open={openCountingTime} onClose={() => setOpenCoutingTime(false)} onFinish={() => { }} />
      <CreateCardModal
        open={openCreateCard}
        onClose={() => setOpenCreateCard(false)}
        onRegister={onRegister}
      />
      <Padding10>
        <FlexBox>
          <PlusButton onClick={onClickPlus} />
          {renderCards()}
        </FlexBox>
      </Padding10>

    </div>
  )
}