import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import {useQuery} from "@apollo/client";
import {ME} from '../graphql/queries'
import SignOutTab from "./SignOutTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 5,
    backgroundColor: theme.colors.primary,
    paddingLeft: 10,
    paddingBottom: 15,
    flexDirection: 'row'
  },
});

const AppBar = () => {

  const {data, loading} = useQuery(ME, {fetchPolicy: 'cache-and-network'})

  return <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab title={'Repositories'} link={'/'}/>
      <AppBarTab title={'Create a Review'} link={'/review'}/>
      <AppBarTab title={'Sign Up'} link={'/signup'}/>
      {!data || !data.me &&
          <AppBarTab title={'Sign In'} link={'/signin'}/>
      }
      {data && data.me &&
          <SignOutTab/>
      }
    </ScrollView>
  </View>;
};

export default AppBar;