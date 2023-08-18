<template>
    <div class="mt-8 max-w-lg space-y-2 mx-auto">
        <h2 class="text-2xl font-serif">Frequently Asked Questions</h2>
    <div class="collapse collapse-arrow  bg-base-200">
  <input type="radio" name="my-accordion-1" /> 
  <div class="collapse-title text-xl font-medium">
    What is this website?
  </div>
  <div class="collapse-content"> 
    <p>The Inventory App is a way to manage your RPG hero inventory. Actually, it is not so different from a to-do list, so you could also use it as a slighty DnD-themed shopping list.
        <br/><br/>It's 100% free to use, ad-free and open-source.
    </p>
  </div>
</div>
<div class="collapse collapse-arrow  bg-base-200">
  <input type="radio" name="my-accordion-1" /> 
  <div class="collapse-title text-xl font-medium">
    How and why have I to put a weird API key?
  </div>
  <div class="collapse-content"> 
    <p> Since my goal was to create something simple and free both for users and
        myself, I decided to <b>not</b> handle myself a database for the user data, for the sake of
        costs, privacy, and security. There is no backend.
        <br><br>
        
        If you (or your party) want to
        use this website, you will need to: 
        <br>1. Create a
        <a class="link" href="https://deta.space">Deta</a> account and,
        <br>2. create a
        new collection. Finally, 
        <br>3. get an API key for the newly created
        collection and put it on the first page. <br /><br />
        It's actually very fast to do, and you will be ready to
        go as soon as you will insert the key in the <span class="line-through">keyhole</span> specific input form! Note that just one person in the party has to do this procedure,
        then all people in the party share the same key.
    </p>
  </div>
</div>
<div class="collapse collapse-arrow  bg-base-200">
  <input type="radio" name="my-accordion-1" /> 
  <div class="collapse-title text-xl font-medium">
    Can I handle more than one party?
  </div>
  <div class="collapse-content"> 
    <p>Yes, you can. In the <a class="link" href="/settings">settings</a> page you can add one or more party IDs. Everone who shares the same ID and key can see the same party of heroes.
        <br> You can change party on the go from the menu on the top-right of the screen.
    </p>
  </div>
</div>
<div class="collapse  collapse-arrow  bg-base-200">
  <input type="radio" name="my-accordion-1" /> 
  <div class="collapse-title text-xl font-medium">
    Can I export/import my heroes data?
  </div>
  <div class="collapse-content"> 
    <p>Yes, from the <a class="link" href="/settings">settings</a> page you can both import and export the data of a party. There is not yet a fast way to export a single hero but you can easily get it from the exported txt file (it's nothing but a stringified dictionary if you know what I mean).
        <br><br>Note that the import operation will overwrite heroes with the same nickname or object with the same key.
    </p>
  </div>
</div>
<div class="collapse  collapse-arrow  bg-base-200">
  <input type="radio" name="my-accordion-1" /> 
  <div class="collapse-title text-xl font-medium">
    Who can I blame if I don't like xyz feature?
  </div>
  <div class="collapse-content"> 
    <p>Nobody but yourself, go and open an issue (or, make a PR) to the <a class="link" href="">project repository</a>. (Any feedback is welcome, thank you! 😉)
    </p>
  </div>
</div>
<div class="collapse collapse-arrow  bg-base-200">
  <input type="radio" name="my-accordion-1" /> 
  <div class="collapse-title text-xl font-medium">
    What can I do if I like the project?
  </div>
  <div class="collapse-content"> 
    <p>Firstly, thank you! <br> To answer your question, you can star 🌟 the <a class="link" href="">project</a> on GitHub.
    <br> If you have any feedback, please reach me saying <b>hey_AT_jacksalici_DOT_com</b>
    </p>
  </div>
</div>
</div>

</template>