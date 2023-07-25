<script setup>
import { ref, watchEffect, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import { Deta } from "deta";
import Heroes from "./Heroes.vue";

const router = useRouter();
const route = useRoute();

const items = ref();
const heroes = ref();
const hero = ref("");

const newItem = ref({"hero": route.params.hero, "used": false})

const error = ref("");

let deta,
  dbInventory,
  dbHero = null;

async function fetchInventory(){
  let res = await dbInventory.fetch({"hero": route.params.hero});
  items.value = res.items;
  console.log(items.value);

}

async function addNewItem(){
  dbInventory.put(newItem.value)
  fetchInventory()

}

watchEffect(async () => {
  try {
    deta = Deta(localStorage.DETA_API_KEY);
    let id = "";
    if (localStorage.DETA_PARTY_ID) {
      id = "-" + localStorage.DETA_PARTY_ID;
    }
    dbInventory = deta.Base("inventory" + id);
    dbHero = deta.Base("heroes" + id);
    hero.value = await dbHero.get(route.params.hero);

    fetchInventory()

  } catch (e) {
    error.value = "Please check the API key in the menu options.";
    console.error(e);
  }
});
</script>

<template>

  <!--HERO DATA-->
  <div class="flex items-center space-x-2">
    <div class="avatar">
      <div class="mask mask-squircle w-30 h-30">
        <img v-bind:src="hero.avatar" alt="Avatar" />
      </div>
    </div>
    <div>
      <div class="font-bold text-lg">
        {{ hero.name }}
        <span class="font-mono font-normal text-sm opacity-50">
          ({{ hero.key }})
        </span>
      </div>
      <div class="text-sm opacity-50">{{ hero.details }}</div>
      <p>{{ hero.equipment }}</p>
    </div>
  </div>


  <!--INVENTORY TABLE-->
  <div class="overflow-x-auto mt-8">
    <table class="table ">
      <tbody>
        <tr v-for="(item, index) in items">
          <td><span class="font-bold">{{ item.object }}</span><br><span class="text-xs">{{ item.details }}</span></td>
          <td>Qty: {{ item.quantity }} <br> Value: {{ item.value }} </td>
          <td>
            <button class="btn btn-sm mr-2">
              <i class="fa-solid fa-ellipsis"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>



  <!--ADD NEW ITEM-->

  <div class="join join-vertical mt-24 w-full input-lg">
    <div class="join join-horizontal w-full"><input
      class="input input-bordered bg-trasparent !rounded-bl-none input-lg join-item w-full"
      placeholder="Description"
      v-model="newItem.object"
    />

    <input
      class="input input-bordered !rounded-br-none input-lg join-item w-full"
      placeholder="Details"
      v-model="newItem.details"
    />
  </div>
   <div class="join join-horizontal w-full">
    

    <input
      class="input input-bordered !rounded-tl-none join-item input-lg w-full"
      placeholder="Quantity"
      v-model="newItem.quantity"
    />
    <input
      class="input input-bordered !rounded-none join-item  input-lg w-full"
      placeholder="Value"
      v-model="newItem.value"
    />
  

    
    <button class="btn btn-lg join-item !rounded-tr-none" v-on:click="addNewItem()">ADD</button>
   </div>
  </div>
</template>
