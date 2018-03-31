import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions,Animated} from 'react-native';
import PropTypes from 'prop-types';


const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;


export default class DefaultTabBar extends Component {


    static propTypes = {
        tabs: PropTypes.array.isRequired,
        activeTab: PropTypes.number,//当前选中的tab
        style: View.propTypes.style,
        onTabClick: PropTypes.func,
        containerWidth: PropTypes.number
    }

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {

        let {containerWidth, tabs, scrollValue}=this.props;
        //给传过来的动画一个插值器
        const left = scrollValue.interpolate({
            inputRange: [0, 1,], outputRange: [0, containerWidth / tabs.length,],
        });

        let tabStyle = {
            width: this.props.containerWidth / this.props.tabs.length,
            position: 'absolute',
            bottom: 0,
            left,
        }
        return (

            <View style={[styles.container, this.props.style]}>
                {this.props.tabs.map((name, page) => {
                    const isTabActive = this.props.activeTab === page;
                    return this.renderTab(name, page, isTabActive);
                })}
                <Animated.View
                    style={[styles.tabLineStyle, tabStyle]}
                />
            </View>
        )
    }

    /**
     * 渲染tab
     * @param name 名字
     * @param page 下标
     * @param isTabActive 是否是选中的tab
     * @private
     * @returns {*}
     */
    renderTab(name, page, isTabActive) {
        let tabTextStyle = null;
        //如果被选中的style
        if (isTabActive) {
            tabTextStyle = {color: 'red'};
        } else {
            tabTextStyle = {color: 'gray'};
        }

        let self = this;
        return (
            <TouchableOpacity
                key={name + page}
                style={[styles.tabStyle]}
                onPress={() => {
                    this.props.onTabClick(page)
                }}>
                <Text style={[tabTextStyle]}>{name}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: screenW,
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
    },
    tabStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabLineStyle: {
        height: 2,
        backgroundColor: 'navy',
    }
});