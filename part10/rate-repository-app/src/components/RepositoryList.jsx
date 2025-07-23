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

    const {repositories, loading} = useRepositories(filterVal, debouncedSearch);

    if (loading) {
        return <View style={[styles.container, styles.loadingText]}>
            <Text fontSize={'subheading'} fontWeight={'bold'}>Loading repositories...</Text>
        </View>
    }


    return (
        <RepositoryListContainer repositories={repositories} setFilterValue={setFilterVal} filterValue={filterVal} setSearchVal={setSearchVal}
                                 searchVal={searchVal}/>
    );
};

export default RepositoryList;
