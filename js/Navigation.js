import React, {Component} from 'react';
import {Text, Platform} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import MainPage from './page/MainPage';

export default class Navigation extends Component {



    componentDidMount() {
        if(Platform.OS === 'android'){
        }
    }

    render() {

        return (
            <Navigator
                initialRoute={{component:MainPage}}
                renderScene={(route,navigator) =>{
                    return <route.component navigator={navigator} {...route.args}/>
                }}
            />
        )
    }
}