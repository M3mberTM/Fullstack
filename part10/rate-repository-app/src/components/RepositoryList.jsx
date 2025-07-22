import { View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import Text from "./typography/Text";
import RepositoryListContainer from "./RepositoryListContainer";

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

    if (loading) {
        return <View style={[styles.container, styles.loadingText]}>
            <Text fontSize={'subheading'} fontWeight={'bold'}>Loading repositories...</Text>
        </View>
    }


    return (
        <RepositoryListContainer repositories={repositories}/>
    );
};

export default RepositoryList;
