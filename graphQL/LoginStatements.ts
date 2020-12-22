import gql from "graphql-tag";
export const LoginMutation = gql`
    mutation($input:LoginInput) {
      login(input:$input) {
        message,
        success,
        user {
          name,
          userId,
          totalStudyTime
        }
      }
    }
`;

export const RegisterMutation = gql`
    mutation($input: RegisterInput) {
        registerUser(input: $input) {
          message,
          success,
          user {
            name,
            userId,
            totalStudyTime
          }
        }
    }
`

export const ConnectUserMutation = gql`
    mutation($input: ConnectUserInput) {
        connectUser(input: $input) {
          message,
          success,
          user {
            name,
            userId,
            totalStudyTime
          }
        }
    }
`