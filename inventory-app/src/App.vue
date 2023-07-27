<script setup>
import { Deta } from "deta";
import { onMounted, ref, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";



let deta,
  dbInventory,
  dbHero = null;

const error = ref();
const parties = ref();
const party = ref();
const router = useRouter();
const route = useRoute();

function changePartyID(id){
  party.value = id
  localStorage.setItem("DETA_PARTY_ID", id)
  
  router.go()
  
 

}

watchEffect(async () => {
  try {
    deta = Deta(localStorage.DETA_API_KEY);
    let id = "";
    if (localStorage.DETA_PARTY_ID) {
      id = "_" + localStorage.DETA_PARTY_ID;
    }
    dbInventory = deta.Base("inventory" + id);
    dbHero = deta.Base("heroes" + id);
  } catch (e) {
    error.value = "Please check the API key in the menu options.";
    console.error(e);
  }
});

onMounted(() => {
  parties.value = new Set(
    JSON.parse(localStorage.getItem("DETA_PARTY_IDS_SAVED"))
  );
  party.value = localStorage.getItem("DETA_PARTY_ID")
});
</script>

<template>
  <img
    src="/drawing.jpg"
    class="max-w-sm mix-blend-multiply bottom-16 right-0 fixed z-[-1] opacity-20"
  />

  <div class="flex flex-col min-h-screen">
    <div class="navbar bg-base-200">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case font-serif text-2xl" href="/"
          >The Inventory App</a
        >
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <i class="fa-solid fa-bars"></i>
          </label>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-base-200 rounded-box w-44"
          >
            <li>
              <router-link to="/"
                ><i class="fa-solid fa-house"></i> Home</router-link
              >
            </li>
            <li>
              <router-link to="/about/"
                ><i class="fa-solid fa-circle-info"></i> About</router-link
              >
            </li>
            <li>
              <router-link to="/settings"
                ><i class="fa-solid fa-sliders"></i> Settings</router-link
              >
            </li>

            <select class="select select-secondary select-sm w-full mt-3 max-w-xs " @change="changePartyID($event.target.value)">
            <option disabled :selected="!party">Party ID</option>
            <option value="">Default</option>
            <option v-for="p in parties" :selected="p == party">{{ p }}</option>
          </select>
          </ul>

          
        </div>
      </div>
    </div>

    <div class="container max-w-2xl mb-auto mx-auto self-stretch p-2">
      <router-view :dbHero="dbHero" :dbInventory="dbInventory" />
    </div>

    <footer class="footer footer-center mt-3 p-4 bg-base-200 text-base-content">
      <div>
        <p>
          © 2023 - Developed by <a class="link">jacksalici</a>, illustration by
          <a class="link" href="https://www.instagram.com/michelegalavotti/"
            >Mich</a
          >.
        </p>
      </div>
    </footer>
  </div>
</template>
