new Vue({
    el: '#desafio',
    data: {
        valor: ''
    },
    methods: {
        alertar() {
            alert('Clicou aqui!');
        },
        armazenar(event) {
            this.valor = event.target.value;
            console.log(this.valor);
        }
    }
})