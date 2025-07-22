import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
    const {data, loading} = useQuery(GET_REPOSITORY, {fetchPolicy: 'cache-and-network', variables: {repositoryId: id}})
    const loadedData = loading ? undefined : data
    const repository = loadedData ? data.repository : undefined
    return {repository, loading}
};

export default useRepository;
