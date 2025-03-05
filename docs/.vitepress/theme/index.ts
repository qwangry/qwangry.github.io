import DefaultTheme from "vitepress/theme";
import MyLayout from "./MyLayout.vue";
import confetti from "./confetti.vue";
// 图片预览
import 'viewerjs/dist/viewer.min.css'
import imageViewer from "vitepress-plugin-image-viewer";
import vImageViewer from "vitepress-plugin-image-viewer/lib/vImageViewer.vue";
import { useData,useRoute } from "vitepress";
// 代码块折叠
import codeblocksFold from "vitepress-plugin-codeblocks-fold";
import 'vitepress-plugin-codeblocks-fold/style/index.css';

export default {
    ...DefaultTheme,
    Layout: MyLayout,
    enhanceApp(ctx) {
        const { app } = ctx;
        app.component("confetti", confetti);
        app.component("vImageViewer", vImageViewer);
    },
    setup() {
        const route = useRoute();
        imageViewer(route);
        const {frontmatter} = useData();
        // 基础使用
        codeblocksFold({route,frontmatter});
        // 可配置参数
        // codeblocksFold({route,frontmatter},true,400);
    }
};
