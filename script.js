document.getElementById("button-gen").onclick = function() {generateItems()};

const items = ["Shield", "Nothing. LLL", "raw chicken", "glowstone", "iron", 'rod', "dirt",
"sus stew", "netherite", "shirt", "blueice", "lava", "stone axe", "diamond axe", "iron hoe", "turtle hat",
 "cooked salmon", "milk", "flint and steel", "lapis", "wood axe", "splash instant health 2", "diamond hoe", "sand", "steak", 
 "warped fungus", "night vision", "diamond shoes", "raw salmon", "egap", "luck", "melon", "raw cod", "beetroot", "tropical fish", 
 "spider eye","boat", "swift 1", "rotten flesh"," tnt", "diamond", "honey block","obsidian", "iron shovel", "gold", "bucket of pufferfish", 
 "netherite pants", "sandstone", "leather hat", "cobweb", "slow falling", "emerald", "bow", "netherite hoe", "strider", "gap", "splash weakness",
  "arrow", "bucket", "iron axe", "melon", "gold boots", "diamond hat", "iron door", "parrot", "dried kelp", "ice", "log", "echest", "coal", "wood",
   "crossbow", "iron shirt", "trident", "horse", "iron sword", "diamond pick", "splash instant health 1", "bread", "gravel", "snow", "snowball", "bed", 
   "soul sand", "fire res", "golden carrot", "anchor", "chain pants", "sweet berries", "packed ice", "splash instant damage 1", "cooked cod", "iron shoes", 
   wait;-:t];


const enchantments = ["Sharpness", "Protection", "Fire Protection", "Blast Protection", "Aqua Affinity", "Respiration", "Power", "Flame", "Punch",
"Thorns", "Unbreaking", "Curse of Vanishing", "Curse of Binding"];

const nonstackable = ["Shield", "sus stew", "netherite shirt","lava","stone axe","diamond axe","iron hoe"
,"turtle hat","milk","flint and steel","wood axe","splash instant health 2","diamond hoe","warped fungus stick",
"night vision","diamond shoes","luck","boat","swift 1","iron shovel","bucket of pufferfish","netherite pants","leather hat",
"slowfalling","bow","netherite hoe","strider","splash weakness","bucket" ,"iron axe","gold boots","diamond hat","parrot","crossbow",
"ironshirt","trident","horse","iron sword","diamond pick","splash instant health 1","bed","fireres","chain pants","splash instant damage 1",
"iron shoes","diamondshovel","leather shoes","wood shovel","gold hat","chain hat","diamond pants","horse gold","gold leggings","netherite shoes",
"netherite sword","wolf","splahslow 2","water","raw rabbit","stone pick","chainshirt","iron pants","leather shirt","mule","cooked chicken","pig",
"shears","swift 2","horse leather","gold axe","stone shovel","honey bottles","rabit stew","water breathing","regen 2","gold sword","regen 1","iron hat",
"carrot on stick","strength 2","carrot","cake","wood sword","splash poison 2","wood hoe","chain boots","horse diamond","splash instantdamage 2","gold hoe",
"netherite hat","strength 1","wood pick","splash poison 1","mushroom stew","gold shirt","gold pick","jump 2","gold shovel","stone sword","netherite shovel","leather pants","pufferfish",
"splash slow","diamond sword","netherite pick","totem","iron pick","netherite axe","diamond shirt","jump 1","splash slow 1","spectral arrow","beetroot stew","stone hoe",
 "splash instant damage 2", "shirt", "splash slow 2", "regen 1"];

const enchantable = ["Shield", "netherite shirt","stone axe","diamond axe","iron hoe","turtle hat","wood axe","diamond hoe","diamond shoes","iron shovel","netherite pants","leather hat","bow","netherite hoe","bucket" ,"iron axe","gold boots","diamond hat","parrot","crossbow","ironshirt","trident","horse","iron sword","diamond pick","chain pants","iron shoes","diamondshovel","leather shoes","wood shovel","gold hat","chain hat","diamond pants","horse gold","gold leggings","netherite shoes","netherite sword","stone pick","chainshirt","iron pants","leather shirt","shears","horse leather","gold axe","stone shovel","gold sword","iron hat","wood sword","wood hoe","chain boots","horse diamond","gold hoe","netherite hat","wood pick","gold shirt","gold pick","gold shovel","stone sword","netherite shovel","leather pants","diamond sword","netherite pick","totem","iron pick","netherite axe","diamond shirt","spectral arrow","stone hoe"];

const durable = ["Shield", "netherite shirt","stone axe","diamond axe","iron hoe","turtle hat","wood axe","diamond hoe","diamond shoes","iron shovel","netherite pants","leather hat","bow","netherite hoe","iron axe","gold boots","diamond hat","parrot","crossbow","ironshirt","trident","horse","iron sword","diamond pick","chain pants","iron shoes","diamondshovel","leather shoes","wood shovel","gold hat","chain hat","diamond pants","horse gold","gold leggings","netherite shoes","netherite sword","stone pick","chainshirt","iron pants","leather shirt","shears","horse leather","gold axe","stone shovel","gold sword","iron hat","wood sword","wood hoe","chain boots","horse diamond","gold hoe","netherite hat","wood pick","gold shirt","gold pick","gold shovel","stone sword","netherite shovel","leather pants","diamond sword","netherite pick","totem","iron pick","netherite axe","diamond shirt","spectral arrow","stone hoe"];

function generateItems()
{
 
  
  for (i = 1; i<=10; i++)
  {
    
    var randomItem = items[Math.floor(Math.random() * 201)]
    document.getElementById("name-" + i).innerHTML = randomItem;
    if (!nonstackable.includes(randomItem)) {
      let randomCount = Math.floor(Math.random() * 64) + 1;
      document.getElementById("count-" + i).innerHTML = "[x" + randomCount + "]";
    } else {
       document.getElementById("count-" + i).innerHTML = "";
    }
    
    if (enchantable.includes(randomItem)) {
       let randomEnch = enchantments[Math.floor(Math.random() * 13)]
       let level = Math.floor(Math.random() * 3) + 1;
       document.getElementById("ench-" + i).innerHTML = randomEnch + " " + level;
    } else {
      document.getElementById("ench-" + i).innerHTML = "Enchantment N/A";
    }
    
    if (durable.includes(randomItem))
      {
        let durability = Math.floor(Math.random() * 1500) + 1;
        document.getElementById("dura-" + i).innerHTML = durability + " durability";
      }
    else
      {
         document.getElementById("dura-" + i).innerHTML =  "Durability N/A";
      }
    
   
    
  }
}