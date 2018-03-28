
import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform, ToastAndroid} from 'react-native';
//引用插件
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';
import CustomTabBar from '../components/CustomTabBar';
import HomeTab from '../components/HomeTab';
import TabItemSwitcherPage from './TabItemSwitcherPage';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

import theme from '../config/theme';
import px2dp from '../util/px2dp';

export default class HomeFragmentPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            tabNames: ['首页','Android','iOS']
        };
        this.handleTabNames = this.handleTabNames.bind(this);
    }

    render(){
        return(

            <View style={styles.container}>
                <ScrollableTabView
                    renderTabBar={() => <CustomTabBar pullDownOnPress={this.pullDownCallback.bind(this)}/>}
                    tabBarBackgroundColor="rgb(22,131,251)"
                    tabBarActiveTextColor="white"
                    tabBarInactiveTextColor="rgba(255,255,255,0.5)"
                    tabBarTextStyle={{fontSize: theme.scrollView.fontSize}}
                    tabBarUnderlineStyle={theme.scrollView.underlineStyle}>
                    {this.state.tabNames.map((item, i) => {
                        return(
                            <HomeTab tabLabel={item} key={i} tabTag={item}/>
                        );})
                    }
                </ScrollableTabView>
            </View>
        )
    }

    pullDownCallback(){
        this.props.navigator.push({
            component: TabItemSwitcherPage,
            args: {tabNames: this.state.tabNames}
        });
    }

    componentDidMount(){
        RCTDeviceEventEmitter.addListener('valueChange', this.handleTabNames);
    }

    componentWillUnmount(){
        RCTDeviceEventEmitter.removeListener('value', this.handleTabNames);
    }

    handleTabNames(tabNames){
        this.setState({ tabNames: tabNames });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    text: {
        color: theme.text.color,
        fontSize: theme.text.fontSize
    }
});