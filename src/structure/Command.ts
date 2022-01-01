import { Command as CommandBase } from "@jiman24/commandment";


export abstract class Command extends CommandBase {
  abstract emoji: string;
}
