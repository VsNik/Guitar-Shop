import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "@guitar-shop/lib/models";
import {Repository} from "typeorm";
import {faker} from '@faker-js/faker';
import {join} from 'path'
import {GuitarType} from "@guitar-shop/lib/types";
import {readdirSync, rmSync,  copy} from "fs-extra";
import {UsersService} from "../uders/users.service";

const TO_PATH = '/cli/src/fake-images';
const FROM_PATH = '/backend/uploads/fake-images';
const FAKE_IMG_PATH = 'fake-images/'
const FILE_EXTENSION = 'png';

const fakeImages = [
  'catalog-product-0.png',
  'catalog-product-1.png',
  'catalog-product-2.png',
  'catalog-product-3.png',
];

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly usersService: UsersService,
  ) {}

  private async generate(products): Promise<void> {
    await this.productRepository.createQueryBuilder('product')
      .insert()
      .values(products)
      .execute();
  }

  async clearProducts() {
    await this.productRepository.createQueryBuilder('product')
      .delete()
      .where([])    //  empty array
      .execute();
  }

  async clearImageFolder() {
    readdirSync(join(__dirname, '../../', FROM_PATH)).forEach(
        file => rmSync(`${join(__dirname, '../../', FROM_PATH)}/${file}`
      ));
  }

  async create(params: string[]) {
    const count = parseInt(params[0], 10);
    await this.usersService.create();
    await this.clearProducts();
    await this.clearImageFolder();
    await this.createProducts(count);
    return count;
  }

  async createProducts(count: number): Promise<void> {
    const fromPath = join(__dirname, '../../', TO_PATH);
    const toPath = join(__dirname, '../../', FROM_PATH);

    for (let i = 0; i < count; i++) {
      const fromImg = faker.helpers.arrayElement(fakeImages);
      const toImg = this.getFileName();
      await copy(`${fromPath}/${fromImg}`, `${toPath}/${toImg}`);

      await this.generate({
        id: faker.string.uuid(),
        title: faker.lorem.words(3),
        description: faker.lorem.sentences({ min: 1, max: 3 }),
        image: `${FAKE_IMG_PATH}/${toImg}`,
        price: faker.commerce.price({ min: 100, max: 1000000, dec: 0 }) ,
        ean: faker.string.alphanumeric({ length: { min: 5, max: 40 } }),
        type: faker.helpers.arrayElement([GuitarType.Electro, GuitarType.Acoustic, GuitarType.Ukulele]),
        stringCount: faker.helpers.arrayElement([4, 6 ,7, 12]),
        createdAt: faker.date.recent(),
      });
    }
  }

  getFileName(): string {
    const uuid = crypto.randomUUID();
    return `${uuid}.${FILE_EXTENSION}`;
  }
}
