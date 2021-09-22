import React from "react";
import {TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, View} from 'react-native'

interface ISkillCaraProps extends TouchableOpacityProps {
    Nome: string,
    Codigo: string,
}

export function SkillCard({Nome, Codigo, ...rest}: ISkillCaraProps){
    return (
        <View>
            <TouchableOpacity 
            style={styles.botaoCad} 
            {...rest} 
        >
                <Text style={styles.textCodigo}>
                {Codigo}
                </Text>
                <Text style={styles.textNome}>
                {Nome}
                </Text>
            </TouchableOpacity>
       </View>     
    )
}
const styles = StyleSheet.create({
    botaoCad: {
        backgroundColor: '#0084ff',
        padding:15,
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 10
    },
    textNome: {
        color: '#00ffff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    textCodigo: {
        color: '#00ffff',
        fontSize: 20,
        fontWeight: 'bold'
    }
})