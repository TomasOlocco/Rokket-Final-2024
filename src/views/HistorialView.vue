<template>
 <div>
    <h1>Historial de Movimientos</h1>
    <form @submit.prevent="transaccionesRealizadas"></form>
    <div>
      <label for="idUsuario">ID de Usuario:</label>
      <input type="text" v-model="idUsuario" @click="buscarId" required>
      <button type="submit" @click="movimientosDeUsuario"> Buscar</button>
    </div>
    <h2>Movimientos del Usuario {{ idUsuario }}</h2>
    <div v-if="validarMovimientos === false">
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
          <tr v-for="movimiento in movimientos" :key="movimiento._id">
            <td>{{ movimiento.datetime }}</td>
            <td>{{ movimiento.crypto_code }}</td>
            <td>{{ movimiento.crypto_amount }}</td>
            <td>{{ movimiento.money }}</td>
            <td>{{ movimiento.action === 'purchase' ? 'Compra' : 'Venta' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
 </div>
</template>

<script>
import axios from 'axios';
 
export default {
  data() {
    return {
      idUsuario: '',
      movimientos: [],   // Lista de transacciones obtenidas
      submitted: false,
      validarMovimientos: null,
      nuevoId: ''
    };
  },
  methods: {
    buscarId() {
    const idAlmacenado = localStorage.getItem('idUsuario');
    if (idAlmacenado) {
      this.idUsuario = idAlmacenado;
      this.usuarioNoVacio = true;
    }
    else{
      console.error('Error al obtener el id de usuario');
    }
  },
  ApiClient(){
    const apiClient = axios.create({
      baseURL: 'https://laboratorio3-f36a.restdb.io/rest/',
      headers: { 'x-apikey': '60eb09146661365596af552f' }
    });
    return apiClient;
  },
  movimientosDeUsuario(){
    const apiClient = this.ApiClient();
    apiClient.get(`/transactions?q={"user_id":"${this.idUsuario}"}`)
    .then(response => {
      if (response.data.length > 0) {
       this.movimientos = response.data;
       this.validarMovimientos = true;
      } else {
        console.log('No hay transacciones');
       this.validarMovimientos = false;
      }
    })
    .catch(error => {
      console.error(error);
      this.validarMovimientos = false;
    });
   }
  }
};
</script>

<style>
thead {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
