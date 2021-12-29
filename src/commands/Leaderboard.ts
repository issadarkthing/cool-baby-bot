import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { client } from "../index";
import { bold, currency } from "../utils";
import { Player } from "../structure/Player";
import { stripIndents } from "common-tags";

export default class extends Command {
  name = "leaderboard";
  aliases = ["l"];
  description = "show leaderboard";

  private getList<T>(
    sortFn: (a: T, b: T) => number, 
    mapFn: (a: T, i: number) => string,
  ) {

    return client.players.array()
      .sort(sortFn)
      .map(mapFn)
      .slice(0, 10)
      .join("\n");
  }

  exec(msg: Message, args: string[]) {

    const [arg1] = args;
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Leaderboard");

    let description = "";

    if (arg1 === "hunter") {

      const player = this.getList<Player>(
        (a, b) => {
          const aWin = (a.win / a.hunt) || 0;
          const bWin = (b.win / b.hunt) || 0;
          
          return bWin - aWin;
        },
        (x, i) => {
          const winHuntPercent = (x.win / x.hunt) || 0;
          const winHuntStr = (winHuntPercent * 100).toFixed(2) + "%";

          return `${i + 1}. ${x.name} \`${winHuntStr}\``;
        },
      );

      description += bold(`Name | Win/Hunt %\n`) + player;

    } else if (arg1 === "level") {

      const player = this.getList<Player>(
        (a, b) => b.level - a.level,
        (x, i) => `${i + 1}. ${x.name} \`${x.level}\``,
      );

      description += bold(`Name | Level\n`) + player;

    } else {

      const player = this.getList<Player>(
        (a, b) => b.coins - a.coins,
        (x, i) => `${i + 1}. ${x.name} \`${x.coins}\``,
      );

      description += bold(`Name | ${currency}\n`) + player;
    }

    const prefix = this.commandManager.prefix;
    description += `
    ----
    To check top hunter use \`${prefix}${this.name} hunter\`
    To check top level use \`${prefix}${this.name} level\`
    `;

    embed.setDescription(description);

    msg.channel.send({ embeds: [embed] });
  }
}

