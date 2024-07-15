
import { docx } from "./routeConfig/docx";
import { front } from "./routeConfig/front";
import { article } from "./routeConfig/article";
import { other } from "./routeConfig/other";

export const sidebar = {
    '/docx/': docx,
    '/前端开发/': front,
    '/article/': article,
    '/杂项/': other,
}
