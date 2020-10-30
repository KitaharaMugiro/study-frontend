import gql from "graphql-tag";
export const LoginMutation = gql`
    mutation($email: String, $password: String) {
      login(email:$email, password:$password) {
        userId,
        name,
        hourlyWage,
        totalMoney
      }
    }
`;

export const RegisterMutation = gql`
    mutation($name: String, $email:String, $password:String) {
        registerUser(name: $name, email: $email,password: $password) {
            userId,
            name,
            hourlyWage,
            totalMoney
        }
    }
`