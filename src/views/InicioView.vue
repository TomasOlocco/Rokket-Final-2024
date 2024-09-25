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
      <p v-if="error">{{ error }}</p>
      <router-link to="/CompraYventa">Empieza con tus transacciones!</router-link>
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
      logo: 'ROKKETT WALLET',
      error: ''
    };
  },
  computed: {
    nombreCompleto() {
      return this.nombre + ' ' + this.apellido;
    }
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
      //evitar que el usuario ingrese números
      const nombreInvalido = /\d/.test(this.nombre);
      const apellidoInvalido = /\d/.test(this.apellido);
      const nombreCompleto = this.nombreCompleto;

      if (nombreInvalido || apellidoInvalido) {
        this.error = 'Su nombre y apellido no pueden contener números';
        return;
      }

      const idGenerado = this.generarId();
      const idAlf = {
        id: idGenerado
      };
      localStorage.setItem('idUsuario', JSON.stringify(idAlf)),
      localStorage.setItem('nombreCompleto', nombreCompleto);
      
      
      console.log('Usuario registrado:', this.nombre, this.apellido);
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
  font-family: "Protest Guerrilla", sans-serif;
  font-size: 55px;
  margin-top: -75px;
  margin-bottom: 37px;
}

.gif-logo{
    width: 350px;
    border-radius: 20px;
    margin-bottom: 150px;
}

.idGenerado{
    color: rgb(226, 226, 226);
}

#app {
  text-align: center;
}
form {
  margin-top: -50px;
  margin-bottom: 100px;
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
  font-family: "Ubuntu", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.btn-registrar {
  background-color: #29005e;
  margin: 15px;
  margin-bottom: 50px;
  color: white;
  padding: 10px 20px;
  border-width: 1px;
  border-radius: 8px;
  border-style: solid;
  border-color: black;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  font-family: "Ubuntu", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.btn-registrar:hover {
  background-color: #58c2ff;
}
</style>