import { useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { LoginOutput, RegisterInput } from '../../../graphQL/generated/types';
import { RegisterMutation } from '../../../graphQL/LoginStatements';
import useLocal from '../../hooks/useLocal';
import { REGISTER_TYPE } from './REGISTER_TYPE';

export default () => {
    const [register] = useMutation(RegisterMutation) //これできるのか？？
    return async () => {
        const tempEmail = uuidv4()
        const tempPassword = uuidv4()
        const input: RegisterInput = { email: tempEmail, password: tempPassword, name: tempEmail }
        const result = await register({ variables: { input } })
        const user: LoginOutput = result.data.registerUser
        if (user) {
            console.log(`会員登録成功 id =  ${user.user?.userId}`)
            useLocal("USER_ID", user.user?.userId)
            useLocal("Name", user.user?.name)
            useLocal("REGISTER_TYPE", REGISTER_TYPE.Temporary)
            return user.user?.userId
        } else {
            console.log("会員登録失敗")
            return undefined
        }
    }
}