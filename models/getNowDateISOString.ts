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

export const convertDateToJapanseString = (date: Date) => {
    var year_str = String(date.getFullYear())
    //月だけ+1すること
    var month_str = String(1 + date.getMonth())
    var day_str = String(date.getDate())
    var hour_str = String(date.getHours())
    var minute_str = String(date.getMinutes())
    var second_str = String(date.getSeconds())


    let format_str = 'YYYY年MM月DD日 hh時mm分';
    format_str = format_str.replace(/YYYY/g, year_str);
    format_str = format_str.replace(/MM/g, month_str);
    format_str = format_str.replace(/DD/g, day_str);
    format_str = format_str.replace(/hh/g, hour_str);
    format_str = format_str.replace(/mm/g, minute_str);
    format_str = format_str.replace(/ss/g, second_str);
    return format_str
}

export const convertDateToShortJapanseString = (date: Date) => {
    var year_str = String(date.getFullYear())
    //月だけ+1すること
    var month_str = String(1 + date.getMonth())
    var day_str = String(date.getDate())
    var hour_str = String(date.getHours())
    var minute_str = String(date.getMinutes())
    var second_str = String(date.getSeconds())


    let format_str = 'MM月DD日hh時';
    format_str = format_str.replace(/YYYY/g, year_str);
    format_str = format_str.replace(/MM/g, month_str);
    format_str = format_str.replace(/DD/g, day_str);
    format_str = format_str.replace(/hh/g, hour_str);
    format_str = format_str.replace(/mm/g, minute_str);
    format_str = format_str.replace(/ss/g, second_str);
    return format_str
}