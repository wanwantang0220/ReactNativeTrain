import React,{Component} from "react";
import {Text} from "react-native";

export default class CompassItem extends Component {


    constructor(props) {
        super(props);

    }

    render(){

        const data = this.props.compassItem;
        console.log('data',data);
        return(
            <Text>{data.content}</Text>
        )
    }
}
