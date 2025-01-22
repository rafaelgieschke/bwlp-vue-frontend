<template>
  <nav class="wrap">
    <button @click="store.toggleMode()" class="m l chip circle small">
      <i>{{ store.isDark ? 'light_mode' : 'dark_mode' }}</i>
      <div class="tooltip bottom">Set Mode</div>
    </button>

    <button class="chip circle">
      <i>palette</i>
      <input
        type="color"
        :value="store.currentColor"
        @input="handleColorPick"
      />
      <div class="tooltip bottom">Color Picker</div>
    </button>

    <button class="chip circle">
      <i>upload</i>
      <input type="file" accept="image/*" @change="handleFileUpload" />
      <div class="tooltip bottom">Image Upload</div>
    </button>

    <button
      v-for="(color, name) in store.colors"
      :key="name"
      :class="['circle', 'small', name]"
      @click="store.setTheme(name)"
      data-ui="#theme-dialog"
    ></button>
  </nav>

  <hr class="small" />

  <h6 class="small">Recommended themes</h6>
  <nav>
    <button
      @click="setLightRed"
      class="chip circle small"
      data-ui="#theme-dialog"
    >
      <i>light_mode</i>
      <div class="tooltip bottom">Light Red</div>
    </button>

    <button
      @click="setDarkAmber"
      class="chip circle small"
      data-ui="#theme-dialog"
    >
      <i>dark_mode</i>
      <div class="tooltip bottom">Dark Amber</div>
    </button>
  </nav>
</template>

<script setup>
import {onMounted} from 'vue';
import {useThemeStore} from '@/stores/theme';

const store = useThemeStore();

const setLightRed = async () => {
  store.isDark = false;
  await store.setTheme('red');
  ui('mode', 'light');
  store.persistState();
};

const setDarkAmber = async () => {
  store.isDark = true;
  await store.setTheme('amber');
  ui('mode', 'dark');
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
