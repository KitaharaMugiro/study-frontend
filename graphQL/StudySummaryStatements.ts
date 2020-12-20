import gql from "graphql-tag";
export const StudySummaryQuery = gql`
    query($userId: String) {
        StudySummary(userId:$userId) {
            maxStudyTime,
            yourStudyTime,
            avgStudyTime,
            createdAt
        }
    }
`
