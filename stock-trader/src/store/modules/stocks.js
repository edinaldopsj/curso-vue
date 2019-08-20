import stocks from '@/data/stocks'

export default {
	state: {
		stocks: []
	},
	mutations: {
		setStocks(state, stocks) {
			state.stocks = stocks
		},
		//Função que randomiza o valor das ações para gerar valores de compra e venda
		randomizeStocks(state) {
			state.stocks.forEach(stock => {
				stock.price = Math.round(stock.price * (1 + Math.random() - 0.45))
			})
		}
	},
	actions: {
		//Recebe a ação de comprar a ação , chamando a mutation de compra (buyStock - do store de Portfolio), e passando o pedido no segundo parametro
		buyStock({ commit }, order) {
			commit('buyStock', order)
		},
		initStocks({ commit }) {
			commit('setStocks', stocks)
		},
		randomizeStocks({ commit })
		{
			commit('randomizeStocks')
		}
	},
	getters: {
		stocks(state) {
			return state.stocks
		}
	}
}