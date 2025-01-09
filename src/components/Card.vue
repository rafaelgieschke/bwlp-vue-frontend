<template>
  <article class="bw-card">
    <header class="header">
      <h3>
        <slot name="header"></slot>
      </h3>
    </header>

    <hr />

    <div>
      <slot name="content"></slot>
    </div>
  </article>
</template>
