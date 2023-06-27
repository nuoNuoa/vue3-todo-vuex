import { ACTION_TYPES } from "../constants/action-types";
import Vuex from "vuex";
import Axios from "axios";

export default Vuex.createStore({
  state: {
    todos: [],
  },
  mutations: {
    [ACTION_TYPES.fetchTodos]: (state, todos) => (state.todos = todos),
    [ACTION_TYPES.addTodo]: (state, todo) => state.todos.unshift(todo),
    [ACTION_TYPES.deleteTodo]: (state, id) =>
      (state.todos = state.todos.filter((todo) => todo.id !== id)),
    [ACTION_TYPES.updateTodo]: (state, updatedTodo) => {
      const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
      if (!index) return;
      state.todos.splice(index, 1, updatedTodo);
    },
  },
  actions: {
    //获取接口TODO列表并提交fetchTodos mutation。然后，mutation更新状态对象中的todos， 在todo.vue中调用此action
    onFetchTodos: async ({ commit }) => {
      const response = await Axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      commit(ACTION_TYPES.fetchTodos, response.data);
    },
    onAddTodo: async ({ commit }, title) => {
      const response = await Axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        { title, completed: false }
      );
      console.log(response);
      commit(ACTION_TYPES.addTodo, response.data);
    },
    onDeleteTodo: ({ commit }, id) => {
      Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      commit(ACTION_TYPES.deleteTodo, id);
    },
    //此action提交fetchTodos mutation,然后更新TODOS状态。让我们使用onFilterTodos action更新Vuex存储:
    onFilterTodos: async ({ commit }, limit) => {
      const response = await Axios.get(
        `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
      );
      commit(ACTION_TYPES.fetchTodos, response.data);
    },
    onUpdateTodo: async ({ commit }, todo) => {
      console.log(todo);
      const response = await Axios.put(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        todo
      );
      commit(ACTION_TYPES.updateTodo, response.data);
    },
  },
});
