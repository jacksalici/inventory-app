<template>
  <div class="mt-8 max-w-lg space-y-2 mx-auto">
    <h2 class="text-2xl font-serif">Frequently Asked Questions</h2>
    <div class="collapse collapse-arrow bg-base-200">
      <input type="radio" name="my-accordion-1" />
      <div class="collapse-title text-xl font-medium">
        What is this website?
      </div>
      <div class="collapse-content">
        <p>The Inventory App is a way to manage your RPG hero inventory. In fact, it's not so different from a to-do list, so you could also use it as a slightly DnD-themed shopping list.
          <br /><br />It's 100% free to use, ad-free, and open-source.
        </p>
      </div>
    </div>
    <div class="collapse collapse-arrow bg-base-200">
      <input type="radio" name="my-accordion-1" />
      <div class="collapse-title text-xl font-medium">
        How and why do I need to use a weird API key?
      </div>
      <div class="collapse-content">
        <p>Since my goal was to create something simple and free for both users and myself, I decided not to handle a database for user data, considering costs, privacy, and security. There is no backend.
          <br><br>
          If you (or your party) want to use this website, you will need to:
          <br>1. Create a <a class="link" href="https://deta.space">Deta</a> account and,
          <br>2. Create a new collection. Finally,
          <br>3. Get an API key for the newly created collection and place it on the first page. <br /><br />
          It's actually a quick process, and you'll be ready to go as soon as you insert the key in the specific input form! Note that only one person in the party needs to do this procedure; then, all party members share the same key.
        </p>
      </div>
    </div>
    <div class="collapse collapse-arrow bg-base-200">
      <input type="radio" name="my-accordion-1" />
      <div class="collapse-title text-xl font-medium">
        Can I manage more than one party?
      </div>
      <div class="collapse-content">
        <p>Yes, you can. In the <a class="link" href="/settings">settings</a> page, you can add one or more party IDs. Everyone who shares the same ID and key can access the same party of heroes.
          <br> You can switch parties on the go using the menu in the top-right corner of the screen.
        </p>
      </div>
    </div>
    <div class="collapse collapse-arrow bg-base-200">
      <input type="radio" name="my-accordion-1" />
      <div class="collapse-title text-xl font-medium">
        Can I export/import my heroes' data?
      </div>
      <div class="collapse-content">
        <p>Yes, from the <a class="link" href="/settings">settings</a> page, you can both import and export party data. There isn't currently a fast way to export a single hero, but you can easily retrieve it from the exported txt file (it's just a stringified dictionary, if you know what I mean).
          <br><br>Note that the import operation will overwrite heroes with the same nickname or objects with the same key.
        </p>
      </div>
    </div>
    <div class="collapse collapse-arrow bg-base-200">
      <input type="radio" name="my-accordion-1" />
      <div class="collapse-title text-xl font-medium">
        Whom can I contact if I don't like a certain feature?
      </div>
      <div class="collapse-content">
        <p>Nobody but yourself. Feel free to open an issue (or make a pull request) in the <a class="link" href="https://github.com/jacksalici/inventory-app">project repository</a>. (Any feedback is welcome, thank you! 😉)
        </p>
      </div>
    </div>
    <div class="collapse collapse-arrow bg-base-200">
      <input type="radio" name="my-accordion-1" />
      <div class="collapse-title text-xl font-medium">
        What can I do if I enjoy the project?
      </div>
      <div class="collapse-content">
        <p>Firstly, thank you! <br> To answer your question, you can star 🌟 the <a class="link" href="https://github.com/jacksalici/inventory-app">project</a> on GitHub.
          <br> If you have any feedback, please reach out to me at <b>hey_AT_jacksalici_DOT_com</b>
        </p>
      </div>
    </div>
  </div>
</template>
