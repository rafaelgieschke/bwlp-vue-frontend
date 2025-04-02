<template>
  <section class="large-height surface scroll">
    <div class="search field label suffix border top-margin round">
      <input
        id="search"
        name="search"
        type="text"
        v-model="searchQuery"
        class="search-input"
        placeholder="Search..."
        @input="filterItems"
      />
      <label for="search">Filter the {{ itemLabel.toLowerCase() }}</label>
      <i>search</i>
    </div>

    <table v-if="filteredItems.length > 0" class="stripes">
      <thead class="fixed">
        <tr>
          <th
            v-for="column in columns"
            :key="(column as Column).field"
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
          v-for="item in filteredAndSortedItems"
          :key="getItemKey(item)"
          :id="getItemKey(item)"
          class="ripple pointer"
          @click="$emit('row-click', item)"
        >
          <td v-for="column in columns" :key="column.field" :class="column.class">
            <template v-if="column.formatter">
              {{ column.formatter(item[column.field], item) }}
              <!-- TODO: make the color red if the date < currentTime in case it applies -->
            </template>

            <template v-else-if="column.field === 'ownerId'">
              <!-- TODO: make the text bold if the ownerId matches the currently logged in user's id -->
              <!-- also do it for everywhere else that has ownerId, or updaterId, etc. -->
              {{ getUserFullName(item[column.field]) }}
            </template>

            <template v-else-if="column.field === 'osId'">
              {{ getOSName(item[column.field]) }}
            </template>

            <template v-else-if="column.field === 'virtId'">
              <span class="virt-logo" width="16px" height="16px" :class="item[column.field]"></span>
            </template>

            <template v-else-if="column.field === 'isEnabled'">
              <label class="checkbox center">
                <input type="checkbox" :checked="column.field" disabled />
                <span></span>
              </label>
            </template>

            <template v-else>
              {{ item[column.field] }}
            </template>
          </td>
        </tr>
      </tbody>

      <tfoot class="fixed">
        <tr>
          <th :colspan="createRoute !== '' ? footerColspan : columns.length">
            <!-- We give this a colspan of 42 so that it always fully colspans: https://stackoverflow.com/questions/398734/colspan-all-columns#comment19907221_398778 this guy says "why tf not", and I find it funny because 42 so here we are -->
            Showing {{ filteredItems.length }} of {{ items.length }}
            {{ itemLabel }}
          </th>
          <th
            v-if="createRoute"
            :colspan="columns.length - footerColspan"
            class="right-align no-padding"
          >
            <RouterLink
              :to="{name: createRoute}"
              class="button small small-padding large-round border tertiary-border tertiary-text no-margin ripple"
            >
              <i>add</i>
              Create {{ itemLabel.toLowerCase().replace('s', '') }}
            </RouterLink>
          </th>
        </tr>
      </tfoot>
    </table>

    <article v-else class="error">
      <nav>
        0 matches found
        <RouterLink :to="{name: createRoute}" class="underline"
          >Create {{ itemLabel.toLowerCase().replace('s', '') }}</RouterLink
        >
      </nav>
    </article>
  </section>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, watch} from '@vue/runtime-core';
import {useUsers} from '@/composables/useUsers';
import {useOperatingSystems} from '@/composables/useOperatingSystems';

const {fetchUsers, getUserFullName} = useUsers();
const {fetchOperatingSystems, getOSName} = useOperatingSystems();

onMounted(async () => {
  await fetchUsers();
  await fetchOperatingSystems();
});

interface Column {
  field: string;
  label: string;
  class?: string;
  formatter?: (value: any, item: any) => string;
}

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array as () => Column[],
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
  footerColspan: {
    type: Number,
  },
  createRoute: {
    type: String,
    default: '',
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

const searchQuery = ref('');
const filteredItems = ref([]);

const filterItems = () => {
  if (!searchQuery.value) {
    filteredItems.value = props.items;
    return;
  }

  const query = searchQuery.value.toLowerCase();
  filteredItems.value = props.items.filter(item => {
    return props.columns.some(column => {
      const value = item[column.field];
      if (!value) return false;

      if (column.field === 'ownerId') {
        return getUserFullName(value).toLowerCase().includes(query);
      }
      if (column.field === 'osId') {
        return getOSName(value).toLowerCase().includes(query);
      }
      if (column.formatter) {
        return column.formatter(value, item).toLowerCase().includes(query);
      }
      if (column.field === 'virtId') {
        return String(value).toLowerCase().includes(query);
      }

      return String(value).toLowerCase().includes(query);
    });
  });
};

const filteredAndSortedItems = computed(() => {
  if (sortField.value === 'default') {
    return filteredItems.value;
  }

  return [...filteredItems.value].sort((a, b) => {
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

onMounted(() => {
  filteredItems.value = props.items;
});

watch(
  () => props.items,
  () => {
    filterItems();
  },
);
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

.search input:not(:focus)::placeholder {
  color: transparent;
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

.pointer {
  cursor: pointer;
}
</style>
