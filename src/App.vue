<template>
  <nav class="header__nav">
    <img src="https://png.pngtree.com/png-clipart/20230102/original/pngtree-cartoon-illustration-red-rocket-png-image_8856222.png" alt="Logo">
    <router-link to="/" class="header__nav-item">Index</router-link> |
    <router-link to="/compraYventa" class="header__nav-item">Compra y Venta de Criptomonedas</router-link> |
    <router-link to="/historial" class="header__nav-item" >Historial de Movimientos</router-link> |
    <router-link to="/analisisInversiones" class="header__nav-item">Analisis de Inversiones</router-link>
  </nav>
  <router-view/>
</template>

<style>
body {
  margin: 0;
}

.header__nav {
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

.header__nav-item {
  padding: 16px;
  box-sizing: border-box;
  text-decoration: none;
  color: #fffe;
}

.header__nav-item:focus {
  color: rgb(102, 2, 105);
  border-bottom: 2px solid rgb(102, 2, 105);
}

.header__nav img {
  position: absolute;
  padding: 10px;
  left: 0;
  width: 35px;
  transition: all 0.5s ease;
}

.header__nav img:hover {
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
