import React, {Component} from 'react';
import {Text, ScrollView, StyleSheet, Dimensions, View, TouchableOpacity, Animated} from 'react-native';
import PropTypes from 'prop-types';

import DeFaultTabBar from './DefaultTabBar';


const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;

export default class ScrollableTab extends Component {

    static propTypes = {
        prerenderingSiblingsNumber: PropTypes.number,//预加载的页面
    }

    static defaultProps = {
        prerenderingSiblingsNumber: 0,//不需要预加载
    }

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            containerWidth: screenW,
            currentPage: 0,//当前页面
            scrollXAnim: new Animated.Value(0),
            scrollValue: new Animated.Value(0),
            sceneKeys: this.newSceneKeys({currentPage: 0}),
        };

    }

    componentDidMount() {
        // 设置scroll动画监听
        this.state.scrollXAnim.addListener(({value}) => {
            let offset = value / this.state.containerWidth;
            this.state.scrollValue.setValue(offset);
        });

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
        this.state.scrollXAnim.removeAllListeners();
        this.state.scrollValue.removeAllListeners();
    }

    renderTabView() {

        let tabParams = {
            tabs: this.children().map((child) => child.props.tabLabel),
            activeTab: this.state.currentPage,
            scrollValue: this.state.scrollValue,
            containerWidth: this.state.containerWidth,
        };
        return (
            <DeFaultTabBar
                {...tabParams}
                style={[{width: this.state.containerWidth}]}
                onTabClick={(page) => this.goToPage(page)}
            />
        )
    }


    renderScrollableContent() {
        return (
            <Animated.ScrollView
                ref={(ref) => {
                    this.scrollView = ref;
                }}
                style={{width: this.state.containerWidth}}
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
                {this.renderContentView()}
            </Animated.ScrollView>
        )
    }


    /**
     * 渲染子view
     * @private
     */
    renderContentView(){
        let scenes = [];
        this.children().forEach((child, index)=> {
            const sceneKey = this.makeSceneKey(child, index);
            let scene = null;
            if (this.keyExists(this.state.sceneKeys, sceneKey)) {
                scene = (child);
            } else {
                scene = (<View tabLabel={child.tabLabel}/>);
            }
            scenes.push(
                <View key={child.key} style={{width: this.state.containerWidth}}>
                    {scene}
                </View>
            );
        });
        return scenes;
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
            this.updateKeyScenes(page);
        }
    }


    /**
     * 滑动到指定位置
     * @param pageNum page下标
     * @param scrollAnimation 是否需要动画
     */
    goToPage(pageNum, scrollAnimation = true) {
        if (this.scrollView && this.scrollView._component && this.scrollView._component.scrollTo) {
            this.scrollView._component.scrollTo({x: pageNum * this.state.containerWidth, scrollAnimation});
            this.setState({
                currentPage: pageNum,
            });
        }
    }

    /**
     * 生成需要渲染的页面跟渲染过的页面的集合
     * @param previousKeys 之前的集合
     * @param currentPage 当前页面
     * @param children 子控件
     * @private
     */
    newSceneKeys({previousKeys = [], currentPage = 0, children = this.props.children,}) {
        let newKeys = [];

        this.children().forEach((child, index)=>{
            const key = this.makeSceneKey(child, index);
            //页面是否渲染过||是否需要预加载
            if (this.keyExists(previousKeys, key) || this.shouldSceneRender(index, currentPage)) {
                newKeys.push(key);
            }
        });
        return newKeys;
    }

    /**
     * 生成唯一key
     * @param child 子控件
     * @param index 下标
     * @private
     */
    makeSceneKey(child,index){
        return (child.props.tabLabel + '_' + index);
    }


    /**
     * 判断key是否存在
     * @param previousKeys key集合
     * @param key 当前key
     * @private
     */
    keyExists(previousKeys, key){
        return (previousKeys.find((sceneKey)=>sceneKey === key));
    }

    /**
     * 是否需要预加载
     * @param index
     * @param currentPage
     */
    shouldSceneRender(index, currentPage){
        const siblingsNumber = this.props.prerenderingSiblingsNumber;
        //比如当前页面为1，预加载1个，也就是我们需要显示0、1、2三个页面，所[-1<x<3]
        return (index < (currentPage + siblingsNumber + 1) && index > (currentPage - siblingsNumber - 1));
    }

    /**
     * 更新sceneskey和当前页面
     * @param nextPage
     * @private
     */
    updateKeyScenes(nextPage){
        let sceneKeys = this.newSceneKeys({previousKeys: this.state.sceneKeys, currentPage: nextPage})
        this.setState({
            currentPage: nextPage,
            sceneKeys: sceneKeys,
        });
    }



}
const styles = StyleSheet.create({
    container: {
        width: screenW,
        flex: 1,
        marginTop: 0,
    }

});