import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 5,
    backgroundColor: theme.colors.primary,
    paddingLeft: 10,
    paddingBottom: 15,
    flexDirection: 'row'
  },
  // ...
});

const AppBar = () => {
  return <View style={styles.container}>
    <AppBarTab title={'Repositories'} link={'/'}/>
    <AppBarTab title={'Sign In'} link={'/signin'}/>
  </View>;
};

export default AppBar;