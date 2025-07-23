import Text from "./typography/Text";
import {Pressable, View, StyleSheet, Image, FlatList, ScrollView} from "react-native";
import useRepository from "../hooks/useRepository";
import Statistic from "./Statistic";
import theme from '../theme'
import {useParams} from "react-router-native";
import * as Linking from 'expo-linking';
import RepositoryReview from "./RepositoryReview";

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.foreground,
        padding: 10,
        display: 'flex'
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 5,
        alignSelf: 'center'
    },
    repositoryInformation: {
        marginTop: 5,
        flexDirection: 'row'
    },
    basicInformation: {
        flexShrink: 1,
        alignItems: 'center',
        width: '100%'
    },
    codingLanguage: {
        borderRadius: 5,
        marginTop: 5,
        backgroundColor: theme.colors.highlight,
        padding: 3,
        paddingLeft: 5,
        paddingRight: 5,
        alignSelf: 'center'
    },
    statistics: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    statisticsText: {
        marginTop: 10,
        alignSelf: 'center'
    },
    loadingText: {
        alignItems: 'center',
        marginTop: 5
    },
    openButton: {
        marginTop: 10,
        marginLeft: 7,
        marginRight: 7,
        backgroundColor: theme.colors.highlight,
        padding: 10,
        alignItems: 'center',
        borderRadius: 7
    },
    separator: {
        height: 10
    },
    reviews: {
        marginTop: 10
    },
    main: {
        flex: 1
    }
});


const ItemSeparator = () => <View style={styles.separator}/>;

const RepositoryInformation = () => {
    const {id} = useParams()
    const {repository, loading, fetchMore} = useRepository({id, first: 4});

    if (loading) {
        return <View style={styles.loadingText}>
            <Text fontSize={'subheading'} fontWeight={'bold'}>Loading Repository Information...</Text>
        </View>
    }

    if (!repository) {
        return <View style={styles.loadingText}>
            <Text fontSize={'subheading'} fontWeight={'bold'}>Something went wrong</Text>
        </View>
    }

    const reviewNodes = repository.reviews
        ? repository.reviews.edges.map(edge => edge.node)
        : [];

    const handleOpenLink = async () => {
        await Linking.openURL(repository.url)
    }

    const onEndReach = () => {
        fetchMore()
    }

    return <View style={styles.main}>
        <View style={styles.container}>
            <Image style={styles.logo} source={{uri: repository.ownerAvatarUrl}}/>
            <View style={styles.repositoryInformation}>
                <View style={styles.basicInformation} testID={'repositoryInformation'}>
                    <Text fontSize={'heading'} fontWeight={'bold'}>{repository.fullName}</Text>
                    <Text color={'textSecondary'}>{repository.description}</Text>
                    <View style={styles.codingLanguage}>
                        <Text style={{color: 'white'}} fontWeight={'bold'}>{repository.language}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.statisticsText}>
                <Text fontSize={'heading'} fontWeight={'bold'}>Statistics</Text>
            </View>
            <View style={styles.statistics}>
                <Statistic title={'Stars'} amount={repository.stargazersCount}/>
                <Statistic title={'Forks'} amount={repository.forksCount}/>
                <Statistic title={'Reviews'} amount={repository.reviewCount}/>
                <Statistic title={'Rating'} amount={repository.ratingAverage}/>
            </View>
            <Pressable style={styles.openButton} onPress={handleOpenLink}>
                <Text style={{color: 'white'}} fontWeight={'bold'}>Open on Github</Text>
            </Pressable>
        </View>
        <FlatList style={styles.reviews} data={reviewNodes} renderItem={(item) => <RepositoryReview review={item} showRepoName={false}/>}
                  ItemSeparatorComponent={ItemSeparator} onEndReached={onEndReach} onEndReachedThreshold={0.5}/>
    </View>
}

export default RepositoryInformation