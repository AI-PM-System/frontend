<template>
  <div class="item">    
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 2rem;
  margin: auto;
  padding: 1rem 2rem;
  display: flex;
}

.details {
  flex: 1;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  
  height: 32px;

  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  
}
</style>
