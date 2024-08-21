<template>
<div id="app">
    <h1>{{ logo }}</h1>
          <img v-bind:src="imagenlogo" class="imagen-logo">
    <form @submit.prevent="registrarUsuario">
      <div>
        <h1>Registro de Usuario</h1>
        <label for="nombre">Nombre:</label>
        <input type="text" v-model="nombre" required>
      </div>
      <div>
        <label for="apellido">Apellido:</label>
        <input type="text" v-model="apellido" required>
      </div>
      <button type="submit">Registrar</button>
    </form>
    <div v-if="idAlf">
      <p>Usuario registrado con ID: {{ idAlf }}</p>
      <router-link to="/CompraYventa">Ir a Crypto</router-link>
    </div>
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
      imagenlogo: 'https://png.pngtree.com/png-clipart/20230102/original/pngtree-cartoon-illustration-red-rocket-png-image_8856222.png'
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
    color:black;
}

hr{
    color: black;
}

body{
    background-color: blueviolet;
}

.logoSP{
    color:antiquewhite;
}

.imagen-logo{
    width: 40px;
}

.idGenerado{
    color: black;
}

.botonDeshabilitado {
    background-color: grey;
    cursor: not-allowed;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
form {
  margin-bottom: 20px;
}
</style>