import Text from './typography/Text';
import {Pressable, TextInput, View, StyleSheet} from "react-native";
import {Formik} from "formik";
import theme from '../theme'
import * as yup from 'yup'
import useSignIn from "../hooks/useSignIn";
import {useNavigate} from "react-router-native";


const SignIn = () => {
    const [signIn] = useSignIn()
    const navigate = useNavigate()

    const validationSchema = yup.object().shape({
        username: yup.string().min(3, 'Username must be longer than 2 characters').required('Username is required'),
        password: yup.string().min(5, 'Password must be longer than 4 characters').required('Password is required')
    });

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.foreground,
            padding: 10
        },
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
        button: {
            backgroundColor: theme.colors.highlight,
            width: '100%',
            borderRadius: 5,
            paddingTop: 10,
            paddingBottom: 10,
            alignItems: 'center'
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

    const initialValues = {
        username: '',
        password: ''
    }

    const onSubmit = async (values) => {
        const {username, password} = values
        try {
            const { data } = await signIn({ username, password });
            console.log('Signing in: ', data);
            navigate('/')
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleChange, handleSubmit, handleBlur, values, errors, touched}) => (
                <View style={styles.container}>
                    <View style={styles.inputView}>
                        <TextInput
                            style={errors.username && touched.username ? styles.errorInput: styles.input}
                            placeholder="Username"
                            value={values.username}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                        />
                        {errors.username && touched.username && (
                            <Text style={{color: theme.colors.error}}>{errors.username}</Text>
                        )}
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={errors.password && touched.password? styles.errorInput : styles.input}
                            placeholder="Password"
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            secureTextEntry
                        />
                        {errors.password && touched.password && (
                            <Text style={{color: theme.colors.error}}>{errors.password}</Text>
                        )}
                    </View>
                    <Pressable onPress={errors.password && errors.username ? undefined : handleSubmit} style={styles.button}>
                        <Text color={'heading'} fontWeight={'bold'} fontSize={'subheading'}>Sign in</Text>
                    </Pressable>
                </View>
            )}
        </Formik>
    );
};

export default SignIn;
