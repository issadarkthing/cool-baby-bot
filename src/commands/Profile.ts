import { Command } from "../structure/Command";
import { Message } from "discord.js";
import { Player } from "../structure/Player";

export default class extends Command {
  name = "profile";
  description = "show profile";
  aliases = ["p"];
  emoji = "🎭";

  async exec(msg: Message) {

    const player = Player.fromUser(msg.author);

    msg.channel.send({ embeds: [player.show()] });
  }
}
