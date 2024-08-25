<template>
  <div>
    <h1>Compra y Venta de Criptomonedas</h1>
    <form @submit.prevent="consultarApi">
      <div>
        <label for="idUsuario">ID de Usuario:</label>
        <input type="text" v-model="idUsuario" @click="buscarId" required>
      </div>
      <div>
        <label for="tipoDeOperacion">Elija el tipo de operación</label>
        <select v-model="operacion" @change="tipoDeOperacion" required>
          <option value="compra">Comprar</option>
          <option value="venta">Vender</option>
        </select>
      </div>
      <div>
        <label for="codigoCripto">Elija la Criptomoneda:</label>
        <select v-model="crypto_code" @change="obtenerValorCripto" required>
          <option value="btc">Bitcoin (BTC)</option>
          <option value="eth">Ethereum (ETH)</option>
          <option value="usdc">USD Coin (USDC)</option>
          <option value="dai">Dai (DAI)</option>
        </select>
      </div>
      <div v-if="valorCripto">
        <p>Valor Actual: {{ valorCripto }} ARS</p>
      </div>
      <div>
        <label for="cantidadCripto">Cantidad de Criptomoneda:</label>
        <input type="number" v-model="cantidadCripto" step="0.01" required>
      </div>
      <div>
        <label for="monto">Monto en Dinero:</label>
        <input type="number" v-bind="monto" :value="cantidadCripto * valorCripto" step="0.01" readonly required>
      </div>
      <button type="submit">Registrar Compra</button>
    </form>
    <div v-if="verificarTransaccion">
      <p>{{ verificarTransaccion }}</p>
      <div v-if="operacion">
        <h2>Detalles de la Transacción:</h2>
        <p><strong>ID de Usuario:</strong> {{ operacion.user_id }}</p>
        <p><strong>Acción:</strong> {{ operacion.action }}</p>
        <p><strong>Código de Criptomoneda:</strong> {{ operacion.crypto_code }}</p>
        <p><strong>Cantidad de Criptomoneda:</strong> {{ operacion.crypto_amount }}</p>
        <p><strong>Monto en Dinero:</strong> {{ operacion.money }}</p>
        <p><strong>Fecha y Hora:</strong> {{ operacion.datetime }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const apiClient = axios.create({
  baseURL: 'https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id":"${idUsuario}","crypto_code":"${codigoCripto}"}',
  headers: { 'x-apikey': '60eb09146661365596af552f' }
});
export default {
  data() {
    return {
      idUsuario: '',
      tipoDeOperacion: '',
      crypto_code: '',
      cantidadCripto: '',
      monto: '',
      verificarTransaccion: '',
      movimientos: [],
      operacion: null, 
      valorCripto: null,
      usuarioNoVacio: false
    };
  },
  methods: {
    buscarId() {
    // buscar el usuario almacenado en localStorage
    const idAlmacenado = localStorage.getItem('idUsuario');
    if (idAlmacenado) {
      this.idUsuario = idAlmacenado;
      this.usuarioNoVacio = true;
    }
    else{
      console.error('Error al obtener el id de usuario');
    }
  },
    tipoDeOperacion(){
      if(tipoDeOperacion === 'compra'){
        this.tipoDeOperacion === 'purchase'
      }
      else{
        this.tipoDeOperacion === 'sale';
      }
    },
    async obtenerValorCripto() {
      if (!this.crypto_code) return;
      const moneda = this.crypto_code;
      const fiat = 'ars';
      const api = `https://criptoya.com/api/argenbtc/${moneda}/${fiat}`;
      try {
        const respuesta = await axios.get(api);
        console.log('Valor de la criptomoneda:', respuesta.data);
        this.valorCripto = respuesta.data.totalBid;
      } catch (error) {
        console.error('Error al obtener el valor de la criptomoneda:', error);
        this.valorCripto = null;
      }
    },
    async consultarApi() {
      const operacion = {
        user_id: this.idUsuario,
        action: this.tipoDeOperacion === 'compra' ? 'purchase' : 'sale',
        crypto_code: this.crypto_code,
        crypto_amount: this.cantidadCripto,
        money: this.cantidadCripto * this.valorCripto,
        datetime: new Date().toLocaleString()
      };
      try {
        const respuesta = await apiClient.post('/transactions', operacion);
        this.verificarTransaccion = 'Transacción registrada exitosamente';
        this.operacion = respuesta.data;
        // Agregar la transacción al objeto movimientos
        this.movimientos.push(operacion);
        // modificar la transaccion en la misma pantalla
        this.$modificarTransaccion(() => {
          console.log('Transacción actualizada:', this.operacion);
        });
      } catch (error) {
        //this.verificarTransaccion = 'Error al registrar la transacción';
        console.error('Error al hacer la solicitud POST:', error.respuesta || error.mensaje);
      }
    }
  }
};
</script>

<style>
</style>
