import React, {Component} from "react";
import {PixelRatio, StyleSheet, Text, View, Image, Button, TouchableOpacity, Alert} from "react-native";
import theme from "../config/theme";
import px2dp from "../util/px2dp";
import TextButton from "./TextButton";

export default class CompassItem extends Component {


    constructor(props) {
        super(props);

    }

    render() {

        const data = this.props.compassItem;
        console.log('data', data);
        const {navigate} = this.props.navigate;
        return (
            <View style={{flexDirection: 'row'}}>
                <View style={[styles.row, {
                    borderColor: '#DDD8CE', borderRightWidth: 1, flex: 1, marginTop: 10,
                    marginBottom: 10, backgroundColor: '#fff'
                }]}>
                    <View style={{flex: 2}}>
                        <Image style={{height: 150}} source={{uri: data.screenshot}}/>
                    </View>
                    <Text style={[styles.text, {fontSize: 14, fontWeight: 'bold'}]}> {data.content}</Text>
                    <View style={[styles.text, {flexDirection: 'row'}]}>
                        <Text style={{flex: 1, fontSize: 12, marginTop: 5, marginLeft: 5}}>{data.city}</Text>
                        <TouchableOpacity
                            style={[styles.btn]}
                            onPress={()=> navigate('Detail')} activeOpacity={0.2} focusedOpacity={0.5}>
                            <View>
                                <Text style={{color: '#ffffff', fontSize: 12}}>报名参加</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }


    pressEvent() {
        this.props.navigation.navigate('Detail');
        // Alert.alert('alert', 'test', [
        //     {text: 'ask me later', onPress: () => console.log('ask me later')},
        //     {text: 'cancle', onPress: () => console.log('cancle')}
        // ])
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
        marginTop: 5,
        marginBottom: 10
    },
    btn: {
        width: 80,
        height: 25,
        borderRadius: 30,
        backgroundColor: '#4d91fd',
        justifyContent: 'center',
        alignItems: 'center',

    }
});
