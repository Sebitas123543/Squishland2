import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  SafeAreaView
} from 'react-native';

export default function App() {

  const [cliente, setCliente] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');

  const [mensaje, setMensaje] = useState('');
  const [esError, setEsError] = useState(false);
  const [contadorPedidos, setContadorPedidos] = useState(0);
  const [ultimoPedido, setUltimoPedido] = useState(null);

  const handleRegistrarPedido = () => {
    if (!cliente.trim()) {
      setMensaje('Debe ingresar el nombre del cliente');
      setEsError(true);
      return;
    }

    if (!producto.trim()) {
      setMensaje('Debe ingresar un producto');
      setEsError(true);
      return;
    }

    const numCantidad = Number(cantidad);
    if (!cantidad.trim() || isNaN(numCantidad) || !Number.isInteger(numCantidad) || numCantidad <= 0) {
      setMensaje('Ingrese una cantidad válida');
      setEsError(true);
      return;
    }

    const numPrecio = Number(precioUnitario);
    if (!precioUnitario.trim() || isNaN(numPrecio) || numPrecio <= 0) {
      setMensaje('Debe ingresar un precio unitario válido');
      setEsError(true);
      return;
    }

    const totalCalculado = numCantidad * numPrecio;

    const nuevoPedido = {
      cliente: cliente.trim(),
      producto: producto.trim(),
      cantidad: numCantidad,
      precioUnitario: numPrecio,
      total: totalCalculado,
    };

    setUltimoPedido(nuevoPedido);
    setContadorPedidos(prev => prev + 1);
    setMensaje('Pedido registrado correctamente');
    setEsError(false);
  };

  const handleLimpiarFormulario = () => {
    setCliente('');
    setProducto('');
    setCantidad('');
    setPrecioUnitario('');
    setMensaje('');
    setUltimoPedido(null);
    setEsError(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Banner principal */}
        <View style={styles.header}>
          <Text style={styles.tituloEmpresa}>🧸 SquishLand Shop</Text>
          <Text style={styles.subtitulo}>
            Módulo de pedidos y squishies antiestrés
          </Text>
        </View>

        {/* Contador de la sesión */}
        <View style={styles.cardContador}>
          <Text style={styles.textoContador}>
            Squishies procesados hoy: <Text style={styles.numeroContador}>{contadorPedidos}</Text>
          </Text>
        </View>

        {/* Formulario */}
        <View style={styles.formulario}>
          
          <Text style={styles.label}>Cliente / Comprador</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Danna Gómez"
            placeholderTextColor="#b0bec5"
            value={cliente}
            onChangeText={setCliente}
          />

          <Text style={styles.label}>Modelo de Squishy</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Gatito Sanrio o Pandita Gigante"
            placeholderTextColor="#b0bec5"
            value={producto}
            onChangeText={setProducto}
          />

          <Text style={styles.label}>Cantidad</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. 3"
            placeholderTextColor="#b0bec5"
            keyboardType="numeric"
            value={cantidad}
            onChangeText={setCantidad}
          />

          <Text style={styles.label}>Precio Unitario ($)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. 12000"
            placeholderTextColor="#b0bec5"
            keyboardType="numeric"
            value={precioUnitario}
            onChangeText={setPrecioUnitario}
          />

          <View style={styles.contenedorBotones}>
            <View style={styles.boton}>
              <Button
                title="Registrar"
                onPress={handleRegistrarPedido}
                color="#6a1b9a"
              />
            </View>
            <View style={styles.boton}>
              <Button
                title="Limpiar"
                onPress={handleLimpiarFormulario}
                color="#ad1457"
              />
            </View>
          </View>
        </View>

        {/* Alerta de feedback */}
        {mensaje !== '' && (
          <View style={[styles.cardMensaje, esError ? styles.mensajeError : styles.mensajeExito]}>
            <Text style={styles.textoMensaje}>{mensaje}</Text>
          </View>
        )}

        {/* Resumen del último registro */}
        {ultimoPedido && !esError && (
          <View style={styles.cardResumen}>
            <Text style={styles.tituloResumen}>✨ Confirmación de Compra</Text>
            <Text style={styles.itemResumen}><Text style={styles.bold}>Cliente:</Text> {ultimoPedido.cliente}</Text>
            <Text style={styles.itemResumen}><Text style={styles.bold}>Squishy:</Text> {ultimoPedido.producto}</Text>
            <Text style={styles.itemResumen}><Text style={styles.bold}>Unidades:</Text> {ultimoPedido.cantidad}</Text>
            <Text style={styles.itemResumen}><Text style={styles.bold}>Precio c/u:</Text> ${ultimoPedido.precioUnitario.toLocaleString()}</Text>
            <View style={styles.divisor} />
            <Text style={styles.totalResumen}>
              Total a Cobrar: ${ultimoPedido.total.toLocaleString()}
            </Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e5f5',
  },
  scrollContent: {
    padding: 18,
    paddingTop: 30,
  },
  header: {
    backgroundColor: '#4a148c',
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
  },
  tituloEmpresa: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitulo: {
    fontSize: 13,
    color: '#ea80fc',
    marginTop: 2,
  },
  cardContador: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
    borderLeftWidth: 5,
    borderLeftColor: '#8e24aa',
  },
  textoContador: {
    fontSize: 14,
    color: '#4a148c',
  },
  numeroContador: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#8e24aa',
  },
  formulario: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#4a148c',
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#faf5fb',
    borderWidth: 1,
    borderColor: '#e1bee7',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#212121',
  },
  contenedorBotones: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  boton: {
    flex: 1,
  },
  cardMensaje: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
  },
  mensajeError: {
    backgroundColor: '#ffebee',
    borderWidth: 1,
    borderColor: '#f44336',
  },
  mensajeExito: {
    backgroundColor: '#f3e5f5',
    borderWidth: 1,
    borderColor: '#ab47bc',
  },
  textoMensaje: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#311b92',
    textAlign: 'center',
  },
  cardResumen: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ce93d8',
  },
  tituloResumen: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#4a148c',
  },
  itemResumen: {
    fontSize: 13,
    color: '#424242',
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
    color: '#6a1b9a',
  },
  divisor: {
    height: 1,
    backgroundColor: '#f3e5f5',
    marginVertical: 8,
  },
  totalResumen: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#8e24aa',
  },
});