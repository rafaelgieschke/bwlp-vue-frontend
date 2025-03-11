<template>
  <div class="step-permissions">
    <h3>Default Permissions</h3>
    <div class="permissions-grid">
      <label class="checkbox">
        <input type="checkbox" v-model="modelValue.defaultPermissions.link" />
        <span>Link</span>
      </label>

      <label class="checkbox">
        <input
          type="checkbox"
          v-model="modelValue.defaultPermissions.download"
        />
        <span>Download</span>
      </label>

      <label class="checkbox">
        <input type="checkbox" v-model="modelValue.defaultPermissions.edit" />
        <span>Edit</span>
      </label>

      <label class="checkbox">
        <input type="checkbox" v-model="modelValue.defaultPermissions.admin" />
        <span>Admin</span>
      </label>
    </div>
  </div>
</template>

<script setup>
const modelValue = defineModel({
  type: Object,
  required: true,
});
</script>

<style scoped>
.permissions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 1rem;
  margin-top: 1rem;
}
</style>
