<template>
    <div>
      <h1>Análisis de Inversiones</h1>
      <label for="idUsuario">ID de Usuario:</label>
      <input type="text" v-model="idUsuario" @click="buscarId" required>
      <button type="submit" @click="resultadoInversion">Buscar</button>
      <h3>{{ idUsuario }}, consulte el resultado de sus inversiones...</h3>
      <div v-if="validarMovimientos === false">
        <p>No se encontraron movimientos de este usuario</p>
      </div>
      <div v-else>
        <table>
          <thead>
            <tr>
              <th>CRIPTOMONEDA</th>
              <th>CANTIDAD</th>
              <th>PRECIO DE COMPRA</th>
              <th>VALOR ACTUAL</th>
              <th>SI VENDE AHORA OBTIENE...</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="movimiento in movimientos" :key="movimiento._id">
              <td>{{ movimiento.crypto_code }}</td>
              <td>{{ movimiento.crypto_amount }}</td>
              <td>{{ movimiento.precioCompra }}</td>
              <td>{{ movimiento.valorActual }}</td>
              <td>{{ movimiento.gananciaPerdida }}</td>
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
        validarMovimientos: false,
        movimientos: [],
      };
    },
    methods: {
      buscarId() {
        let idAlmacenado = localStorage.getItem('idUsuario');
        if (idAlmacenado) {
          idAlmacenado = idAlmacenado.replace(/{"id":"|"}|"/g, '');
          this.idUsuario = idAlmacenado;
        } else {
          console.error('Error al obtener el id de usuario');
        }
      },
      async resultadoInversion() {
        const apiClient = this.ApiClient();
        try {
          const response = await apiClient.get(`/transactions?q={"user_id":"${this.idUsuario}"}`);
          if (response.data.length > 0) {
            for (let movimiento of response.data) {
              const valorActual = await this.obtenerValorCripto(movimiento.crypto_code);
              movimiento.valorActual = valorActual;
              movimiento.precioCompra = movimiento.money / movimiento.crypto_amount;
              movimiento.gananciaPerdida = (valorActual * movimiento.crypto_amount) - movimiento.money;
            }
            this.movimientos = response.data;
            this.validarMovimientos = true;
          } else {
            console.log('No hay transacciones');
            this.validarMovimientos = false;
          }
        } catch (error) {
          console.error(error);
          this.validarMovimientos = false;
        }
      },
      async obtenerValorCripto(cryptoCode) {
        const fiat = 'ars';
        const api = `https://criptoya.com/api/argenbtc/${cryptoCode}/${fiat}`;
        try {
          const respuesta = await axios.get(api);
          return respuesta.data.totalBid;
        } catch (error) {
          console.error('Error al obtener el valor de la criptomoneda:', error);
          return null;
        }
      },
      ApiClient() {
        const apiClient = axios.create({
          baseURL: 'https://laboratorio3-f36a.restdb.io/rest/',
          headers: { 'x-apikey': '60eb09146661365596af552f' },
        });
        return apiClient;
      },
    },
  };
  </script>
  
  <style>
  </style>
  