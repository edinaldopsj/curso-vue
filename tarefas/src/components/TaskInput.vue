<template>
    <section>
        <input  
            id="inputTask" class="form-element" type="text" placeholder="Put your TODO Tasks Here, and Voilá" 
            v-model="task"
            @keyup.enter="addTask()"
            ref="inputTask"
        />
        <button type="button" class="form-element" @click="addTask()">+</button>
    </section>
</template>

<script>
export default {
    props: {
        tasks: Array
    },
    data() {
        return { 
            task: ''
        }
    },
    methods: {
        existTask(task) {
            let exists = false

            this.tasks.forEach(function (arrayItem) {
                if(arrayItem.task.includes(task)) {
                    exists = true
                    return false
                }
            });

            return exists
        },
        addTask() { 
            //If anything is typed
            if(this.task)
            {
                //Verify if it exists through function
                if(!this.existTask(this.task))
                {
                    //Add the task to the task list
                    let task = {
                        task: this.task,
                        class: 'pending'
                    };
    
                    this.tasks.push(task)
                    this.task = ''
                }
                else {
                    //Don't add
                    alert('Task already inserted in the list! Please insert a new one!')
                    this.task = '';
    
                    this.$refs.inputTask.focus() //Calls the focus on the input
                }
            } else {
                alert('Please Type a valid task!');
            }
        }
    }
}
</script>

<style scoped>
    .form-element {
        outline: none;
        font-size: 1.4rem;
        border: 1px solid #FFF;
        padding: 5px 10px 8px;
        color: #FFF;
    }

    input.form-element {
        width: 500px;
        margin-top: .5rem;   
        background: #FFF2;
        text-align: center;
    }

    input.form-element::-webkit-input-placeholder { 
        text-align: center;
    }
    
    button.form-element {
        border-left: none;
        background-color: #2196F3;
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
        .form-element {
            height: 100px;
        }

        input.form-element {
            width: 80%;
            font-size: 1.2rem;
            height: 30px;
        }

        button.form-element {
            padding: 6px 10px 37px 10px;
            height: 30px;
        }
    }
</style>
