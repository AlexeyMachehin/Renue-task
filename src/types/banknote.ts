export type Banknote = {
  readonly denomination: 1000 | 500 | 100 | 50 | 10 | 5 | 1;
  readonly count: number;
  readonly id: number;
};

export type BanknotesOmitCount = Omit<Banknote, 'count'>;
