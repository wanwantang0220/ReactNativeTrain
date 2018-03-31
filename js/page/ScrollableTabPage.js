import React, {Component} from 'react';
import {Text, ScrollView, StyleSheet, Dimensions, View, TouchableOpacity} from 'react-native';
import ScrollableTab from "../components/ScrollableTab";
import HomeTab from "../components/HomeTab";

const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;

export default class ScrollableTabPage extends Component {


    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            titleItem: ['First', 'Second', 'Third']
        };

    }

    render() {
        const titleItem = this.state.titleItem;
        return (
            <ScrollableTab>
                {titleItem.map((item, index) => {
                    return (
                       <HomeTab tabLabel={item} key={index} tabTag={item}/>
                    )
                })}
            </ScrollableTab>
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