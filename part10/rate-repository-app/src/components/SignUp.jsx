import Text from './typography/Text';
import {Pressable, View, StyleSheet} from "react-native";
import {Formik} from "formik";
import theme from '../theme'
import * as yup from 'yup'
import Input from "./typography/Input";
import useSignUp from "../hooks/useSignUp";
import {useNavigate} from "react-router-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.foreground,
        padding: 10
    },
    button: {
        backgroundColor: theme.colors.highlight,
        width: '100%',
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center'
    },
});

const initialValues = {
    username: '',
    password: '',
    passwordRepeat: '',
}

const validationSchema = yup.object().shape({
    username: yup.string().min(5, 'Username must be longer than 4').max(30, 'Username must be shorter than 31').required('Username is required'),
    password: yup.string().min(5, 'Password must be longer than 4').max(30, 'Password must be shorter than 31').required('Password is required'),
    passwordRepeat: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('You must repeat your password')
});
const SignUp = () => {
    const navigate = useNavigate()
    const [signUp] = useSignUp()
    const onSubmit = async (values) => {
        console.log('Sign up vals: ', values)
        const {username, password} = values
        await signUp(username, password)
        navigate('/')
    }

    return <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({handleChange, handleSubmit, handleBlur, values, errors, touched}) => (
            <View style={styles.container}>
                <Input placeholder={'Username'} value={values.username} error={errors.username} touched={touched.username} handleBlur={handleBlur}
                       handleChange={handleChange} handler={'username'}/>
                <Input placeholder={'Password'} value={values.password} error={errors.password} touched={touched.password} handleBlur={handleBlur}
                       handleChange={handleChange} handler={'password'} secure/>
                <Input placeholder={'Repeat Password'} value={values.passwordRepeat} error={errors.passwordRepeat} touched={touched.passwordRepeat}
                       handleBlur={handleBlur}
                       handleChange={handleChange} handler={'passwordRepeat'} secure/>
                <Pressable onPress={errors.password && errors.username ? undefined : handleSubmit} style={styles.button}>
                    <Text color={'heading'} fontWeight={'bold'} fontSize={'subheading'}>Sign Up</Text>
                </Pressable>
            </View>
        )}
    </Formik>

}

export default SignUp
