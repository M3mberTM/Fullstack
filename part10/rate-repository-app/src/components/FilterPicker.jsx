import {Picker} from "@react-native-picker/picker";
const FilterPicker = ({value, setValue}) => {

    return <Picker selectedValue={value} onValueChange={(itemValue) => setValue(itemValue)}>
        <Picker.Item label={'Latest repositories'} value={'createdAt'}/>
        <Picker.Item label={'Highest Rating'} value={'ratingDesc'}/>
        <Picker.Item label={'Lowest Rating'} value={'ratingAsc'}/>
    </Picker>
}

export default FilterPicker;