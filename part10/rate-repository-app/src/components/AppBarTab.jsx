import {Pressable, StyleSheet} from "react-native";
import Text from "./typography/Text";
import {Link} from "react-router-native";

const AppBarTab = ({title, link}) => {

    const styles = StyleSheet.create({
        container: {
            paddingLeft: 4,
            paddingRight: 4
        },
    });

    return (
        <Pressable style={styles.container}>
            <Link to={link}>
                <Text color={'heading'} fontWeight={'bold'} fontSize={'subheading'}>{title}</Text>
            </Link>
        </Pressable>
    )
}

export default AppBarTab