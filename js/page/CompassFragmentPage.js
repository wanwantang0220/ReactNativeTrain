
import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform, RefreshControl, ScrollView, ToastAndroid, Image, Dimensions, PixelRatio, Alert, AlertIOS} from 'react-native';

export default class CompassFragmentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            loadedData: false,
            dataBlob: [],
            btnName: ['沸点', '贡献榜', '本周最热']
        }
    }


    render(){

        return(
            <Text>CompassFragmentPage</Text>
        )
    }

}