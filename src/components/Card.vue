<template>
  <mdui-card variant="filled">
    <article class="bw-card">
      <header class="header">
        <h3 class="card-h3">
          <slot name="header"></slot>
        </h3>
      </header>

      <mdui-divider></mdui-divider>

      <div>
        <slot name="content"></slot>
      </div>
    </article>
  </mdui-card>
</template>

<style scoped>
.bw-card {
  padding: 1rem;

  .header {
    margin-bottom: 1rem;
  }

  .card-h3 {
    font-size: 1.75rem;
  }
}
</style>
