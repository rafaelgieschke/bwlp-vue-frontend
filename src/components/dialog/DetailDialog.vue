<template>
  <dialog ref="dialogRef" class="top">
    <header class="fixed">
      <nav>
        <h5 class="max">{{ title }}</h5>

        <RouterLink
          v-if="editRoute"
          :to="editRoute"
          class="transparent circle small"
        >
          <i>edit</i>
        </RouterLink>

        <button class="transparent circle small" @click="sendCloseEvent">
          <i>close</i>
        </button>
      </nav>
    </header>

    <article class="padding">
      <div>
        <div class="tabs scroll">
          <a
            v-for="tab in tabs"
            :key="tab.id"
            :data-ui="`#${tab.id}`"
            class="vertical"
            :class="{active: activeTab === tab.id}"
            @click="setActiveTab(tab.id)"
          >
            <i>{{ tab.icon }}</i>
            <span>{{ tab.label }}</span>
          </a>
        </div>
        <div
          v-for="tab in tabs"
          :key="tab.id"
          :id="tab.id"
          class="page padding scroll"
          :class="{active: activeTab === tab.id}"
        >
          <component :is="tab.component" v-bind="tab.props" />
        </div>
      </div>
    </article>
  </dialog>
</template>

<script setup>
import {ref, watch, onMounted, useTemplateRef} from 'vue';
import {useEventListener} from '@vueuse/core';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  tabs: {
    type: Array,
    default: () => [],
    // Each tab should have: { id, icon, label, component, props }
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  editRoute: {
    type: [String, Object],
    default: null,
  },
});

const emit = defineEmits(['close-wanted']);

const dialogRef = useTemplateRef('dialogRef');
const activeTab = ref('');

onMounted(() => {
  if (props.tabs.length > 0) {
    activeTab.value = props.tabs[0].id;
  }

  toggleDOM(props.isOpen);
});

// Handle escape key
useEventListener('keydown', e => {
  if (e.key === 'Escape' && props.isOpen) {
    sendCloseEvent();
  }
});

// Handle click outside
useEventListener('click', e => {
  if (dialogRef.value && !dialogRef.value.contains(e.target)) {
    sendCloseEvent();
  }
});

const setActiveTab = tabId => {
  activeTab.value = tabId;
};

const sendCloseEvent = () => emit('close-wanted');

const toggleDOM = show => {
  const dialog = dialogRef.value;
  if (!dialog) return;

  try {
    if (show) {
      dialog.showModal();
      if (!dialog.open) {
        throw new Error('Failed to open dialog');
      }
    } else {
      dialog.close();
      if (dialog.open) {
        throw new Error('Failed to close dialog');
      }
    }
  } catch (error) {
    console.error('Dialog state sync error:', error);
    sendCloseEvent();
  }
};

watch(() => props.isOpen, toggleDOM);
</script>
