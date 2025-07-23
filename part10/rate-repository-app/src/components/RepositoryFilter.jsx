import {Picker} from "@react-native-picker/picker";
import {View} from "react-native";
import {Searchbar} from "react-native-paper";

const RepositoryFilter = ({filterVal, setFilterVal, searchVal, setSearchVal}) => {

    return <View>
        <Searchbar placeholder={'Search'} value={searchVal} onChangeText={setSearchVal}/>
        <Picker selectedValue={filterVal} onValueChange={(itemValue) => setFilterVal(itemValue)}>
            <Picker.Item label={'Latest repositories'} value={'createdAt'}/>
            <Picker.Item label={'Highest Rating'} value={'ratingDesc'}/>
            <Picker.Item label={'Lowest Rating'} value={'ratingAsc'}/>
        </Picker>
    </View>
}

export default RepositoryFilter;