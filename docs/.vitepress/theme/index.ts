import DefaultTheme from "vitepress/theme";
import MyLayout from "./MyLayout.vue";
import confetti from "./confetti.vue";

export default {
    ...DefaultTheme,
    Layout: MyLayout,
    enhanceApp(ctx) {
        const { app } = ctx;
        app.component("confetti", confetti);
    },
};
