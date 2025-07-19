import { View, StyleSheet } from 'react-native';
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { Route, Routes, Navigate } from 'react-router-native';
import theme from '../theme'
import SignIn from "./SignIn";

const Main = () => {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.background,
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        },
    });

    return (
        <View style={styles.container}>
            <AppBar/>
            <Routes>
                <Route path={'/'} element={<RepositoryList/>}/>
                <Route path={'/signin'} element={<SignIn/>}/>
                <Route path={'*'} element={<Navigate to={'/'} replace/>}/>
            </Routes>
        </View>
    );
};

export default Main;
