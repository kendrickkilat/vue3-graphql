import { createApp, h } from 'vue';
import initApollo from '@/plugins/vue-apollo';
import App from './App.vue';
import router from './router';
import '@/assets/css/style.css';
import userModule from './users';

const app = createApp({
  setup() {
    initApollo();
  },
  render() {
    return h(App);
  },
});

userModule({ app, router });

app.use(router);
app.mount('#app');
// app.use(router).mount('#app');
