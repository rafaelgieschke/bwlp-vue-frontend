<template>
  <div class="step-sharing">
    <div class="field label border">
      <select v-model="modelValue.shareMode" @change="updateShareMode">
        <option :value="0">Private</option>
        <option :value="1">Public</option>
        <option :value="2">Custom</option>
      </select>
      <label>Share Mode</label>
    </div>

    <h3>Default Permissions</h3>
    <div class="permissions-grid">
      <div class="field checkbox">
        <input
          type="checkbox"
          id="def-perm-link"
          v-model="modelValue.defaultPermissions.link"
          @change="updatePermission('link', $event.target.checked)"
        />
        <label for="def-perm-link">Link</label>
      </div>
      <div class="field checkbox">
        <input
          type="checkbox"
          id="def-perm-download"
          v-model="modelValue.defaultPermissions.download"
          @change="updatePermission('download', $event.target.checked)"
        />
        <label for="def-perm-download">Download</label>
      </div>
      <div class="field checkbox">
        <input
          type="checkbox"
          id="def-perm-edit"
          v-model="modelValue.defaultPermissions.edit"
          @change="updatePermission('edit', $event.target.checked)"
        />
        <label for="def-perm-edit">Edit</label>
      </div>
      <div class="field checkbox">
        <input
          type="checkbox"
          id="def-perm-admin"
          v-model="modelValue.defaultPermissions.admin"
          @change="updatePermission('admin', $event.target.checked)"
        />
        <label for="def-perm-admin">Admin</label>
      </div>
    </div>
  </div>
</template>

<script setup>
defineModel({
  modelValue: {
    type: Object,
    required: true,
  },
});

const updateShareMode = event => {
  const shareMode = parseInt(event.target.value);
  const updatedData = {
    ...props.modelValue,
    shareMode,
  };
  emit('update:modelValue', updatedData);
};

const updatePermission = (permission, value) => {
  const updatedPermissions = {
    ...props.modelValue.defaultPermissions,
    [permission]: value,
  };

  const updatedData = {
    ...props.modelValue,
    defaultPermissions: updatedPermissions,
  };
  emit('update:modelValue', updatedData);
};
</script>

<style scoped>
.permissions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 1rem;
  margin-top: 1rem;
}
</style>
