import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (config) => {
    const {id, first} = config
    const {data, loading, fetchMore} = useQuery(GET_REPOSITORY, {fetchPolicy: 'cache-and-network', variables: {repositoryId: id, first}})
    const loadedData = loading ? undefined : data
    const repository = loadedData ? data.repository : undefined

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...config,
            },
        });
    };
    return {repository, loading, fetchMore: handleFetchMore}
};

export default useRepository;
