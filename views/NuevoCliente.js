import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ({ navigation, route }) => {

    const { guardarConsultarAPI } = route.params;



    const [nombre, guardarNombre] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [correo, guardarCorreo] = useState('');
    const [empresa, guardarEmpresa] = useState('');
    const [alerta, guardarAlerta] = useState(false);


    // detectar si estamos editando o no 
    useEffect(() => {
        if (route.params.cliente) {
            const { nombre, telefono, correo, empresa } = route.params.cliente;

            guardarNombre(nombre);
            guardarTelefono(telefono);
            guardarCorreo(correo);
            guardarEmpresa(empresa);

        }
    }, [])


    // almacenar cliente en BD
    const guardarCliente = async () => {
        // validar
        if (nombre === '' || telefono === '' || correo === '' || empresa === '') {
            guardarAlerta(true)
            return;
        }

        // generar cliente
        const cliente = { nombre, telefono, correo, empresa };
        console.log(cliente)

        // guardar el cliente en la API - si se esta editando o creando un cliente
        if (route.params.cliente) {

            const  { id } = route.params.cliente;
            cliente.id = id;
            const url = `http://10.0.2.2:3000/clientes/${id}`;

            try {
                await axios.put(url,cliente);
            } catch (error) {
                console.log(error);
            }



        } else {
            try {
                await axios.post('http://10.0.2.2:3000/clientes', cliente);
            } catch (error) {
                console.log(error);
            }
        }


        // redireccionar 
        navigation.navigate("Inicio");



        // limpiar el form
        guardarNombre('');
        guardarTelefono('');
        guardarCorreo('');
        guardarEmpresa('');

        // cambiar a true para traernos el nuevo cliente
        guardarConsultarAPI(true);
    }

    return (
        <View style={globalStyles.contenedor}>

            <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>


            <TextInput
                label="Nombre"
                placeholder="Yesica"
                onChangeText={(texto) => guardarNombre(texto)}
                value={nombre}
                style={styles.input}
            />
            <TextInput
                label="Teléfono"
                placeholder="3115678965"
                onChangeText={(texto) => guardarTelefono(texto)}
                value={telefono}
                style={styles.input}
            />
            <TextInput
                label="Correo"
                placeholder="correo@correo.com"
                onChangeText={(texto) => guardarCorreo(texto)}
                value={correo}
                style={styles.input}
            />
            <TextInput
                label="Empresa"
                placeholder="Nombre Empresa"
                onChangeText={(texto) => guardarEmpresa(texto)}
                value={empresa}
                style={styles.input}
            />

            <Button icon='pencil-circle' mode='contained' onPress={() => guardarCliente()} >
                Guardar Cliente
            </Button>

            <Portal>
                <Dialog
                    visible={alerta}
                    onDismiss={() => guardarAlerta(false)}
                >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => guardarAlerta(false)}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})

export default NuevoCliente;
