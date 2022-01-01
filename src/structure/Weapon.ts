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
      new DoubleAxe1(),
      new GiantSword1(),
      new IronDagger1(),
      new HeavyMace1(),
      new FiringBow1(),
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
  name = "Axe - Old Rusty Axe";
  attack = 20;
  price = 1000;
}

class Sword extends Weapon {
  id = "sword";
  name = "Dagger - Bloodsurge";
  attack = 30;
  price = 2000;
}

class Dagger extends Weapon {
  id = "dagger";
  name = "Sword - Piece Maker";
  attack = 40;
  price = 3000;
}

class Mace extends Weapon {
  id = "mace";
  name = "Bow - Skeletal Crossfire";
  attack = 45;
  price = 3500;
}

class Bow extends Weapon {
  id = "bow";
  name = "Warhammer - Knight's Fall";
  attack = 50;
  price = 4000;
}


class DoubleAxe extends Weapon {
  id = "double_axe";
  name = "Double Axe - Thunder Crescent";
  attack = 75;
  price = 8000;
}

class GiantSword extends Weapon {
  id = "giant_sword";
  name = "Mace - Brutal Reaver";
  attack = 85;
  price = 9500;
}

class IronDagger extends Weapon {
  id = "iron_dagger";
  name = "Battle Axe - Blind Justice";
  attack = 98;
  price = 11000;
}

class HeavyMace extends Weapon {
  id = "heavy_mace";
  name = "Bow - Tiebreaker";
  attack = 120;
  price = 15000;
}

class FiringBow extends Weapon {
  id = "firing_bow";
  name = "Giant Sword - Destiny's Song";
  attack = 140;
  price = 16000;
}

class DoubleAxe1 extends Weapon {
  id = "sword-stormcaller";
  name = "Sword - Stormcaller";
  attack = 160;
  price = 18500;
}

class GiantSword1 extends Weapon {
  id = "heavy_mace-knights_honor";
  name = "Heavy Mace - Knight's Honor";
  attack = 190;
  price = 21000;
}

class IronDagger1 extends Weapon {
  id = "bow-hopes_end";
  name = "Bow - Hope's End";
  attack = 220;
  price = 23500;
}

class HeavyMace1 extends Weapon {
  id = "warhammer-protectors_pummeler";
  name = "Warhammer - Protector's Pummeler";
  attack = 250;
  price = 26510;
}

class FiringBow1 extends Weapon {
  id = "sword-faithkeeper";
  name = "Sword - Faithkeeper";
  attack = 280;
  price = 28700;
}
