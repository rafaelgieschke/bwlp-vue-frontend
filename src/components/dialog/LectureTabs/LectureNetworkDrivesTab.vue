<template>
  <p>
    Hier können Sie Netzlaufwerke angeben, die automatisch beim Start der
    Veranstaltung eingebunden werden sollen. Der Platzhalter
    <code>%loginuser%</code> wird im Pfad durch den Loginnamen des Nutzers
    ersetzt.
  </p>
  <div
    v-if="lecture.networkShares.length > 0"
    class="auto-height surface scroll"
  >
    <table class="stripes">
      <thead class="fixed">
        <tr>
          <th>Name</th>
          <th>Pfad</th>
          <th>Laufwerk</th>
          <th>Authentifizierung</th>
          <th>Username</th>
          <th>Passwort</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="networkShare in lecture.networkShares">
          <td v-for="element in networkShare">
            <!-- No idea if that works as there seems to be no data? -->
            {{ element }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps({
  lecture: {
    type: Object,
    required: true,
  },
});
</script>
