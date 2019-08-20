<template>
	<v-flex class="pr-3 pb-3" xs12 md6 lg4>
		<v-card class="blue darken-3 white--text">
			<v-card-title class="headline">
				<strong>{{ stock.name }} <small>(Preço: {{ stock.price | currency }} | Qtde.: {{ stock.quantity }})</small></strong>
			</v-card-title>
		</v-card>
		<v-card>
			<v-container fill-heigth>
				<v-text-field label="Quantidade" type="number" 
					v-model.number="quantity" min="0" :error="insufficientQuantity || !Number.isInteger(quantity)" />
				<v-btn class="blue darken-3 white--text" 
					:disabled="insufficientQuantity || quantity <= 0 || !Number.isInteger(quantity)" 
					@click="sellStock">{{ insufficientQuantity ? 'Insuficiente' : 'Vender' }}</v-btn>
			</v-container>
		</v-card>
	</v-flex>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	props: ['stock'],
	data() {
		return {
			quantity: 0
		}
	},
	computed: {
		insufficientQuantity() {
			return this.quantity > this.stock.quantity
		}
	},
	methods: {
		...mapActions({sellStockAction: 'sellStock'}),
		sellStock() {
			//Gera o objeto do pedido, pegando os dados da ação
			const order = {
				stockID: this.stock.id,
				stockPrice: this.stock.price,
				quantity: this.quantity
			}

			//Dispara a action que vende a ação, ele vai no modulo de stocks da Store do Vuex, procura essa ação e continua o processo
			// this.$store.dispatch('sellStock', order) //Outro jeito de fazer
			this.sellStockAction(order)

			//Zera a quantidade do card, para selecionar quantas quiser ao término o processo
			this.quantity = 0
		}
	}
}
</script>