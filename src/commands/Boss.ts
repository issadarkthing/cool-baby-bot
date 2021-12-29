import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { Boss } from "../structure/Boss";
import { Player } from "../structure/Player";
import { 
  bold, 
  CROSSED_SWORD, 
  currency, 
  random, 
  toNList, 
  validateIndex, 
  validateNumber,
} from "../utils";
import { ButtonHandler } from "../structure/ButtonHandler";
import { Battle } from "discordjs-rpg";

export default class extends Command {
  name = "boss";
  description = "fight boss";
  throttle = 1000 * 60 * 60 * 12; // throttle for 12 hours

  async exec(msg: Message, args: string[]) {

    const player = Player.fromUser(msg.author);
    const boss = Boss.all;
    
    const [arg1] = args;
    
    if (arg1) {

      const index = parseInt(arg1) - 1;
      validateNumber(index)
      validateIndex(index, boss);

      const selectedBoss = boss[index];
      const menu = new ButtonHandler(msg, selectedBoss.show());

      menu.addButton(CROSSED_SWORD, "battle", async () => {

        const battle = new Battle(msg, random.shuffle([player, selectedBoss]));

        const winner = await battle.run();

        if (winner.id === player.id) {

          const { drop, xpDrop } = selectedBoss;

          const currLevel = player.level;
          player.addXP(xpDrop);
          player.coins += drop;
          player.win++;

          msg.channel.send(`${player.name} has earned ${bold(drop)} ${currency}!`);
          msg.channel.send(`${player.name} has earned ${bold(xpDrop)} xp!`);

          if (currLevel !== player.level) {
            msg.channel.send(`${player.name} is now on level ${bold(player.level)}!`);
          }
        }
      })

      menu.addCloseButton();

      await menu.run();

      return;
    }

    const prefix = this.commandManager.prefix;
    const bossList = toNList(boss.map(x => x.name));
    const description = bossList + "\n---\n" + 
      `To select boss 1 use command \`${prefix}${this.name} 1\``;

    const embed = new MessageEmbed()
      .setColor("RED")
      .setTitle("Boss")
      .setDescription(description)

    msg.channel.send({ embeds: [embed] });
  }
}
