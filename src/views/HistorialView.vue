<template>
<div>
    <h1>Historial de Movimientos</h1>
    <form @submit.prevent="transaccionesRealizadas"></form>
    <div>
        <label for="idUsuario">Ingrese su ID</label>
        <input type="text" v-model="idUsuario" required>
    </div>
    
</div>
</template>

<script>
import axios from 'axios';

</script>
