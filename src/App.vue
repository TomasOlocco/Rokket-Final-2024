<template>
  <nav>
    <router-link to="/">Index</router-link> |
    <router-link to="/compraYventa">Compra y Venta de Criptomonedas</router-link> |
    <router-link to="/historial">Historial de Movimientos</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
