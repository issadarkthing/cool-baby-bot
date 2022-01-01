import { Fighter } from "discordjs-rpg";
import { code, currency, random } from "../utils";
import { Player } from "./Player";
import { Skill } from "./Skill";
import { Pet } from "./Pet";
import { MessageEmbed } from "discord.js";

export class Monster extends Fighter {
  drop = random.integer(150, 500);
  xpDrop = random.integer(10, 35);
  difficulty: number;
  
  constructor(player: Player) {
    super(random.pick(names));
    this.difficulty = player.level;
    this.attack = player.attack + this.randomAttrib();
    this.hp = player.hp + this.randomAttrib();
    this.armor = player.armor + (this.randomAttrib() / 100);
    this.critChance = player.critChance + (this.randomAttrib() / 100);
    this.critDamage = player.critDamage + random.integer(0.01, 0.5);

    if (player.skill) {
      const skill = random.pick(Skill.all);
      skill.setOwner(this);
    }

    if (player.pet) {
      const pet = random.pick(Pet.all);
      pet.setOwner(this);
    }
  }

  private randomAttrib() {
    return random.integer(-3, this.difficulty);
  }

  private setNewName(embed: MessageEmbed, name: string, newName: string) {
    const field = embed.fields.find(x => x.name === name);

    if (field) {
      field.name = newName;
    }
  }

  show() {
    const profile = super.show();

    this.setNewName(profile, "Attack", "💥 Attack");
    this.setNewName(profile, "HP", "❤️ HP");
    this.setNewName(profile, "Armor", "🛡️  Armor");
    this.setNewName(profile, "Crit Chance", "🔥 Crit Chance");
    this.setNewName(profile, "Crit Damage", "🔥 Crit Damage");
    this.setNewName(profile, "Pet", "🐉 Pet");
    this.setNewName(profile, "Weapons", "🔪 Weapons");
    this.setNewName(profile, "Skill", "💫 Skill");
    this.setNewName(profile, "Armors", "🛡️ Armors");


    profile.addField(`⚖️ ${currency} Drop`, code(this.drop), true);
    profile.addField("🔱 xp Drop", code(this.xpDrop), true);

    return profile;
  }
}


const names = [ 
  "Ghoul",
  "Werewolf",
  "A-senee-ki-wakw",
  "Fachan",
  "Sirin",
  "Hydra",
  "Unktehila",
  "Fairy",
  "Basilisk",
  "Nguruvilu",
  "Blue Men",
  "Typhon",
  "Harpy",
  "Fenrir",
  "Calygreyhound",
  "Black Shuck",
  "Dragon",
  "Swamp Goblin",
  "Gnome",
  "Echidna",
  "Hecatoncheires",
  "Forest Goblin",
  "Simargl",
  "Charybdis",
  "Pixie",
  "Aswang",
  "Fomorians",
  "Redcap",
  "Capacun",
  "Indus Worm",
  "Leprechaun",
  "Minotaur",
  "Elf",
  "Aspidochelone",
  "Yeti",
  "Gigant Rat",
  "Ophiotaurus",
  "Golem",
  "Centaur",
  "Yacuruna",
  "Water Goblin",
  "Myrmecoleon",
  "Ahuizotl",
  "Psoglav",
  "Fish-Man",
  "Ant-Man",
  "Sea Serpent",
  "Winged Lion",
  "Manticore",
  "Hippogriff",
  "Drop Bear",
  "Demon",
  "Ghost",
  "Kitsune",
  "Shedim",
  "Bear Dogs",
  "Chupacabra",
  "Devil",
  "Jinn",
  "Snoligoster",
  "Snoligoster",
  "Lava Goblin",
  "Zombie Goblin",
  "Bugbear",
  "Gremlin",
  "Grease Devil",
  "Wendigo",
  "Jörmungandr",
  "Bogeyman",
  "Psychopomp",
  "Shadow People",
  "Dwarves",
  "Hodag",
  "Manticore",
  "Sasquatch",
  "Nephilim",
  "Unicorn",
  "Cursed Gorilla",
  "Shape shifters",
  "Vanir",
  "Ozark Howler",
  "Cursed Hag",
  "Kelpie",
  "Titan",
  "Accursed Air",
  "Red Ant",
  "Corrupt Ghost",
  "Accursed Scorpion",
  "Chieftain Black Panda",
  "Hundred Eagles",
  "Reborn Dog",
  "Multitudinous Devils",
  "Immortal Frog",
  "Vengeful Turtle",
  "Cursed Penguin",
  "Myriad Demons",
  "Three Assassins",
  "Scholar Astral Demon",
  "Silver Ghost",
  "Vampires",
];
