<template>
  <nav class="header_nav">
    <link href="https://fonts.googleapis.com/css2?family=Protest+Guerrilla&family=Sansita&family=Ubuntu&display=swap" rel="stylesheet">
    <img src="/rokketOficial.png" alt="Logo">
    <router-link to="/" class="header_nav-item">Inicio</router-link> |
    <router-link to="/compraYventa" class="header_nav-item">Compra y Venta de Criptomonedas</router-link> |
    <router-link to="/historial" class="header_nav-item" >Historial de Movimientos</router-link> |
    <router-link to="/analisisInversiones" class="header_nav-item">Analisis de Inversiones</router-link>
  </nav>
  <router-view/>
</template>

<style>

#app{
  font-family: "Ubuntu", sans-serif;
  font-weight: 400;
  font-style: normal;
}

body {
  margin: 0;
}

.header_nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 6dvh;
  margin-bottom: 20dvh;
  gap: 40px;
  padding: 10px;
  background-color: black;
  color: white;
}

.header_nav-item {
  padding: 16px;
  box-sizing: border-box;
  text-decoration: none;
  color: #fffe;
  transition: color 0.3s ease, border-bottom 0.3s ease;
}

.header_nav-item:hover {
  color:#29005e;
  border-bottom: 2px solid #29005e; /* para subrayar sobre  router-link*/
}

.header_nav-item:focus {
  color: rgb(102, 2, 105);
  border-bottom: 2px solid rgb(102, 2, 105);
}

.header_nav img {
  position: absolute;
  padding: 10px;
  left: 0;
  width: 40px;
  transition: all 0.5s ease;
}

.header_nav img:hover {
  animation: CambiarColor 1s ease-in-out infinite;
}

@keyframes CambiarColor {
  0% {
    filter: none;
    box-shadow: none;
  }
  25% {
    filter: grayscale(100%);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
  50% {
    filter: sepia(100%);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
  }
  75% {
    filter: grayscale(100%);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
  100% {
    filter: none;
    box-shadow: none;
  }
}
</style>
