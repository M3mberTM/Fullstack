import { View, StyleSheet } from 'react-native';
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import theme from '../theme'

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
            <RepositoryList/>
        </View>
    );
};

export default Main;
