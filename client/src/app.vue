<template>
  <div class="container">
    <h1>Tasks for today</h1>

    <div class="task-list-container">
      <div class="task-container">
          <span>Clean the stuff</span>
          <button class="complete-task-button" type="button">
              Complete
          </button>
      </div>
      <div class="task-container">
          <span>Clean the stuff</span>
          <button class="complete-task-button" type="button">
              Complete
          </button>
      </div>
      <div class="task-container">
          <span>Clean the stuff</span>
          <button class="complete-task-button" type="button">
              Complete
          </button>
      </div>
      <div class="task-container">
          <span>Clean the stuff</span>
          <button class="complete-task-button" type="button">
              Complete
          </button>
      </div>
      <div class="task-container">
          <span>Clean the stuff</span>
          <button class="complete-task-button" type="button">
              Complete
          </button>
      </div>
      <div class="task-container">
          <span>Clean the stuff</span>
          <button class="complete-task-button" type="button">
              Complete
          </button>
      </div>
      <div class="task-container">
          <span>Clean the stuff</span>
          <button class="complete-task-button" type="button">
              Complete
          </button>
      </div>
      <div class="task-container">
          <span>Clean the stuff</span>
          <button class="complete-task-button" type="button">
              Complete
          </button>
      </div>
      <div class="task-container">
          <span>Clean the stuff</span>
          <button class="complete-task-button" type="button">
              Complete
          </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: "Using Parcel In A Vue.js App",
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 600px;
  margin: 50px auto;
  text-align: center;
}

.task-list-container{
    .task-container {
        width:100%;
        text-align: left;
        margin-bottom: 10px;

        .complete-task-button {
            background: none;
            float: right;
        }

        &:after {
            display:block;
            content:'';
            clear:both;
        }
    }
}
</style>