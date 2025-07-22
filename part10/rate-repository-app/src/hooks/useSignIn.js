import {AUTHENTICATE} from "../graphql/mutations";
import {useMutation} from "@apollo/client";
import useAuthStorage from "./useAuthStorage";
import {useApolloClient} from "@apollo/client";

const useSignIn = () => {
    const authStorage = useAuthStorage()
    const [mutate, result] = useMutation(AUTHENTICATE);
    const client = useApolloClient()

    const signIn = async ({ username, password }) => {
        // call the mutate function here with the right arguments
        const mutationResult = await mutate({variables: {credentials: {username, password}}, fetchPolicy: 'network-only'})
        const {data} = mutationResult
        const token = data.authenticate.accessToken
        await authStorage.setAccessToken(token)
        await client.resetStore()
        return result
    };

    return [signIn, result];
};

export default useSignIn;