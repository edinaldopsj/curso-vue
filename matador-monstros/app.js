new Vue({
    el: '#app',
    data: {
        gameStarted: false,
        battleLog: false, //If the game is on, show the battle logs
        battleLogMessages: [],
        battleLogCSS:'', //Class that determines specific CSS to address the damage, heal, special attack, etc
        quit: false,
        win: false,
        lose: false,
        playerHP: 100, //Player's Health
        monsterHP: 100, //Monster's Health,
        message: false, //Messages to communicate with the player, off the battleLog
        messageClass: '',
        isDisabled: false // Controls the flux of disabling/enabling buttons, related to win/loss condition
    },
    methods: {
        /* Game manipulation functions */

        // Start the game and reset the default attributes
        startGame() {
            this.gameStarted = true;
            this.battleLog = true;
            this.messageToBattleLog('admin', 'A Batalha começou! Boa Sorte!', 'adminMessage');
        },

        //Quit game and show message
        quitGame() {
            this.quit = true;
            this.message = "Você desistiu do jogo! :(";
            this.messageClass = "quitMessage";
            this.battleLog = false;
            
            this.resetGame();
        },

        //Restart game default attributes
        resetGame() {

            //After x Miliseconds, reset the game
            const timer = setInterval(() => {

                //Corrigir bug de life zerando depois do reset
                this.gameStarted = false;
                this.battleLog = false;
                this.battleLogMessages = [];
                this.battleLogCSS = '';
                this.quit = false;
                this.win = false;
                this.lose = false;
                this.message = false;
                this.messageClass = "";
                this.isDisabled = false;
                
                clearInterval(timer);
            }, 3000);

            // Set player and monster HP after the timer
            this.playerHP  = 100;
            this.monsterHP = 100;
        },

        /* Player Functions */
        attackMonster() {
            //When the player attacks the monster, the monster will aways have a superior attack force
            playerHit = Math.floor(Math.random() * 10);
            
            //Calculating the monster hit based on the player + a random number from 0 to 5
            monsterHit = playerHit + (Math.floor(Math.random() * 5));

            //Sets the current HP for both monster and men
            this.playerHP = this.playerHP - monsterHit;
            this.monsterHP = this.monsterHP - playerHit;

            //Logs into battleLog
            this.messageToBattleLog('player', 'Jogador recebeu dano de ' + monsterHit, 'monsterHit');
            this.messageToBattleLog('monster', 'Monstro recebeu dano de ' + playerHit, 'playerHit');
        },
        specialAttackMonster() {
            //Same logic from above, but the player hits with the greatest part of the damage
            monsterHit = Math.floor(Math.random() * 10);

            //Calculating the monster hit based on the player + a random number from 0 to 5
            playerHit = monsterHit + (Math.floor(Math.random() * 5));

            //Sets the current HP for both monster and men
            this.playerHP = this.playerHP - monsterHit;
            this.monsterHP = this.monsterHP - playerHit;

            //Logs into battleLog
            this.messageToBattleLog('player', 'Jogador recebeu dano de ' + monsterHit, 'monsterHit');
            this.messageToBattleLog('monster', 'Ataque Especial!! Monstro recebeu dano de ' + playerHit, 'playerHit');
        },
        healSelf() {
            //The player will try to heal himself, but the monster will attack him as well
            playerHeal = Math.floor(Math.random() * 10);

            //Calculating the monster hit based on the player + a random number from 0 to 5
            monsterHit = Math.floor(Math.random() * 10);

            //Heal and hit the player
            this.playerHP = this.playerHP + playerHeal;
            this.playerHP = this.playerHP - monsterHit;

            if(this.PlayerHP > 100)
                this.playerHP = 100;

            //Logs into battleLog
            this.messageToBattleLog('player', 'Jogador recebeu cura de ' + playerHeal, 'playerHeal');
            this.messageToBattleLog('monster', 'Jogador recebeu dano de ' + monsterHit, 'monsterHit');
        },

        /* General methods */

        //Sends a message to show at the battleLog
        messageToBattleLog(role, message, cssClass) {
            this.battleLogMessages.push({
                role: role,
                message: message,
                cssClass: cssClass
            });
        },

        // Dynamically changing the color based on certain range of HP both for monster and men
        coloringBar(HP) {
            let color;

            if (HP >= 50)
                color = '#008000';
            else if (HP > 30 && HP < 50)
                color = '#feca57';
            else
                color = '#ff6b6b';

            return color;
        }
    },
    computed: {
        /* Controlling the bar that shows the percentage of HP and Colors based on current health */
        playerCSS() {
            let color;
            color = this.coloringBar(this.playerHP);

            return {
                width: this.playerHP + '%',
                backgroundColor: color
            }
        },
        monsterCSS() {
            let color;
            color = this.coloringBar(this.monsterHP);

            return {
                width: this.monsterHP + '%',
                backgroundColor: color
            }
        }
    },
    /* Observing the player's and monster's HP, when it reaches 0% fires the win/loose statement in the battleLog */
    watch: {
        playerHP(currentHP, pastHP) {
            if(currentHP <= 0 || pastHP <= 0)
            {
                this.lose = true;
                this.win = false;
                this.playerHP = 0;

                this.isDisabled = true;

                this.resetGame();
            }
        },
        monsterHP(currentHP, pastHP) {
            if (currentHP <= 0 || pastHP <= 0) {
                this.lose = false;
                this.win = true;
                this.monsterHP = 0;

                this.isDisabled = true;

                this.resetGame();
            }
        },
        win(winIsTrue) {
            // If win is set to true, end the game and show proper messages
            if (winIsTrue)
            {
                this.messageToBattleLog('player', 'Vitória! O Jogador vence a batalha! Parabéns!!!', 'victory');
            }
        },
        lose(lostIsTrue) {
            // If win is set to true, end the game and show proper messages
            if (lostIsTrue) {
                this.messageToBattleLog('monster', 'Derrota! O monstro venceu a batalha! Mais sorte na próxima, guerreiro!', 'defeat');
            }
        }
    }
});