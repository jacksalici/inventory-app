<script setup>
import DetaSettings from "../components/DetaSettings.vue";
import Title from "../components/Title.vue";
import { ref, watchEffect, onMounted } from "vue";

const props = defineProps({
  dbHero: {
    type: Object
  },
  dbInventory: {
    type: Object
  },
})

const party = ref("")


onMounted(() => {
  party.value = localStorage.getItem("DETA_PARTY_ID")
  party.value= party.value == "" ? "default" : "'" + party.value+"'"

});

async function exportSettings (){
  let h = (await props.dbHero.fetch()).items;
  let i = (await props.dbInventory.fetch()).items;

  let s = JSON.stringify({'inventory': i, 'heroes': h})

  download("inventoryBackup.txt", s)

}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

</script>

<template>
  <Title title="Settings" />

  <div class="pt-4 max-w-md m-auto">
  <DetaSettings showID/>


  <div class="card w-full mt-12 bg-primary text-primary-content">
  <div class="card-body">
    <h2 class="card-title">Import Export settings</h2>
    <p> You can change the party id in the top right screen menu. Please note that the import option overwrites the data with the same key.</p>
    

    <div class="card-actions justify-start">
      <button class="btn btn-sm" v-on:click="exportSettings()">Export {{ party }}</button>
      <button class="btn btn-sm">Import {{ party }}</button>
    </div>
  </div>
</div>



</div>


</template>
