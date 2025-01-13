<template>
  <div>
    <table v-if="permissions" class="stripes">
      <thead>
        <tr>
          <th>Benutzer</th>
          <th>Verlinken</th>
          <th>Download</th>
          <th>Bearbeiten</th>
          <th>Admin</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, user_info) in permissions" :key="user_info">
          <td class="max">{{ user_info }}</td>
          <td v-for="permission in user" :key="permission" class="min">
            <label class="checkbox">
              <input
                type="checkbox"
                :checked="permission"
                @change="handlePermissionChange(user_info, permission)"
              />
              <span></span>
            </label>
          </td>
        </tr>
      </tbody>
    </table>

    <section v-if="defaultPermissions">
      <h6>Andere Nutzer</h6>
      <p>
        Hier können Sie die Rechte für nicht in der Liste angegebene Nutzer
        festlegen
      </p>
      <label
        v-for="(defaultPermission, label) in defaultPermissions"
        :key="label"
        class="checkbox"
      >
        <input
          type="checkbox"
          :checked="defaultPermission"
          @change="handleDefaultPermissionChange(label)"
        />
        <span class="capitalize">{{ label }}</span>
      </label>
    </section>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const props = defineProps({
  permissions: {
    type: Object,
    required: true,
  },
  defaultPermissions: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const modifiedPermissions = ref({...props.permissions});
const modifiedDefaultPermissions = ref({...props.defaultPermissions});

const handlePermissionChange = (userInfo, permission) => {
  modifiedPermissions.value[userInfo] = {
    ...modifiedPermissions.value[userInfo],
    [permission]: !modifiedPermissions.value[userInfo][permission],
  };
  emit('update:modelValue', modifiedPermissions.value);
};

const handleDefaultPermissionChange = label => {
  modifiedDefaultPermissions.value[label] =
    !modifiedDefaultPermissions.value[label];
  emit('update:modelValue', {
    permissions: modifiedPermissions.value,
    defaultPermissions: modifiedDefaultPermissions.value,
  });
};
</script>
