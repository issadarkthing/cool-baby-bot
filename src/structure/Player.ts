import { MessageEmbed, User } from "discord.js";
import { client } from "../index";
import { Player as PlayerRPG } from "discordjs-rpg";
import { code, currency } from "../utils";
import { Item } from "./Item";
import { Armor } from "./Armor";
import { Weapon } from "./Weapon";
import { Pet } from "./Pet";
import { Skill } from "./Skill";

export const AVATARS = [
  "https://cdn.discordapp.com/attachments/917581398313947166/917590572422799390/screenshot-07-12-2021093515.png",
  "https://cdn.discordapp.com/attachments/917581398313947166/917590571831398410/screenshot-07-12-2021093525.png",
  "https://cdn.discordapp.com/attachments/917581398313947166/917590571466522634/screenshot-07-12-2021093534.png",
  "https://cdn.discordapp.com/attachments/917581398313947166/917590571097407518/screenshot-07-12-2021093546.png",
  "https://cdn.discordapp.com/attachments/917581398313947166/917590570686373908/screenshot-07-12-2021093602.png",
  "https://cdn.discordapp.com/attachments/917581398313947166/917590570426331156/screenshot-07-12-2021093617.png",
  "https://cdn.discordapp.com/attachments/917581398313947166/917590570082402324/screenshot-07-12-2021093631.png",
  "https://cdn.discordapp.com/attachments/917581398313947166/917590569595854908/screenshot-07-12-2021093639.png",
];

export class Player extends PlayerRPG {
  name: string;
  coins = 0;
  level = 1;
  xp = 0;
  win = 0;
  hunt = 0;
  inventory: Item[] = [];

  constructor(user: User, imageUrl: string) {
    super(user);
    this.name = user.username;
    this.imageUrl = imageUrl;
  }

  static fromUser(user: User) {

    const data = client.players.get(user.id);

    if (!data) {
      throw new PlayerNotFoundErr("character has not been created");
    }

    const player = new Player(user, data.imageUrl);
    Object.assign(player, data);

    const offset = player.level - 1;
    player.hp += offset * 10
    player.attack += offset * 2
    player.critDamage += offset * 0.01;

    player.inventory = player.inventory
      .map(inv => Item.all.find(x => x.id === inv.id)!);

    const pet = player.pet;
    if (pet) {
      const validPet = Pet.all.find(x => x.id === pet.id);
      validPet?.setOwner(player);
    }

    const skill = player.skill;
    if (skill) {
      const validSkill = Skill.all.find(x => x.id === skill.id);
      player.skill = validSkill;
    }

    const equippedArmors = player.equippedArmors
      .map(inv => Armor.all.find(x => x.id === inv.id)!);

    const equippedWeapons = player.equippedWeapons
      .map(inv => Weapon.all.find(x => x.id === inv.id)!);

    player.equippedArmors = [];
    player.equippedWeapons = [];

    for (const armor of equippedArmors) {
      player.equipArmor(armor);
    }

    for (const weapon of equippedWeapons) {
      player.equipWeapon(weapon);
    }

    return player;
  }

  /** required xp to upgrade to the next level */
  private requiredXP() {
    let x = 10;
    let lvl = this.level
    while (lvl > 1) {
      x += Math.round(x * 0.4);
      lvl--;
    }
    return x;
  }


  /** adds xp and upgrades level accordingly */
  addXP(amount: number) {
    this.xp += amount;
    const requiredXP = this.requiredXP();

    if (this.xp >= requiredXP) {
      this.level++;
      this.addXP(0);
    }
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

    const armorIndex = 8;
    const armor = profile.fields.at(armorIndex)!.value;
    profile.fields.at(armorIndex)!.name = "⚖️ " + currency;
    profile.fields.at(armorIndex)!.value = this.coins.toString();
    profile.fields.at(armorIndex)!.inline = true;

    profile.addField("🎖️ Win", code(this.win), true);
    profile.addField("🏹 Hunt", code(this.hunt), true);

    const winHuntPercent = (this.win / this.hunt) || 0;
    const winHuntStr = (winHuntPercent * 100).toFixed(2) + "%";
    profile.addField("🏹 Win/Hunt %", code(winHuntStr), true);

    profile.addField("💜 Level", code(this.level), true);
    profile.addField("🔱 xp", `\`${this.xp}/${this.requiredXP()}\``, true);

    profile.addField("🛡️ Armors", armor);

    return profile;
  }

  save() {
    const { 
      user, 
      attack,
      hp,
      armor,
      critChance,
      critDamage,
      ...data
    } = this;

    if (data.pet) {
      data.pet.owner = undefined;
    }

    client.players.set(this.id, data);
  }
}

export class PlayerNotFoundErr extends Error {}
