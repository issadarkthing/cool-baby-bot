import { Message } from "discord.js";
import { Weapon as BaseWeapon } from "discordjs-rpg";
import { Player } from "../structure/Player";

export abstract class Weapon extends BaseWeapon {
  abstract price: number;

  static get all(): Weapon[] {
    return [
      new Axe(),
      new Sword(),
      new Dagger(),
      new Mace(),
      new Bow(),
      new DoubleAxe(),
      new GiantSword(),
      new IronDagger(),
      new HeavyMace(),
      new FiringBow(),
    ];
  }

  async buy(msg: Message) {

    const player = Player.fromUser(msg.author);

    if (player.coins < this.price) {
      msg.channel.send("Insufficient amount");
      return;
    }

    if (
      player.inventory.some(x => x.id === this.id) ||
      player.equippedWeapons.some(x => x.id === this.id)
    ) {
      msg.channel.send("You already own this item");
      return;
    }

    player.coins -= this.price;
    player.inventory.push(this);

    player.save();
    msg.channel.send(`Successfully bought **${this.name}**`);
  }
}


class Axe extends Weapon {
  id = "axe";
  name = "Axe";
  attack = 20;
  price = 1000;
}

class Sword extends Weapon {
  id = "sword";
  name = "Sword";
  attack = 30;
  price = 2000;
}

class Dagger extends Weapon {
  id = "dagger";
  name = "Dagger";
  attack = 40;
  price = 3000;
}

class Mace extends Weapon {
  id = "mace";
  name = "Mace";
  attack = 45;
  price = 3500;
}

class Bow extends Weapon {
  id = "bow";
  name = "Bow and Arrow";
  attack = 50;
  price = 4000;
}


class DoubleAxe extends Weapon {
  id = "double_axe";
  name = "Double Axe";
  attack = 75;
  price = 8000;
}

class GiantSword extends Weapon {
  id = "giant_sword";
  name = "Giant Sword";
  attack = 85;
  price = 9500;
}

class IronDagger extends Weapon {
  id = "iron_dagger";
  name = "Iron Dagger";
  attack = 98;
  price = 11000;
}

class HeavyMace extends Weapon {
  id = "heavy_mace";
  name = "Heavy Mace";
  attack = 120;
  price = 15000;
}

class FiringBow extends Weapon {
  id = "firing_bow";
  name = "Firing Bow and Arrow";
  attack = 140;
  price = 16000;
}
