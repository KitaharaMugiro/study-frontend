import { useSubscription } from "@apollo/client";
import { NewMessageStatement } from "./MessageStatements";

export default {
    newMessage() {
        const { data, loading } = useSubscription(NewMessageStatement);
        console.log({ data })
        return { message: data?.newMessage?.message, loading }
    }
}