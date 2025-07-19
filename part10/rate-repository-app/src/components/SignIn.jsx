import Text from './typography/Text';
import {Pressable, TextInput, View, StyleSheet} from "react-native";
import {Formik} from "formik";
import theme from '../theme'


const SignIn = () => {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.foreground,
            padding: 10
        },
        input: {
            width: '100%',
            marginBottom: 10,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            borderRadius: 5,
            borderColor: theme.colors.background,
            borderWidth: 1,
            borderStyle: 'solid'
        },
        button: {
            backgroundColor: theme.colors.highlight,
            width: '100%',
            borderRadius: 5,
            paddingTop: 10,
            paddingBottom: 10,
            alignItems: 'center'
        }
    });

    const initialValues = {
        username: '',
        password: ''
    }

    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleChange, handleSubmit, values }) => (
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={values.username}
                        onChangeText={handleChange('username')}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        secureTextEntry
                    />
                    <Pressable onPress={() => handleSubmit()} style={styles.button}>
                        <Text color={'heading'} fontWeight={'bold'} fontSize={'subheading'}>Sign in</Text>
                    </Pressable>
                </View>
            )}
        </Formik>
    );
};

export default SignIn;
