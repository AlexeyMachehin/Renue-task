export function countingChange<T extends { count: number }>(
    balance: number,
    updatedAvailableNotes: T[],
    field: keyof T,
  ): T[] {
    const result = [];
    if (balance > 0) {
      for (let i = 0; i < updatedAvailableNotes.length; i++) {
        const value = updatedAvailableNotes[i][field] as number;
        let countBanknotes = updatedAvailableNotes[i].count;
        let countBanknotesOfChange = 0;
        while (balance - value >= 0 && countBanknotes > 0) {
          balance -= value;
          countBanknotes = countBanknotes - 1;
          countBanknotesOfChange++;
        }
        if (countBanknotesOfChange) {
          result.push({
            ...updatedAvailableNotes[i],
            count: countBanknotesOfChange,
          });
        }
      }
    }

    return result;
  }
