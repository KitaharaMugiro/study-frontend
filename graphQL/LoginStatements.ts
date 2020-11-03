import gql from "graphql-tag";
export const LoginMutation = gql`
    mutation($LoginInput:LoginInput) {
      login(input:$LoginInput) {
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
    mutation($RegisterInput: RegisterInput) {
        registerUser(input: RegisterInput) {
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