/*
 * TODO: make enchants a class, aim for less + more readable code
 * Add all armor enchants
 * Fix horse armors
 * - 6Times (aka abs)
 *
 */


window.onload = function() {init()};

document.getElementById("button-gen").onclick = function() {generateItems()};


class item {
    constructor(maxStack, names, totalCount) {
        this.maxStack = maxStack;
        this.names = names;
        this.totalCount = totalCount;

        this.name = "generic";
    }


    randomCount() {
        return Math.floor(Math.random() * this.maxStack) + 1;
    }


    randomName() {
        let index = Math.floor(Math.random() * this.names.length);
        return index; // index for multi-use
    }

    random(max) {
        return Math.floor(Math.random() * max) + 1;
    }


    randomItem() {
        let nameIdx = this.randomName();
        let name = this.names[nameIdx];
        return [name, this.random(this.maxStack), "N/A", "", "N/A"]; // display name, stack, enchant, level, dura
    }
}

class armor_tools extends item {
    constructor(maxStack, duras, enchants, enchMaxes, types, names, totalCount) { // types: wood, leather, gold, etc. names: shirt, sword, etc.
        super(maxStack, names, totalCount);
        this.duras = duras; // this will be an array of all the duras, separated (colon irrelevant): name1:type1, name1:type2, ...
        this.enchants = enchants;
        this.enchMaxes = enchMaxes;
        this.types = types;

        this.name = "armor/tools";
    }


    randomType() {
        this.typeIndex = Math.floor(Math.random() * this.types.length);
        return this.typeIndex; // index for multi-use

    }

    randomEnchant() {
        let index = Math.floor(Math.random() * this.enchants.length);
        return [this.enchants[index], super.random(this.enchMaxes[index])]; // enchant, lvl
    }

    randomItem() {
        let nameIdx = super.randomName();
        let name = this.names[nameIdx];
        let enchant = this.randomEnchant();
        let typeIdx = this.randomType();
        let type = this.types[typeIdx];
        let dura = super.random(this.duras[nameIdx * 6 + typeIdx]);

        return [type + " " + name, 1, enchant[0], enchant[0] == "none" ? "" : enchant[1], dura];
    }
}

class specialEnchants extends armor_tools {
    constructor(maxStack, duras, enchants, enchMaxes, types, names, totalCount) {
        super(maxStack, duras, enchants, enchMaxes, types, names, totalCount);
        this.enchants = enchants;
        this.enchMaxes = enchMaxes; // this and enchants should be arrays of arrays with enchants for each indiv. type

        this.name = "special enchants";
    }

    randomEnchant(enchants, enchantMaxes) {
        let index = Math.floor(Math.random() * enchants.length);
        return [enchants[index], super.random(enchantMaxes[index])]; // enchant, lvl
    }

    randomItem() {
        let nameIdx = super.randomName();
        let name = this.names[nameIdx];
        let enchant = this.randomEnchant(this.enchants[nameIdx], this.enchMaxes[nameIdx]);
        let typeIdx = this.randomType();
        let type = this.types[typeIdx];
        let dura = super.random(this.duras[typeIdx]);

        console.log(enchant);
        console.log(this.enchants[nameIdx]);
        console.log(this.enchMaxes[nameIdx]);
        return [type + name, 1, enchant[0], enchant[0] == "none" ? "" : enchant[1], dura];
    }
}

class specialStack extends item {
    constructor(maxStack, names, specialStack, specialNames, totalCount) {
        super(maxStack, names, totalCount);
        this.specialStack = specialStack;
        this.specialNames = specialNames;

        this.name = "special stack";
    }

    randomItem() {
        let nameIdx = super.randomName();
        let name = this.names[nameIdx];

        let specialIdx = this.specialNames.indexOf(name);

        return [name, specialIdx == -1 ? super.random(this.maxStack) : super.random(this.specialStack[specialIdx]), "N/A", "", "N/A"];
    }
}

class potions extends item {
    constructor(maxStack, names, totalCount) {
        super(maxStack, names, totalCount);

        this.name = "potions";
    }

    randomItem() {
        let rand = super.random(3);
        return [(rand == 1 ? "" : (rand == 2 ? "Splash" : "Lingering")) + " Potion" + this.names[super.randomName()], 1, "N/A", "", "N/A"]; // Normal, splash, lingering
    }
}

class arrows extends item { // makes it easier to concat one word
    constructor(maxStack, names, totalCount) {
        super(maxStack, names, totalCount);

        this.name = "arrows";
    }

    randomItem() {
        let nameIdx = super.randomName();
        let name = this.names[nameIdx];
        return ["Arrow" + name, super.random(this.maxStack), "N/A", "", "N/A"]; // display name, amount
    }
}

