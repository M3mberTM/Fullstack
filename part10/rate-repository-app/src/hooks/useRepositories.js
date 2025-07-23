import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (config) => {
  const {filterVal, searchVal} = config
  let variables = {first: config.first}
  switch(filterVal) {
    case 'createdAt':
      variables = {...variables, orderBy: 'CREATED_AT', orderDirection: 'DESC'}
      break
    case 'ratingAsc':
      variables = {...variables, orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'}
      break
    case 'ratingDesc':
      variables = {...variables, orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'}
      break
    default:
      variables = {}
      break
  }
  if (searchVal.length > 1) {
    variables = {...variables, searchKeyword: searchVal}
  }

  const {data, loading, fetchMore} = useQuery(GET_REPOSITORIES, {fetchPolicy: 'cache-and-network', variables})
  const repositories = loading ? undefined : data.repositories

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };
  return {repositories, loading, fetchMore: handleFetchMore}
};

export default useRepositories;