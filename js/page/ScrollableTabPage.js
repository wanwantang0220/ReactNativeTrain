import React, {Component} from 'react';
import {Text, ScrollView, StyleSheet, Dimensions, View, TouchableOpacity} from 'react-native';
import ScrollableTab from "../components/ScrollableTab";
import HomeTab from "../components/HomeTab";

const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;

export default class ScrollableTabPage extends Component {

    static navigationOptions = {
        title: '首页',
        tabBarLabel: '首页',
        headerTitleStyle: {
            alignSelf: 'center'
        },
    };


    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            titleItem: [] //'First', 'Second', 'Third'
        };
        this.handleTabNames = this.handleTabNames.bind(this);
    }

    render() {
        const { navigate } = this.props.navigation;
        console.log("navigate1",navigate);
        return (
            <HomeTab navigator={navigate}/>

        )
    }

    /**
     <ScrollableTab>
     {titleItem.map((item, index) => {
         return (
             <HomeTab navigator={navigator} tabLabel={item} key={index} tabTag={item}/>
         )
     })}
     </ScrollableTab>
     **/

    handleTabNames(tabNames) {
        this.setState({tabNames: tabNames});
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