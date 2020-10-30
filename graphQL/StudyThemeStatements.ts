import gql from "graphql-tag";
export const CreateStudyThemeMutation = gql`
    mutation($userId: String, $title: String) {
        StudyTheme(userId:$userId, title:$title, status: CREATE) {
            studyThemeId
            title
            startDate
        }
    }
`;

export const ListStudyThemeQuery = gql`
    query($userId: String) {
        studyThemes(userId:$userId) {
            studyThemeId,
            title
        }
    }
`

export const startStudyTheme = gql`
    mutation($userId:String , $studyThemeId:String) {
        StudyTheme(userId:$userId, studyThemeId: $studyThemeId, status:START) {
            studyThemeId,
            startDate
        }
    }
`

export const endStudyTheme = gql`
    mutation($userId: String, $studyThemeId: String) {
        StudyTheme(userId:$userId, studyThemeId: $studyThemeId, status:END) {
            studyThemeId,
            startDate
        }
    }
`