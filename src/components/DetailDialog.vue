<template>
  <dialog ref="dialogRef" class="top">
    <header class="fixed">
      <nav>
        <h5 class="max">{{ title }}</h5>
        <button class="transparent circle small" @click="closeDialog">
          <i>close</i>
        </button>
      </nav>
    </header>

    <article class="scroll padding">
      <div>
        <div class="tabs">
          <a
            v-for="tab in tabs"
            :key="tab.id"
            :data-ui="`#${tab.id}`"
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
          class="page padding right"
          :class="{active: activeTab === tab.id}"
        >
          <Transition name="fade" mode="out-in">
            <component
              :is="tab.component"
              v-bind="tab.props"
              @update:modelValue="handleTabUpdate"
            />
          </Transition>
        </div>
      </div>
    </article>

    <!-- <footer v-if="showFooter" class="fixed">
      <div class="max"></div>
      <div class="right">
        <button v-if="showCancel" class="secondary" @click="closeDialog">
          Cancel
        </button>
        <button v-if="showSave" :disabled="!hasChanges" @click="handleSave">
          Save Changes
        </button>
      </div>
    </footer> -->
  </dialog>
</template>

<script setup>
import {ref, watch, onMounted, onUnmounted} from 'vue';
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
  showFooter: {
    type: Boolean,
    default: false,
  },
  showSave: {
    type: Boolean,
    default: false,
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['close', 'save', 'update:modelValue']);

const dialogRef = ref(null);
const activeTab = ref('');
const hasChanges = ref(false);
const originalData = ref({});

onMounted(() => {
  if (props.tabs.length > 0) {
    activeTab.value = props.tabs[0].id;
  }

  // Store original data for change detection
  props.tabs.forEach(tab => {
    if (tab.props) {
      originalData.value[tab.id] = JSON.stringify(tab.props);
    }
  });
});

// Handle escape key
useEventListener('keydown', e => {
  if (e.key === 'Escape' && props.isOpen) {
    closeDialog();
  }
});

// // Handle click outside
// useEventListener('click', e => {
//   if (dialogRef.value && !dialogRef.value.contains(e.target)) {
//     closeDialog();
//   }
// });

const setActiveTab = tabId => {
  activeTab.value = tabId;
};

// const closeDialog = () => {
//   if (hasChanges.value) {
//     if (confirm('You have unsaved changes. Are you sure you want to close?')) {
//       handleClose();
//     }
//   } else {
//     handleClose();
//   }
// };

// const handleClose = () => {
//   const dialog = dialogRef.value;
//   if (dialog) {
//     dialog.close();
//   }
//   emit('close');
//   hasChanges.value = false;
// };

const handleTabUpdate = value => {
  hasChanges.value = true;
  emit('update:modelValue', value);
};

// const handleSave = () => {
//   emit('save');
//   hasChanges.value = false;
// };

watch(
  () => props.isOpen,
  newVal => {
    const dialog = dialogRef.value;
    if (dialog) {
      if (newVal) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }
  },
);
</script>

<style scoped>
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

dialog {
  max-width: 90vw;
  max-height: 90vh;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.page {
  display: none;
}

.page.active {
  display: block;
} */
</style>
