export type MovementCategoryId =
  | "taxes"
  | "transfer"
  | "groceries"
  | "purchases"
  | "bills"
  | "services";

export const MOVEMENT_CATEGORY_IDS: MovementCategoryId[] = [
  "taxes",
  "transfer",
  "groceries",
  "purchases",
  "bills",
  "services",
];

export type MockMovement = {
  id: string;
  date: string;
  amountCents: number;
  description: string;
  categoryId: MovementCategoryId;
  account: string;
};

export const MOCK_MOVEMENTS: MockMovement[] = [
  {
    id: "mov_1",
    date: "2026-03-27",
    amountCents: -7890,
    description: "DAS MEI — competência 03/2026",
    categoryId: "taxes",
    account: "Nubank",
  },
  {
    id: "mov_2",
    date: "2026-03-26",
    amountCents: -15640,
    description: "Transferência PIX — fornecedor papelaria",
    categoryId: "transfer",
    account: "Itaú",
  },
  {
    id: "mov_3",
    date: "2026-03-25",
    amountCents: -42350,
    description: "Supermercado semanal",
    categoryId: "groceries",
    account: "Mastercard 9873",
  },
  {
    id: "mov_4",
    date: "2026-03-24",
    amountCents: 850000,
    description: "Recebimento NF 10050 — Construtora Horizonte",
    categoryId: "services",
    account: "Nubank",
  },
  {
    id: "mov_5",
    date: "2026-03-22",
    amountCents: -129900,
    description: "Notebook — parcela 3/10",
    categoryId: "purchases",
    account: "Visa 3121",
  },
  {
    id: "mov_6",
    date: "2026-03-20",
    amountCents: -8900,
    description: "Energia elétrica — ref. março",
    categoryId: "bills",
    account: "Débito Itaú",
  },
  {
    id: "mov_7",
    date: "2026-03-18",
    amountCents: -21000,
    description: "Material de escritório",
    categoryId: "purchases",
    account: "Nubank",
  },
];
