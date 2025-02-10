<template>
  <section class="large-height surface scroll">
    <table v-if="items.length > 0" class="stripes">
      <thead class="fixed">
        <tr>
          <th
            v-for="column in columns"
            :key="column.field"
            @click="sort(column.field)"
            :class="['sortable', column.class]"
          >
            {{ column.label }}
            <span class="sort-icon">{{ getSortIcon(column.field) }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in sortedItems"
          :key="getItemKey(item)"
          :id="getItemKey(item)"
          @click="$emit('row-click', item)"
        >
          <td
            v-for="column in columns"
            :key="column.field"
            :class="column.class"
          >
            <template v-if="column.formatter">
              {{ column.formatter(item[column.field], item) }}
              <!-- make the color red if the date < currentTime in case it applies -->
            </template>
            <template v-else-if="column.field === 'ownerId'">
              {{ getUserFullName(item[column.field]) }}
            </template>
            <template v-else-if="column.field === 'osId'">
              {{ getOSName(item[column.field]) }}
            </template>
            <template v-else-if="column.field === 'virtId'">
              <span
                class="virt-logo"
                width="16px"
                height="16px"
                :class="item[column.field]"
              ></span>
            </template>
            <template v-else>
              {{ item[column.field] }}
            </template>
          </td>
        </tr>
      </tbody>
      <tfoot class="fixed">
        <tr>
          <th colspan="100%">Total {{ itemLabel }}: {{ items.length }}</th>
        </tr>
      </tfoot>
    </table>
  </section>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import {useUsers} from '@/composables/useUsers';
import {useOperatingSystems} from '@/composables/useOperatingSystems';

const {fetchUsers, getUserFullName} = useUsers();
const {fetchOperatingSystems, getOSName} = useOperatingSystems();

onMounted(async () => {
  await fetchUsers();
  await fetchOperatingSystems();
});

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  itemKey: {
    type: String,
    required: true,
  },
  itemLabel: {
    type: String,
    required: true,
  },
  defaultSort: {
    type: Object,
    default: () => ({field: 'default', order: 'asc'}),
  },
});

const emit = defineEmits(['row-click']);

const sortField = ref(props.defaultSort.field);
const sortOrder = ref(props.defaultSort.order);

const getSortIcon = field => {
  if (sortField.value === 'default' || sortField.value !== field) return '⇕';
  return sortOrder.value === 'asc' ? '↑' : '↓';
};

const sort = field => {
  if (sortField.value === field) {
    if (sortOrder.value === 'asc') {
      sortOrder.value = 'desc';
    } else if (sortOrder.value === 'desc') {
      sortField.value = 'default';
      sortOrder.value = 'asc';
    }
  } else {
    sortField.value = field;
    sortOrder.value = 'asc';
  }
};

const getItemKey = item => {
  return item[props.itemKey];
};

const sortedItems = computed(() => {
  if (sortField.value === 'default') {
    return props.items;
  }

  return [...props.items].sort((a, b) => {
    let compareValue = 0;
    const field = sortField.value;

    if (typeof a[field] === 'number') {
      compareValue = a[field] - b[field];
    } else {
      const aValue = String(a[field] || '').toLowerCase();
      const bValue = String(b[field] || '').toLowerCase();
      compareValue = aValue.localeCompare(bValue);
    }

    return sortOrder.value === 'asc' ? compareValue : -compareValue;
  });
});
</script>

<style scoped>
.sortable {
  cursor: pointer;
  user-select: none;
}

.sortable:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.sort-icon {
  display: inline-block;
  margin-inline-start: 4px;
}

.virt-logo {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-size: contain;
  background-repeat: no-repeat;
}

.vmware {
  background-image: url('@/assets/img/virt-logo/vmware.png');
}

.qemukvm {
  background-image: url('@/assets/img/virt-logo/qemukvm.png');
}
</style>
