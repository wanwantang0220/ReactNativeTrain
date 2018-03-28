import React, {Component} from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';
import HomeFragmentPage from '../page/HomeFragmentPage';
// import CompassFragmentPage from '../page/CompassFragmentPage';
// import NotifyFragmentPage from '../page/NotifyFragmentPage';
import MeFragmentPage from '../page/MeFragmentPage';
import px2dp from '../util/px2dp';


export default class TabBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
            tabName: ['首页', '发现', '消息', '我']
        }
    }


    static defaultProps = {
        selectedColor: 'rgb(22,131,251)',
        nomalColor: '#a9a9a9'
    }


    componentWillMount() {
        const {selectedColor, normalColor} = this.props;
        Icon.getImageSource('md-notifications', 40, normalColor).then((source) => this.setState({notificationNormal: source}));
        Icon.getImageSource('md-notifications', 40, selectedColor).then((source) => this.setState({notificationSelected: source}));
        Icon.getImageSource('md-home', 40, normalColor).then((source) => this.setState({homeNormal: source}));
        Icon.getImageSource('md-home', 40, selectedColor).then((source) => this.setState({homeSelected: source}));
        Icon.getImageSource('md-person', 40, normalColor).then((source) => this.setState({meNormal: source}));
        Icon.getImageSource('md-person', 40, selectedColor).then((source) => this.setState({meSelected: source}));
        Icon.getImageSource('md-compass', 40, normalColor).then((source) => this.setState({compassNormal: source}));
        Icon.getImageSource('md-compass', 40, selectedColor).then((source) => this.setState({compassSelected: source}));
    }

    render() {

        const {selectedColor} = this.props;
        const {tabName} = this.state;

        return (
            <TabNavigator
                hidesTabTouch={true}
                tabBarStyle={styles.tabbar}
                sceneStyle={{paddingBottom: styles.tabbar.height}}>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[0]}
                    selected={this.state.selectedTab === 'home'}
                    renderIcon={() => <Image style={styles.tab} source={this.state.homeNormal} />}
                    renderSelectedIcon={() => <Image style={styles.tab} source={this.state.homeSelected} />}
                    onPress={() => this.setState({ selectedTab: 'home' })}>

                    {<HomeFragmentPage navigator={this.props.navigator}/>}
                </TabNavigator.Item>

                {/*<TabNavigator.Item*/}
                    {/*tabStyle={styles.tabStyle}*/}
                    {/*title={tabName[1]}*/}
                    {/*selected={this.state.selectedTab === 'compass'}*/}
                    {/*selectedTitleStyle={{color: selectedColor}}*/}
                    {/*renderIcon={() => <Image style={styles.tab} source={this.state.compassNormal} />}*/}
                    {/*renderSelectedIcon={() => <Image style={styles.tab} source={this.state.compassSelected} />}*/}
                    {/*onPress={() => this.setState({ selectedTab: 'compass' })}>*/}

                    {/*{<CompassFragmentPage />}*/}
                {/*</TabNavigator.Item>*/}
                {/*<TabNavigator.Item*/}
                    {/*tabStyle={styles.tabStyle}*/}
                    {/*title={tabName[2]}*/}
                    {/*selected={this.state.selectedTab === 'notification'}*/}
                    {/*selectedTitleStyle={{color: selectedColor}}*/}
                    {/*renderIcon={() => <Image style={styles.tab} source={this.state.notificationNormal} />}*/}
                    {/*renderSelectedIcon={() => <Image style={styles.tab} source={this.state.notificationSelected} />}*/}
                    {/*onPress={() => this.setState({ selectedTab: 'notification' })}>*/}

                    {/*{<NotifyFragmentPage  navigator={this.props.navigator}/>}*/}
                {/*</TabNavigator.Item>*/}

                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[3]}
                    selected={this.state.selectedTab === 'me'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab} source={this.state.meNormal} />}
                    renderSelectedIcon={() => <Image style={styles.tab} source={this.state.meSelected} />}
                    onPress={() => this.setState({ selectedTab: 'me' })}>

                    {<MeFragmentPage navigator={this.props.navigator}/>}
                </TabNavigator.Item>
            </TabNavigator>
        )
    }
}


const styles = StyleSheet.create({
    tabbar: {
        height: px2dp(50),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    tabStyle: {
        padding: px2dp(0)
    },
    tab: {
        width: px2dp(22),
        height: px2dp(22)
    }
});