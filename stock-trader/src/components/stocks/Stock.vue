<template>
	<v-flex class="pr-3 pb-3" xs12 md6 lg4>
		<v-card class="green darken-3 white--text">
			<v-card-title class="headline">
				<strong>{{ stock.name }} <small>(Preço: {{ stock.price | currency }})</small></strong>
			</v-card-title>
		</v-card>
		<v-card>
			<v-container fill-heigth>
				<v-text-field label="Quantidade" type="number" 
					v-model.number="quantity" min="0" :error="insufficientFunds || !Number.isInteger(quantity)" />
				<v-btn class="green darken-3 white--text" 
					:disabled="insufficientFunds || quantity <= 0 || !Number.isInteger(quantity)" 
					@click="buyStock"> {{ insufficientFunds ? 'Insuficiente' : 'Comprar' }} </v-btn>
			</v-container>
		</v-card>
	</v-flex>
</template>

<script>
export default {
	props: ['stock'],
	data() {
		return {
			quantity: 0
		}
	},
	computed: {
		funds() {
			return this.$store.getters.funds
		},
		insufficientFunds() { //retorna um falso se n tiver dinheiro suficiente pra comprar as ações, é um filtro
			return this.quantity * this.stock.price > this.funds
		}
	},
	methods: {
		buyStock() {
			//Gera o objeto do pedido, pegando os dados da ação
			const order = {
				stockID: this.stock.id,
				stockPrice: this.stock.price,
				quantity: this.quantity
			}

			//Dispara a action que compra a ação, ele vai no modulo de stocks da Store do Vuex, procura essa ação e continua o processo
			this.$store.dispatch('buyStock', order)

			//Zera a quantidade do card, para selecionar quantas quiser ao termianr o processo
			this.quantity = 0
		}
	}
}
</script>