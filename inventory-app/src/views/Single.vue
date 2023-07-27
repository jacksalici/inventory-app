<script setup>
import { ref, watchEffect, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import HeroEdit from "../components/HeroEdit.vue";

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


const router = useRouter();
const route = useRoute();

const items = ref();
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

async function fetchInventory() {
  items.value = (await props.dbInventory.fetch({ hero: route.params.hero })).items;
  console.log(items.value);
}

async function fetchHero() {
  let h = await props.dbHero.get(route.params.hero);
  if (h){
    hero.value = h
  }else{
    router.push('/')
  }
}

async function addNewItem() {
  await props.dbInventory.put(newItem.value);
  newItem.value = { hero: route.params.hero, used: false }
  fetchInventory();
}

function initTempItem(index) {
  tempItem.value = Object.assign({}, items.value[index]);
}

async function editItem() {
  await props.dbInventory.put(tempItem.value);
  fetchInventory();
}

async function deleteItem() {
  await props.dbInventory.delete(tempItem.value.key);
  fetchInventory();
}

function showModalText(key) {
  return "modal" + key + ".showModal()";
}

onMounted(async ()=>{
  fetchInventory()
  fetchHero()
})

</script>

<template>
  <!--HERO DATA-->
  <div class="flex mt-3 px-4 items-start space-x-3 bg-base-200 p-4 rounded-lg border-base-300 border">
    <div class="avatar mt-1">
      <div class="mask mask-squircle w-20 h-20">
        <img v-bind:src="hero.avatar" alt="Avatar" />
      </div>
    </div>
    <div>
      <div class=" flex w-full gap-2">
        <div class="font-bold text-lg">{{ hero.name }}
        <span class="font-mono font-normal text-sm opacity-50">
          ({{ hero.key }})
          <div class="text-sm opacity-50">{{ hero.details }}</div>
        </span></div>
        <button
              class="btn my-auto btn-sm btn-secondary btn-outline"
              onclick="editHeroModal.showModal()"
            
            >
            <i class="fa-solid fa-pen-to-square"></i>
            </button>
      </div>
  
      <p style="text-wrap: balance">{{ hero.equipment }}</p>
    </div>
  </div>

  <dialog id="editHeroModal" class="modal">
  <form method="dialog" class="modal-box">
    <h3 class="font-bold pb-2 text-lg">Edit your hero <span class="font-normal opacity-50 font-mono">({{ route.params.hero }})</span></h3>
    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><i class="fa-solid fa-xmark"></i></button>
    <HeroEdit :dbHero="props.dbHero" :heroes="[hero]" @fetchHero="fetchHero()" single/>
  
  </form>
</dialog>


  <!--INVENTORY TABLE-->
  <div class="overflow-x-auto p-4 mt-8">
    <div v-if="!items.length" class="font-serif text-xl text-center text-secondary"> No items found. Add the first down below. </div>
    <table v-else class="table mx-auto max-w-sm">
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
      <h3 class="font-bold text-lg pb-4">Edit Item <span class="font-mono font-normal text-sm opacity-50">
          ({{ item.key }})
        </span></h3>

        <label class="label">
          <span class="label-text">Item Description</span>
        </label>
        <input
          class="input input-bordered bg-trasparent w-full"
          placeholder="Description"
          v-model="tempItem.object"
        />
        <label class="label">
          <span class="label-text">Item Details</span>
        </label>
        <input
          class="input bg-opacity-50 input-bordered join-item w-full"
          placeholder="Details"
          v-model="tempItem.details"
        />
       

        <div class="flex space-x-3 w-full">
          <div><label class="label">
          <span class="label-text">Item Quantity</span>
        </label>
        <input
          class="input bg-opacity-50 input-bordered join-item w-full"
          placeholder="Quantity"
          v-model="tempItem.quantity"
        /></div>
        <div><label class="label">
          <span class="label-text">Item Value</span>
        </label>
        <input
          class="input bg-opacity-50 input-bordered join-item w-full"
          placeholder="Value"
          v-model="tempItem.value"
        /></div>
        </div>
      
      <div class="form-control w-32 mt-4">
          <label class="label cursor-pointer">
            <span class="label-text">Used</span>
            <input type="checkbox" class="toggle" v-model="tempItem.used" />
          </label>
        </div>

      <div class="modal-action">
        <button class="btn btn-error btn-outline my-auto mr-auto" @click="deleteItem()">Del</button>
        <button class="btn border-base-300">Back</button>
        <button class="btn btn-primary border-primary-focus" @click="editItem()">Save</button>
      </div>
     
    </form>
  </dialog>

  <!--ADD NEW ITEM-->

  <div class="max-w-sm mx-auto p-4 sm:px-0">
    <div class="join join-vertical">
      <div class="bg-opacity-50 join join-horizontal w-full">
        <input
          class="input bg-opacity-50 input-bordered !rounded-bl-none join-item w-full"
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
          class="btn join-item btn-primary  !rounded-tr-none"
          v-on:click="addNewItem()"
        >
          ADD ITEM
        </button>
      </div>
    </div>
  </div>
</template>
