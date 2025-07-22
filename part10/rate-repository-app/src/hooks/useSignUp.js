import {CREATE_USER} from "../graphql/mutations";
import {useMutation} from "@apollo/client";
import useSignIn from "./useSignIn";

const useSignUp = () => {
    const [mutate, result] = useMutation(CREATE_USER);
    const [signIn] = useSignIn()

    const signUp = async (username, password) => {
        // call the mutate function here with the right arguments
        try {
            await mutate({variables: {user: {username, password}}})
            await signIn({username, password})
            return result
        } catch (e) {
            console.log(e)
        }
    };

    return [signUp, result];
};

export default useSignUp;
