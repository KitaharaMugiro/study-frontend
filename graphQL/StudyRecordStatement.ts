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