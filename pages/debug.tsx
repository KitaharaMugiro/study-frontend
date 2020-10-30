import React from "react";
import gql from "graphql-tag";
import { Center } from "../components/container/Center";
import { FullScreen } from "../components/container/FullScreen";
import { useQuery } from "@apollo/client";

const GET_USER = gql`
    query($userId: String) {
      user(userId:$userId) {
        name,
        totalMoney
      }
    }
`;

export default () => {
  const result = useQuery(GET_USER, { variables: { userId: "b4730520-84dc-431e-af67-e91077bcaf7e" } })
  console.log(result)
  console.log(result.data)
  return (
    <FullScreen>
      <Center>
        {result.data?.user?.name}
      </Center>
    </FullScreen>
  );
};