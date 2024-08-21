<template>
<div>
    <h1>Historial de Movimientos</h1>
    <form @submit.prevent="transaccionesRealizadas"></form>
    <div>
        <label for="idUsuario">Ingrese su nombre de usuario </label>
        <input type="text" v-model="idUsuario" required>
        <button type="submit"> Buscar</button>
    </div>
    <h2>Movimientos del Usuario {{ idUsuario }}</h2>
    <div v-if="operacion.length === 0">
        <p>No se encontraron movimientos de este usuario</p>
    </div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Operaciónes realizadas</th>
            <th>Criptomonedas</th>
            <th>Cantidad</th>
            <th>Monto</th>
            <th>Fecha y Hora</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="operacion in operacion" :key="operacion">
            <td>{{ operacion.compraVenta}}</td>
            <td>{{ operacion.crypto_code }}</td>
            <td>{{ operacion.crypto_amount }}</td>
            <td>{{ operacion.money }}</td>
            <td>{{ operacion.datetime }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</div>
</template>

<style>
</style>

<script>
import axios from 'axios';
 
const apiClient = axios.create({
  baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
  headers: { 'x-apikey': '60eb09146661365596af552f' }
});

export default {
  data() {
    return {
      idUsuario: '',        // ID de usuario a consultar
      operacion: [],   // Lista de transacciones obtenidas
      submitted: false    // Marca si se ha realizado una consulta
    };
  }
}
</script>
