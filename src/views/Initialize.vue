<script setup>
import DetaSettings from "../components/DetaSettings.vue";
import Title from "../components/Title.vue";
import Faq from "../components/Faq.vue";

</script>

<template>
  <Title extended />

  <div
    class="card max-w-lg mt-5 w-full mx-auto bg-base-300 border-base-300 card-bordered"
  >
    <div class="card-body">
      <h2 class="card-title text-2xl">Get Started! <i class="fa-solid fa-rocket"></i></h2>
      <DetaSettings />
    </div>
  </div>

  

  <Faq />

</template>
