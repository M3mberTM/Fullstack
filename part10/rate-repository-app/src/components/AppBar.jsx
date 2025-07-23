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
  tabGroup: {
    flexDirection: 'row'
  },
});

const AppBar = () => {

  const {data, loading} = useQuery(ME, {fetchPolicy: 'cache-and-network'})

  return <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab title={'Repositories'} link={'/'}/>
      {!data || !data.me &&
          <View style={styles.tabGroup}>
            <AppBarTab title={'Sign Up'} link={'/signup'}/>
            <AppBarTab title={'Sign In'} link={'/signin'}/>
          </View>
      }
      {data && data.me &&
          <View style={styles.tabGroup}>
            <AppBarTab title={'Create a Review'} link={'/review'}/>
            <AppBarTab title={'My Reviews'} link={'/myreviews'}/>
            <SignOutTab/>
          </View>
      }
    </ScrollView>
  </View>;
};

export default AppBar;