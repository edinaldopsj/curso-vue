<template>
    <section id="progressBar">
        <span id="progressValue">{{ progressValue }} %</span>
        <div id="progressBarValue" :style="[barCSS]"></div>
    </section>
</template>

<script>
export default {
    props: { progressValue: Number },    
    computed: {
        // Controls the progress of the bar
        barCSS() {
            return {
                width: this.progressValue + "%"
            }
        }
    } 
}
</script>

<style scoped>
    #progressBar {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #CCC;
        width: 80%;
        height: 50px;
        margin-bottom: 2rem;
        text-transform: uppercase;
        z-index: 0;
    }

    #progressValue {
        display: flex;
        position: relative;
        padding-top: .8rem;
        font-size: 1.2rem;
        z-index: 1;
    }

    #progressBarValue {
        position: absolute;
        height: 100%;
        background-color: rgb(50, 172, 50);
        align-self: flex-start;
    }

     @media screen and (max-width: 768px) {
        #progressBar {
            width: 80%;
        }
    }
</style>
