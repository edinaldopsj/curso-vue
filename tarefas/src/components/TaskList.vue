<template>
    <section class="taskList" v-if="tasks.length > 0">
        <template v-for="(task, index) in tasks">
            <div :class="['task', task.class]" :key="index" @click="doTask(index)">
                <span @click.stop="deleteTask(index)" class="close">x</span>
                <p class="taskText">{{ task.task }}</p>
            </div>
        </template>
    </section>
</template>

<script>
export default {
    props: {
        tasks: Array,
        calculateProgress: Function
    },
    methods: { 
        doTask(index) {
            if (index >= 0)
            {
                //If Statement to switch between done and pending
                this.tasks[index].class === "done" ?  
                    this.tasks[index].class = "pending" 
                :  
                    this.tasks[index].class = 'done'
    
                this.calculateProgress()
            }
        },
        //Uses index to pop it from the tasks array
        deleteTask(index) {
            if(index >= 0)
                this.tasks.splice(index, 1);
        }
    }
}
</script>

<style scoped>
    .taskList {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        flex-direction: row;
        margin: 2rem;
    }

    .taskList .task {
        margin: 10px;
    }

    .task {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 350px;
        height: 150px;
        padding: 10px;
        font-size: 2rem;
        margin: .5rem;
        z-index: 1;
        cursor: pointer;
    }

    .taskText {
        display: block;
        font-weight: 300;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }

    .pending {
        background-color: rgba(219, 34, 21, 0.664);
    }

    .pending.task:hover {
        background-color: #F44336;
    }

    .done {
        background-color: rgb(50, 172, 50);
    }

    .done p {
        text-decoration: line-through;
    }

    .close {
        position: absolute;
        display: flex;
        justify-content: center;
        height: 20px;
        width: 20px;
        top: 10px;
        right: 10px;
        font-size: 0.9rem;
        font-weight: 600;
        border-radius: 10px;
        border: 1px solid #FFF;
        z-index: 2;
        cursor: pointer;
    }
</style>
