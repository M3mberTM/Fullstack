import {StyleSheet, TextInput, View} from "react-native";
import theme from '../../theme'
import Text from './Text'

const styles = StyleSheet.create({
    input: {
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
        borderColor: theme.colors.background,
        borderWidth: 1,
        borderStyle: 'solid'
    },
    errorInput: {
        width: '100%',
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.colors.error
    },
    inputView: {
        marginBottom: 10
    }
});
const Input = ({placeholder, touched, error, value, handler, handleChange, handleBlur, multiline, secure}) => {

    return <View style={styles.inputView}>
        <TextInput
            style={error && touched ? styles.errorInput: styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={handleChange(handler)}
            onBlur={handleBlur(handler)}
            multiline={multiline}
            secureTextEntry={secure}
        />
        {error && touched && (
            <Text style={{color: theme.colors.error}}>{error}</Text>
        )}
    </View>
}

export default Input