import React from 'react';
import PlusButton from '../components/atoms/buttons/PlusButton';
import Spacer from '../components/atoms/Spacer';
import VerticalSpacer from '../components/atoms/VerticalSpacer';
import { FlexBox } from '../components/container/FlexBox';
import { Padding10 } from '../components/container/PaddingContainer';
import MyCard from '../components/organism/MyCard';

export default () => {

  return (
    <div>
      <Padding10>
        <FlexBox>
          <PlusButton />
          <VerticalSpacer space={10} />
          <MyCard />
          <VerticalSpacer space={10} />
          <MyCard />
        </FlexBox>
      </Padding10>

    </div>
  )
}