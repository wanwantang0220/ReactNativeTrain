
import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform, ScrollView,  Animated,Dimensions,TouchableOpacity,
    TouchableNativeFeedback,} from 'react-native';
import PropTypes from 'prop-types';
import px2dp from '../util/px2dp';
import theme from '../config/theme';
import ImageButton from "./ImageButton";


const Button = (props) => {
    if(Platform.OS === 'android') {
        return <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.SelectableBackground()} // eslint-disable-line new-cap
            {...props}>
            {props.children}
        </TouchableNativeFeedback>;
    }else if(Platform.OS === 'ios') {
        return <TouchableOpacity {...props}>
            {props.children}
        </TouchableOpacity>;
    }
};

const WINDOW_WIDTH = Dimensions.get('window').width;


export default class CustomTabBar extends Component{


    constructor(props){
        super(props);
        this.state ={
            _leftTabUnderline: new Animated.Value(0),
            _widthTabUnderline: new Animated.Value(0),
            _containerWidth: null,
            tabs:[]
        }
        this.tabsMeasurements = [];
    }

    static propTypes = {
        goToPage: PropTypes.func,
        activeTab: PropTypes.number,
        tabs: PropTypes.array,
        backgroundColor: PropTypes.string,
        activeTextColor: PropTypes.string,
        inactiveTextColor: PropTypes.string,
        scrollOffset: PropTypes.number,
        style: PropTypes.style,
        tabStyle: PropTypes.style,
        tabsContainerStyle: PropTypes.style,
        textStyle: PropTypes.style,
        renderTab: PropTypes.func,
        underlineStyle: PropTypes.style,
        pullDownOnPress: PropTypes.func
    };

    static defaultProps = {
        scrollOffset: 52,
        activeTextColor: 'navy',
        inactiveTextColor: 'black',
        backgroundColor: null,
        style: {},
        tabStyle: {},
        tabsContainerStyle: {},
        underlineStyle: {},
        tabs:[]
    };

    componentDidMount() {
        this.props.scrollValue.addListener(this.updateView2);
    }

    componentWillReceiveProps(nextProps) {
        // If the tabs change, force the width of the tabs container to be recalculated
        if (JSON.stringify(this.props.tabs) !== JSON.stringify(nextProps.tabs) && this.state._containerWidth) {
            this.setState({ _containerWidth: null, });
        }
    }


    render(){

        const tabUnderlineStyle = {
            position: 'absolute',
            height: px2dp(2),
            backgroundColor: 'navy',
            bottom: 0,
        };

        const dynamicTabUnderline = {
            left: this.state._leftTabUnderline,
            width: this.state._widthTabUnderline,
        };


        return <View style={{flexDirection: 'row-reverse'}}>
            <View style={{height: theme.actionBar.height}}>
                <ImageButton
                    icon="md-arrow-dropdown"
                    color="white"
                    imgSize={px2dp(20)}
                    btnStyle={[styles.imgBtn, {height: theme.actionBar.height, borderBottomColor:"#ccc", borderBottomWidth:1}]}
                    onPress={this.props.pullDownOnPress}/>
            </View>
            <View
                style={[styles.container, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}
                onLayout={this.onContainerLayout}>
                <ScrollView
                    ref={(scrollView) => { this._scrollView = scrollView; }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    directionalLockEnabled={true}
                    bounces={false}
                    scrollsToTop={false}>
                    <View
                        style={[styles.tabs, {width: this.state._containerWidth, }, this.props.tabsContainerStyle, ]}
                        ref={'tabContainer'}
                        onLayout={this.onTabContainerLayout}>
                        {this.props.tabs.map((name, page) => {
                            const isTabActive = this.props.activeTab === page;
                            const { activeTextColor, inactiveTextColor,textStyle} = this.props;
                            const textColor = isTabActive ? activeTextColor : inactiveTextColor;
                            const fontWeight = isTabActive ? 'normal' : 'normal';


                            return <Button
                                key={`${name}_${page}`}
                                accessible={true}
                                accessibilityLabel={name}
                                accessibilityTraits='button'
                                onPress={() => this.props.goToPage}
                                onLayout={this.measureTab.bind(this, page)}>
                                <View style={[styles.tab ]}>
                                    <Text style={[{color: textColor, fontWeight, }, textStyle ]}>
                                        {name}
                                    </Text>
                                </View>
                            </Button>
                        })}
                        <Animated.View style={[tabUnderlineStyle, dynamicTabUnderline, this.props.underlineStyle, ]} />
                    </View>
                </ScrollView>
            </View>
        </View>;
    }

    renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
        const { activeTextColor, inactiveTextColor} = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;
        const fontWeight = isTabActive ? 'normal' : 'normal';

        return <Button
            key={`${name}_${page}`}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => onPressHandler(page)}
            onLayout={onLayoutHandler}>
            <View style={[styles.tab ]}>
                <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
                    {name}
                </Text>
            </View>
        </Button>;
    }

