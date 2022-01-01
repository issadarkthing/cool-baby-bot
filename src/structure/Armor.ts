import { Message } from "discord.js";
import { Armor as BaseArmor } from "discordjs-rpg";
import { Player } from "../structure/Player";

export abstract class Armor extends BaseArmor {
  abstract price: number;

  static get all(): Armor[] {
    return [
      new Helmet(),
      new ChestPlate(),
      new Leggings(),
      new Boots(),
      new Plate(),
      new MetalHelmet(),
      new MetalChestPlate(),
      new MetalLeggings(),
      new MetalBoots(),
      new MetalPlate(),
      new ChestPiece(),
      new HeroOfFools(),
      new GuardOfBloodshed(),
      new Cuirass(),
      new Suit(),
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
      player.equippedArmors.some(x => x.id === this.id)
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


export class Helmet extends Armor {
  id = "helmet";
  name = "Rusty Helmet";
  price = 4500;
  armor = 0.005
}

export class ChestPlate extends Armor {
  id = "chest_plate";
  name = "Wool Breastplate";
  price = 5000;
  armor = 0.006
}

export class Leggings extends Armor {
  id = "leggings";
  name = "Hide Vest";
  price = 7500;
  armor = 0.008
}

export class Boots extends Armor {
  id = "boots";
  name = "Heavy Leather Vest";
  price = 8500;
  armor = 0.011
}

export class Plate extends Armor {
  id = "plate";
  name = "Guardian of Infinity";
  price = 9000;
  armor = 0.012;
}

export class MetalHelmet extends Armor {
  id = "metal_helmet";
  name = "Blessing of Broken Bones";
  price = 20000;
  armor = 0.015
}

export class MetalChestPlate extends Armor {
  id = "metal_chest_plate";
  name = "Pact of the Lion";
  price = 23000;
  armor = 0.017;
}

export class MetalLeggings extends Armor {
  id = "metal_leggings";
  name = "Vengeful Golden Armor";
  price = 30000;
  armor = 0.018
}

export class MetalBoots extends Armor {
  id = "metal_boots";
  name = "Terror of Ashes";
  price = 33000;
  armor = 0.021
}

export class MetalPlate extends Armor {
  id = "metal_plate";
  name = "Soul Golden Greatplate";
  price = 35200;
  armor = 0.022;
}

export class ChestPiece extends Armor {
  id = "demon_chestpiece";
  name = "Demon Chestpiece";
  price = 45100;
  armor = 0.025;
}

export class HeroOfFools extends Armor {
  id = "hero_of_fools";
  name = "Hero of Fools";
  price = 48200;
  armor = 0.028;
}

export class GuardOfBloodshed extends Armor {
  id = "guard_of_bloodshed";
  name = "Guard of Bloodshed";
  price = 51000;
  armor = 0.030;
}

export class Cuirass extends Armor {
  id = "cuirass_of_desecration";
  name = "Cuirass of Desecration";
  price = 56000;
  armor = 0.032;
}

export class Suit extends Armor {
  id = "black_iron_suit";
  name = "Black Iron Suit";
  price = 60500;
  armor = 0.038;
}
