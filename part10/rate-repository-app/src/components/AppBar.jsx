import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 5,
    backgroundColor: theme.colors.primary,
    paddingLeft: 10,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  // ...
});

const AppBar = () => {
  return <View style={styles.container}>
    <AppBarTab title={'Repositories'}/>
    <AppBarTab title={'Something'}/>
  </View>;
};

export default AppBar;