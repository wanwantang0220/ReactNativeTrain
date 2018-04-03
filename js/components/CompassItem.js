import React, {Component} from "react";
import {PixelRatio, StyleSheet, Text, View, Image} from "react-native";
import theme from "../config/theme";
import px2dp from "../util/px2dp";

export default class CompassItem extends Component {


    constructor(props) {
        super(props);

    }

    render() {

        const data = this.props.compassItem;
        console.log('data', data);
        return (
            <View style={{flexDirection: 'row'}}>
                <View style={[styles.row, {
                    borderColor: '#DDD8CE', borderRightWidth: 1, flex: 1, marginTop: 10,
                    marginBottom: 10, backgroundColor: '#fff'
                }]}>
                    <View style={{flex: 2}}>
                        <Image style={{height: 150}} source={{uri: data.screenshot}}/>
                    </View>
                    <View style={[styles.text]}>
                        <Text style={{fontSize: 14, fontWeight: 'bold'}}> {data.content}</Text>
                        <Text style={{fontSize: 12, marginTop: 5, marginLeft: 5}}>{data.city}</Text>
                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listView: {
        marginTop: px2dp(10)
    },
    items: {
        backgroundColor: '#fff',
        borderTopWidth: 1 / PixelRatio.get(),
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#c4c4c4',
        borderTopColor: '#e4e4e4',
        marginBottom: px2dp(1)
    },
    userBar: {
        padding: px2dp(10),
        flexDirection: 'row',
        width: theme.screenWidth
    },
    avatar: {
        width: px2dp(45),
        height: px2dp(70),
        borderRadius: 3,
        marginTop: 5
    },
    content: {
        color: '#000',
        padding: px2dp(10)
    },
    text: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10
    }
});