let generalEnchants = ["unbreak", "mend", "bind", "vanish"];
let generalEnchantVals = [3, 1, 1, 1];

let potionNames = [ // 38 total
    " of Night vision short",
    " of Night vision long",
    " of Invisibility short",
    " of Invisibility long",
    " of leaping short",
    " of leaping 2",
    " of Leaping long",
    " of Fire resistance short",
    " of Fire resistance long",
    " of Swiftness short",
    " of Swiftness 2",
    " of Swiftness long",
    " of Slowness short",
    " of Slowness 2",
    " of Slowness long",
    " of Water breathing short",
    " of Water breathing long",
    " of Instant health 1",
    " of Instant health 2",
    " of Instant harming 1",
    " of Instant harming 2",
    " of Poison short",
    " of Poison 2",
    " of Poison long",
    " of Regeneration short",
    " of Regeneration 2",
    " of Regeneration long",
    " of Strength short",
    " of Strength 2",
    " of Strength long",
    " of Weakness short",
    " of Weakness long",
    " of Luck",
    " of The Turtle master short",
    " of The Turtle master strong",
    " of The Turtle master long",
    " of Slow falling short",
    " of Slow falling long"
];

let armorObj, toolObj, otherToolObj, weaponObj, blockObj, foodObj, potionObj, arrowObj, otherObj;

let inits = [initArmor, initTools, initOtherTools, initWeirdTools, initBlocks, initFood, initPotions, initArrows, initOther];

let objs;

function init() {
    for(let i = 0; i < inits.length; i++) {
        inits[i]();
    }

    objs = [armorObj, toolObj, otherToolObj, weaponObj, blockObj, foodObj, potionObj, arrowObj, otherObj];
}

function initArmor() { // armor is kinda weird, nothing is consistent about duras
    let helmDuras = [55, 165, 77, 165, 363, 407];
    let chestDuras = [80, 240, 112, 240, 528, 592];
    let legDuras = [75, 225, 105, 225, 495, 555];
    let shoeDuras = [65, 195, 91, 195, 429, 481]; // 24 total

    let duras = helmDuras.concat(chestDuras, legDuras, shoeDuras);

    let types = ["leather", "chain", "gold", "iron", "diamond", "netherite"];
    let enchants = ["none", "none", "prot", "fire", "blast", "proj", "thorn"];
    let enchantVals = [0, 0, 4, 4, 4, 4, 3];
    let names = ["hat", "shirt", "pant", "shoe"];

    enchants.concat(generalEnchants);
    enchantVals.concat(generalEnchantVals);

    armorObj = new armor_tools(1, duras, enchants, enchantVals, types, names, 24);
}

function initTools() { // tools
    let types = ["wood", "stone", "gold", "iron", "diamond", "netherite"];
    let enchants = ["none", "none", "eff"];
    let enchantVals = [0, 0, 5];
    let names = ["axe", "pick", "shovel", "hoe"]; // 24 total

    let axeDuras = [59, 131, 32, 250, 1561, 2031];
    
    let duras = axeDuras.concat(axeDuras, axeDuras, axeDuras);

    enchants.concat(generalEnchants);
    enchantVals.concat(generalEnchantVals);

    toolObj = new armor_tools(1, duras, enchants, enchantVals, types, names, 24);
}

function initOtherTools() { // special items
    let names = [
        "shield",
        "flint+steel",
        "trident",
        "shears",
        "fishing rod",
        "carrot on stick",
        "fungus on stick",
        "bow",
        "crossbow"
    ]; // 9

    let duras = [336, 64, 250, 238, 64, 64, 64, 384, 465];

    let enchants = [generalEnchants, generalEnchants, [
        "riptide",
        "loyalty",
        "channeling"
    ].concat(generalEnchants), generalEnchants, [
        "luck of the sea",
        "lure"
    ].concat(generalEnchants), generalEnchants, generalEnchants, [
        "power",
        "punch",
        "flame",
        "infinity"
    ].concat(generalEnchants), [
        "quick charge",
        "multishot",
        "piercing",
    ].concat(generalEnchants)];

    let enchantVals = [generalEnchantVals, generalEnchantVals, [
        3, 3, 3
    ].concat(generalEnchantVals), generalEnchantVals, [
        3, 3
    ].concat(generalEnchantVals), generalEnchantVals, generalEnchantVals, [
        5, 2, 1, 1
    ].concat(generalEnchantVals), [
        3, 1, 4
    ].concat(generalEnchantVals)];

    otherToolObj = new specialEnchants(1, duras, enchants, enchantVals, [""], names, 9);
}

