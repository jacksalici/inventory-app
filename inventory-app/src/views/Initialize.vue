<script setup>
import DetaSettings from "../components/DetaSettings.vue";
import Title from "../components/Title.vue";
</script>

<template>
  <Title extended />

  <div
    class="card max-w-xl mt-5 w-full mx-auto bg-opacity-50 bg-base-200 border-base-300 card-bordered"
  >
    <div class="card-body">
      <h2 class="card-title text-2xl">Get Started! 🚀</h2>
      <DetaSettings />
    </div>
  </div>

  <div
    class="card max-w-xl mt-5 w-full mx-auto bg-opacity-50 bg-base-200 border-base-300 card-bordered"
  >
    <div class="card-body">
      <h2 class="card-title text-2xl">Create your hero is as simple as this! 🦹</h2>
      <DetaSettings />
    </div>
  </div>
</template>
