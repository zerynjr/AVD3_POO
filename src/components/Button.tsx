import React from "react";
import{
    TouchableOpacity,
    TouchableOpacityProps,
    Text,
    StyleSheet
} from 'react-native'

// type ButtonProps = TouchableOpacityProps;

interface ButtonProps extends TouchableOpacityProps { 
    title: string;
}
export function Button({title, ...rest }: ButtonProps) {
    return(
        <TouchableOpacity 
            style={styles.button}
             activeOpacity={0.7}
            {...rest}
        >
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        backgroundColor:'#55cc91',
        padding:15,
        alignItems:'center',
        marginTop:25,
        borderRadius: 10
    },
    buttonText: {
        color: '#005031',
        fontSize:18,
        fontWeight:'bold'
    },
})