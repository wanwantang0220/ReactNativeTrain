import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Platform,
    PixelRatio,
    WebView,
    ToastAndroid,
    BackAndroid,
    ActivityIndicator
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
            <Text>Test</Text>
        )
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