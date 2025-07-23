import {View, FlatList, StyleSheet} from "react-native";
import Text from "./typography/Text";
import {useQuery} from "@apollo/client";
import {ME} from "../graphql/queries";
import RepositoryReview from "./RepositoryReview";
import theme from '../theme'
import {useNavigate} from "react-router-native";


const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.foreground,
        padding: 10,
        display: 'flex'
    },
    loadingText: {
        alignItems: 'center',
        marginTop: 5
    },
    separator: {
        height: 10
    },
    main: {
        flex: 1
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {

    const {data, loading} = useQuery(ME, {fetchPolicy: 'cache-and-network', variables: {includeReviews: true}})
    if (loading) {
        return <View style={styles.loadingText}>
            <Text>Loading...</Text>
        </View>
    }

    if (!data.me) {
        return <View style={styles.loadingText}>
            <Text>No user</Text>
        </View>
    }

    const reviews = data ? data.me.reviews : undefined
    const reviewNodes = reviews
        ? reviews.edges.map(edge => edge.node)
        : [];

    return <View style={styles.main}>
        <FlatList data={reviewNodes} renderItem={(item) => <RepositoryReview review={item} showRepoName={true}/>} ItemSeparatorComponent={ItemSeparator}/>
    </View>
}

export default MyReviews