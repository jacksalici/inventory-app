<script setup>
import { ref, watchEffect, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import { Deta } from "deta";
import Heroes from "./Heroes.vue";

const router = useRouter();
const route = useRoute();

const items = ref();
const heroes = ref();
const hero = ref({
  avatar: "/drawing.jpg",
  name: "Your Hero",
  key: "you",
  details: "Goblin Thief",
  equipment:
    "All that is gold does not glitter, not all those who wander are lost.",
});
const tempItem = ref({});

const newItem = ref({ hero: route.params.hero, used: false });

const error = ref("");

let deta,
  dbInventory,
  dbHero = null;

async function fetchInventory() {
  let res = await dbInventory.fetch({ hero: route.params.hero });
  items.value = res.items;
  console.log(items.value);
}

async function addNewItem() {
  dbInventory.put(newItem.value);
  fetchInventory();
}

function initTempItem(index) {
  tempItem.value = Object.assign({}, items.value[index]);
}

async function editItem() {
  dbInventory.put(tempItem.value);
  fetchInventory();
}

function showModalText(key) {
  return "modal" + key + ".showModal()";
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

    fetchInventory();
  } catch (e) {
    error.value = "Please check the API key in the menu options.";
    console.error(e);
  }
});
</script>

<template>
  <!--HERO DATA-->
  <div class="flex mt-3 px-4 items-start space-x-3">
    <div class="avatar mt-3">
      <div class="mask mask-squircle w-28 h-28">
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
  <div class="overflow-x-auto p-4 mt-8">
    <table class="table mx-auto max-w-sm">
      <tbody>
        <tr v-for="(item, index) in items">
          <td class="px-2 pl-auto">
            <span class="font-bold" :class="{ 'line-through': item.used }">{{
              item.object
            }}</span
            ><br /><span
              class="text-xs"
              :class="{ 'line-through': item.used }"
              >{{ item.details }}</span
            >
          </td>
          <td class="px-1">
            <span v-if="!item.used">
              Qty: {{ item.quantity }} <span v-if="!item.quantity">-</span>
              <br />
              Value: {{ item.value }} <span v-if="!item.value">-</span>
            </span>
            <span v-else class="italic"> Used </span>
          </td>
          <td class="px-1 text-right">
            <button
              class="btn btn-sm mr-2 border-base-300"
              :onclick="showModalText(item.key)"
              @click="initTempItem(index)"
            >
              <i class="fa-solid fa-ellipsis"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!--EDIT ITEM-->

  <dialog v-for="(item, index) in items" :id="'modal' + item.key" class="modal">
    <form method="dialog" class="modal-box">
      <h3 class="font-bold text-lg">Item #{{ item.key }}</h3>

      <div class="w-full my-3 bg-opacity-50">
        <label class="label">
          <span class="label-text">Item Description</span>
        </label>
        <input
          class="input input-bordered bg-trasparent w-full"
          placeholder="Description"
          v-model="tempItem.object"
        />
        <label class="label">
          <span class="label-text">Item details</span>
        </label>
        <input
          class="input bg-opacity-50 input-bordered join-item w-full"
          placeholder="Details"
          v-model="tempItem.details"
        />
        <label class="label">
          <span class="label-text">Item Quantity</span>
        </label>
        <input
          class="input bg-opacity-50 input-bordered join-item w-full"
          placeholder="Quantity"
          v-model="tempItem.quantity"
        />
        <label class="label">
          <span class="label-text">Item Value</span>
        </label>
        <input
          class="input bg-opacity-50 input-bordered join-item w-full"
          placeholder="Value"
          v-model="tempItem.value"
        />
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Used</span>
            <input type="checkbox" class="toggle" v-model="tempItem.used" />
          </label>
        </div>
      </div>

      <div class="modal-action">
        <button class="btn">Back</button>
        <button class="btn btn-primary" @click="editItem()">Save</button>
      </div>
    </form>
  </dialog>

  <!--ADD NEW ITEM-->

  <div class="max-w-sm mx-auto">
    <div class="join join-vertical">
      <div class="bg-opacity-50 join join-horizontal w-full">
        <input
          class="input input-bordered bg-trasparent !rounded-bl-none join-item w-full"
          placeholder="Description"
          v-model="newItem.object"
        />

        <input
          class="input bg-opacity-50 input-bordered !rounded-br-none join-item w-full"
          placeholder="Details"
          v-model="newItem.details"
        />
      </div>
      <div class="join join-horizontal w-full">
        <input
          class="input bg-opacity-50 input-bordered !rounded-tl-none join-item w-full"
          placeholder="Quantity"
          v-model="newItem.quantity"
        />
        <input
          class="input bg-opacity-50 input-bordered !rounded-none join-item w-full"
          placeholder="Value"
          v-model="newItem.value"
        />

        <button
          class="btn join-item border-base-300 !rounded-tr-none"
          v-on:click="addNewItem()"
        >
          ADD
        </button>
      </div>
    </div>
  </div>
</template>
