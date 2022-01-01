import { Command } from "@jiman24/commandment";
import { Message, PermissionResolvable } from "discord.js";
import { client } from "..";
import { ButtonConfirmation } from "../structure/ButtonHandler";

export default class extends Command {
  name = "reset";
  permissions: PermissionResolvable[] = ["ADMINISTRATOR"];
  disable = true;
  
  async exec(msg: Message, args: string[]) {

    if (args[0] === "all") {

      const confirmation = new ButtonConfirmation(msg, 
        `Do you want to reset all players?`
      );

      const confirmed = await confirmation.confirm();

      if (!confirmed) {
        throw new Error("reset aborted");
      }

      client.players.deleteAll();

      msg.channel.send("Successfully reset all players");
      return;
    }

    const user = msg.mentions.users.first();

    if (!user) {
      const prefix = this.commandManager.prefix;

      throw new Error(
        `you need to mention a user or to reset all use \`${prefix}${this.name} all\``
      )
    }

    const confirmation = new ButtonConfirmation(msg, 
      `Do you want to reset ${user.username}?`
    );

    const confirmed = await confirmation.confirm();

    if (!confirmed) {
      throw new Error("reset aborted");
    }

    client.players.delete(user.id);

    msg.channel.send("Successfully reset player");
  }
}
