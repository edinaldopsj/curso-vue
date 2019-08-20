new Vue({
    el: '#desafio',
    data: {
        nome: 'Edinaldo',
        idade: 26,
        imagem: 'https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif'
    },
    methods: {
        idadeTriplicada() {
            return this.idade*3
        },
        numeroAleatorio() {
            return Math.random();
        }
    }
});