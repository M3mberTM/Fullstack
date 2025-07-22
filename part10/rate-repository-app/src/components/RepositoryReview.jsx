import {View, StyleSheet} from "react-native";
import Text from './typography/Text'
import theme from '../theme'


const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.foreground,
        padding: 10,
        flexDirection: 'row'
    },
    rating: {
        width: 40,
        height: 40,
        borderColor: theme.colors.highlight,
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ratingInfo: {
        marginLeft: 10,
        flexShrink: 1
    }
})

const RepositoryReview = ({review}) => {

    const reviewItem = review.item
    const createdAt = new Date(reviewItem.createdAt).toLocaleDateString()
    const username = reviewItem.user.username
    return <View style={styles.container}>
        <View style={styles.rating}>
            <Text fontWeight={'bold'} style={{color: theme.colors.highlight}}>{reviewItem.rating}</Text>
        </View>
        <View style={styles.ratingInfo}>
            <Text fontWeight={'bold'}>{username}</Text>
            <Text color={'textSecondary'}>{createdAt}</Text>
            <Text>{reviewItem.text}</Text>
        </View>
    </View>
}

export default RepositoryReview