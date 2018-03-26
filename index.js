import React,{Component} from 'react';
import { AppRegistry } from 'react-native';
import Navigation from './js/Navigation';

export default class JueJinClient extends Component {
    render() {
        return (
            <Navigation/>
        );
    }
}

AppRegistry.registerComponent('ReactNativeTrain', () => JueJinClient);
