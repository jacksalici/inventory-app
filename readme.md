# Inventory App

**Simple app for managing the inventory of your role-play game party.**

![illustration](/inventory-app/public/drawing.jpg )

## About  

The app relies on [***Deta* Collections**](https://deta.space/docs/en/use/your-data/collections) for persistent data storage.  The *NoSQL* database has 2 tables:

- ***HEROES-PARTY_ID***  
    It contains the info about the characters.

    | key (nickname) | name | details |  equipment | avatar |
    |-|-|-|-|-|

- ***INVENTORY-PARTY_ID***  
    It contains the info about the characters' equipment.

    | key (id) |object | details | quantity | value | used |
    |-|-|-|-|-|-|

## Usage

Since my goal was to create something simple and free both for users and myself, I decided to **not** handle a database, for the sake of costs, privacy, and security. Therefore, if you (or your party) want to use the website, you will need to:

- Create a [Deta](https://deta.space) account.
- Create a new [collection](https://deta.space/docs/en/use/your-data/collections).  
- Get an API key for the newly created collection.

That's it! The very first time that you and your party visit the website, you will need to enter the key and then you will be ready to go!  

You can also set a **party id that lets you have more inventories** in the same collection. Note that just one person in the party has to do this procedure, then all people in the party share the same key and id.

### Security concerns

1. Anyone you share a collection API key with can see/change/delete the data in that collection.
2. **The API key is saved unencrypted in the local storage of your device. This is never a good idea** but seeing the informal and playful target of this app, I've done it anyway.
  