<script setup>
import { ref, watchEffect, onMounted } from "vue";
import { Deta } from "deta";

const items = ref();
const heroes = ref();
const newHero = ref({});

const error = ref("");

let deta,
  dbHero = null;


function avatar() {
    if (newHero.value.avatar)
        return newHero.value.avatar
    else 
    return 'https://api.dicebear.com/6.x/adventurer/svg?backgroundColor=b6e3f4&seed=' + newHero.value.nick
}

watchEffect(async () => {
  try {
    deta = Deta(localStorage.DETA_API_KEY);
    let id = "";
    if (localStorage.DETA_PARTY_ID) {
      id = "-" + localStorage.DETA_PARTY_ID;
    }
    dbHero = deta.Base("heroes" + id);
    let res = await dbHero.fetch();
    items.value = res.items;
    console.log(items.value);
  } catch (e) {
    error.value = "Please check the API key in the menu options.";
    console.error(e);
  }
});
</script>

<template>
  <div v-if="error">
    <div class="alert alert-warning">
      <span>{{ error }}</span>
      <a class="btn btn-outline" href="/">RELOAD PAGE</a>
    </div>
  </div>

  <div v-else class="overflow-x-auto mt-8">
    <table class="table text-lg">
      <thead>
        <tr></tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in items">
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <td>
            <div class="flex items-center space-x-3">
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
                  <img src="{{item.photo}}" alt="Avatar" />
                </div>
              </div>
              <div>
                <div class="font-bold">{{ item.nickname }}</div>
                <div class="text-sm opacity-50">Russia</div>
              </div>
            </div>
          </td>
          <td>
            Rowe-Schoen
            <br />
            <span class="badge badge-ghost badge-sm">Office Assistant I</span>
          </td>
          <td>Crimson</td>
          <th>
            <button class="btn btn-ghost btn-xs">details</button>
          </th>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="collapse collapse-open bg-base-200">
    <input type="checkbox" />
    <div class="collapse-title text-xl font-medium">Add a new hero 🦸🦹</div>
    <div class="collapse-content space-y-2">
      <input
        type="text"
        v-model="newHero.nick"
        placeholder="Nickname (unique for the party)"
        class="input input-bordered w-full"
      />
      <input
        type="text"
        v-model="newHero.name"
        placeholder="Name or hero 'title'"
        class="input input-bordered w-full"
      />
      <input
        type="text"
        v-model="newHero.details"
        placeholder="Details (class, race, etc)"
        class="input input-bordered w-full"
      />
      <textarea
        v-model="newHero.equipment"
        placeholder="Basic equipment"
        class="textarea textarea-bordered w-full"
      />
      <input
        v-model="newHero.avatar"
        type="text"
        placeholder="Link of the avatar"
        class="input input-bordered w-full"
      />

      <div class="flex justify-between items-center">
        <div class="avatar">
          <div class="w-24 mask mask-squircle">
            <img
              v-bind:src="avatar()"
            />
          </div>
        </div>
        <button class="btn btn-wide btn-primary">
          Create {{ newHero.nick }}
        </button>
      </div>
    </div>
  </div>
</template>
