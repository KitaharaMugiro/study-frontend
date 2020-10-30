import { useState } from "react"

export default (defaultValue: string): [string, any] => {
    const [value, setValue] = useState(defaultValue)
    const onChange = (e: any) => {
        const text = e.target.value
        setValue(text)
    }
    return [value, onChange]
}