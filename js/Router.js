import {StackNavigator, TabNavigator} from "react-navigation";
import Navigation from "./Navigation";
import WebViewPage from "./page/WebViewPage";
import TabView from "./TabNavigator";
import TestPage from "./page/TestPage";



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
    }
});
module.exports = Router;