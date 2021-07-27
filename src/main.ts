import { createApp, h } from 'vue';
import initApollo from '@/plugins/vue-apollo';
import App from './App.vue';
import router from './router';
import '@/assets/css/style.css';

createApp({
  setup() {
    initApollo();
  },
  render() {
    return h(App);
  },
}).use(router).mount('#app');
