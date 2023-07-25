<script setup>

function setApiKey() {
  localStorage.DETA_API_KEY = inputApiCookie.value;
  console.log(localStorage.DETA_API_KEY)
}
function setPartyID() {
  localStorage.DETA_PARTY_ID = inputPartyIdCookie.value;
  console.log(localStorage.DETA_PARTY_ID)
}

</script>
<template>
  <div class="join w-full my-2">
    <span class="btn no-animation btn-active join-item">API KEY</span>
    <input
      class="input input-bordered w-full join-item"
      v-on:change="(event) => setApiKey(event.target.value)"
      placeholder="Very long and nasty string"
    />
  </div>

  <div class="join w-full my-2">
    <span class="btn no-animation btn-active join-item"> PARTY ID</span>
    <input
      class="input input-bordered w-full join-item"
      placeholder="The Fellowship of the Druid (optional)"
      v-on:change="(event) => setPartyID(event.target.value)"

    />
  </div>
</template>
