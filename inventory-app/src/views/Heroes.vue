<script setup>
import { ref, watchEffect } from "vue";
import { Deta } from "deta";
import Title from '../components/Title.vue';
import HeroEdit from '../components/HeroEdit.vue';

import router from "../router";


const heroes = ref();
const newHero = ref({});
const editHeroOption = ref(false);
const editHeroSubmit = ref(false);

const error = ref("");

let deta, dbHero = null;





async function fetchHero() {
  heroes.value = (await dbHero.fetch()).items;
}


watchEffect(async () => {
  try {
    deta = Deta(localStorage.DETA_API_KEY);
    let id = "";
    if (localStorage.DETA_PARTY_ID) {
      id = "-" + localStorage.DETA_PARTY_ID;
    }
    dbHero = deta.Base("heroes" + id);
    fetchHero();
  } catch (e) {
    error.value = "Please check the API key in the menu options.";
    console.error(e);
  }
});
</script>

<template>
  <!--TITLE-->
  <Title title="The Heroes" />

  <!--HERO LIST-->
  <div class="flex flex-col h-full justify-between ">
    <div class="overflow-x-auto mt-8">
      <table class="table md:text-lg">
        <tbody>
          <tr v-for="(item, index) in heroes">
            <td class="px-1">
              <div class="flex items-center space-x-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-10 h-10">
                    <img v-bind:src="item.avatar" alt="Avatar" />
                  </div>
                </div>
                <div>
                  <div class="font-mono italic text-xs opacity-50">
                    {{ item.key }}
                  </div>
                  <div class="font-bold">{{ item.name }}</div>
                  <div class="text-sm opacity-50">{{ item.details }}</div>
                </div>
              </div>
            </td>
            <td class="px-1 md:px-4">
              <p class="text-sm">{{ item.equipment }}</p>
            </td>
            <td class="px-1">
              <button class="btn btn-sm border-base-300" @click="router.push('/h/'+ item.key)" 
                ><i class="fa-solid fa-pen-to-square"></i
              ></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--HERO EDIT MENU-->
    <div
      class="collapse mt-4 bg-opacity-50 bg-base-200 collapse-arrow border border-base-300"
    >
      <input type="checkbox" />
      <div class="collapse-title text-xl font-medium">Add/edit a hero 🦸🦹</div>
      <div class="collapse-content space-y-2 max-w-sm mx-auto">
        <HeroEdit :db-hero="dbHero" :heroes="heroes" @fetchHero="fetchHero()"/>
      </div>
    </div>
  </div>
</template>
