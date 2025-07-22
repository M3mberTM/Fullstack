import {useMutation} from "@apollo/client";
import {CREATE_REVIEW} from "../graphql/mutations";
import {useApolloClient} from "@apollo/client";

const useReview = () => {

    const [mutate, result] = useMutation(CREATE_REVIEW);
    const client = useApolloClient()

    const createReview = async (owner, repository, rating, review) => {
        try {
            await mutate({variables: {review: {text: review, rating: parseInt(rating), ownerName: owner, repositoryName: repository}}})
            await client.resetStore()
            return result
        } catch (e) {
           console.log(e)
        }
    }

    return [createReview, result]
}

export default useReview;