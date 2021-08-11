/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: "/",
    component: () => import("../components/layouts/index"),
    redirect: "/home",
    meta: {
      title: "首页",
      keepAlive: false
    },
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/home/index"),
        meta: { title: "小天欢乐打卡", keepAlive: false }
      },
      {
        path: "/robotpage",
        name: "RobotTestBtn",
        component: () => import("@/views/Robotpage/RobotTestBtn"),
        meta: { title: "小天欢乐打卡", keepAlive: false }
      },
      {
        path: "/result",
        name: "Result",
        component: () => import("@/views/Result/Result"),
        meta: { title: "打卡结果", keepAlive: false }
      },
      ///////支持口罩识别系统
      {
        path: "/mask",
        name: "Mask",
        component: () => import("@/views/Mask/Mask"),
        meta: { title: "口罩识别", keepAlive: false }
      }
      ///////支持2021年ai大会页面
      // {
      //   path: "/home",
      //   name: "Home",
      //   component: () => import("@/views/Aipage/Aipage"),
      //   meta: { title: "“九天”大礼等你拿", keepAlive: false }
      // }
    ]
  }
];
