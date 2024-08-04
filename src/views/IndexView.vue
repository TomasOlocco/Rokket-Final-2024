<template>
  <div>
        <h1>{{ logo }}</h1>
          <img v-bind:src="imagenlogo" class="imagen-logo">
        </div>
        <hr>

        <h1>Bienvenido a Rokket Wallett</h1>

        <p>
          <h3>Para ingresar, debe registrar un usuario...</h3>
          <h5>Por favor, registre su nombre y apellido y se le generará automaticamente un ID alfanumerico único</h5>
        </p>

       <!-- usar LocalStorage-->
      <form>
        <input type="text" placeholder="Nombre" id="nombre" v-model="nombre"/>
        <input type="text" placeholder="Apellido" id="apellido" v-model="apellido" />
     </form>

      <div>ID Generado ({{ idAlf }})
       <button class="button" @click="generarId(idAlf)">Generar ID</button>
      </div>
      <div v-if="submitForm">
        <p style="color: red;">{{ error }}</p>
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
</style>

<script>
export default {
  name: 'IndexView',
  data() {
        return {
            logo: 'ROKKETT',
            imagenlogo: 'https://png.pngtree.com/png-clipart/20230102/original/pngtree-cartoon-illustration-red-rocket-png-image_8856222.png',
            idAlf: '',
            nombre: '',
            apellido: '',
            error: ""
        };
    },
  
    methods:
    {
      //axiosBD(){
        //const apiClient = axios.create({
          //baseURL:  'https://laboratorio-36cf.restdb.io/rest/ ',
          //headers: { 'x-apikey': '64a5ccf686d8c5d256ed8fce'}
        //})
        //return apiClient;
      //},
      //mostrarTransacciones(){
        //const apiClient = thus.axiosBD();
        //apiClient.get('')
        //.then(res => {
        //if(res.data.length > 0){
          //this.transacciones = res.data;
        //}
        //else{
          //console.log("No hay transacciones")
        //}
      //})
      //.catch(error =>{
        //console.error(error);
      //});
    //},
      submitForm() {
        this.error = "Ingrese su nombre";
      }
    },
      generarId(){
        if ({
          nombre: !String.Empty,
          apellido: !String.Empty
        })
        this.idAlf = this.nombre + this.apellido + Math.random().toString(36).substring(2,9);
        else{
          return submitForm();
        }
      }
  }
</script>
