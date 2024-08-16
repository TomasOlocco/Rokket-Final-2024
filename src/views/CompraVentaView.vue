<template>
  <div>
    <h1>Compra y Venta de Criptomonedas</h1>
    <form @submit.prevent="consultarApi">
      <div>
        <label for="idUsuario">ID de Usuario:</label>
        <input type="text" v-model="idUsuario" @input="verficarId" required>
      </div>
      <div>
        <label for="compraVenta">Elija el tipo de operación</label>
        <select v-model="compraVenta" @change="compraVenta" required>
          <option value="purchase">Comprar</option>
          <option value="sale">Vender</option>
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
        <input type="number" v-model="monto" :value="cantidadCripto * valorCripto" step="0.01" readonly required>
      </div>
      <button type="submit">Registrar Compra</button>
    </form>
    <div v-if="verificarTransaccion">
      <p>{{ verificarTransaccion }}</p>
      <div v-if="operacion">
        <h2>Detalles de la Transacción:</h2>
        <p><strong>Usuario:</strong> {{ operacion.user_id }}</p>
        <p><strong>Acción Realizada:</strong> {{ operacion.compraVenta }}</p>
        <p><strong>Cantidad:</strong> {{ operacion.crypto_amount }}</p>
        <p><strong>Monto:</strong> {{ operacion.money }}</p>
        <p><strong>Fecha y Hora:</strong> {{ operacion.datetime }}</p>
      </div>
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
      idUsuario: '',
      compraVenta: {
        compra: 'compra',
        vender: 'vender'
      },
      crypto_code: '',
      cantidadCripto: '',
      monto: '',
      verificarTransaccion: '',
      operacion: null, 
      valorCripto: null,
      usuarioNoVacio: false
    };
  },
  methods: {
    verficarId() {
      const idAlmacenado = localStorage.getItem('idUsuario');
      this.usuarioNoVacio = (this.idUsuario === idAlmacenado);
    },

    compraVenta(){
     // 
    },

    async obtenerValorCripto() {
      if (!this.crypto_code) return;

      const moneda = this.crypto_code;
      const fiat = 'ars';
      const api = `https://criptoya.com/api/argenbtc/${moneda}/${fiat}`;

      const url = `https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id":"${idUsuario}","crypto_code":"${codigoCripto}"}`;
        const apiClient = this.ApiClient();
        
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
        action: this.compraVenta === 'comprar' ? 'purchase' : 'sale',
        crypto_code: this.crypto_code,
        crypto_amount: this.cantidadCripto,
        money: this.cantidadCripto * this.valorCripto,
        datetime: new Date().toLocaleString()
      };

      try {
        const respuesta = await apiClient.post('/transactions', operacion);
        this.verificarTransaccion = 'Transacción registrada exitosamente';
        this.operacion = respuesta.data;
        this.cantidadCripto = '';
        this.monto = '';
        this.valorCripto = null;

        // modificar la transaccion en la misma pantalla
        this.$modificarTransaccion(() => {
          console.log('Transacción actualizada:', this.operacion);
        });
      } catch (error) {
        this.verificarTransaccion = 'Error al registrar la transacción';
        console.error('Error al hacer la solicitud POST:', error.respuesta || error.mensaje);
      }
    }
  },
  buscarId() {
    // buscar el usuario almacenado en localStorage
    const idAlmacenado = localStorage.getItem('idUsuario');
    if (idAlmacenado) {
      this.idUsuario = idAlmacenado;
      this.usuarioNoVacio = true;
    }
  }
};
</script>
