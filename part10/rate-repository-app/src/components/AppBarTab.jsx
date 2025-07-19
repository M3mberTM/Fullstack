import {Pressable, StyleSheet} from "react-native";
import Text from "./typography/Text";

const AppBarTab = ({title}) => {

    const styles = StyleSheet.create({
        container: {
            paddingLeft: 4,
            paddingRight: 4
        },
    });

    return (
    <Pressable style={styles.container}>
        <Text color={'heading'} fontWeight={'bold'} fontSize={'subheading'}>{title}</Text>
    </Pressable>
    )
}

export default AppBarTab