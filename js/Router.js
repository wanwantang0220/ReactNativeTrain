import {StackNavigator, TabNavigator} from "react-navigation";
import Navigation from "./Navigation";
import WebViewPage from "./page/WebViewPage";
import TabView from "./TabNavigator";
import TestPage from "./page/TestPage";
import DetailPage from "./page/DetailPage";


const Router = StackNavigator({
    Navigator: {
        title: 'Navigation',
        screen: TabView,
    },
    Web:{
        title:'Web',
        screen:WebViewPage
    },
    Test:{
        title:'Test',
        screen:TestPage
    },
    Detail:{
        title:'Detail',
        screen:DetailPage
    }
});
module.exports = Router;