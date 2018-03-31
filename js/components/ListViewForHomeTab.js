import React, {Component} from 'react';
import ReactNative, {
    Text,
    View,
    StyleSheet,
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback,
    ListView,
    Image,
    PixelRatio,
    Alert
} from 'react-native';
import px2dp from '../util/px2dp';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../config/theme';
import TextButton from "./TextButton";
import PropTypes from 'prop-types';

export default class ListViewForHomeTab extends Component {


    static propTypes = {
        refreshing: PropTypes.func
    };

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(this.props.dataBlob)
        };
    }


    render() {
        return (
            <ListView
                style={styles.listView}
                dataSource={this.state.dataSource}
                renderRow={this.renderItem.bind(this)}/>

        )
    }


    renderItem(rowData, sectionID, rowID, highlightRow) {
        return (
            <View style={styles.items}>
                <View style={styles.userBar}>
                    <View style={{flex: 12}}>
                        <Image style={styles.avatar} source={{uri: rowData.img}}/>
                    </View>
                    <View style={{flex: 90, marginLeft: px2dp(15)}}>
                        <TextButton
                            text={rowData.title}
                            onPress={this.titleCallBack.bind(this, rowData)}
                            color='steelblue'
                            fontSize={px2dp(14)}/>
                        <Text style={{fontSize: px2dp(12), color: theme.grayColor,marginTop:10}}>
                            {rowData.desc}
                        </Text>
                        <View style={{marginTop: px2dp(3)}}>
                            <Text style={{fontSize: px2dp(11), color: theme.grayColor}} numberOfLines={1}>
                                {rowData.profile} @ {rowData.createdAt}
                            </Text>
                        </View>
                    </View>
                </View>

            </View>
        )

    }

    titleCallBack(rowData) {
        Alert.alert("title", rowData.title, [
            {
                text: 'OK', onPress: () => {
                    console.log('OK Pressed!')
                }
            }
        ]);
    }
}

const styles = StyleSheet.create({
    listView: {
        marginTop: px2dp(10)
    },
    items: {
        backgroundColor: '#fff',
        borderTopWidth: 1 / PixelRatio.get(),
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#c4c4c4',
        borderTopColor: '#e4e4e4',
        marginBottom: px2dp(1)
    },
    userBar: {
        padding: px2dp(10),
        flexDirection: 'row',
        width: theme.screenWidth
    },
    avatar: {
        width: px2dp(45),
        height: px2dp(70),
        borderRadius: 3,
        marginTop:5
    },
    content: {
        color: '#000',
        padding: px2dp(10)
    },
    linkView: {
        flexDirection: 'row',
        height: px2dp(60),
        width: theme.screenWidth - px2dp(20),
        borderWidth: 1 / PixelRatio.get(),
        borderColor: theme.grayColor,
        marginLeft: px2dp(10),
        marginRight: px2dp(10)
    },
    linkImage: {
        width: px2dp(59),
        height: px2dp(59),
        resizeMode: 'cover',
        backgroundColor: '#f4f4f4'
    },
    linkText: {
        fontSize: px2dp(16),
        color: '#000',
        fontWeight: 'bold'
    },
    banner: {
        width: theme.screenWidth,
        height: px2dp(120),
        resizeMode: 'cover',
        marginTop: px2dp(10),
    },
    bottom: {
        flexDirection: 'row',
        padding: px2dp(10),
        alignItems: 'center'
    },
    commentText: {
        marginRight: px2dp(25),
        marginLeft: px2dp(5)
    }
});
