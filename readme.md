# The Inventory App 🦹

**Simple web app for managing the inventory of your role-play game party.**

## Screenshot

| Single Hero view | Heroes party view |
|-|-|
![screenshot](/public/screenshot3.png) | ![screenshot](/public/screenshot2.png)


## About  

The web app is built using Vue as frontend, and [***Deta* Collections**](https://deta.space/docs/en/use/your-data/collections) for persistent data storage. The *NoSQL* database has 2 tables:

- ***HEROES-PARTY_ID***  
    It contains the info about the characters.

    | key (nickname) | name | details |  equipment | slots | avatar |
    |-|-|-|-|-|-|

- ***INVENTORY-PARTY_ID***  
    It contains the info about the characters' equipment.

    | key (id) |object | details | quantity | value | used |
    |-|-|-|-|-|-|


Since my goal was to create something simple and free both for users and myself, I decided to **not** handle a database for user data, for the sake of costs, privacy, and security. Therefore, if you (or your party) want to use the website, you will need to get a Deta API key and put it in you client side.

### Security concerns

1. Anyone you share a collection API key with can see/change/delete the data in that collection.
2. **The API key is saved unencrypted in the local storage of your device. This is never a good idea** but seeing the informal and playful target of this app, I've done it anyway.

## Usage

For the usage of the app itself, please rely on the FAQs that are [directly on the website](https://inventory.jacksalici.com/about/).

## License

The code is released under MIT LICENSE, any issue or PR is welcome!  
  