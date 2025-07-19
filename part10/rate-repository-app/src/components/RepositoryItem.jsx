import PropTypes from 'prop-types'
import {Text, View} from "react-native";

const RepositoryItem = ({item}) => {

    const repository = item.item

    return <View>
        <Text>Full name: {repository.fullName}</Text>
        <Text>Description: {repository.description}</Text>
        <Text>Language: {repository.language}</Text>
        <Text>Forks: {repository.forksCount} </Text>
        <Text>Stars: {repository.stargazersCount}</Text>
        <Text>Average rating: {repository.ratingAverage}</Text>
        <Text>Reviews: {repository.reviewCount}</Text>
    </View>

}

RepositoryItem.propTypes = {
    item: PropTypes.object
}

export default RepositoryItem