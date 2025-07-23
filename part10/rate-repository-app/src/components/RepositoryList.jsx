import { View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import Text from "./typography/Text";
import RepositoryListContainer from "./RepositoryListContainer";
import {useState} from "react";

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
    },
    loadingText: {
        alignItems: 'center'
    }
});


const RepositoryList = () => {
    const [filterVal, setFilterVal] = useState('createdAt')
    const { repositories, loading } = useRepositories(filterVal);

    if (loading) {
        return <View style={[styles.container, styles.loadingText]}>
            <Text fontSize={'subheading'} fontWeight={'bold'}>Loading repositories...</Text>
        </View>
    }


    return (
        <RepositoryListContainer repositories={repositories} setFilterValue={setFilterVal} filterValue={filterVal}/>
    );
};

export default RepositoryList;
