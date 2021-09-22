import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Platform, FlatList, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import  { Button }  from '../components/Button'
import { SkillCard } from '../components/SkillCard'

interface Cadastro{
    id: string,
    pais: string,
    codigo: string
}

export function Home() {
    const [newPais, setNovosPais] = useState('')
    const [meuPais, setMeusPais] = useState<Cadastro[]>([])
    const [novoCod, setNovoCod] = useState('')
    const [meuCod, setMeuCod] = useState<Cadastro[]>([])

    function handleAddNew(){
        if (newPais.trim()!=="" && novoCod.trim()!=="") {
            const Lista = {
                id: String(new Date().getTime()),
                pais: newPais,
                codigo: novoCod,
            }
            setMeusPais([...meuPais,Lista])
            setNovosPais('')
            setMeuCod([...meuCod,Lista])
            setNovoCod('')
        } else {
            alert('Preencha todos os campos, por favor!')
        }
    }

    function handleRemove(id: string){
        setMeusPais(meuPais.filter(Cadastro=> Cadastro.id !== id))

    }

    useEffect(() => {
        async function loadData() {
            const storagedSkills = await AsyncStorage.getItem('@meusPais:Pais')
            if(storagedSkills){
                setMeusPais(JSON.parse(storagedSkills))
            }
        }
        loadData()
    }, [])
    
    useEffect (() =>{
        async function saveData(){
            await AsyncStorage.setItem('@meusPais:Pais', JSON.stringify(meuPais))
        }
        saveData()
    },[meuPais])

  return(
    <>
        <View style={styles.container}>
            <Image style={{ width: 138, height: 116, alignSelf: 'center', justifyContent: 'center'}} source={require('../assets/onu.png')}/>
            
            <Text style={[styles.nacoes, { alignSelf: 'center'}]}>NAÇÕES UNIDAS</Text>
            
            <Image style={{ width: 323, height: 10, alignSelf: 'center', justifyContent: 'center', marginBottom: 30, marginTop: 10}} source={require('../assets/uno-dots.png')}/>

            <Text style={[styles.title, { alignSelf: 'center', marginTop: 5 }]}>Cadastre o País para a Conferência</Text>
        
            <TextInput
            style={[styles.input, { marginTop: 20, marginBottom: 20}]}
            placeholder= 'Insira o nome do país.'
            value={newPais}
            placeholderTextColor='#8b8b8b'
            onChangeText={value => setNovosPais(value)}
            />

            <TextInput
            style={[styles.input, {marginBottom: 5}]}
            placeholder= 'Insira o código do país.'
            value={novoCod}
            placeholderTextColor='#8b8b8b'
            onChangeText={value => setNovoCod(value)}
            />

            <Button 
            onPress={handleAddNew}
            title = 'Inserir Cadastro'
            />

                       
            <Text style={[styles.title, {marginVertical:20}]}>
                Países Inscritos
            </Text>
            
            <FlatList showsVerticalScrollIndicator={false}
            data={meuPais}
            keyExtractor={item=> item.id}
            renderItem={({item})=> ( 
                <SkillCard
                Nome={item.pais}
                Codigo={item.codigo}
                onPress={() => handleRemove(item.id)}
                />
            )}
            />
        </View>
    </>
  )
}

const styles= StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#99ffcc',
        paddingHorizontal:30,
        paddingVertical: 70
    },
    title: {
        color:'#005031',
        fontSize:20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    input:{
        backgroundColor:'#ffffff',
        color: '#000000',
        fontSize: 18,
        padding: Platform.OS =='ios' ? 15 : 12,
        marginTop: 5,
        borderColor:'#000000',
        borderRadius: 50
    },
    nacoes: {
        color: '#0084ff',
        fontWeight: '700',
        fontSize: 20
    }
})