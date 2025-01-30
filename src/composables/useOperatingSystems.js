import {ref} from 'vue';
import {useAuthStore} from '@/stores/auth-store';
import {useSatServer} from '@/composables/useSatServer';

/**
 * Composable for managing operatingSystem operations
 * @returns {Object} User operations and state
 */
export function useOperatingSystems() {
  const authStore = useAuthStore();
  const sat = useSatServer();
  const operatingSystems = ref([]);

  const fetchOperatingSystems = async () => {
    if (!operatingSystems.value.length) {
      try {
        operatingSystems.value = await sat.getOperatingSystems();
      } catch (err) {
        console.error('Failed to fetch operating systems:', err);
        return [];
      }
    }
    return operatingSystems.value;
  };

  const getOSName = operatingSystemId => {
    const operatingSystem = operatingSystems.value.find(
      o => o.osId === operatingSystemId,
    );
    return operatingSystem ? `${operatingSystem.osName}` : 'Unbekannt';
  };

  return {
    operatingSystems,
    fetchOperatingSystems,
    getOSName,
  };
}
