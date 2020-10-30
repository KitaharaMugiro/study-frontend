type LocalStorageKey = "USER_ID" | "Name"

export default (key: LocalStorageKey, setValue: string | undefined = undefined) => {
    if (setValue) {
        console.log(`set ${setValue} by ${key}`)
        localStorage.setItem(key, setValue)
    } else {
        console.log(`get by ${key}`)
        return localStorage.getItem(key)
    }
}