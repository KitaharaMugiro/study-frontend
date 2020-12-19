import gql from "graphql-tag";
export const StudyRecordsQuery = gql`
    query($studyThemeId: String) {
        StudyRecords(studyThemeId:$studyThemeId) {
            studyRecordId,
            studyThemeId
            learned,
            createdAt,
            studyTime
        }
    }
`

export const StudyRecordWithThemeQuery = gql`
    query($userId: String) {
        StudyRecordsByUser(userId:$userId) {
            studyRecordId,
            studyThemeId
            learned,
            createdAt,
            studyTime
        }
        StudyThemes(userId:$userId) {
            studyThemeId,
            title,
            listId
            clientUpdatedAt,
            totalStudyTime,
            goal
        }
    }

`