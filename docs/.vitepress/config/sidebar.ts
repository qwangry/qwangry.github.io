import { frontend } from "./routeConfig/frontend";
import { backend } from "./routeConfig/backend";
import { computerBasics } from "./routeConfig/computer_basics";
import { interview } from "./routeConfig/interview";
import { tools } from "./routeConfig/tools";

export const sidebar = {
    '/前端技术/': frontend,
    '/后端技术/': backend,
    '/计算机基础/': computerBasics,
    '/面试准备/': interview,
    '/开发工具/': tools,
}
