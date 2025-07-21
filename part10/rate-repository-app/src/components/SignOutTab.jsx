import {Pressable, StyleSheet} from "react-native";
import Text from "./typography/Text";
import useSignOut from "../hooks/useSignOut";

const SignOutTab = () => {
    const [signOut] = useSignOut()
    const styles = StyleSheet.create({
        container: {
            paddingLeft: 4,
            paddingRight: 4,
        },
    });

    const handleSignout = async () => {
        console.log('signing out')
        await signOut()
    }

    return (
        <Pressable style={styles.container} onPress={handleSignout}>
            <Text color={'heading'} fontWeight={'bold'} fontSize={'subheading'}>Sign Out</Text>
        </Pressable>
    )
}

export default SignOutTab
