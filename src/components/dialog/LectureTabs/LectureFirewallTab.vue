<template>
  <p>
    <strong>
      Legen Sie hier fest, ob die Veranstaltung Zugriff zum Internet haben soll.
      In der Liste können Sie bestimmte Adressen und Services ein- oder
      ausschalten.
    </strong>
  </p>
  <label class="checkbox">
    <input type="checkbox" :checked="lecture.hasInternetAccess" disabled />
    <span>Externe Speichermedien zulassen</span>
  </label>

  <p><strong>Netzwerkregeln</strong></p>
  <p>
    <strong class="red-text">
      <i class="small">warning</i> Überprüfung noch nicht möglich
    </strong>
  </p>
  <p>
    Wenn Sie den Internetzugriff deaktiviert haben, können Sie hier Ausnahmen
    definieren (Whitelist). Bitte definieren Sie Ihre Regeln im Format
    <code>&lt;host&gt;</code> <code>&lt;port&gt;</code>
    <code>&lt;in|out&gt;</code>.
  </p>
  <p>
    Sie können Port 0 angeben, was sämtlichen TCP und UDP Ports eines Hosts
    entspricht.
  </p>
  <p>
    Wenn Sie Internetzugriff aktivieren, hat diese Liste den gegenteiligen
    Effekt (Blacklist).
  </p>
  <!-- Add the edit thing -->
</template>

<script setup>
defineProps({
  lecture: {
    type: Object,
    required: true,
  },
});
</script>
