export interface PersonInter {
  id: string;
  name: string;
  age: number;
  job?: string;
}

export type Persons = Array<PersonInter>
