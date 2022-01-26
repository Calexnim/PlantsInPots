import React from "react";
import { Text } from "react-native";

const Product = (props) => {
    console.log(props)
    return (
        <Text>Hello {props.route.params?.something}</Text>
    );
}
export default Product; 