<template>
  <div>
    <form>
      <input type="text" v-model="title" placeholder="Add to do ..." />
      <input v-on:click="addNewTodo" type="submit" value="Add" />
    </form>
    <br />
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "AddTodo",
  setup() {
    const store = useStore();
    const title = ref("");
    const addNewTodo = (e) => {
      e.preventDefault();
      store.dispatch("onAddTodo", {
        title: title.value,
      });
      title.value = "";
    };

    return {
      title,
      addNewTodo,
    };
  },
};
</script>

<style scoped>
form {
  display: flex;
}
input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid #41b883;
  outline: 0;
}
input[type="submit"] {
  flex: 2;
  background: #41b883;
  color: #fff;
  border: 1px #41b883 solid;
  cursor: pointer;
}
</style>
