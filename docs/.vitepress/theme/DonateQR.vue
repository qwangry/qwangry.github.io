<template>
    <div class="donate-qr">
        <div class="qr-trigger" @click="toggleQR" :class="{ active: showQR }">
            <span class="icon">☕</span>
            <span class="text">打赏</span>
        </div>
        <transition name="fade">
            <div v-if="showQR" class="qr-popup" @click="closeQR">
                <div class="qr-content" @click.stop>
                    <h4>如果觉得内容有帮助的话，可以请我喝杯咖啡 ☕</h4>
                    <div class="qr-codes">
                        <div class="qr-item">
                            <img src="/donate-wechat.jpg" alt="微信打赏" />
                            <p>微信</p>
                        </div>
                        <div class="qr-item">
                            <img src="/donate-alipay.jpg" alt="支付宝打赏" />
                            <p>支付宝</p>
                        </div>
                    </div>
                    <button class="close-btn" @click="closeQR">×</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'DonateQR',
    setup() {
        const showQR = ref(false);

        const toggleQR = () => {
            showQR.value = !showQR.value;
        };

        const closeQR = () => {
            showQR.value = false;
        };

        return {
            showQR,
            toggleQR,
            closeQR
        };
    }
});
</script>

<style scoped>
.donate-qr {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
}

.qr-trigger {
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
    border: 1px solid var(--vp-c-divider);
    padding: 8px 12px;
    border-radius: 20px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.3s ease;
    user-select: none;
    backdrop-filter: blur(8px);
}

.qr-trigger:hover {
    background: var(--vp-c-brand-1);
    color: white;
    border-color: var(--vp-c-brand-1);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.qr-trigger.active {
    background: var(--vp-c-brand-1);
    color: white;
    border-color: var(--vp-c-brand-1);
}

.icon {
    font-size: 14px;
}

.text {
    font-size: 12px;
    font-weight: 500;
}

.qr-popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
    padding: 16px;
    box-sizing: border-box;
}

.qr-content {
    background: var(--vp-c-bg);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    position: relative;
    max-width: 480px;
    width: 100%;
    max-height: 90vh;
    overflow: auto;
    box-sizing: border-box;
}

.qr-content h4 {
    text-align: center;
    margin: 0 0 20px 0;
    color: var(--vp-c-text-1);
    font-size: 16px;
    line-height: 1.4;
    padding-right: 32px;
}

.qr-codes {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
}

.qr-item {
    text-align: center;
    flex: 1;
    max-width: 180px;
}

.qr-item img {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    border: 1px solid var(--vp-c-divider);
    display: block;
    margin: 0 auto;
    object-fit: contain;
}

.qr-item p {
    margin: 8px 0 0 0;
    color: var(--vp-c-text-2);
    font-size: 14px;
    font-weight: 500;
}

.close-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    font-size: 20px;
    color: var(--vp-c-text-2);
    cursor: pointer;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s ease;
    line-height: 1;
}

.close-btn:hover {
    background: var(--vp-c-bg-alt);
    color: var(--vp-c-text-1);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* 移动端适配 */
@media (max-width: 768px) {
    .qr-trigger {
        padding: 6px 10px;
        bottom: 16px;
        right: 16px;
        border-radius: 18px;
    }
    
    .icon {
        font-size: 13px;
    }
    
    .text {
        font-size: 11px;
    }
    
    .qr-popup {
        padding: 12px;
    }
    
    .qr-content {
        padding: 16px;
        max-width: 100%;
        margin: 0;
    }
    
    .qr-content h4 {
        font-size: 15px;
        margin-bottom: 16px;
        padding-right: 28px;
    }
    
    .qr-codes {
        flex-direction: column;
        gap: 16px;
    }
    
    .qr-item {
        max-width: none;
    }
    
    .qr-item img {
        width: 140px;
        height: 140px;
        object-fit: contain;
    }
    
    .close-btn {
        width: 24px;
        height: 24px;
        font-size: 18px;
        top: 8px;
        right: 8px;
    }
}

/* 小屏手机适配 */
@media (max-width: 480px) {
    .qr-content {
        padding: 12px;
    }
    
    .qr-content h4 {
        font-size: 14px;
        margin-bottom: 12px;
    }
    
    .qr-codes {
        gap: 12px;
    }
    
    .qr-item img {
        width: 120px;
        height: 120px;
        object-fit: contain;
    }
    
    .qr-item p {
        font-size: 13px;
        margin-top: 6px;
    }
}

/* 超小屏适配 */
@media (max-width: 360px) {
    .qr-item img {
        width: 100px;
        height: 100px;
        object-fit: contain;
    }
}
</style>