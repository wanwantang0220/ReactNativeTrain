import React, {Component} from 'react';
import {Text, ScrollView, StyleSheet, Dimensions, View, TouchableOpacity} from 'react-native';
import ScrollableTab from "../components/ScrollableTab";

const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;

export default class ScrollableTabPage extends Component {


    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            titleItem: ['页面一', '页面二', '页面三']
        };

    }

    render() {
        const titleItem = this.state.titleItem;
        return (
            <View style={styles.container}>
                <ScrollableTab>
                    {titleItem.map((item, index) => {
                        return (
                            <Text tabLabel={item} key={item + index} style={{width: screenW, flex: 1,}}>
                                {item}
                            </Text>
                        )
                    })}
                </ScrollableTab>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: screenW,
        flex: 1,
        marginTop: 22,
    },
    scrollStyle: {
        flex: 1,
    },
    tabContainer: {
        width: screenW,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    tabStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});