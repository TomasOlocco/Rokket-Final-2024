<template>
  <body>
    <div>
      <p class="Analisis"> Análisis de Inversiones</p>
      <p>Consulte sobre los resultados de sus inversiones</p>
      <div>
        <input type="text" v-model="idUsuario" placeholder="ID de Usuario" @click="buscarId" required>
        <button type="submit"  class="btn_Buscar" @click="resultadoInversion">Buscar</button>
        <div v-if="nombreCompleto">
         <p>{{ nombreCompleto }}, estos son los resultados de sus inversiones...</p>
        </div>
      </div>
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
              <td>$ {{ movimiento.precioCompra }}</td>
              <td>$ {{ movimiento.valorActual }}</td>
              <td :class="{'ganancia': movimiento.gananciaPerdida > 0, 'perdida': movimiento.gananciaPerdida < 0}">
               $ {{ movimiento.gananciaPerdida }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </body>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        idUsuario: '',
        validarMovimientos: null,
        movimientos: [],
      };
    },
    methods: {
      buscarId() {
      // buscar el usuario almacenado en localStorage
      let idAlmacenado = localStorage.getItem('idUsuario');
      let nombreAlmacenado = localStorage.getItem('nombreCompleto');
      if(nombreAlmacenado){
        this.nombreCompleto = nombreAlmacenado;
      }
      
      if (idAlmacenado) {
        idAlmacenado = idAlmacenado.replace(/{"id":"|"}|"/g, '');
        this.idUsuario = idAlmacenado;
        this.usuarioNoVacio = true;
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
.Analisis{
  font-size: 45px;
  margin-top: -60px;
  margin-bottom: 30px;
}

th, td {
  border: 1px solid #888;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #0f175f;
  color: #b1afaf;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

input, button{
  align-items: center;
  margin-left: 4px;
}

.btn_Buscar{
  background-color: #29005e;
  color: white;
  padding: 8px 20px;
  border-width: 1px;
  border-radius: 8px;
  border-style: solid;
  border-color: black;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-top: 50px;
  font-family: "Ubuntu", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.btn_Buscar:hover {
  background-color: #58c2ff;
}

.ganancia {
  color: green;
}
.perdida {
  color: red;
}
</style>
  