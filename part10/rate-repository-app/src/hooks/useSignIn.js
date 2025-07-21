import {AUTHENTICATE} from "../graphql/mutations";
import {useMutation} from "@apollo/client";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
      await mutate({variables: {credentials: {username, password}}})
      return result
  };

  return [signIn, result];
};

export default useSignIn;