    updateView2(offset){
        const position = Math.floor(offset.value);
        const pageOffset = offset.value % 1;
        const tabCount = this.props.tabs.length;
        const lastTabPosition = tabCount - 1;

        if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
            return;
        }

        if (this.necessarilyMeasurementsCompleted(position, position === lastTabPosition)) {
            this.updateTabPanel(position, pageOffset);
            this.updateTabUnderline(position, pageOffset, tabCount);
        }
    }

    updateView(offset) {
        const position = Math.floor(offset.value);
        const pageOffset = offset.value % 1;
        const tabCount = this.props.tabs.length;
        const lastTabPosition = tabCount - 1;

        if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
            return;
        }

        if (this.necessarilyMeasurementsCompleted(position, position === lastTabPosition)) {
            this.updateTabPanel(position, pageOffset);
            this.updateTabUnderline(position, pageOffset, tabCount);
        }
    }

    necessarilyMeasurementsCompleted(position, isLastTab) {
        return this._tabsMeasurements[position] &&
            (isLastTab || this._tabsMeasurements[position + 1]) &&
            this._tabContainerMeasurements &&
            this._containerMeasurements;
    }

    updateTabPanel(position, pageOffset) {
        const containerWidth = this._containerMeasurements.width;
        const tabWidth = this._tabsMeasurements[position].width;
        const nextTabMeasurements = this._tabsMeasurements[position + 1];
        const nextTabWidth = nextTabMeasurements && nextTabMeasurements.width || 0;
        const tabOffset = this._tabsMeasurements[position].left;
        const absolutePageOffset = pageOffset * tabWidth;
        let newScrollX = tabOffset + absolutePageOffset;

        // center tab and smooth tab change (for when tabWidth changes a lot between two tabs)
        newScrollX -= (containerWidth - (1 - pageOffset) * tabWidth - pageOffset * nextTabWidth) / 2;
        newScrollX = newScrollX >= 0 ? newScrollX : 0;

        if (Platform.OS === 'android') {
            this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false, });
        } else {
            const rightBoundScroll = this._tabContainerMeasurements.width - (this._containerMeasurements.width);
            newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
            this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false, });
        }

    }

    updateTabUnderline(position, pageOffset, tabCount) {
        const lineLeft = this._tabsMeasurements[position].left;
        const lineRight = this._tabsMeasurements[position].right;

        if (position < tabCount - 1) {
            const nextTabLeft = this._tabsMeasurements[position + 1].left;
            const nextTabRight = this._tabsMeasurements[position + 1].right;

            const newLineLeft = (pageOffset * nextTabLeft + (1 - pageOffset) * lineLeft);
            const newLineRight = (pageOffset * nextTabRight + (1 - pageOffset) * lineRight);

            this.state._leftTabUnderline.setValue(newLineLeft);
            this.state._widthTabUnderline.setValue(newLineRight - newLineLeft);
        } else {
            this.state._leftTabUnderline.setValue(lineLeft);
            this.state._widthTabUnderline.setValue(lineRight - lineLeft);
        }
    }


    measureTab(page, event) {
        const { x, width, height, } = event.nativeEvent.layout;
        this._tabsMeasurements[page] = {left: x, right: x + width, width, height, };
        this.updateView({value: this.props.scrollValue._value, });
    }

    onTabContainerLayout(e) {
        this._tabContainerMeasurements = e.nativeEvent.layout;
        let width = this._tabContainerMeasurements.width;
        if (width < WINDOW_WIDTH) {
            width = WINDOW_WIDTH;
        }
        this.setState({ _containerWidth: width, });
        this.updateView({value: this.props.scrollValue._value, });
    }

    onContainerLayout(e) {
        this._containerMeasurements = e.nativeEvent.layout;
        this.updateView({value: this.props.scrollValue._value, });
    }
}

const styles = StyleSheet.create({
    tab: {
        height: theme.actionBar.height,
        alignItems: 'center',
        justifyContent: 'center',
        width: px2dp(80),
        paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0
    },
    container: {
        flex: 1,
        height: theme.actionBar.height,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#ccc',
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    imgBtn: {
        backgroundColor: 'rgb(22,131,251)',
        width: px2dp(50),
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0
    }
});