function initWeirdTools() { // sword and hoe are... special
    let types = ["wood", "stone", "gold", "iron", "diamond", "netherite"];
    let enchants = ["none", "none", "fire", "sharp", "kb", "sweeping edge"];
    let enchantVals = [0, 0, 2, 5, 2, 3];
    let names = ["sword"]; // 6 total

    let swordDuras = [59, 131, 32, 250, 1561, 2031];
    
    let duras = swordDuras;

    enchants.concat(generalEnchants);
    enchantVals.concat(generalEnchantVals);

    weaponObj = new armor_tools(1, duras, enchants, enchantVals, types, names, 6);
}

function initBlocks() { // nothing special
    let names = [
        "obby",
        "anvil",
        "netherite block",
        "e chest",
        "end stone",
        "cobble",
        "redstone block",
        "coal block",
        "iron block",
        "gold block",
        "diamond block",
        "emerald block",
        "iron door",
        "cobweb",
        "oak plank",
        "lapiz block",
        "oak door",
        "blue ice",
        "crafting table",
        "bone block",
        "oak log",
        "gray concrete",
        "pumpkin",
        "melon",
        "sandstone",
        "note block",
        "white wool",
        "gravel",
        "clay",
        "sponge",
        "packed ice",
        "magma block",
        "soul sand",
        "hay bale",
        "dirt",
        "sand",
        "regular ice",
        "netherrack",
        "glass",
        "glowstone",
        "snow",
        "tnt",
        "slime block",
        "honey block",
        "scaffolding",

        // in other places, but still same category
        "respawn anchor",
        "end crystal"
    ]; // 47

    blockObj = new item(64, names, 47);
}

function initFood() { // some of them are special... so they get their own class
    let names = [
        "apple",
        "bread",
        "raw pig",
        "cook pig",
        "gapple",
        "god apple",
        "raw cod",
        "raw salmon",
        "tropical fish",
        "pufferfish",
        "cook cod",
        "cook salmon",
        "cookie",
        "melon slice",
        "dry kelp",
        "raw cow",
        "cook cow",
        "raw chicken",
        "cook chicken",
        "rotten flesh",
        "spider eye",
        "carrot",
        "potato",
        "cook potato",
        "golden carrot",
        "pumpkin pie",
        "raw rabbit",
        "cook rabbit",
        "raw sheep",
        "cook sheep",
        "chorus fruit",
        "beetroot",
        "sweet berry"
    ];
    let specialNames = [
        "mushroom stew",
        "cake",
        "rabbit stew",
        "beetroot stew",
        "sus stew",
        "honey bottle"
    ]; // 39 total
    let specialStacks = [1, 1, 1, 1, 16];

    foodObj = new specialStack(64, names, specialStacks, specialNames, 39);
}

function initPotions() {
    potionObj = new potions(1, potionNames, 38);
}

function initArrows() {
    let names = potionNames.concat([" Normal", " of Spectral"]); // 40
    arrowObj = new arrows(64, names, 40);
}

function initOther() { // random ones
    let names = [
        "empty bucket",
        "milk bucket",
        "water bucket",
        "lava bucket",
        "bed",
        "horse + nothing",
        "horse + leather armor",
        "horse + gold armor",
        "horse + iron armor",
        "horse + diamond armor",
        "mule",
        "wolf",
        "pig",
        "parrot",
        "strider",
        "pufferfish bucket",
        "oak boat"
    ];

    let specialNames = [
        "snowball",
        "pearl"
    ]; // 19 total

    let specialStacks = [
        16, 16
    ];

    otherObj = new specialStack(1, names, specialNames, specialStacks, 19);
}

function generateItems() {
    let totalItems = 206;

    let itemCounts = new Map(); // map the counts to their objects

    let countsToPercents = new Map(); // less computations

    for(let i = 0; i < objs.length; i++) { // iterate through all the gen objects
        let obj = objs[i];
        countsToPercents.set(obj.totalCount, obj.totalCount / totalItems);
        itemCounts.set(obj.totalCount, obj);
    }

    let itemCountsSorted = [...itemCounts.entries()].sort((a, b) => a[0] - b[0]); // sort the counts

    for(let i = 1; i <= 10; i++) {
        let randomChoice = Math.random();
        let item;
        
        let object;

        let currentPercent = 0;
        for(let [count, obj] of itemCountsSorted) {
            let perc = countsToPercents.get(count);

            if(randomChoice < countsToPercents.get(count) + currentPercent) {
                item = obj.randomItem();
                object = obj;
                break;
            }
            currentPercent += perc;
        }

        console.log("name: " + item[0] + " , i = " + i + " , obj = " + object.name);

        document.getElementById("name-" + i).innerHTML = item[0];
        document.getElementById("count-" + i).innerHTML = "[x" + item[1] + "]";
        document.getElementById("ench-" + i).innerHTML = item[2] + " " + item[3];
        document.getElementById("dura-" + i).innerHTML = "Durability " + item[4];
    }
}