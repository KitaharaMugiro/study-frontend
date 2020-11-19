import gql from "graphql-tag";
export const MileStonesQuery = gql`
    query($studyThemeId: String) {
        MileStones(studyThemeId:$studyThemeId) {
            mileStoneId
            studyThemeId
            title
            done
            createdAt
        }
    }
`

export const UpdateMileStoneMutation = gql`
    mutation($input:UpdateMileStoneInput) {
        updateMileStone(input:$input) {
            mileStoneId
        }
    }
`;

export const CreateMileStoneMutation = gql`
    mutation($input:CreateMileStoneInput) {
        createMileStone(input:$input) {
            mileStoneId
        }
    }
`;

export const DeleteMileStoneMutation = gql`
    mutation($input:DeleteMileStoneInput) {
        deleteMileStone(input:$input) {
            mileStoneId
        }
    }
`;