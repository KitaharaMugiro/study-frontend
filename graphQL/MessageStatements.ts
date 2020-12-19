import gql from "graphql-tag";
export const NewMessageStatement = gql`
  subscription newMessage {
    newMessage {
      messageId,
      message
    }
  }
`;