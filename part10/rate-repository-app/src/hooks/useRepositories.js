import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (filterVal, searchVal) => {
  let variables
  switch(filterVal) {
    case 'createdAt':
      variables = {orderBy: 'CREATED_AT', orderDirection: 'DESC'}
      break
    case 'ratingAsc':
      variables = {orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'}
      break
    case 'ratingDesc':
      variables = {orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'}
      break
    default:
      variables = {}
      break
  }
  if (searchVal.length > 1) {
    variables = {...variables, searchKeyword: searchVal}
  }

  const {data, loading} = useQuery(GET_REPOSITORIES, {fetchPolicy: 'cache-and-network', variables})
  const repositories = loading ? undefined : data.repositories
  return {repositories, loading}
};

export default useRepositories;