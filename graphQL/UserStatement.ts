import gql from "graphql-tag";

export const UserQuery = gql`
    query($userId: String) {
        User(userId: $userId) {
            userId,
            name,
            totalStudyTime
        }
    }
`