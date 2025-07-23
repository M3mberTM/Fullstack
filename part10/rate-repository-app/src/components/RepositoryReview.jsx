import {View, StyleSheet, Pressable, Alert} from "react-native";
import Text from './typography/Text'
import theme from '../theme'
import {useNavigate} from "react-router-native";
import {useMutation} from "@apollo/client";
import {DELETE_REVIEW} from "../graphql/mutations";
import {useApolloClient} from "@apollo/client";


const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.foreground,
        padding: 10,
    },
    reviewInfo: {
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
    },
    reviewControls: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    button: {
        padding: 7,
        margin: 7,
        borderRadius: 3
    },
    removeButton: {
        backgroundColor: theme.colors.error
    },
    viewRepoButton: {
        backgroundColor: theme.colors.highlight
    }
})

const RepositoryReview = ({review, showRepoName}) => {
    const navigate = useNavigate()
    const reviewItem = review.item
    const createdAt = new Date(reviewItem.createdAt).toLocaleDateString()
    const name = showRepoName ? reviewItem.repository.fullName : reviewItem.user.username
    const client = useApolloClient()
    const [deleteReview] = useMutation(DELETE_REVIEW)

    const handleRemove = () => {
        Alert.alert('Warning', 'Do you want to delete the current review?', [
            {text: 'Cancel', onPress: () => console.log('Cancelled'), style: 'cancel'},
            {text: 'Ok', onPress: () => removeReview()}
        ])
    }

    const removeReview = async () => {
        const result = await deleteReview({variables: {deleteReviewId: reviewItem.id}})
        if (!result.data.deleteReview) {
            console.log('Something went wrong')
        }
        await client.resetStore()
    }

    const handleNavigate = () => {
        navigate(`/${reviewItem.repositoryId}`)
    }


    return <View style={styles.container}>
        <View style={styles.reviewInfo}>
            <View style={styles.rating}>
                <Text fontWeight={'bold'} style={{color: theme.colors.highlight}}>{reviewItem.rating}</Text>
            </View>
            <View style={styles.ratingInfo}>
                <Text fontWeight={'bold'}>{name}</Text>
                <Text color={'textSecondary'}>{createdAt}</Text>
                {reviewItem.text &&
                    <Text>{reviewItem.text}</Text>
                }
            </View>
        </View>
        {showRepoName &&
            <View style={styles.reviewControls}>
                <Pressable style={[styles.button, styles.viewRepoButton]} onPress={handleNavigate}>
                    <Text fontSize={'subheading'} fontWeight={'bold'} color={'foreground'}>View Repository</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.removeButton]} onPress={handleRemove}>
                    <Text fontSize={'subheading'} fontWeight={'bold'} color={'foreground'}>Delete Review</Text>
                </Pressable>
            </View>
        }
    </View>
}

export default RepositoryReview