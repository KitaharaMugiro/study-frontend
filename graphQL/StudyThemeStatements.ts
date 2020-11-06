import gql from "graphql-tag";
export const CreateStudyThemeMutation = gql`
    mutation($input:CreateStudyThemeInput) {
        createStudyTheme(input:$input) {
            studyThemeId
        }
    }
`;

export const UpdateStudyThemeMutation = gql`
    mutation($input: UpdateStudyThemeInput) {
        updateStudyTheme(input:$input) {
            studyThemeId
            listId
            clientUpdatedAt
        }
    }
`

export const DeleteStudyThemeMutation = gql`
    mutation($input: DeleteStudyThemeInput) {
        deleteStudyTheme(input:$input) {
            studyThemeId
            listId
            clientUpdatedAt
        }
    }
`



export const ListStudyThemeQuery = gql`
    query($userId: String) {
        StudyThemes(userId:$userId) {
            studyThemeId,
            title,
            listId
            clientUpdatedAt,
            studyingTime
        }
    }
`

export const StartStudyMutation = gql`
    mutation($input:StartStudyInput) {
        startStudy(input: $input) {
            studyRecordId,
            studyThemeId,
            studyTime
        }
    }
`

export const PauseStudyMutation = gql`
    mutation($input:PauseStudyInput) {
        pauseStudy(input: $input) {
            studyRecordId,
            studyThemeId,
            studyTime
        }
    }
`

export const ResumeStudyMutation = gql`
    mutation($input:ResumeStudyInput) {
        resumeStudy(input: $input) {
            studyRecordId,
            studyThemeId,
            studyTime
        }
    }
`

export const EndStudyMutation = gql`
    mutation($input:EndStudyInput) {
        endStudyTheme(input: $input) {
            studyRecordId,
            studyThemeId,
            studyTime
        }
    }
`