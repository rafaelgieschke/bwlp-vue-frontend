<template>
  <div class="example-modal">
    <mdui-navigation-drawer modal close-on-esc close-on-overlay-click>
      <mdui-button class="close">Close Navigation Drawer</mdui-button>

      <section class="links-list">
        <ul>
          <li class="li-link">
            <RouterLink to="/image-list">Image List</RouterLink>
          </li>
          <li class="li-link">
            <RouterLink to="/lecture-list">Lecture List</RouterLink>
          </li>
          <li class="li-link">
            <RouterLink to="/privacy-policy">Privacy Policy</RouterLink>
          </li>
          <li class="li-link">
            <RouterLink to="/user-agreement">User Agreement</RouterLink>
          </li>
        </ul>
      </section>
    </mdui-navigation-drawer>

    <div class="open-button-container">
      <mdui-button class="open">Open Navigation Drawer</mdui-button>
    </div>
  </div>
</template>

<script setup>
import {onMounted} from 'vue';
import {RouterLink} from 'vue-router';

onMounted(() => {
  const example = document.querySelector('.example-modal');
  const navigationDrawer = example.querySelector('mdui-navigation-drawer');
  const openButton = example.querySelector('.open');
  const closeButton = example.querySelector('.close');

  openButton.addEventListener('click', () => (navigationDrawer.open = true));
  closeButton.addEventListener('click', () => (navigationDrawer.open = false));
});
</script>

<style scoped>
.example-modal {
  display: flex;
  position: relative;
  overflow: hidden;
}

ul {
  padding-left: 1rem;
}

.li-link {
  margin-bottom: 1rem;
  list-style: none;
}

.open-button-container,
.close {
  margin-top: 1rem;
  margin-left: 1rem;
}
</style>
