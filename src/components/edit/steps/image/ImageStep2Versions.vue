<template>
  <div class="step-versions">
    <h2>Version Information</h2>

    <div v-if="modelValue.versions && modelValue.versions.length">
      <div
        v-for="(version, index) in modelValue.versions"
        :key="version.versionId"
        class="version-card"
      >
        <h3>Version {{ index + 1 }}</h3>
        <p>Created: {{ formatDate(version.createTime) }}</p>
        <p>Expires: {{ formatDate(version.expireTime) }}</p>
        <p>Size: {{ formatFileSize(version.fileSize) }}</p>

        <div class="field checkbox border">
          <input
            type="checkbox"
            :id="`version-restricted-${index}`"
            v-model="version.isRestricted"
            @change="
              updateVersion(index, 'isRestricted', $event.target.checked)
            "
          />
          <label :for="`version-restricted-${index}`">Restricted</label>
        </div>

        <p>
          Status: {{ version.isProcessed ? 'Processed' : 'Processing' }} /
          {{ version.isValid ? 'Valid' : 'Invalid' }}
        </p>

        <div v-if="version.software && version.software.length">
          <h4>Software</h4>
          <ul>
            <li v-for="(sw, swIndex) in version.software" :key="swIndex">
              {{ sw }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else class="no-versions">
      <p>No versions available for this image.</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const formatDate = timestamp => {
  if (!timestamp) return 'N/A';
  return new Date(timestamp * 1000).toLocaleDateString();
};

const formatFileSize = bytes => {
  if (!bytes) return 'N/A';
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};

const updateVersion = (index, property, value) => {
  const updatedVersions = [...props.modelValue.versions];
  updatedVersions[index] = {
    ...updatedVersions[index],
    [property]: value,
  };

  const updatedData = {
    ...props.modelValue,
    versions: updatedVersions,
  };
  emit('update:modelValue', updatedData);
};
</script>

<style scoped>
.step-versions {
  padding: 1rem;
}

.version-card {
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 4px;
}

.no-versions {
  padding: 2rem;
  border-radius: 4px;
  color: #666;
  text-align: center;
}
</style>
