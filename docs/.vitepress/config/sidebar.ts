
import { docx } from "./routeConfig/docx";
import { front } from "./routeConfig/front";
import { article } from "./routeConfig/article";
import { other } from "./routeConfig/other";
import { front_preview } from "./routeConfig/front_preview";

export const sidebar = {
    '/docx/': docx,
    '/前端开发/': front,
    '/article/': article,
    '/杂项/': other,
    '/前端面试/': front_preview,
}
