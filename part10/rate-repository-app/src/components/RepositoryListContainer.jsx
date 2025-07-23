import {FlatList, View, StyleSheet} from 'react-native';
import RepositoryItem from "./RepositoryItem";
import RepositoryFilter from "./RepositoryFilter";
import React from "react";

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

const ItemSeparator = () => <View style={styles.separator}/>;

class RepositoryListContainer extends React.Component {
    renderHeader = () => {
        const props = this.props

        return (
            <RepositoryFilter filterVal={props.filterValue} setFilterVal={props.setFilterValue} searchVal={props.searchVal}
                                                             setSearchVal={props.setSearchVal}/>
        )
    }


    render() {
        const props = this.props
        // Get the nodes from the edges array
        const repositoryNodes = props.repositories
            ? props.repositories.edges.map(edge => edge.node)
            : [];
        return (
            <View style={styles.container}>
                <FlatList
                    data={repositoryNodes}
                    ItemSeparatorComponent={ItemSeparator}
                    renderItem={(item) => <RepositoryItem item={item}/>}
                    ListHeaderComponent={this.renderHeader}
                />
            </View>
        );
}
}

export default RepositoryListContainer