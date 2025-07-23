import {Picker} from "@react-native-picker/picker";
import {View, StyleSheet} from "react-native";
import {Searchbar} from "react-native-paper";
import theme from "../theme";


const styles = StyleSheet.create({
    searchBar: {
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: theme.colors.foreground,
        height: 50
    }
});

const RepositoryFilter = ({filterVal, setFilterVal, searchVal, setSearchVal}) => {

    return <View>
        <Searchbar placeholder={'Search'} value={searchVal} onChangeText={setSearchVal} mode={'view'} style={styles.searchBar} inputStyle={{minHeight: 0}}/>
        <Picker selectedValue={filterVal} onValueChange={(itemValue) => setFilterVal(itemValue)}>
            <Picker.Item label={'Latest repositories'} value={'createdAt'}/>
            <Picker.Item label={'Highest Rating'} value={'ratingDesc'}/>
            <Picker.Item label={'Lowest Rating'} value={'ratingAsc'}/>
        </Picker>
    </View>
}

export default RepositoryFilter;