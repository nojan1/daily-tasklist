<template>
  <div class="container">
    <h1>Tasks for today</h1>

    <div class="task-list-container">
      <div class="task-container" v-for="task in tasks" :key="task._id">
        <span>{{task.title}}</span>
        <button class="complete-task-button" type="button" v-on:click="markDone(task)">&check;</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      tasks: [],
    };
  },
  mounted() {
    fetch("/tasks")
      .then((x) => x.json())
      .then((x) => (this.tasks = x));
  },
  methods: {
    markDone(task) {
      fetch(`/tasks/${task._id}`, {
        method: "POST",
      }).then((x) => {
        this.tasks = this.tasks.filter((t) => t._id !== task._id);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 600px;
  margin: 50px auto;

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

      span {
        display: block;
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
}
</style>