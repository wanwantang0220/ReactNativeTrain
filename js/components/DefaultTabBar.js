import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions,} from 'react-native';
import PropTypes from 'prop-types';


const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;


export default class DefaultTabBar extends Component {


    static propTypes = {
        tabs: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {

        };
    }

    render() {


        return (
            <View style={styles.container}>
                {this.props.tabs.map((name, page) => {
                    return this.renderTab(name, page);
                })}
            </View>
        )
    }

    renderTab(name, page) {
        return (
            <TouchableOpacity
                key={name + page}
                style={styles.tabStyle}>
                <Text>{name}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: screenW,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    tabStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});