<script setup>
import { onBeforeMount, ref, watchEffect } from "vue";
import { Deta } from "deta";
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const showParties = ref(false);
const parties = ref(new Set());
const party = ref();
const deta_api_key = ref("");
const deta_api_key_valid = ref({status: false, message: ""});

const DETA_API_KEY = "DETA_API_KEY";
const DETA_PARTY_IDS_SAVED = "DETA_PARTY_IDS_SAVED";
const DETA_PARTY_ID = "DETA_PARTY_ID";

defineProps({
  showID: {
    type: Boolean,
    default: false,
  },
});

async function checkApiKey() {
  try {
    const deta = Deta(deta_api_key.value);
    
    let id = localStorage.DETA_PARTY_ID ? "_" + localStorage.DETA_PARTY_ID : "_";
    let heroes = (await deta.Base("heroes" + id).fetch()).items;

    localStorage.setItem(DETA_API_KEY, deta_api_key.value);
    deta_api_key_valid.value = {status: true, message: "Ok, let's go!"};

  } catch (e) {
    console.log(e)
    deta_api_key_valid.value = {status: false, message: "Please, add a real key."};
  }
}

function setApiKey(key) {
  localStorage.setItem(DETA_API_KEY, key);
  console.log(localStorage.DETA_API_KEY);
}
function changePartiesID(id) {
  if (!party.value) {
    return;
  } else if (parties.value.has(party.value)) {
    parties.value.delete(party.value);
    if (localStorage.getItem(DETA_PARTY_ID) == party.value) {
      localStorage.removeItem(DETA_PARTY_ID);
    }
  } else {
    parties.value.add(id);
    localStorage.setItem(DETA_PARTY_ID, id);
  }

  localStorage.setItem(
    DETA_PARTY_IDS_SAVED,
    JSON.stringify([...parties.value])
  );
}

function partyButtonText() {
  if (!party.value) {
    return "PARTY ID";
  } else if (parties.value.has(party.value)) {
    return "REMOVE PARTY ID";
  } else {
    return "ADD PARTY ID";
  }
}

function getPartyIDs() {
  parties.value = new Set(
    JSON.parse(localStorage.getItem(DETA_PARTY_IDS_SAVED))
  );
}

watchEffect(async () => {
  getPartyIDs();
});

onBeforeMount(()=>{
   deta_api_key.value = localStorage.getItem(DETA_API_KEY)
})
</script>
<template>
  <div class="flex flex-col space-y-2 mt-3">
    <p>Add your API key. <span :class="{'text-primary': deta_api_key_valid.status, 'text-error': !deta_api_key_valid.status}">{{ deta_api_key_valid.message }}</span></p>
    
    <div class="flex space-x-1">
        <input
      v-model="deta_api_key"
      class="input input-bordered w-full"
      placeholder="Very long and nasty string"
    />
    <button class="btn btn-primary " @click="checkApiKey()">
        CHECK
      </button>
    </div>

    <a class="btn btn-accent btn-lg" v-if="deta_api_key_valid.status" href="/">
        Let's go! <i class="fa-solid fa-arrows-rotate"></i>
    </a>

    <div class="flex">
      <button class="btn btn-xs btn-outline" onclick="doc.showModal()">
        DOCS <i class="fa-solid fa-life-ring"></i>
      </button>
      <input
        v-if="!showID"
        type="checkbox"
        aria-label="PARTY IDS"
        v-model="showParties"
        class="btn btn-xs ml-1 mr-auto btn-outline"
      />
      
    </div>
    

    <div v-if="showParties || showID">
      <div class="mt-6 join w-full">
        <input
          class="input input-bordered w-full join-item input-sm"
          v-model="party"
          placeholder="Add or remove new party ID (optionally)"
        />
        <button
          class="btn join-item btn-sm btn-primary"
          @click="changePartiesID(party)"
        >
          {{ partyButtonText() }}
        </button>
      </div>

      <div class="flex mt-2 gap-1">
        <div class="badge badge-secondary gap-2" v-for="party in parties">
          {{ party }}
        </div>
      </div>
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
