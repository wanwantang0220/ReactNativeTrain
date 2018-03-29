import React, {Component} from 'react';
import {Text, ScrollView, StyleSheet, Dimensions, View, TouchableOpacity,Animated} from 'react-native';
import PropTypes from 'prop-types';

import DeFaultTabBar from './DefaultTabBar';


const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;

export default class ScrollableTab extends Component {

    static propTypes = {}

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};

    }

    render() {


        return (
            <View style={styles.container}>
                {/*渲染tabview*/}
                {this.renderTabView()}
                {/*渲染主体内容*/}
                {this.renderScrollableContent()}
            </View>
        )
    }

    renderTabView() {

        let tabParams = {
            tabs: this.children().map((child)=>child.props.tabLabel),
        };
        return (
            <DeFaultTabBar    {...tabParams} />
        )
    }


    renderScrollableContent() {
        return (
            <Animated.ScrollView
                style={styles.scrollStyle}
                pagingEnabled={true}
                horizontal={true}>
                {this.props.children}
            </Animated.ScrollView>
        )
    }

    children(children = this.props.children) {
        return React.Children.map(children, (child) => child);
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