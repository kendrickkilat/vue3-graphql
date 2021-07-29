import { App } from 'vue';
import { Router } from 'vue-router';

export interface IModuleParams {
    app: App<Element>;
    router: Router;
}
