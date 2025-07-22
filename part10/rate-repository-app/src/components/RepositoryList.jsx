import { View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import Text from "./typography/Text";
import RepositoryListContainer from "./RepositoryListContainer";

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
    },
    loadingText: {
        alignItems: 'center'
    }
});


const RepositoryList = () => {
    const { repositories, loading } = useRepositories();

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
