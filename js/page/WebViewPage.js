import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Platform,
    PixelRatio,
    WebView,
    ToastAndroid,
    Button,
    BackAndroid,
    ActivityIndicator, BackHandler
} from 'react-native';
import px2dp from '../util/px2dp';
import theme from '../config/theme';

export default class WebViewPage extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const data = this.props.rowData;

        return (
            <Button title='Test' onPress={this.click.bind(this)}/>
        )
    }


    click(){
        this.props.navigator.pop();
    }
    componentDidMount() {
        if (Platform.OS === 'android') {
            //BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnmount(){
        if (Platform.OS === 'android') {
            //BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }


}

const styles = StyleSheet.create({
    webView: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    bottom: {
        width: theme.screenWidth,
        height: px2dp(49),
        backgroundColor: '#fff',
        borderTopWidth: 1 / PixelRatio.get(),
        borderTopColor: '#c4c4c4',
        flexDirection: 'row',
        paddingLeft: px2dp(20),
        paddingRight: px2dp(20),
        alignItems: 'center'
    },
    info: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center',
    }
});