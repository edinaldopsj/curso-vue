<template>
	<div class="usuario-detalhe">
		<h3>Usuário Detalhe</h3>
		<hr>
		<p><strong>Código: </strong> {{ id }} </p>
		<!-- <router-link tag="button" primario :to="`/usuario/${id}/editar`">Editar</router-link> -->
		<!-- :to="{ name: 'editarUsuario', params: {id: $route.params.id} }"> -->
		<router-link tag="button" primario 
			:to="{ name: 'editarUsuario', params: { id }, 
				query: { completo: true, lingua: 'pt' }, hash: '#rodape' }">
			Editar
		</router-link>
	</div>
</template>

<script>
export default {
	props: ['id'],
	beforeRouteEnter(to, from, next) {
		// console.log('dentro do componente -> usuario detalhe')
		// Exemplo de autenticação
		const autenticado = true
		autenticado ? next() : next(false)
	}
}
</script>

<style>

</style>
