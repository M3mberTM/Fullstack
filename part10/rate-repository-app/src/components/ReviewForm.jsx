import Text from './typography/Text';
import {Pressable, TextInput, View, StyleSheet} from "react-native";
import {Formik} from "formik";
import theme from '../theme'
import * as yup from 'yup'
import Input from "./typography/Input";
import useReview from "../hooks/useReview";

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
    owner: '',
    repository: '',
    rating: '',
    review: ''
}

const validationSchema = yup.object().shape({
    owner: yup.string().required('Owner is required'),
    repository: yup.string().required('Repository is required'),
    rating: yup.number().integer().min(0, 'Number must be larger than 0').max(100, 'Number must be lower than 101').required('Rating is required'),
    review: yup.string()
});
const ReviewForm = () => {

    const [createReview] = useReview()

    const onSubmit = async (values) => {
        console.log(values)
        const {owner, repository, rating, review} = values
        await createReview(owner,repository, rating, review)
    }

    return <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({handleChange, handleSubmit, handleBlur, values, errors, touched}) => (
            <View style={styles.container}>
                <Input placeholder={'Repository owner'} value={values.owner} error={errors.owner} touched={touched.owner} handleBlur={handleBlur}
                       handleChange={handleChange} handler={'owner'}/>
                <Input placeholder={'Repository name'} value={values.repository} error={errors.repository} touched={touched.repository} handleBlur={handleBlur}
                       handleChange={handleChange} handler={'repository'}/>
                <Input placeholder={'Rating'} value={values.rating} error={errors.rating} touched={touched.rating} handleBlur={handleBlur}
                       handleChange={handleChange} handler={'rating'}/>
                <Input placeholder={'Review'} value={values.review} error={errors.review} touched={touched.review} handleBlur={handleBlur}
                       handleChange={handleChange} handler={'review'} multiline/>
                <Pressable onPress={errors.repository && errors.owner ? undefined : handleSubmit} style={styles.button}>
                    <Text color={'heading'} fontWeight={'bold'} fontSize={'subheading'}>Create a Review</Text>
                </Pressable>
            </View>
        )}
    </Formik>

}

export default ReviewForm