

<template>
    <div class="input-control">        
        <slot></slot>        
    </div>
</template>

<style>
    .input-control {
        margin-bottom: 1rem;
    }

    .input-control select,
    .input-control input,
    .input-control textarea {
        width: 100%;
        padding: 0.95rem;
        border-radius: 4px;
        border: 1px solid var(--color-border);
        background: #191919;
        color: var(--color-text);
        font-size: 1rem;
    }

    .input-control select {
        height: 5rem;
        resize: vertical;
    }

    .input-control textarea {
        min-height: 100px;
        resize: vertical;
    }

    .input-control input:focus {
        outline: none;
        border: 1px solid hsl(160deg 100% 57.13%);
    }

    .input-control .icon {
        border: 1px solid var(--color-border);
        display: flex;
        place-items: center;
        place-content: center;
        padding: 0.95rem 0.85rem;
        border-radius: 4px;
        
        background: #191919;
        color: var(--color-text);
    }

    .input-control button.icon {
        padding: 0.75rem 0.7rem;
    }
</style>