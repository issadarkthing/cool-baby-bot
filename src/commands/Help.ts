import { Command } from "../structure/Command";
import { Message, MessageEmbed } from "discord.js";
import { client } from "../index";

export default class extends Command {
  name = "help";
  aliases = ["h"];
  description = "show all commands and it's description";
  emoji = "👀";

  async exec(msg: Message) {
    const commands = client.commandManager.commands.values() as IterableIterator<Command>;

    let helpText = "";
    const done = new Set<string>();

    for (const command of commands) {

      if (command.disable)
        continue;

      if (done.has(command.name)) {
        continue
      } else {
        done.add(command.name);
      }

      helpText += 
        `\n${command.emoji} **${command.name}**: \`${command.description || "none"}\``;

    }

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Help 👹CoolBabiesClub Battlefield 👹")
      .setDescription(helpText)

    msg.channel.send({ embeds: [embed] });
  }
}
