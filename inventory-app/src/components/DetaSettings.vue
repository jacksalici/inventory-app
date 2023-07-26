<script setup>
import { ref, watchEffect } from "vue";

const showParties = ref(false);
const parties = ref(new Set());
const party = ref();

const DETA_API_KEY = 'DETA_API_KEY'
const DETA_PARTY_IDS_SAVED = 'DETA_PARTY_IDS_SAVED'
const DETA_PARTY_ID = 'DETA_PARTY_ID'

function setApiKey(key) {
  localStorage.setItem(DETA_API_KEY, key);
  console.log(localStorage.DETA_API_KEY);
}
function changePartiesID(id) {
    if (!party.value){
       return
    }else if (parties.value.has(party.value)){
        parties.value.delete(party.value)
        if (localStorage.getItem(DETA_PARTY_ID) == party.value){
            localStorage.removeItem(DETA_PARTY_ID);
        }
    }else{
        parties.value.add(id)
        localStorage.setItem(DETA_PARTY_ID, id);
    }
    
    localStorage.setItem(DETA_PARTY_IDS_SAVED, JSON.stringify([...parties.value]))
    
}

function partyButtonText(){
    if (!party.value){
        return '👀';
    }else if (parties.value.has(party.value)){
        return 'REMOVE'
    }else{return 'ADD'}
}

function getPartyIDs() {
    parties.value = new Set(JSON.parse(localStorage.getItem(DETA_PARTY_IDS_SAVED)))
}

watchEffect(async () => {
  getPartyIDs();
});
</script>
<template>
  <div class="flex flex-col space-y-2 mt-3">
    <p>Add your API key.</p>
    <input
      class="input input-bordered input-lg w-full"
      v-on:change="(event) => setApiKey(event.target.value)"
      placeholder="Very long and nasty string"
    />
    <div class="flex justify-between pt-4">
      <button
        class="btn btn-base-200 border border-base-300"
        onclick="doc.showModal()"
      >
        DOCS
      </button>
      <input
        type="checkbox"
        aria-label="PARTY IDS"
        v-model="showParties"
        class="ml-auto mr-1 btn border border-base-300"
      />
      <button class="btn btn-primary">SAVE</button>
    </div>

    <div v-if="showParties">
      <div class="mt-4 join w-full">
        <input
          class="input input-bordered w-full join-item input-sm"
          v-model="party"
          placeholder="Add or remove new party ID"
        />
        <button
          class="btn join-item border border-base-300 btn-sm"
          @click="changePartiesID(party)"
        >
          {{partyButtonText()}}
        </button>
      </div>
      
      <div class="flex mt-2 gap-1"><div class="badge badge-secondary gap-2" v-for="party in parties">
        {{party}}
    </div></div>
      
    </div>
  </div>

  <dialog id="doc" class="modal">
    <form method="dialog" class="modal-box">
      <h3 class="font-bold text-lg">Documentation</h3>
      <p class="py-4">
        Since my goal was to create something simple and free both for users and
        myself, I decided to <b>not</b> handle a database, for the sake of
        costs, privacy, and security. Therefore, if you (or your party) want to
        use the website, you will need to: Create a
        <a class="link" href="https://deta.space">Deta</a> account and create a
        new collection. Finally, get an API key for the newly created
        collection. <br /><br />
        That's it! The very first time that you and your party visit the
        website, you will need to enter the key and then you will be ready to
        go! Note that just one person in the party has to do this procedure,
        then all people in the party share the same key.
        <br /><br />
        You can also set one (or more) Party ID that let you have more
        inventories in the same collection.
      </p>

      <div class="modal-action">
        <button class="btn">Close</button>
      </div>
    </form>
  </dialog>
</template>
