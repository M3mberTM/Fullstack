import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from "./RepositoryItem";
import useRepositories from '../hooks/useRepositories';
import Text from "./typography/Text";

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    container: {
        marginTop: 5,
    },
    loadingText: {
        alignItems: 'center'
    }
});


const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
    const { repositories, loading } = useRepositories();

    // Get the nodes from the edges array
    const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];

    if (loading) {
        return <View style={[styles.container, styles.loadingText]}>
            <Text fontSize={'subheading'} fontWeight={'bold'}>Loading repositories...</Text>
        </View>
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={(item) => <RepositoryItem item={item}/>}
            />
        </View>
    );
};

export default RepositoryList;
