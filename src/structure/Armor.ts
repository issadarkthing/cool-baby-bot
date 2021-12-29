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
  name = "Helmet";
  price = 8500;
  armor = 0.005
}

export class ChestPlate extends Armor {
  id = "chest_plate";
  name = "Chest Plate";
  price = 5000;
  armor = 0.006
}

export class Leggings extends Armor {
  id = "leggings";
  name = "Leggings";
  price = 4500;
  armor = 0.008
}

export class Boots extends Armor {
  id = "boots";
  name = "Boots";
  price = 5500;
  armor = 0.011
}

export class Plate extends Armor {
  id = "plate";
  name = "Plate";
  price = 5800;
  armor = 0.012;
}

export class MetalHelmet extends Armor {
  id = "metal_helmet";
  name = "Metal Helmet";
  price = 20000;
  armor = 0.015
}

export class MetalChestPlate extends Armor {
  id = "metal_chest_plate";
  name = "Metal Chest Plate";
  price = 23000;
  armor = 0.017;
}

export class MetalLeggings extends Armor {
  id = "metal_leggings";
  name = "Metal Leggings";
  price = 30000;
  armor = 0.018
}

export class MetalBoots extends Armor {
  id = "metal_boots";
  name = "Metal Boots";
  price = 33000;
  armor = 0.021
}

export class MetalPlate extends Armor {
  id = "metal_plate";
  name = "Metal Plate";
  price = 35200;
  armor = 0.022;
}
