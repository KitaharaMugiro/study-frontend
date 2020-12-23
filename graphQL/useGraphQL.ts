import { useQuery } from "@apollo/client";
import useLocal from "../models/hooks/useLocal";
import { MileStonesViewModel } from "../models/viewModel/MileStonesViewModel";
import { RecordViewModel } from "../models/viewModel/RecordViewModel";
import { StudyRecordsViewModel } from "../models/viewModel/StudyRecordsViewModel";
import { StudyThemeViewModel } from "../models/viewModel/StudyThemeViewModel";
import { UserViewModel } from "../models/viewModel/UserViewModel";
import { MileStone, StudyRecord, StudySummary, StudyTheme, User } from "./generated/types";
import { MileStonesQuery } from "./MileStoneStatement";
import { StudyRecordsQuery, StudyRecordWithThemeQuery } from "./StudyRecordStatement";
import { StudySummaryQuery } from "./StudySummaryStatements";
import { StudyRecordQuery, StudyThemeQuery } from "./StudyThemeStatements";
import { UserQuery } from "./UserStatement";

export default {
    queryUser() {
        const userId = useLocal("USER_ID")!
        const { data, loading, refetch } = useQuery(UserQuery, {
            variables: { userId }
        });
        const user = data?.User as Required<User>
        if (!user) return { loading }
        const userViewModel = new UserViewModel(user)
        return { user: userViewModel, loading, refetch }
    },

    queryStudyTheme(studyThemeId?: string) {
        if (!studyThemeId) return undefined
        const userId = useLocal("USER_ID")!
        const { data: studyThemeData, loading, refetch } = useQuery(StudyThemeQuery, {
            variables: { userId, studyThemeId }
        });
        const studyTheme = studyThemeData?.StudyTheme as Required<StudyTheme>
        if (!studyTheme) return { loading }
        const studyThemeViewModel = new StudyThemeViewModel(studyTheme)
        return { studyTheme: studyThemeViewModel, loading, refetch }
    },

    queryStudyRecord(studyThemeId?: string, studyRecordId?: string) {
        if (!studyThemeId) return undefined
        const { data: studyRecordData, refetch: refetchStudyRecord, error, loading } = useQuery(StudyRecordQuery,
            { variables: { studyThemeId, studyRecordId }, fetchPolicy: "no-cache" })
        const _studyRecord = studyRecordData?.StudyRecord as Required<StudyRecord>
        if (!_studyRecord) return { loading }
        const studyRecord = new RecordViewModel(_studyRecord)
        return { studyRecord, refetchStudyRecord, loading }
    },

    queryMileStones(studyThemeId: string) {
        if (!studyThemeId) return undefined
        const { data, refetch, error, loading } = useQuery(MileStonesQuery,
            { variables: { studyThemeId } })
        const _mileStones = data?.MileStones as Required<MileStone[]>
        if (!_mileStones) return { loading }
        const mileStones = new MileStonesViewModel(_mileStones)
        return { mileStones, refetch, loading }
    },

    queryStudyRecords(studyThemeId: string) {
        if (!studyThemeId) return undefined
        const { data, refetch, error, loading } = useQuery(StudyRecordsQuery,
            {
                variables: { studyThemeId }, fetchPolicy: "no-cache"
            })
        const _records = data?.StudyRecords as Required<StudyRecord[]>
        if (!_records) return { loading }
        const studyRecords = new StudyRecordsViewModel(_records)
        return { studyRecords, refetch, loading }
    },

    queryStudyRecordWithTheme() {
        const userId = useLocal("USER_ID")
        const { data, refetch, error, loading } = useQuery(StudyRecordWithThemeQuery,
            {
                variables: { userId }, fetchPolicy: "no-cache"
            })
        const _records = data?.StudyRecordsByUser as Required<StudyRecord[]>
        const themes = data?.StudyThemes as Required<StudyTheme[]>
        const records = _records?.filter(r => r.studyTime !== 0)
        return { records, themes, refetch, loading }
    },

    queryStudySummary() {
        const userId = useLocal("USER_ID")
        const { data, refetch, loading } = useQuery(StudySummaryQuery, {
            variables: { userId }, fetchPolicy: "no-cache"
        })
        const summary = data?.StudySummary as Required<StudySummary>
        return { summary, refetch, loading }
    }
}