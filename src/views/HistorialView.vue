<template>
 <div>
    <h1>Historial de Movimientos</h1>
    <form @submit.prevent="transaccionesRealizadas"></form>
    <div>
      <label for="idUsuario">ID de Usuario:</label>
      <input type="text" v-model="idUsuario" @click="buscarId" required>
      <button type="submit" @click="movimientosDeUsuario"> Buscar</button>
    </div>
    <h3>Bienvenido, usuario {{ idUsuario }} estos son sus movimientos...</h3>
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
            <th>... Edición</th>
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
      <h2>Editar Movimiento</h2>
      <form @submit.prevent="guardarEdicion">
        <div>
          <label for="edicion">Cantidad a editar:</label>
          <input type="number" v-model="movimientoAEditar.crypto_amount" step="0.01" required>
        </div>
        <button type="submit">Guardar edición</button>
        <button type="button" @click="cancelarEdicion">Cancelar</button>
        <h6>En caso de una compra, la nueva cantidad debe ser inferior a la previemente registrada</h6>
        <h6>En caso de ser una venta, la cifra debe ser mayor</h6>
      </form>
    </div>
 </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      idUsuario: '',
      movimientos: [],
      validarMovimientos: null,
      movimientoAEditar: null,
      nuevoMonto: ''
    };
  },
  methods: {
    buscarId() {
      let idAlmacenado = localStorage.getItem('idUsuario');
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
    // dividimos el valor existente por sí mismo para obtener el valor unitario de la cripto y multiplicamos el nuevo valor por el valor unitario para obtener la edición
    borrarMovimiento(idMovimiento) {
     const apiClient = this.ApiClient();
     if (confirm('¿Está seguro de que desea borrar este movimiento? No podrá restaurarlo...')) {
      apiClient.delete(`/transactions/${idMovimiento}`)
        .then(response => {
          console.log('Movimiento eliminado:', response.data);
          this.movimientosDeUsuario(); // recarga los movimientos después de eliminar uno
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
table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #f2f2f2;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #4CAF50;
  color: white;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
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
