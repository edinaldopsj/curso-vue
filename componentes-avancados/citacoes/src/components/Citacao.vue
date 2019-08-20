<template>
    <div class="citacao">
        <!-- usado para passar os parametros -->
        <slot name="autor"></slot> 
        <slot name="texto"></slot> 
        <slot name="fonte"></slot> 
    </div>
</template>

<script>
export default {
    // Ciclo de vida do componente - Created e destroyed sem Keep Alive - Com KeepAlive activated e deactivated
    created() {
        console.log('created')
    },
    destroyed() {
        console.log('destroyed')
    },
    activated() {
        console.log('activated')
    },
    deactivated() {
        console.log('deactivated')
    }
}
</script>

<style scoped>
    .citacao {
        border: 1px solid #DDD;
        background-color: rgba(0, 0, 0, .1);
        padding: 25px;
        max-width: 450px;
    }
</style>
