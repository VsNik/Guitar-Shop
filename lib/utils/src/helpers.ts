import { ClassConstructor, plainToInstance } from 'class-transformer';

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export const createQueryString = (page: number, sorting: string, direction: string, type: string | string[], stringCount: unknown[]): string => {
  const typeParams: string[] = [];
  const strings: string[] = [];

  for (const item of type) {
    typeParams.push(`type=${item}&`)
  }

  for (const item of stringCount) {
    strings.push(`string_count=${item}&`)
  }

  return `?page=${page}&sort=${sorting}&direction=${direction}&${typeParams.join('')}${strings.join('')}`;
}
