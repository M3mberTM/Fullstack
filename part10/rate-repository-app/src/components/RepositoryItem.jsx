import PropTypes from 'prop-types';
import {View, StyleSheet, Image, Pressable} from "react-native";
import Text from './typography/Text';
import theme from '../theme'
import Statistic from "./Statistic";
import {useNavigate} from "react-router-native";


const RepositoryItem = ({item}) => {

    const navigate = useNavigate()
    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.foreground,
            borderRadius: 10,
            marginLeft: 7,
            marginRight: 7,
            padding: 10,
            display: 'flex'
        },
        logo: {
            width: 40,
            height: 40,
            borderRadius: 5
        },
        repositoryInformation: {
            flexDirection: 'row'
        },
        basicInformation: {
            paddingLeft: 10,
            flexShrink: 1
        },
        codingLanguage: {
            borderRadius: 5,
            marginTop: 5,
            backgroundColor: theme.colors.highlight,
            padding: 3,
            paddingLeft: 5,
            paddingRight: 5,
            alignSelf: 'flex-start'
        },
        statistics: {
            marginTop: 5,
            flexDirection: 'row',
            justifyContent: 'space-around'
        }
    });
    const repository = item.item

    return <View testID={'repositoryItem'} style={styles.container}>
        <Pressable onPress={() => navigate(`/${repository.id}`)}>
            <View style={styles.repositoryInformation}>
                <Image style={styles.logo} source={{uri: repository.ownerAvatarUrl}}/>
                <View style={styles.basicInformation} testID={'repositoryInformation'}>
                    <Text fontSize={'subheading'} fontWeight={'bold'}>{repository.fullName}</Text>
                    <Text color={'textSecondary'}>{repository.description}</Text>

                    <View style={styles.codingLanguage}>
                        <Text style={{color: 'white'}} fontWeight={'bold'}>{repository.language}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.statistics}>
                <Statistic title={'Stars'} amount={repository.stargazersCount}/>
                <Statistic title={'Forks'} amount={repository.forksCount}/>
                <Statistic title={'Reviews'} amount={repository.reviewCount}/>
                <Statistic title={'Rating'} amount={repository.ratingAverage}/>
            </View>
        </Pressable>
    </View>

}

RepositoryItem.propTypes = {
    item: PropTypes.object
}

export default RepositoryItem