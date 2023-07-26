<script setup>
import { ref, watchEffect, onMounted } from "vue";
import { Deta } from "deta";
import Title from '../components/Title.vue';
import router from "../router";


const items = ref();
const heroes = ref();
const newHero = ref({});
const editHeroOption = ref(false);
const editHeroSubmit = ref(false);

const error = ref("");

let deta,
  dbHero = null;

async function createHero() {
  await dbHero.put(
    {
      name: newHero.value.name,
      details: newHero.value.details,
      equipment: newHero.value.equipment,
      avatar: getAvatar(),
    },
    newHero.value.nick.trim()
  );
  fetchItem();
  newHero.value = {};
}

function getAvatar() {
  if (newHero.value.avatar) return newHero.value.avatar;
  else
    return (
      "https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=" +
      newHero.value.nick
    );
}

async function fetchItem() {
  let res = await dbHero.fetch();
  items.value = res.items;
  console.log(items.value);
}

function fillHero(fill = true) {
  if (fill) {
    items.value.forEach((element) => {
      if (newHero.value.nick == element.key) {
        newHero.value.avatar = element.avatar;
        newHero.value.name = element.name;
        newHero.value.equipment = element.equipment;
        newHero.value.details = element.details;

        editHeroSubmit.value = true;
      }
    });
  } else {
    //clear fields
    newHero.value.avatar = "";
    newHero.value.name = "";
    newHero.value.equipment = "";
    newHero.value.details = "";

    editHeroSubmit.value = false;
  }
}

watchEffect(async () => {
  try {
    deta = Deta(localStorage.DETA_API_KEY);
    let id = "";
    if (localStorage.DETA_PARTY_ID) {
      id = "-" + localStorage.DETA_PARTY_ID;
    }
    dbHero = deta.Base("heroes" + id);
    fetchItem();
  } catch (e) {
    error.value = "Please check the API key in the menu options.";
    console.error(e);
  }
});
</script>

<template>
  <!--TITLE-->
  <Title title="The Heroes" />

  
  <div class="mt-8" v-if="error">
    <div class="alert alert-warning">
      <span>{{ error }}</span>
      <a class="btn btn-outline" href="/">RELOAD PAGE</a>
    </div>
  </div>
  
  <div v-else class="flex flex-col h-full justify-between ">
    <div class="overflow-x-auto mt-8">
      <table class="table md:text-lg">
        <tbody>
          <tr v-for="(item, index) in items">
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

    <div
      class="collapse mt-4 bg-opacity-50 bg-base-200 collapse-arrow border border-base-300"
    >
      <input type="checkbox" />
      <div class="collapse-title text-xl font-medium">Add/edit a hero 🦸🦹</div>
      <div class="collapse-content space-y-2 max-w-sm mx-auto">
        <div class="flex flex-row space-x-2">
          <div class="flex flex-col space-y-2 w-full">
            <input
              type="text"
              v-model="newHero.nick"
              placeholder="Nickname (unique for the party)"
              class="input input-bordered w-full input-md"
              v-on:input="
                newHero.nick = $event.target.value.toLowerCase().trim()
              "
              :class="{ '!bg-base-300': editHeroSubmit }"
              :disabled="editHeroSubmit"
            />

            <input
              v-model="newHero.avatar"
              type="text"
              placeholder="Link of the avatar (optional)"
              class="input input-bordered w-full input-md"
            />
          </div>

          <div class="avatar">
            <div class="w-24 mask mask-squircle">
              <img v-bind:src="getAvatar()" />
            </div>
          </div>
        </div>

        <div class="flex space-x-2">
          <button
            v-if="items?.some((e) => e.key == newHero.nick)"
            v-on:click="fillHero"
            class="btn btn-sm btn-outline"
            :disabled="editHeroSubmit"
          >
            Edit {{ newHero.nick }}
          </button>

          <span
            v-if="items?.some((e) => e.key == newHero.nick) && !editHeroSubmit"
            class="my-auto text-primary"
            >Nickname must be unique!</span
          >

          <button
            v-if="editHeroSubmit"
            v-on:click="fillHero(false)"
            class="btn btn-sm btn-outline"
          >
            Back
          </button>
        </div>

        <input
          type="text"
          v-model="newHero.name"
          placeholder="Name or hero 'title'"
          class="input input-bordered w-full input-md"
        />
        <input
          type="text"
          v-model="newHero.details"
          placeholder="Details (class, race, etc)"
          class="input input-bordered w-full input-md"
        />
        <textarea
          v-model="newHero.equipment"
          placeholder="Basic equipment"
          class="textarea textarea-bordered w-full"
        />

        <div class="flex justify-end items-center">
          <button
            class="btn btn-primary"
            v-on:click="createHero()"
            :disabled="
              items?.some((e) => e.key == newHero.nick) && !editHeroSubmit
            "
          >
            <span v-if="!editHeroSubmit">Create {{ newHero.nick }}</span
            ><span v-else>Edit {{ newHero.nick }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
