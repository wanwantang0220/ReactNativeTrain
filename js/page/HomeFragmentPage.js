
import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform, ToastAndroid} from 'react-native';


export default class HomeFragmentPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            tabNames: ['首页','Android','iOS']
        };
    }

    render(){
        return(

            <Text>HomeFragmentPage</Text>
        )
    }
}