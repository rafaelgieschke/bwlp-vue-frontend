<template>
  <div class="nav-modal">
    <mdui-navigation-drawer modal close-on-esc close-on-overlay-click>
      <mdui-button class="close">Close Navigation Drawer</mdui-button>

      <div class="drawer-content">
        <ul class="top-links">
          <li class="li-link">
            <RouterLink to="/image-list">Image List</RouterLink>
          </li>
          <li class="li-link">
            <RouterLink to="/lecture-list">Lecture List</RouterLink>
          </li>
        </ul>

        <div class="bottom-section">
          <h3 class="legal-title">Rechtlicher Kram</h3>
          <ul class="force-bottom">
            <li class="li-link">
              <RouterLink to="/privacy-policy">Datenschutzerklärung</RouterLink>
            </li>
            <li class="li-link">
              <RouterLink to="/user-agreement">Nutzungsvereinbarung</RouterLink>
            </li>
          </ul>
        </div>
      </div>
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
  const example = document.querySelector('.nav-modal');
  const navigationDrawer = example.querySelector('mdui-navigation-drawer');
  const openButton = example.querySelector('.open');
  const closeButton = example.querySelector('.close');

  openButton.addEventListener('click', () => (navigationDrawer.open = true));
  closeButton.addEventListener('click', () => (navigationDrawer.open = false));
});
</script>

<style scoped>
.nav-modal {
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100vh;
}

.drawer-content {
  display: flex;
  flex-direction: column;
  height: calc(100% - 5rem);
  margin-top: 1rem;
}

.top-links {
  padding-left: 1rem;
}

.bottom-section {
  margin-top: auto;
  padding-left: 1rem;
}

.legal-title {
  margin-bottom: 0.5rem;
  color: #666;
  font-size: 0.875rem;
}

.force-bottom {
  padding-left: 0;
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
