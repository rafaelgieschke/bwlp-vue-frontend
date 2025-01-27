<template>
  Dateinamenserweiterung: {{ parseString(lecture.runscript).ext }}
  <br />

  Sichtbarkeit:
  {{ getVisibilitySetting(parseString(lecture.runscript).visibility) }}
  <br />

  Audio: {{ getAudioSetting(parseString(lecture.runscript).soundMuted) }}
  <br />

  <span class="pre-title">{{ parseString(lecture.runscript).ext }}</span>
  <pre><code>{{ parseString(lecture.runscript).script }}</code></pre>
</template>

<script setup>
defineProps({
  lecture: {
    type: Object,
    required: true,
  },
});

function parseString(input) {
  const result = {
    ext: '',
    visibility: null,
    soundMuted: null,
    script: '',
  };

  const parts = input.split('\n');
  const firstLine = parts[0];

  // Get settings part (everything before the first space)
  const settings = firstLine.split(' ')[0];

  // Parse settings
  settings.split(';').forEach(setting => {
    const [key, value] = setting.split('=');
    if (key === 'ext') {
      result.ext = value || '';
    } else if (key === 'visibility') {
      result.visibility = parseInt(value);
    } else if (key === 'soundMuted') {
      result.soundMuted = parseInt(value);
    }
  });

  // Get script if exists
  const scriptInFirstLine = firstLine.slice(settings.length).trim();
  if (scriptInFirstLine) {
    result.script = scriptInFirstLine;
  } else if (parts.length > 1) {
    result.script = parts.slice(1).join('\n');
  }

  return result;
}

function getAudioSetting(setting) {
  switch (setting.toString()) {
    case '-1':
      return 'Vorgabe des Pools';
    case '0':
      return 'Aktivieren';
    case '1':
      return 'Stummschalten';
    default:
      return 'Unbekannt';
  }
}

function getVisibilitySetting(setting) {
  switch (setting) {
    case 0:
      return 'Versteckt';
    case 1:
      return 'Normal';
    case 2:
      return 'Minimiert';
    default:
      return 'Unbekannt';
  }
}
</script>

<style scoped>
.pre-title {
  display: block;
  padding-left: 0.5rem;
  border-bottom: 1px solid var(--primary);
  border-left: var(--primary) 4px solid;
  border-radius: 0;
  background-color: var(--surface-container);
  font-weight: bold;
  font-size: 1.2em;

  & + pre {
    margin-top: 0;
  }
}
</style>
