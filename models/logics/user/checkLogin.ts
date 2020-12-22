import useLocal from "../../hooks/useLocal"
import { REGISTER_TYPE } from "./REGISTER_TYPE"

export default (onLogin: (userId: string) => void, onNotLogin: () => void, onTemporaryUserLogin: (userId: string) => void) => {
    const userId = useLocal("USER_ID")
    if (userId) {
        const type = useLocal("REGISTER_TYPE") || REGISTER_TYPE.Registered
        if (type === REGISTER_TYPE.Registered) {
            onLogin(userId)
            useLocal("REGISTER_TYPE", REGISTER_TYPE.Registered)
        } else if (type === REGISTER_TYPE.Temporary) {
            onTemporaryUserLogin(userId)
            useLocal("REGISTER_TYPE", REGISTER_TYPE.Temporary)
        }
    } else {
        onNotLogin()
    }
}