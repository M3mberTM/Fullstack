import { FlatList, View, StyleSheet, ScrollView } from 'react-native';
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    container: {
        marginTop: 5,
        flex: 1
    },
    loadingText: {
        alignItems: 'center'
    },
});

const ItemSeparator = () => <View style={styles.separator} />;
const RepositoryListContainer = ({repositories}) => {

    // Get the nodes from the edges array
    const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];


    return (
        <View style={styles.container}>
                <FlatList
                    data={repositoryNodes}
                    ItemSeparatorComponent={ItemSeparator}
                    renderItem={(item) => <RepositoryItem item={item}/>}
                />
        </View>
    );
}

export default RepositoryListContainer