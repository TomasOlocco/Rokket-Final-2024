<template>
<body>
 <div>
    <p class="HdM">Historial de Movimientos</p>
    <p>Consulte el historial de sus movimientos realizados</p>
    <div>
      <div>
        <input type="text" v-model="idUsuario" placeholder="ID de Usuario" @click="buscarId" required>
        <button type="submit" class="btn_Buscar" @click="movimientosDeUsuario"> Buscar</button>
        <div v-if="nombreCompleto">
         <p>{{ nombreCompleto }}, consulte sus movimientos...</p>
        </div>
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
            <th>OPERACION REALIZADA</th>
            <th>MONTO</th>
            <th>FECHA Y HORA</th>
            <th>... Editar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movimiento in movimientos" :key="movimiento._id">
            <td>{{ movimiento.crypto_code }}</td>
            <td>{{ movimiento.crypto_amount }}</td>
            <td>{{ movimiento.action === 'purchase' ? 'Compra' : 'Venta' }}</td>
            <td>{{ movimiento.money }}</td>
            <td>{{ movimiento.datetime }}</td>
            <td>
              <button @click="editarMovimiento(movimiento)">Editar</button>
              <button @click="borrarMovimiento(movimiento._id)">Borrar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="movimientoAEditar">
      <form @submit.prevent="guardarEdicion">
        <div class="inputEdicion">
          <label for="edicion">Cantidad a editar</label>
          <input type="number" v-model="movimientoAEditar.crypto_amount" step="0.01" required>
        </div>
        <div class="edicion">
        <button type="submit">Guardar edición</button>
        <button type="button" @click="cancelarEdicion">Cancelar</button>
        </div>
        <p class="avisoEdicion">En caso de una compra, la nueva cantidad debe ser inferior a la previemente registrada. <br />
        En caso de ser una venta, la cifra debe ser mayor.</p>
      </form>
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
      movimientos: [],
      validarMovimientos: null,
      movimientoAEditar: null,
      nuevoMonto: ''
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
    ApiClient() {
      const apiClient = axios.create({
        baseURL: 'https://laboratorio3-f36a.restdb.io/rest/',
        headers: { 'x-apikey': '60eb09146661365596af552f' }
      });
      return apiClient;
    },
    movimientosDeUsuario() {
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
    },

    editarMovimiento(movimiento) {
     this.movimientoAEditar = { ...movimiento }; // crea una copia del movimiento para editar
     this.nuevoMonto = '';
    },

    guardarEdicion() {
     const movimientoOriginal = this.movimientos.find(m => m._id === this.movimientoAEditar._id);
     if (this.movimientoAEditar.action === 'purchase') {
       if (this.movimientoAEditar.crypto_amount >= movimientoOriginal.crypto_amount) {
       alert('En caso de una compra, la nueva cantidad debe ser inferior a la previemente registrada');
       return;
      }
    } else if (this.movimientoAEditar.action === 'sale') {
       if (this.movimientoAEditar.crypto_amount < movimientoOriginal.crypto_amount) {
       alert('En caso de una venta, la nueva cantidad debe ser mayor a la previemente registrada');
       return;
      }
    }
    const valorUnitario = movimientoOriginal.money / movimientoOriginal.crypto_amount;
    this.movimientoAEditar.money = this.movimientoAEditar.crypto_amount * valorUnitario;
    const apiClient = this.ApiClient();
    apiClient.put(`/transactions/${this.movimientoAEditar._id}`, this.movimientoAEditar)
      .then(response => {
        console.log('Movimiento actualizado:', response.data);
        this.movimientosDeUsuario(); // recarga los movimientos
        this.movimientoAEditar = null; // limpia el formulario de edicion
        alert('Movimiento editado con éxito.');
      })
      .catch(error => {
        console.error('Error al actualizar el movimiento:', error);
      });
    },

    cancelarEdicion() {
     this.movimientoAEditar = null;
    },

    // dividimos el valor existente por sí mismo para obtener el valor unitario de la cripto y multiplicamos el nuevo valor por el valor unitario para obtener la edición
    borrarMovimiento(idMovimiento) {
     const apiClient = this.ApiClient();
     if (confirm('¿Está seguro de que desea borrar este movimiento? No podrá restaurarlo...')) {
      apiClient.delete(`/transactions/${idMovimiento}`)
        .then(response => {
          console.log('Movimiento eliminado:', response.data);
          this.movimientosDeUsuario(); // recarga los movimientos despues de eliminar uno
        })
        .catch(error => {
          console.error('Error al eliminar el movimiento:', error);
        });
      }
    }
  }
};
</script>

<style>
.HdM{
  font-size: 45px;
  margin-top: -60px;
  margin-bottom: 30px;
}
body{
  font-family: "Ubuntu", sans-serif;
  font-weight: 400;
  font-style: normal;
}
table {
  width: 80%;
  border-collapse: collapse;
  margin: auto;
  margin-top: 30px;
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

.inputEdicion{
  margin-top: 250px;

}
.edicion{
  margin-top: 20px;
}
input[type="number"] {
  padding-left: 10px;
  border: 2px solid #201f1f;
  border-radius: 8px;
  font-size: 16px;
  background-color: #201f1f;
  border-width: 0.5px;
  border-color: black;
}
button{
  background-color: #29005e;
  color: #888;
  margin-top: 3px;
  padding: 3px 10px;
  border-width: 1px;
  border-radius: 8px;
  border-style: solid;
  border-color: black;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  gap: 10px;
}

button:hover{
  background-color: #58c2ff;
}

.avisoEdicion{
  gap: 15px;
  margin-top: 30px;
  font-size: 12px;
}

form{
  font-size: 16px;
  transition: background-color 0.3s ease;
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

.formularioEdicion {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #1f0052;
  padding: 20px;
  border: 1px solid #00ccff;
  border-radius: 4px;
  color: white;
}
</style>
