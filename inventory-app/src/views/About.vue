<script setup>
import DetaSettings from "../components/DetaSettings.vue";
import Title from "../components/Title.vue";
import Faq from '../components/Faq.vue'


defineOptions({
    inheritAttrs:false
})

const props = defineProps({
  dbHero: {
    type: Object
  },
  dbInventory: {
    type: Object
  },
})

</script>


<template>

  <Title extended/>
  <Faq />

</template>