<!--Layout.vue-->
<template>
    <Layout>
        <template #doc-footer-before> </template>
        <template #doc-after>
            <div style="margin-top: 24px">
                <Giscus :key="page.filePath" repo="qwangry/qwangry.github.io" repo-id="R_kgDOKDbBCQ" category="Q&A"
                    category-id="DIC_kwDOKDbBCc4CcA95" mapping="pathname" strict="0" reactions-enabled="1"
                    emit-metadata="0" input-position="bottom" lang="zh-CN" crossorigin="anonymous"
                    :theme="isDark ? 'dark' : 'light'" />
            </div>
            <StarProject v-if="!isHomePage" />
            <AdComponent  v-if="!isHomePage" />
        </template>
        <template #layout-bottom>
            <DonateQR v-if="!isHomePage" />
        </template>
    </Layout>
</template>

<script lang="ts" setup>
import Giscus from "@giscus/vue";
import DefaultTheme from "vitepress/theme";
import { computed, watch } from "vue";
import { inBrowser, useData, useRoute } from "vitepress";
import DonateQR from "./components/DonateQR.vue";
import StarProject from "./components/StarProject.vue";
import AdComponent from "./components/AdComponent.vue";

const { isDark, page } = useData();
const route = useRoute();
const { Layout } = DefaultTheme;

const isHomePage = computed(() => {
    return route.path === "/" || page.value.frontmatter?.layout === "home";
});

watch(isDark, (dark) => {
    if (!inBrowser) return;

    const iframe = document
        .querySelector("giscus-widget")
        ?.shadowRoot?.querySelector("iframe");

    iframe?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: dark ? "dark" : "light" } } },
        "https://giscus.app"
    );
});
</script>
