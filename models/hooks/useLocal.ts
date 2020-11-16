type LocalStorageKey = "USER_ID" | "Name"
type LocalStorageJsonKey = "StudyStatus"

export default (key: LocalStorageKey, setValue: string | undefined = undefined) => {
    if (setValue) {
        console.log(`set ${setValue} by ${key}`)
        localStorage.setItem(key, setValue)
    } else {
        //console.log(`get by ${key}`)
        return localStorage.getItem(key)
    }
}

export const useLocalJson = (key: LocalStorageJsonKey, setValue: { [key: string]: string | number | boolean } | undefined = undefined) => {

    if (setValue) {
        console.log(`set ${setValue} by ${key}`)
        localStorage.setItem(key, JSON.stringify(setValue))
    } else {
        //console.log(`get by ${key}`)
        const value = localStorage.getItem(key)
        if (value) {
            return JSON.parse(value)
        }
        return value
    }
}

export const deleteLocal = (key: LocalStorageKey | LocalStorageJsonKey) => {
    localStorage.removeItem(key)
}

export const deleteAllLocal = () => {
    localStorage.clear()
}