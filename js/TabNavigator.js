import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Style
} from 'react-native';
import { TabNavigator } from "react-navigation";
//'首页', '发现', '消息', '我'
import CompassFragmentPage from './page/CompassFragmentPage';
import NotifyFragmentPage from './page/NotifyFragmentPage';

import ScrollableTabPage from './page/ScrollableTabPage';
import MeFragmentPage from './page/MeFragmentPage';

const TabView = TabNavigator({
    Home: {
        screen: ScrollableTabPage,
        navigationOptions: {
            //默认参数
            headerTitleStyle: {
                alignSelf: 'center'
            },
        }
    },
    Compass: {
        screen: CompassFragmentPage,
        lazyLoad: false,
        navigationOptions: {
            headerTitleStyle: {
                alignSelf: 'center'
            },
        }
    },
    Notify: {
        screen: NotifyFragmentPage,
        lazyLoad: false,
        navigationOptions: {
            headerTitleStyle: {
                alignSelf: 'center'
            },
        }
    },
    Me: {
        screen: MeFragmentPage,
        //以下参数也可放置在HelloWorldPage.js页面
        navigationOptions: {
            title: '我的',
            tabBarLabel: '我的',
            lazyLoad: false,
            // tabBarIcon: ({ tintColor }) => (
            //     <Image
            //         source={require('../img/ic_feed_share_entry.png')}
            //         style={[styles.icon, { tintColor: tintColor }]}// {tintColor: tintColor} 选中的图片和文字颜色
            //     />
            // ),
            headerTitleStyle: {
                alignSelf: 'center'
            }
        }
    },
}, {
    animationEnabled: true, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 是否左右滑动,如果有DrawerNavigator,最好设置为false避免手势冲突
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    tabBarOptions: {
        activeTintColor: 'rgb(22,131,251)', // 文字和图片选中颜色
        inactiveTintColor: '#a9a9a9', // 文字和图片默认颜色
        showIcon: false, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: { height: 0 }, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了， 不知道还有没有其它方法隐藏？？？
        style: {
            backgroundColor: '#fff', // TabBar 背景色
            height: 50
        },
        labelStyle: {
            fontSize: 12, // 文字大小,
            marginTop: 0,
            textAlign:'center',
            paddingTop:10
        },
    },
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20
    }
});
module.exports = TabView;