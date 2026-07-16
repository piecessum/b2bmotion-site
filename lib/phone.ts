// Валидация телефона под РФ (используется и на клиенте, и на сервере).
// - с кодом страны (ведущий «+» или всего 11 цифр): ровно 11 цифр,
//   начинается с 7 или 8 (например +7 900 630-40-81 / 8 900 630-40-81);
// - без кода страны: ровно 10 цифр (например 900 630-40-81).
// Разрешены пробелы, скобки и дефисы как разделители.
export function isValidRuPhone(input: string): boolean {
  const raw = input.trim();
  if (!raw || !/^[+\d\s()\-]+$/.test(raw)) return false;
  const digits = raw.replace(/\D/g, "");
  if (raw.startsWith("+") || digits.length === 11) {
    return digits.length === 11 && (digits[0] === "7" || digits[0] === "8");
  }
  return digits.length === 10;
}
