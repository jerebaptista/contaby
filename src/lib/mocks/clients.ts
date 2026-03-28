import { MOCK_ISSUED_INVOICES } from "@/lib/mocks/invoices";

export type MockClient = {
  id: string;
  tradeName: string;
  legalName: string;
  cnpjDigits: string;
  address: string;
  phone: string;
  email: string;
  /** Logo da empresa; `null` usa iniciais no avatar. */
  logoUrl: string | null;
};

/** Cadastro de clientes; faturamento vem da soma das NFs em `MOCK_ISSUED_INVOICES` por CNPJ. */
export const MOCK_CLIENTS: MockClient[] = [
  {
    id: "cli_1",
    tradeName: "Pão Dourado",
    legalName: "Padaria Pão Dourado ME",
    cnpjDigits: "98765432000188",
    address: "Rua das Flores, 120 — Centro, São Paulo/SP",
    phone: "(11) 3456-7890",
    email: "juliana.costa@padariapaodourado.com.br",
    logoUrl: null,
  },
  {
    id: "cli_2",
    tradeName: "Tech Sol",
    legalName: "Tech Soluções em Software Ltda.",
    cnpjDigits: "11222333000181",
    address: "Av. Paulista, 1000, conj. 42 — Bela Vista, São Paulo/SP",
    phone: "(11) 98888-1122",
    email: "fernando.lima@techsolucoes.com.br",
    logoUrl: null,
  },
  {
    id: "cli_3",
    tradeName: "Maria Consultoria",
    legalName: "Maria Consultoria — MEI",
    cnpjDigits: "12345678000199",
    address: "Rua Ouro Preto, 55 — Savassi, Belo Horizonte/MG",
    phone: "(31) 99765-4321",
    email: "maria.silva@mariaconsultoria.com.br",
    logoUrl: null,
  },
  {
    id: "cli_4",
    tradeName: "Horizonte",
    legalName: "Construtora Horizonte S.A.",
    cnpjDigits: "55666777000102",
    address: "Rod. BR-116, km 45 — Galpão 3 — Curitiba/PR",
    phone: "(41) 3025-4400",
    email: "roberto.mendes@construtorahorizonte.com.br",
    logoUrl: null,
  },
  {
    id: "cli_5",
    tradeName: "Clínica Bem Estar",
    legalName: "Clínica Bem Estar Ltda.",
    cnpjDigits: "33444555000167",
    address: "Alameda Santos, 700 — Jardins, São Paulo/SP",
    phone: "(11) 4002-8922",
    email: "ana.carvalho@clinicabemestar.com.br",
    logoUrl: null,
  },
  {
    id: "cli_6",
    tradeName: "Atelier Verde",
    legalName: "Atelier Verde Arte Ltda.",
    cnpjDigits: "99888777000155",
    address: "Rua do Comércio, 22 — Pelourinho, Salvador/BA",
    phone: "(71) 99911-2233",
    email: "luciana.ribeiro@atelierverdearte.com.br",
    logoUrl: null,
  },
];

export function revenueCentsByTomadorCnpj(): Map<string, number> {
  const map = new Map<string, number>();
  for (const inv of MOCK_ISSUED_INVOICES) {
    const prev = map.get(inv.tomadorCnpjDigits) ?? 0;
    map.set(inv.tomadorCnpjDigits, prev + inv.totalCents);
  }
  return map;
}

export function filterClientsBySearch<T extends MockClient>(
  rows: T[],
  rawQuery: string,
): T[] {
  const trimmed = rawQuery.trim();
  if (!trimmed) return rows;
  const lower = trimmed.toLowerCase();
  const digits = trimmed.replace(/\D/g, "");
  return rows.filter((row) => {
    if (row.tradeName.toLowerCase().includes(lower)) return true;
    if (row.legalName.toLowerCase().includes(lower)) return true;
    if (row.email.toLowerCase().includes(lower)) return true;
    if (row.phone.toLowerCase().includes(lower)) return true;
    if (digits.length >= 2) {
      const cnpj = row.cnpjDigits.replace(/\D/g, "");
      if (cnpj.includes(digits)) return true;
      const phoneDigits = row.phone.replace(/\D/g, "");
      if (phoneDigits.includes(digits)) return true;
    }
    return false;
  });
}
