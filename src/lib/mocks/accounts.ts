export type MockBankAccount = {
  id: string;
  bankName: string;
  bankCode: string;
  agency: string;
  accountNumber: string;
  pixKey: string;
};

export type MockPaymentCard = {
  id: string;
  brand: string;
  lastFour: string;
  /** 1–12 */
  expiryMonth: number;
  /** ano com 4 dígitos, ex.: 2028 */
  expiryYear: number;
};

export const MOCK_BANK_ACCOUNTS: MockBankAccount[] = [
  {
    id: "ba_1",
    bankName: "Nubank",
    bankCode: "260",
    agency: "0001",
    accountNumber: "1234567-8",
    pixKey: "financeiro@contaby.example.com",
  },
  {
    id: "ba_2",
    bankName: "Itaú Unibanco",
    bankCode: "341",
    agency: "4521",
    accountNumber: "00012345-6",
    pixKey: "+5511987654321",
  },
  {
    id: "ba_3",
    bankName: "Banco do Brasil",
    bankCode: "001",
    agency: "3210-5",
    accountNumber: "12.345-6",
    pixKey: "12.345.678/0001-90",
  },
];

export const MOCK_PAYMENT_CARDS: MockPaymentCard[] = [
  {
    id: "pc_1",
    brand: "Visa",
    lastFour: "3121",
    expiryMonth: 8,
    expiryYear: 2028,
  },
  {
    id: "pc_2",
    brand: "Mastercard",
    lastFour: "9873",
    expiryMonth: 11,
    expiryYear: 2027,
  },
  {
    id: "pc_3",
    brand: "Elo",
    lastFour: "4402",
    expiryMonth: 3,
    expiryYear: 2030,
  },
];

export function formatCardExpiryMmYy(month: number, year: number) {
  const m = String(month).padStart(2, "0");
  const y = String(year).slice(-2);
  return `${m}/${y}`;
}
