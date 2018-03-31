import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import theme from '../config/theme';

import ListViewForHomeTab from './ListViewForHomeTab';
import TextButton from "./TextButton";

export default class HomeTab extends Component {

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

    render() {

        return (
            <ScrollView
                style={{}}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh.bind(this)}
                        colors={['red', '#ffd500', '#0080ff', '#99e600']}
                        tintColor={theme.themeColor}
                        title="Loading..."
                        titleColor={theme.themeColor}
                    />}>
                {this.renderContent()}
            </ScrollView>
        )
    }

    onRefresh() {
        this.setState({refreshing: true});
        this.fetchData();
    }

    renderContent(){
         const navigator = this.props.navigator;
        if(!this.state.refreshing || this.state.loadedData){
            return(
                <View style={{marginBottom:50}}>
                    {<ListViewForHomeTab  navigator={navigator} dataBlob={this.state.dataBlob} />}
                </View>
            )
        }
    }


    /**
     * 获取API数据
     */
    fetchData() {
        var url = 'https://xiaoce-timeline-api-ms.juejin.im/v1/getListByLastTime?pageNum=1';

        fetch(url).then((response) => response.json())
            .then((responseData) => {
                let data = responseData.d;
                console.log(data);


                var dataBlob = [];
                for (let i in data) {
                    let info = {
                        buyCount: data[i].buyCount,
                        category: data[i].category,
                        contentSize: data[i].contentSize,
                        createdAt: data[i].createdAt,
                        desc: data[i].desc,
                        finishedAt: data[i].finishedAt,
                        id: data[i].id,
                        img: data[i].img,
                        isBuy: data[i].isBuy,
                        isDeleted: data[i].isDeleted,
                        isEditor: data[i].isEditor,
                        isFinished: data[i].isFinished,
                        isHot: data[i].isHot,
                        isPublish: data[i].isPublish,
                        isShow: data[i].isShow,
                        isTop: data[i].isTop,
                        lastSectionCount: data[i].lastSectionCount, //16
                        price: data[i].price,      //19.9
                        profile: data[i].profile, //"前支付宝前端开发，现唯品会高级开发"
                        pv: data[i].pv,           //18200
                        section: data[i].section,
                        tags: data[i].tags,   //["55e325a100b0ded317d2f846"]
                        title: data[i].title,  //"使用 webpack 定制前端开发环境"
                        updatedAt: data[i].updatedAt,   //"2018-03-30T02:46:59.363Z"
                        user: data[i].user,        //"57a2e06da3413100631c1fc7"
                        viewCount: data[i].viewCount, //0
                        wechatSignal: data[i].wechatSignal,  //"teabyii1321"
                        _id: data[i]._id            //"5a6abad5518825733c144469"

                    }

                    dataBlob.push(info);
                }

                if (dataBlob.length !== 0) {
                    this.setState({
                        dataBlob: dataBlob,
                        loadedData: true,
                        refreshing: false
                    })
                }

            }).done();


    }
}

// 样式
const styles = StyleSheet.create({
    scrollViewStyle: {
        // 背景色
        backgroundColor:'red'
    },

    itemStyle: {
        // 尺寸
        width:1000,
        height:200
    },
});

