<template>
  <body>
  <div>
    <p class="CYP">Compra y Venta de Criptomonedas</p>
    <p>Realice sus transacciones de criptomonedas</p>
    <div>
        <input type="text" v-model="idUsuario" placeholder="ID de Usuario" @click="buscarId" required>
        <div v-if="nombreCompleto">
         <p>Bienvenido {{ nombreCompleto }}. Elija la operación que desea realizar</p>
        </div>
      </div>
    <form class="form-container" @submit.prevent="consultaApi">
      <div>
        <label for="tipoDeOperacion">Operación</label>
        <select v-model="tipoDeOperacion" placeholder="Operacion">
          <option value="purchase">Comprar</option>
          <option value="sale">Vender</option>
        </select>
      </div>
      <div>
        <label for="codigoCripto">Criptomoneda</label>
        <select v-model="crypto_code" @change="obtenerValorCripto" required>
          <option value="btc">Bitcoin (BTC)</option>
          <option value="eth">Ethereum (ETH)</option>
          <option value="dai">Dai (DAI)</option>
        </select>
      </div>
      <div v-if="valorCripto">
        <p>Valor Actual: {{ valorCripto }} ARS</p>
      </div>
      <div>
        <label for="cantidadCripto">Cantidad</label>
        <input type="number" v-model="cantidadCripto" placeholder="Cantidad" step="0.01" required>
      </div>
      <div>
        <label for="monto">Monto en Dinero</label>
        <input type="number" v-bind="monto" placeholder="Monto en Dinero" :value="cantidadCripto * valorCripto" readonly required>
      </div>
      <button type="submit" class="btn-registrar">Registrar Transacción</button>
    </form>
    <div v-if="verificarTransaccion">
     <p>{{ verificarTransaccion }}</p>
     <div class="detallesTransaccion" v-if="operacion">
      <h1>Detalles de la Transacción:</h1>
      <p><strong>ID de Usuario:</strong> {{ operacion.idUsuario }}</p>
      <p><strong>Acción:</strong> {{ operacion.action === 'purchase' ? 'Compra' : 'Venta' }}</p>
      <p><strong>Código de Criptomoneda:</strong> {{ operacion.criptomoneda }}</p>
      <p><strong>Cantidad de Criptomoneda:</strong> {{ operacion.cantidad }}</p>
      <p><strong>Monto en Dinero:</strong> {{ operacion.monto }}</p>
      <p><strong>Fecha y Hora:</strong> {{ operacion.fechaHora }}</p>
    </div>
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
     nombreCompleto: '',
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
  
    consultaApi() {
      const operacion = {
        user_id: this.idUsuario,
        action: this.tipoDeOperacion,
        crypto_code: this.crypto_code,
        crypto_amount: this.cantidadCripto,
        money: this.cantidadCripto * this.valorCripto,
        datetime: new Date().toISOString() // cambié a ISO para asegurar un formato estándar
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

<style scoped>
.CYP{
  font-size: 45px;
  margin-top: -60px;
  margin-bottom: 30px;
}

form.form-container {
  flex-direction: column; 
  gap: 5px;
  max-width: 250px;
  margin: 0 auto;
}

form div {
  display: flex;
  flex-direction: column;
}

form label {
  margin-bottom: 0px;
  margin-top: 6px;
  font-weight: bold;
}

form input, form select {
  padding: 4px;
  font-size: 16px;
  border-radius: 5px;
  box-sizing: border-box;
  width: 100%;
}

form select{
  padding-left: 10px;
  margin-left: 0;
}

form input[type="number"] {
  width: 100%;
  padding: 4px;
  padding-left: 10px;
  margin: 2px;
}

input[type="number"] {
  border: 2px solid #201f1f;
  border-radius: 8px;
  font-size: 16px;
  background-color: #201f1f;
  border-width: 0.5px;
  border-color: black;
}

input[type="number"]::placeholder {
  color: #888;
}

select{
  width: 150px;
  padding: 7px;
  margin: 2px;
  box-sizing: border-box;
  border: 2px solid #201f1f;
  border-radius: 8px;
  font-size: 16px;
  background-color: #201f1f;
  border-width: 0.5px;
  border-color: black;
  margin-left: 50px;
}
.btn-registrar {
  background-color: #29005e;
  margin: -35px;
  color: white;
  padding: 8px 15px;
  border-width: 1px;
  border-radius: 8px;
  border-style: solid;
  border-color: black;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-top: 50px;
  margin-bottom: 120px;
}

.btn-registrar:hover {
  background-color: #58c2ff;
}

.detallesTransaccion{
  font-size: 15px;
  color: #888;
  gap: 15px;
  margin-top: 30px;
  margin-bottom: 70px;
}
</style>
