new Vue({
	el: '#desafio',
	data: {
		efeitoIniciado: true,
		c1: 'c1',
		c2: 'c2',
		classe03: '',
		class04Input: '',
		class04Bool: '',
		estilos05: ''
	},
	methods: {
		iniciarEfeito() {
			this.efeitoIniciado = !this.efeitoIniciado
		},
		iniciarProgresso() {

		},
		verificaClasse(valor) {
			valor === 'true' ? this.class04Bool = 'verdadeira' : this.class04Bool = false
		}
	},
	computed: {
		destacaOuEncolhe() {
			return this.efeitoIniciado === true ? 'destaque' : 'encolher'
		}
	}
})
