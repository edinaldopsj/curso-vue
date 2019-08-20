<template>
	<main id="app">
		<h1>Tarefas</h1>
		<ProgressBar :progressValue="Number(progressValue)" />
		<TaskInput :tasks="tasks" />
		<TaskList  :tasks="tasks" :calculateProgress="calculateProgress" />
	</main>
	
</template>

<script>
import ProgressBar from './components/ProgressBar'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'

export default {
	components: {
		ProgressBar,
		TaskInput,
		TaskList,
	},
	data() {
		return {
			progressValue: 0,
			tasks: []
		}
	},
	methods: {
		calculateProgress() {
			if(!this.tasks.length || this.tasks.length < 0)
				this.progressValue = 0
			else
			{
				//At the insertion of a new task, re calculate the total percentage done
				let totalTasks = 0;
				let completedTasks = 0
	
				totalTasks = this.tasks.length
	
				this.tasks.forEach(el => {
					if(el.class === 'done')
						completedTasks++
				});
	
				this.progressValue = ((completedTasks / totalTasks) * 100).toFixed(2)
			}
		}
	},
    watch: {
		// on watch of the current changing of the tasks array, monitoring and updating it
		tasks: {
			deep: true,
			handler() {
				localStorage.setItem('tasks', JSON.stringify(this.tasks))
				this.calculateProgress()
			}
			
		}
	},
	created() {
		const json = localStorage.getItem('tasks')
		this.tasks = JSON.parse(json) || []
	}
}
</script>

<style>
	#app {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 90vh;
	}

	#app h1 {
		margin-bottom: 5px;
		font-weight: 300;
		font-size: 3rem;
	}

	@media (max-width: 767px) {
		#app {
			padding-top: 100px;
			margin: 0 auto;
		}
	}
</style>
