<template>
    <Painel titulo="Loja Virtual" verde>
        <div class="loja">
            <span>Adicionar</span>
            <input type="number" v-model.number="quantidade">
            <span>itens de <strong>R$</strong></span>
            <input type="number" v-model.number="preco">
            <button @click="adicionar">Agora!</button>
        </div>
    </Painel>
</template>

<script>
// import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            sequencia: 1
        }
	},
	computed: {
		quantidade() {
			return this.$store.state.parametros.quantidade
		},
		preco() {
			return this.$store.state.parametros.preco
		}
	},
    methods: {
		//Os três acimas todos iguais, somente o mapActions que serve a um outro propósito
		// ...mapMutations(['adicionarProduto']),
		// adicionarProduto(produto) {
		// 	this.$store.dispatch('adicionarProduto', produto)
		// },
		...mapActions(['adicionarProduto']), //usando o namespace, tem que avisar de onde vem a Action -> no caso de carrinho
        adicionar() {
            const produto = {
                id: this.sequencia,
                nome: `Produto ${this.sequencia}`,
                quantidade: this.quantidade,
                preco: this.preco
			}
			
			this.sequencia++
			
			// this.$store.state.produtos.push(produto)
			// this.$store.commit('adicionarProduto', produto)
			// this.$store.dispatch('adicionarProduto', produto) //funciona como acima tb
			this.adicionarProduto(produto)

			console.log(this.$store.getters.getNome);
			console.log(this.$store.getters.getNomeCompleto);
        }
    }
}
</script>

<style>
    .loja {
        display: flex;
        justify-content: center;
    }

    .loja > * {
        margin: 0px 10px;
    }

    input {
        font-size: 2rem;
        width: 90px;
    }
</style>
