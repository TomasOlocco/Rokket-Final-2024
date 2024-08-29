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
        <select v-model="tipoDeOperacion" required>
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
        <input type="number" v-bind="monto" :value="cantidadCripto * valorCripto" readonly required>
      </div>
      <button type="submit">Registrar Transacción</button>
    </form>
    <div v-if="verificarTransaccion">
     <p>{{ verificarTransaccion }}</p>
     <div v-if="operacion">
      <h2>Detalles de la Transacción:</h2>
      <p><strong>ID de Usuario:</strong> {{ operacion.idUsuario }}</p>
      <p><strong>Acción:</strong> {{ operacion.action === 'purchase' ? 'Compra' : 'Venta' }}</p>
      <p><strong>Código de Criptomoneda:</strong> {{ operacion.criptomoneda }}</p>
      <p><strong>Cantidad de Criptomoneda:</strong> {{ operacion.cantidad }}</p>
      <p><strong>Monto en Dinero:</strong> {{ operacion.monto }}</p>
      <p><strong>Fecha y Hora:</strong> {{ operacion.fechaHora }}</p>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
     idUsuario: '',
     crypto_code: '',
     cantidadCripto: '',
     monto: '',
     verificarTransaccion: '',
     operacion: null, 
     valorCripto: null,
     usuarioNoVacio: false,
     fechaHora: '',
     tipoDeOperacion: '',
    };
  },
  methods: {
    buscarId() {
      // Buscar el usuario almacenado en localStorage
      let idAlmacenado = localStorage.getItem('idUsuario');
      if (idAlmacenado) {
        idAlmacenado = idAlmacenado.replace(/{"id":"|"}|"/g, '');
        this.idUsuario = idAlmacenado;
        this.usuarioNoVacio = true;
      } else {
        console.error('Error al obtener el id de usuario');
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
  
    consultarApi() {
      const operacion = {
        user_id: this.idUsuario,
        action: this.tipoDeOperacion,
        crypto_code: this.crypto_code,
        crypto_amount: this.cantidadCripto,
        money: this.cantidadCripto * this.valorCripto,
        datetime: new Date().toISOString() // Cambié a ISO para asegurar un formato estándar
      };

      axios
        .post('https://laboratorio3-f36a.restdb.io/rest/transactions', operacion, {
           headers: {
              'x-apikey': '60eb09146661365596af552f',
            },
        })
       .then((response) => {
          console.log('Operación exitosa:', response.data);
          // Actualizar el objeto `operacion` en `data`
          this.operacion = {
            idUsuario: operacion.user_id,
            action: operacion.action,
            criptomoneda: operacion.crypto_code,
            cantidad: operacion.crypto_amount,
            monto: operacion.money,
            fechaHora: operacion.datetime
          };
          this.verificarTransaccion = 'Transacción registrada exitosamente';
        })
       .catch((error) => {
         this.verificarTransaccion = 'Error al guardar la transacción: ' + error.message;
       });
    }
  }
};
</script>

<style>
</style>
