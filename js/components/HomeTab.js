
import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform, ToastAndroid} from 'react-native';

export default class HomeTab extends Component{

    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            loadedData: false,
            dataBlob: []
        };
    }

    componentDidMount() {
        this.fetchData();
    }
    render(){

        return(
            <Text>HomeTab</Text>
        )
    }


    fetchData(){

    }
}