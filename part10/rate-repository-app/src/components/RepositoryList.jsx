import {View, StyleSheet} from 'react-native';
import useRepositories from '../hooks/useRepositories';
import Text from "./typography/Text";
import RepositoryListContainer from "./RepositoryListContainer";
import {useState} from "react";
import {useDebounce} from "use-debounce";

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
    const [searchVal, setSearchVal] = useState('')
    const [debouncedSearch] = useDebounce(searchVal, 500)

    const {repositories, loading, fetchMore} = useRepositories({filterVal, searchVal: debouncedSearch, first: 8});

    if (loading) {
        return <View style={[styles.container, styles.loadingText]}>
            <Text fontSize={'subheading'} fontWeight={'bold'}>Loading repositories...</Text>
        </View>
    }

    const onEndReach = () => {
        console.log('End reached')
        fetchMore()
    }


    return (
        <RepositoryListContainer repositories={repositories} setFilterValue={setFilterVal} filterValue={filterVal} setSearchVal={setSearchVal}
                                 searchVal={searchVal} onEndReach={onEndReach}/>
    );
};

export default RepositoryList;
