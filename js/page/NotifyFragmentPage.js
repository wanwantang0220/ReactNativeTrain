import React, {Component} from 'react';
import {
    Text,
    View,
    SectionList,
    StyleSheet,
    Platform,
    RefreshControl,
    ScrollView,
    ToastAndroid,
    Image,
    Dimensions,
    PixelRatio,
    Alert,
    AlertIOS
} from 'react-native';

import CitySectionList from '../components/CitySectionList';

const ITEM_HEIGHT = 50; //item的高度
const HEADER_HEIGHT = 24;  //分组头部的高度
const SEPARATOR_HEIGHT = 0;  //分割线的高度

export default class NotifyFragmentPage extends Component {

    static navigationOptions = {
        title: '通讯录',
        tabBarLabel: '通讯录',
        headerTitleStyle: {
            alignSelf: 'center'
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            sections: [],
            sectionSize: []
        }

    }

    componentDidMount() {
        this.getCityInfos()
    }
    render() {

        if (this.state.data.length > 0) {
            return (
                <View style={{paddingTop: Platform.OS === 'android' ? 0 : 20}}>

                    <View>
                        <SectionList
                            ref='list'
                            enableEmptySections
                            renderItem={this.renderItem}
                            renderSectionHeader={this.renderSectionHeader}
                            sections={this.state.data}
                            getItemLayout={this.getItemLayout}/>

                        <CitySectionList
                            sections={this.state.sections}
                            onSectionSelect={this.onSectionselect}/>

                    </View>
                </View>
            )
        } else {
            return <View/>
        }
    }

    renderItem = (item)=> {

        return(
            <View style={styles.itemView}>
                <Text style={{marginLeft: 30, fontSize: 16, color: '#333'}}>
                    {item.item.city_child}
                </Text>
                <Text style={{marginLeft: 25, fontSize: 15, color: '#999'}}>
                    {item.item.city_parent}
                </Text>
                <Text style={{marginLeft: 25, fontSize: 13, color: '#999'}}>
                    {item.item.provcn}
                </Text>
            </View>
        )
    }

    renderSectionHeader = (section)=> {
        return (
            <View style={styles.headerView}>
                <Text style={styles.headerText}>{section.section.key}</Text>
            </View>
        )
    }


    getItemLayout(data, index){
        let [length, separator, header] = [ITEM_HEIGHT, SEPARATOR_HEIGHT, HEADER_HEIGHT];
        return {length, offset: (length + separator) * index + header, index};
    }

    onSectionselect = (section, index) => {
        //跳转到某一项
        this.refs.list.scrollToIndex({animated: true, index: this.state.sectionSize[index]})
    }

    /**
     * 获取json数据
     */
    getCityInfos() {
        let data = require('../asset/city.json');
        let jsonData = data.data
        //每组的开头在列表中的位置
        let totalSize = 0;
        //SectionList的数据源
        let cityInfos = [];
        //分组头的数据源
        let citySection = [];
        //分组头在列表中的位置
        let citySectionSize = [];
        for (let i = 0; i < jsonData.length; i++) {
            citySectionSize[i] = totalSize;
            //给右侧的滚动条进行使用的
            citySection[i] = jsonData[i].title;
            let section = {}
            section.key = jsonData[i].title;
            section.data = jsonData[i].city;
            for (let j = 0; j < section.data.length; j++) {
                section.data[j].key = j
            }
            cityInfos[i] = section;
            //每一项的header的index
            totalSize += section.data.length + 1
        }
        this.setState({data: cityInfos, sections: citySection, sectionSize: citySectionSize})
    }
}

const styles = StyleSheet.create({

    headerView: {
        justifyContent: 'center',
        height: HEADER_HEIGHT,
        paddingLeft: 20,
        backgroundColor: '#eee'
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#3cb775'
    },
    itemView: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
        height: ITEM_HEIGHT
    }
});