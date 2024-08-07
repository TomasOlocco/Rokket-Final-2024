<template>
<div id="app">
    <h1>Registro de Usuario</h1>
    <h1>{{ logo }}</h1>
          <img v-bind:src="imagenlogo" class="imagen-logo">
    <form @submit.prevent="registrarUsuario">
      <div>
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
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let id = '';
      for (let i = 0; i < 8; i++) {
        id += chars.charAt((Math.random()));
      }
      return id;
    },
    registrarUsuario() {
      const idGenerado = this.generarId();
      const idAlf = {
        id: idGenerado
      };
      localStorage.setItem('usuario', JSON.stringify(idAlf)),
      localStorage.getItem('usuario');
      console.log(idAlf);
      this.idAlf = idGenerado;
      this.nombre = '';
      this.apellido = '';
    }
  }
};
</script>
