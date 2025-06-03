<template>
    <div class="ad-container">
        <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-6580163109975746"
            data-ad-slot="4916547034" data-ad-format="auto" data-full-width-responsive="true">
        </ins>
    </div>
</template>

<script>
export default {
    name: 'AdComponent',
    mounted() {
        try {
            if (window.adsbygoogle) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) {
            console.log('AdSense error:', e);
        }
    }
}
</script>

<style scoped>
.ad-container {
    margin: 20px 0;
    text-align: center;
}
</style>