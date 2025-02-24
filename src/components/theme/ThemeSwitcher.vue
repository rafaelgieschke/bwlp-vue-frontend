<template>
  <h6 class="small">Actions</h6>
  <nav class="wrap">
    <button @click="store.toggleMode()" class="s circle small border">
      <i>{{ store.isDark ? 'light_mode' : 'dark_mode' }}</i>
    </button>
    <button @click="store.toggleMode()" class="m l border small">
      <i class="small">{{ store.isDark ? 'light_mode' : 'dark_mode' }}</i>
      <span>Set mode</span>
    </button>

    <button class="s circle small border">
      <i>palette</i>
      <input
        type="color"
        :value="store.currentColor"
        @input="handleColorPick"
      />
    </button>
    <button class="m l border small">
      <i class="small">palette</i>
      <input
        type="color"
        :value="store.currentColor"
        @input="handleColorPick"
      />
      <span>Color picker</span>
    </button>

    <button class="s circle small border">
      <i>upload</i>
      <input type="file" accept="image/*" @change="handleFileUpload" />
    </button>
    <button class="m l small border">
      <i class="small">upload</i>
      <input type="file" accept="image/*" @change="handleFileUpload" />
      <span>Image upload</span>
    </button>
  </nav>
  <hr class="small" />

  <h6 class="small">Recommended themes</h6>
  <nav class="wrap">
    <button @click="setModeTheme('dark', 'amber')" class="amber black-text">
      <i>dark_mode</i>
      <span>Dark Amber</span>
    </button>

    <button @click="setModeTheme('light', 'red')" class="red white-text">
      <i>light_mode</i>
      <span>Light Red</span>
    </button>
  </nav>

  <hr class="small" />

  <h6 class="small">Themes</h6>
  <nav class="wrap">
    <button
      v-for="(color, name) in store.colors"
      :key="name"
      :class="['circle', 'small', 'border', name]"
      @click="store.setTheme(name)"
    ></button>
  </nav>
</template>

<script setup>
import {onMounted} from '@vue/runtime-core';
import {useThemeStore} from '@/stores/theme';

const store = useThemeStore();

const setModeTheme = async (mode, theme) => {
  store.isDark = mode === 'light' ? false : true;
  await store.setTheme(theme);
  ui('mode', mode);
  store.persistState();
};

const handleColorPick = async event => {
  await store.setCustomColor(event.target.value);
};

const handleFileUpload = async event => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    await store.setCustomImage(imageUrl);
  }
};

onMounted(() => {
  store.loadPersistedState();
});
</script>

<style scoped>
h6.small:first-of-type {
  margin-block-start: 0;
}
</style>
