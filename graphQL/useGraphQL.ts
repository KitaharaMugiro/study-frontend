import { useQuery } from "@apollo/client";
import useLocal from "../models/hooks/useLocal";
import { RecordViewModel } from "../models/viewModel/RecordViewModel";
import StudyThemeViewModel from "../models/viewModel/StudyThemeViewModel";
import { StudyRecord, StudyTheme } from "./generated/types";
import { StudyRecordQuery, StudyThemeQuery } from "./StudyThemeStatements";

export default {
    queryStudyTheme(studyThemeId?: string) {
        if (!studyThemeId) return undefined
        const userId = useLocal("USER_ID")!
        const { data: studyThemeData, error, loading } = useQuery(StudyThemeQuery, {
            variables: { userId, studyThemeId }
        });
        if (error) {
            console.error("fail queryStudyTheme")
            return
        }
        const studyTheme = studyThemeData?.StudyTheme as Required<StudyTheme>
        if (!studyTheme) return { loading }
        const studyThemeViewModel = new StudyThemeViewModel(studyTheme)
        return { studyTheme: studyThemeViewModel, loading }
    },

    queryStudyRecord(studyThemeId?: string, studyRecordId?: string) {
        if (!studyThemeId) return undefined
        const { data: studyRecordData, refetch: refetchStudyRecord, error, loading } = useQuery(StudyRecordQuery,
            { variables: { studyThemeId, studyRecordId } })
        if (loading) {
            return { loading }
        }
        const _studyRecord = studyRecordData?.StudyRecord as Required<StudyRecord>
        if (!_studyRecord) return { loading }
        const studyRecord = new RecordViewModel(_studyRecord)
        return { studyRecord, refetchStudyRecord }
    }
}