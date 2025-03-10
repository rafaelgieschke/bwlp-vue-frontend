<template>
  <div class="step-permissions">
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
const modelValue = defineModel({
  type: Object,
  required: true,
});

const updatePermission = (permission, value) => {
  const updatedPermissions = {
    ...modelValue.value.defaultPermissions,
    [permission]: value,
  };

  const updatedData = {
    ...modelValue,
    defaultPermissions: updatedPermissions,
  };
  modelValue.value = updatedData;
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
