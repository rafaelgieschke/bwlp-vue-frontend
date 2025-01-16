<template>
  <p>
    <strong>
      Legen Sie hier fest, ob die Veranstaltung den Zugriff auf Speichermedien
      (CD, USB, ...) erlauben soll.
    </strong>
  </p>
  <label class="checkbox">
    <input type="checkbox" :checked="lecture.hasUsbAccess" disabled />
    <span>Externe Speichermedien zulassen</span>
  </label>

  <p><strong>Markieren Sie diese Veranstaltung als E-Prüfung.</strong></p>

  <p>
    Die Prüfung wird nur dann startbar sein, wenn Leerpool.nrw in den
    Prüfungsmodus versetzt wird. Kontaktieren Sie dazu Ihren lokalen
    Leerpool.nrw-Administrator.
  </p>
  <label class="checkbox">
    <input type="checkbox" :checked="lecture.isExam" disabled />
    <span>Externe Speichermedien zulassen</span>
  </label>
</template>

<script setup>
defineProps({
  lecture: {
    type: Object,
    required: true,
  },
});
</script>
