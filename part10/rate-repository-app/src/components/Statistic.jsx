import {View, StyleSheet} from "react-native";
import Text from './typography/Text'

const Statistic = ({amount, title}) => {

    const shownAmount = amount >= 1000 ? `${Math.floor(amount/100)/10}k` : amount
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'column',
            alignItems: 'center'
        }
    });

    return <View style={styles.container}>
        <Text fontWeight={'bold'} fontSize={'subheading'}>{shownAmount}</Text>
        <Text color={'textSecondary'}>{title}</Text>
    </View>
}

export default Statistic