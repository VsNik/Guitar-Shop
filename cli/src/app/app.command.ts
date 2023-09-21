import {Command, CommandRunner, Option} from "nest-commander";
import {LoggersService} from "./logger.service";

@Command({name: 'help', description: 'A parameter parse'})
export class AppCommand extends CommandRunner {
  constructor(private readonly logService: LoggersService) {
    super()
  }

  async run(passedParam: string[], options?): Promise<void> {
    this.runWithString(passedParam, options.string);
  }

  @Option({
    flags: '-h, Help',
    description: 'A boolean parser',
  })
  parseString(val: string): string {
    return JSON.parse(val);
  }

  runWithString(param: string[], option: unknown): void {
    console.log(`
        Подготовка данных для REST API.

        Пример:
            npm run:start:cli <command> [-arguments]

        Команды:
            --help          # Помощь
            --generate <n>  # генерирует тестовые данные
        `);
  }
}
