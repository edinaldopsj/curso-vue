//Store do Portfolio de ações do comprador
export default {
	state: {
		funds: 10000,
		stocks: []
	},
	mutations: {
		buyStock(state, { stockID, quantity, stockPrice }) {
			//Procura a ação a se comprar
			const record = state.stocks.find(element => element.id == stockID)

			//Se existir já ações compradas desta empresa, apenas adiciona mais uma em quantidade
			if(record)
				record.quantity += quantity
			//Se não existir, cria um objeto com as novas ações
			else {
				state.stocks.push({
					id: stockID,
					quantity: quantity
				})
			}

			//Reduz o valor dos créditos do comprador, baseado no preço das ações compradas (preço * qtd)
			state.funds -= stockPrice * quantity
		},
		sellStock(state, { stockID, quantity, stockPrice }) {
			//Procura a ação a se vender
			const record = state.stocks.find(element => element.id == stockID)

			//Se a quantidade de ações que o comprador possui for maior que a quantidade vendida, subtrai do total
			if(record.quantity > quantity)
				record.quantity -= quantity
			else
			//Senão, remove do array de ações e deleta o objeto referente aquela empresa do array de ações do portfolio
				state.stocks.splice(state.stocks.indexOf(record), 1)

			//Depois soma os créditos adquiridos pela venda da ação (valor atual da ação * qtd)
			state.funds += stockPrice * quantity
		},
		setPortfolio(state, portfolio) {
			state.funds = portfolio.funds
			state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : []
		} 
	},
	actions: {
		sellStock({ commit }, order) {
			commit('sellStock', order)
		}
	},
	getters: {
		stockPortfolio(state, getters) {
			//Entro no meu portifolio e consulto minha ação
			return state.stocks.map(stock => {
				//Busco o registro no store de stocks e acho nome e preço
				const record = getters.stocks.find(element => element.id == stock.id)

				//Retorno todos os dados da minha ação selecionada
				return {
					id: stock.id,
					quantity: stock.quantity,
					name: record.name,
					price: record.price
				}
			})
		},
		funds(state) {
			return state.funds
		}
	}
}