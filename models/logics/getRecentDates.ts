export default (count: number) => {
    const result = []
    for (let i = 0; i < count; i++) {
        const today = new Date()
        today.setDate(today.getDate() - i)
        const month = today.getMonth() + 1
        const day = today.getDate()
        const dateStr = `${month}月${day}日`
        result.push(dateStr)
    }
    result.reverse()
    return result
}