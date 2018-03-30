import React, {Component} from 'react';
import {Text, ScrollView, StyleSheet, Dimensions, View, TouchableOpacity, Animated} from 'react-native';
import PropTypes from 'prop-types';

import DeFaultTabBar from './DefaultTabBar';


const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;

export default class ScrollableTab extends Component {

    static propTypes = {}

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            containerWidth: screenW,
            currentPage: 0,//当前页面
        };

    }

    componentDidMount() {
        //设置scroll动画监听
        // this.state.scrollXAnim.addListener(({value})=> {
        //     let offset = value / this.state.containerWidth;
        //     this.state.scrollValue.setValue(offset);
        // });
        // this.state.scrollValue.addListener(({value})=>{
        //     console.log('offset-->' + value);
        // })
    }



    render() {

        return (
            <View style={styles.container}
                  onLayout={this.onLayout}>
                {/*渲染tabview*/}
                {this.renderTabView()}
                {/*渲染主体内容*/}
                {this.renderScrollableContent()}
            </View>
        )
    }

    componentWillUnMount() {
        //移除动画监听
        // this.state.scrollXAnim.removeAllListeners();
    }
    renderTabView() {

        let tabParams = {
            tabs: this.children().map((child) => child.props.tabLabel),
            activeTab: this.state.currentPage,
            scrollValue: this.state.scrollValue
        };
        return (
            <DeFaultTabBar
                {...tabParams}
                style={[{width: this.state.containerWidth}]}
                onTabClick={(page) =>
                    this.goToPage(page)
                }/>
        )
    }


    renderScrollableContent() {
        return (
            <Animated.ScrollView
                ref={(ref) => {
                    this.scrollView = ref;
                }}
                style={styles.scrollStyle}
                pagingEnabled={true}
                horizontal={true}
                bounces={false}
                scrollsToTop={false}
                onMomentumScrollBegin={this.onMomentumScrollBeginAndEnd}
                onMomentumScrollEnd={this.onMomentumScrollBeginAndEnd}
                scrollEventThrottle={15}
                onScroll={Animated.event([{
                    nativeEvent: {contentOffset: {x: this.state.scrollXAnim}}
                }], {
                    useNativeDriver: true,
                })}>
                {this.props.children}
            </Animated.ScrollView>
        )
    }

    children(children = this.props.children) {
        return React.Children.map(children, (child) => child);
    }

    /**
     * 获取控件宽度
     * @param e
     * @private
     */
    onLayout = (e) => {
        let {width} = e.nativeEvent.layout;
        if (this.state.containerWidth != width) {
            this.setState({
                containerWidth: width
            })
        }
    }

    /**
     * scrollview开始跟结束滑动回调
     * @param e
     * @private
     */
    onMomentumScrollBeginAndEnd = (e) => {
        let offsetX = e.nativeEvent.contentOffset.x;
        let page = Math.round(offsetX / this.state.containerWidth);
        if (this.state.currentPage !== page) {
            console.log('当前页面-->' + page);
            this.setState({
                currentPage: page,
            });
        }
    }


    /**
     * 滑动到指定位置
     * @param pageNum page下标
     * @param scrollAnimation 是否需要动画
     */
    goToPage(pageNum, scrollAnimation = true) {
        if (this._scrollView && this._scrollView._component && this._scrollView._component.scrollTo) {
            this._scrollView._component.scrollTo({x: pageNum * this.state.containerWidth, scrollAnimation});
            this.setState({
                currentPage: pageNum,
            });
        }
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