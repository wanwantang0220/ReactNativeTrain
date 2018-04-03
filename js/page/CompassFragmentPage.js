import React, {Component} from 'react';
import {
    Text,
    View,
    Button,
    Platform,
    RefreshControl,
    ScrollView,
    ListView,
    ToastAndroid,
    Image,
    Dimensions,
    PixelRatio, StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import theme from "../config/theme";
import px2dp from "../util/px2dp";
import CompassItem from "../components/CompassItem";

export default class CompassFragmentPage extends Component {

    static navigationOptions = {
        title: '资讯',
        tabBarLabel: '资讯',
        headerTitleStyle: {
            alignSelf: 'center'
        },
    };

    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            refreshing: true,
            loadedData: false,
            dataBlob: []
        }
    }

    componentDidMount() {
        this.fetchData();
    }


    render() {
        const dataSource = this.state.dataBlob;
        return (
            <ScrollView
                style={{}}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh.bind(this)}
                        colors={['red', '#ffd500', '#0080ff', '#99e600']}
                        tintColor={theme.themeColor}
                        title="Loaging..."
                        title={theme.themeColor}/>}>
                {this.renderContent()}

            </ScrollView>
        )
    }

    onRefresh() {
        this.setState({
            refreshing: true
        });
        this.fetchData();
    }

    renderContent() {

        const dataSource = this.state.dataBlob;
        console.log('dataSource', dataSource);
        if (!this.state.refreshing || this.state.loadedData) {
            return (
                <View>
                    {dataSource.map((item, index) => {
                        return <CompassItem key={index} compassItem={item}/>
                    })}
                </View>


            )
        }
    }



    /**
     * 获取API数据
     */
    fetchData() {

        var url = 'https://event-storage-api-ms.juejin.im/v1/getEventList?src=web';

        fetch(url).then((response) => response.json())
            .then((responseData) => {
                let data = responseData.d;
                var dataBlob = [];

                for (let i in data) {
                    let info = {
                        _id: data[i]._id,
                        eventUrl: data[i].eventUrl,//https://www.bagevent.com/event/1193113?bag_track=juejin
                        userId: data[i].userId, //551d6923e4b0cd5b623f54da
                        content: data[i].content,//庞大的主席团，重量级嘉宾，焦点话题，技术干货
                        category: data[i].category,//5562b428e4b00c57d9b94b9d
                        startTime: data[i].startTime,//2018-07-12T16:00:00.000Z
                        endTime: data[i].endTime,//2018-07-14T16:00:00.000Z
                        city: data[i].city,//北京
                        cityAlias: data[i].cityAlias,//beijing
                        screenshot: data[i].screenshot,//https://user-gold-cdn.xitu.io/1521774972427fcc7f8aa71b6d1dcef47ec429a5ec197.jpg
                        showBanner: 0,
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
    linkView: {
        flexDirection: 'row',
        height: px2dp(60),
        width: theme.screenWidth - px2dp(20),
        borderWidth: 1 / PixelRatio.get(),
        borderColor: theme.grayColor,
        marginLeft: px2dp(10),
        marginRight: px2dp(10)
    },
    linkImage: {
        width: px2dp(59),
        height: px2dp(59),
        resizeMode: 'cover',
        backgroundColor: '#f4f4f4'
    },
    linkText: {
        fontSize: px2dp(16),
        color: '#000',
        fontWeight: 'bold'
    },
    banner: {
        width: theme.screenWidth,
        height: px2dp(120),
        resizeMode: 'cover',
        marginTop: px2dp(10),
    },
    bottom: {
        flexDirection: 'row',
        padding: px2dp(10),
        alignItems: 'center'
    },
    commentText: {
        marginRight: px2dp(25),
        marginLeft: px2dp(5)
    }
});

