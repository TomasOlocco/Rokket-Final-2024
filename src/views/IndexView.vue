<template>
<div id="app">
    <p class="logo">{{ logo }}</p>
        <img src="/rokket.gif" class="gif-logo">
    <form @submit.prevent="registrarUsuario">
    <div>
    <h2>Registro de Usuario</h2>
     <div>
       <input type="text" v-model="nombre" placeholder="Nombre" required>
     </div>
    <div>
      <input type="text" v-model="apellido" placeholder="Apellido" required>
    </div>
      <button type="submit" class="btn-registrar">Registrar</button>
    </div>
    <div v-if="idAlf">
      <p>Usuario registrado con ID: {{ idAlf }}</p>
      <router-link to="/CompraYventa">Ir a CriptoCompra</router-link>
    </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'IndexView',
  data() {
    return {
      nombre: '',
      apellido: '',
      idAlf: null,
      logo: 'ROKKETT',
      imagenlogo: 'src/assets/imagenes/rokket.gif'
    };
  },
  methods: {
    generarId() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let id = '';
      for (let i = 0; i < 8; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    },
    registrarUsuario() {
      const idGenerado = this.generarId();
      const idAlf = {
        id: idGenerado
      };
      localStorage.setItem('idUsuario', JSON.stringify(idAlf)),
      console.log(idAlf);
      this.idAlf = idGenerado;
      this.nombre = '';
      this.apellido = '';
    }
  }
};
</script>

<style>
*{
    color:rgb(177, 162, 177);
}

#app{
  margin-bottom: 1px;
}

body{
    background-color:rgb(54, 6, 56);
}

.logo{
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 50px;
  margin-top: -75px;
  margin-bottom: 35px;
}

.gif-logo{
    width: 300px;
    border-radius: 20px;
    margin-bottom: 50px;
}

.idGenerado{
    color: rgb(226, 226, 226);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}
form {
  margin-top: -50px;
  margin-bottom: 50px;
}
input[type="text"] {
  padding: 7px;
  margin: 2px;
  box-sizing: border-box;
  border: 2px solid #201f1f;
  border-radius: 8px;
  font-size: 16px;
  background-color: #201f1f;
  border-width: 0.5px;
  border-color: black;
}

input[type="text"]::placeholder {
  color: #888;
}

.btn-registrar {
  background-color: #29005e;
  margin: 10px;
  color: white;
  padding: 10px 20px;
  border-width: 1px;
  border-radius: 8px;
  border-style: solid;
  border-color: black;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn-registrar:hover {
  background-color: #58c2ff;
}
</style>