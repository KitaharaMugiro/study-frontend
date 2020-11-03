export const getNowDateISOString = () => {
    const date = new Date()
    return FormatDate(date)
}

export const FormatDate = (date: Date) => {
    return date.toISOString() //2001-02-03T04:05:06.789Z
}

export const convertISOStringtoDate = (dateStr: string) => {
    return new Date(dateStr)
}