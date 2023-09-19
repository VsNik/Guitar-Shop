import {Command, CommandRunner, Option} from "nest-commander";
import {LoggersService} from "../logger.service";
import {ProductsService} from "./products.service";

@Command({ name: 'generate', description: 'Generate fake products' })
export class ProductCommand extends CommandRunner {
  constructor(
    private readonly productService: ProductsService,
  ) {
    super();
  }

  async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
    const result = await this.productService.create(passedParams);
    this.runWithString(result, options.string);
  }

  runWithString(param: number, option: string): void {
    console.log(param, 'Зкщвгсе шеуьы путукфеув');
  }

  @Option({
    flags: '-n, [string]',
    description: 'сщгте путукфеу зкщвгсе',
  })
  parseString(val: string): string {
    return val;
  }
}
