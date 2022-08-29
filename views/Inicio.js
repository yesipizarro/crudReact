import React, { useEffect, useState } from 'react';
import { Text, FlatList, View } from 'react-native';
import axios from 'axios';
import { List, Headline, Button, FAB } from 'react-native-paper';
import globalStyles from '../styles/global';


const Inicio = ({navigation}) => {

    const [consultarAPI, guardarConsultarAPI] = useState(true);

    // state de la app
    const [clientes, guardarClientes] = useState([]);

   
    

    useEffect(() => {
        const obtenerClientesAPI = async () => {
            try {
                const resultado = await axios.get('http://10.0.2.2:3000/clientes');
                guardarClientes(resultado.data)
                guardarConsultarAPI(false);
                

            } catch (error) {
                console.log(error);
            }
        }
       if(consultarAPI){
        obtenerClientesAPI();
       }
       
        
    },[consultarAPI]);




    const renderItem = ({ item }) => (
        <List.Item
            title={item.nombre}
            description={item.empresa}
            onPress = { () => navigation.navigate("DetallesCliente", {item, guardarConsultarAPI})}
        />
    );


    return (
        <View style={globalStyles.contenedor}>

            <Button icon="plus-circle" onPress= { () => navigation.navigate( "NuevoCliente",{ guardarConsultarAPI }) }>
                Nuevo Cliente
            </Button>

            <Headline style={globalStyles.titulo}> {clientes.length > 0 ? "Clientes" : " Aún no hay Clientes"} </Headline>


            <FlatList
                style={{ marginHorizontal: 30 }}
                data={clientes}
                renderItem={renderItem}
               
            />
            
            <FAB 
                icon='plus'
                style={globalStyles.fab}
                onPress= { () => navigation.navigate( "NuevoCliente",{ guardarConsultarAPI }) }
            />

        </View>
    );
}



export default Inicio;
