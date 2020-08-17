<template>
  <div class="container">
    <h1>Att göra idag - {{day}}</h1>

    <div class="task-list-container" v-if="tasks">
      <div class="task-container" v-for="task in tasks" :key="task._id" :class="{deleted: task.deleted}">
        <span>{{task.title}}</span>
        <button class="complete-task-button" type="button" v-on:click="markDone(task)">&check;</button>
      </div>
    </div>

    <div v-if="tasks && noTasksToDo()" class="nothing-left-to-do">
      Woho! Inget att göra ;)
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      day: new Date().toLocaleDateString(),
      tasks: null,
    };
  },
  mounted() {
    fetch("/tasks")
      .then((x) => x.json())
      .then((x) => (this.tasks = x.tasks));

    var url = window.location.href
    var arr = url.split("/");
    const socket = new WebSocket(`ws://${arr[2]}`);
    socket.onopen = (evt) => {
      socket.send(JSON.stringify({
        command: 'get'
      }))
    }

    socket.onmessage = (evt) => {
      const message = JSON.parse(evt.data);

      if(message.type = 'update'){
        const newTasks = this.tasks ? message.content.filter(x => !this.tasks.find(t => t._id === x._id)) : message.content;
        const deletedTasks = this.tasks?.filter(x => !message.content.find(t => t._id === x._id)) ?? [];

        deletedTasks.forEach(t => t.deleted = true);

        this.tasks = [
          ...(this.tasks ?? []),
          ...newTasks
        ];
      }
    }
  },
  methods: {
    markDone(task) {
      fetch(`/tasks/${task._id}`, {
        method: "POST",
      }).then((x) => {
        if(x.ok){
          let existingTask = this.tasks.find((t) => t._id === task._id);
          existingTask.deleted = true;
          this.tasks = [...this.tasks];
        }else{
          console.error(x);
        }
      });
    },

    noTasksToDo(){
      return this.tasks.length == 0 || !this.tasks.some(t => !t.deleted);
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 600px;
  width: 80%;
  
  h1 {
    text-align: center;
  }

  .task-list-container {
    .task-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      width: 100%;
      margin-bottom: 10px;

      &.deleted {
        animation: task-deleted 0.5s linear;
        animation-fill-mode: forwards;
      }

      span {
        display: block;
        font-weight: bold;
        flex-grow: 1;
      }

      .complete-task-button {
        background: none;
        height: 40px;
        width: 50px;
        font-size: 25px;

        &:hover,
        &:active {
          color: gray;
          cursor: pointer;
        }
      }

      &:after {
        display: block;
        content: "";
        clear: both;
      }
    }
  }

  @keyframes task-deleted {
    from {
      opacity: 1;
    }

    99% {
      opacity: 0;
      visibility: hidden;
    }

    to {
      opacity: 0;
      visibility: hidden;
      height:0;
      position: absolute;
      top: -100%;
    }
  }

  .nothing-left-to-do {
    text-align: center;
    font-size: 2em;
    margin-top: 50px;
  }
}
</style>