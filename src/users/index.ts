import routes from '@/users/routes';
import { IModuleParams } from '@/shared/interfaces/IModule';

export default function userModule(moduleOptions: IModuleParams): void {
  const { router } = moduleOptions;
  routes.map((route) => router.addRoute(route));
}
