<template>
  <div id="root">
    <Main />
  </div>
</template>

<script>
import Main from "./main";

export default {
  name: "App",
  components: {
    Main,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
body,
html {
  height: 100vh;
  width: 100vw;
  margin: 0;
  height: 0;
  font-size: 16px;
  background-color: transparent;
}

#root {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>