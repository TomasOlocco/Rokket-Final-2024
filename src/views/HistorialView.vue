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
          <tr v-for="movimiento in movimientos" :key="movimiento">
            <td>{{ movimientosAlmacenados.action}}</td>
            <td>{{ movimientosAlmacenados.crypto_code }}</td>
            <td>{{ movimientosAlmacenados.crypto_amount }}</td>
            <td>{{ movimientosAlmacenados.money }}</td>
            <td>{{ movimientosAlmacenados.datetime }}</td>
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
      movimientosAlmacenados: [],   // Lista de transacciones obtenidas
      submitted: false,
      validarMovimientos: null,
      nuevoId: ''
    };
  },
  methods: { 
    ApiClient() {
     return axios.create({
     baseURL: 'https://laboratorio3-f36a.restdb.io/rest/',
     headers: { 'x-apikey': '60eb09146661365596af552f' },
     });
    },
    buscarId() {
    // buscar el usuario almacenado en localStorage
    const idAlmacenado = localStorage.getItem('idUsuario');
    if (idAlmacenado) {
      this.idUsuario = idAlmacenado;
      this.usuarioNoVacio = true;
    }
    else{
      console.error('Error al obtener el id de usuario');
    };
  },
  verificarMovimientosRegistrados() {
      const idUsuario = this.nuevoId || localStorage.getItem('idUsuario');
      const url = `https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id":"${idUsuario}"}`;
      const apiClient = this.ApiClient();

      apiClient
        .get(url)
        .then(response => {
          this.movimientos = response.data;
          if (this.movimientos.length === 0) {
            console.log('No se encontraron movimientos registrados.');
          } else {
            console.log('Se encontraron movimientos registrados.');
          }
        })
        .catch(error => {
          console.error('Error al obtener los movimientos:', error);
        });
    },
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
