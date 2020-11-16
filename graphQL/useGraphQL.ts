import { useQuery } from "@apollo/client";
import useLocal from "../models/hooks/useLocal";
import StudyThemeViewModel from "../models/viewModel/StudyThemeViewModel";
import { StudyTheme } from "./generated/types";
import { StudyThemeQuery } from "./StudyThemeStatements";

export default {
    queryStudyTheme: (studyThemeId?: string) => {
        if (!studyThemeId) return undefined
        const userId = useLocal("USER_ID")!
        const { data: studyThemeData, error } = useQuery(StudyThemeQuery, {
            variables: { userId, studyThemeId }
        });
        if (error) {
            console.error("fail queryStudyTheme")
            return undefined
        }
        const studyTheme = studyThemeData?.StudyTheme as Required<StudyTheme>
        if (!studyTheme) return undefined
        const studyThemeViewModel = new StudyThemeViewModel(studyTheme)
        return studyThemeViewModel
    }
}