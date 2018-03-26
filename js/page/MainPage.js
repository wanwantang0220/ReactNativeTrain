/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, Text, View, BackHandler, ToastAndroid} from 'react-native';
import WebViewPage from './WebViewPage';
import IndividualPage from './IndividualPage';


export default class MainPage extends Component<Props> {

    constructor(props){
        super(props);
        MainPage.switchToWebViewPage = MainPage.switchToWebViewPage.bind(this);
        MainPage.switchToIndividualPage = MainPage.switchToIndividualPage.bind(this);
    }

    static  switchToWebViewPage(rowData){
        this.props.navigator.push({
            component:WebViewPage,
            args:{
                rowData:rowData
            }

        });
    }


    static switchToIndividualPage(userInfo){
        this.props.navigator.push({
            component:IndividualPage,
            args:{
                user:userInfo
            }
        });
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', function () {
                BackHandler.exitApp(0);
                return true;
            })
        }
    }

    render() {
        return (

            <Text>
                Welcome to React Native!
            </Text>

        );
    }

}
