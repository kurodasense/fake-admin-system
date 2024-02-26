import type { RouteRecordRaw } from "vue-router";

export async function mapMenusToRoutes(userMenus: any[]): Promise<RouteRecordRaw[]> {
  const routes: RouteRecordRaw[] = [];
  // 1. 先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = [];
  const routeFiles = import.meta.glob("../router/main/**/*.ts");
  for (const path in routeFiles) {
    const route: any = await routeFiles[path]();
    allRoutes.push(route.default);
  }
  // 2. 根据菜单获取需要添加的routes
  // userMenus:
  // type == 1 => children
  // type == 2 => url => route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type == 2) {
        const route = allRoutes.find((route) => route.path == menu.url);
        if (route) routes.push(route);
      } else {
        _recurseGetRoute(menu.children);
      }
    }
  };
  _recurseGetRoute(userMenus);
  return routes;
}
