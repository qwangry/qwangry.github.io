<template>
    <div class="star-project">
        <div class="star-container">
            <div class="star-content">
                <div class="star-icon">⭐</div>
                <div class="star-text">
                    <h3>喜欢这个项目？</h3>
                    <p>如果这些内容对您有帮助，请考虑给项目一个⭐</p>
                </div>
            </div>
            <div class="star-actions">
                <a href="https://github.com/qwangry/qwangry.github.io" target="_blank" rel="noopener noreferrer"
                    class="star-button">
                    <svg class="github-icon" viewBox="0 0 16 16" fill="currentColor">
                        <path
                            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                    在 GitHub 上给我们 Star
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'StarProject',
})
</script>

<style scoped>
.star-project {
    margin: 32px 0;
    padding: 24px;
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-border);
    border-radius: 12px;
    transition: all 0.3s ease;
}

.star-project:hover {
    border-color: var(--vp-c-brand-1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.star-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}

.star-content {
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1;
}

.star-icon {
    font-size: 48px;
    animation: twinkle 2s infinite;
}

@keyframes twinkle {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }
}

.star-text h3 {
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--vp-c-text-1);
}

.star-text p {
    margin: 0;
    color: var(--vp-c-text-2);
    font-size: 14px;
    line-height: 1.5;
}

.star-actions {
    flex-shrink: 0;
}

.star-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    background: var(--vp-c-brand-1);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 500;
    font-size: 14px;
    transition: all 0.3s ease;
}

.star-button:hover {
    background: var(--vp-c-brand-2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.github-icon {
    width: 16px;
    height: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .star-container {
        flex-direction: column;
        text-align: center;
        gap: 16px;
    }

    .star-content {
        flex-direction: column;
        text-align: center;
        gap: 12px;
    }

    .star-icon {
        font-size: 36px;
    }
}
</style>