import React, { useState } from 'react';
import PlusButton from '../components/atoms/buttons/PlusButton';
import Spacer from '../components/atoms/Spacer';
import VerticalSpacer from '../components/atoms/VerticalSpacer';
import { FlexBox } from '../components/container/FlexBox';
import { Padding10 } from '../components/container/PaddingContainer';
import CreateCardModal from '../components/templates/CreateCardModal';
import MyCard from '../components/organism/MyCard';
import CountingScreen from '../components/templates/CountingScreen';

export default () => {
  const [openCreateCard, setOpenCreateCard] = useState(false)
  const [openCountingTime, setOpenCoutingTime] = useState(true)
  const [cards, setCards] = useState(["test", "英単語"])
  const onClickPlus = () => {
    setOpenCreateCard(true)
  }
  const onRegister = (title: string) => {
    setCards([...cards, title])
  }
  const renderCards = () => {
    return cards.map((cardTitle) => {
      return <MyCard title={cardTitle} onClickStartStudy={() => setOpenCoutingTime(true)} />
    })
  }

  return (
    <div>
      <CountingScreen open={openCountingTime} onClose={() => setOpenCoutingTime(false)} onFinish={() => setOpenCoutingTime(false)} />
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