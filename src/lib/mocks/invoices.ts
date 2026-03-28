/** Mínimo 4 dígitos; se o valor > 9999, usa o comprimento natural do número. Zeros à esquerda em `muted`. */
export function splitInvoiceNumberForDisplay(raw: string): {
  muted: string;
  rest: string;
} {
  const digitsOnly = raw.replace(/\D/g, "");
  const n = Number.parseInt(digitsOnly || "0", 10);
  const value = Number.isFinite(n) && n >= 0 ? n : 0;
  const minDigits = value > 9999 ? Math.max(4, String(value).length) : 4;
  const padded = value.toString().padStart(minDigits, "0");
  const idx = padded.search(/[1-9]/);
  const leadingZeroCount = idx === -1 ? padded.length : idx;
  return {
    muted: padded.slice(0, leadingZeroCount),
    rest: padded.slice(leadingZeroCount),
  };
}

export type MockIssuedInvoice = {
  id: string;
  number: string;
  tomadorLegalName: string;
  tomadorCnpjDigits: string;
  serviceCode: string;
  serviceName: string;
  serviceDescription: string;
  totalCents: number;
  issuedAt: string;
};

export const MOCK_ISSUED_INVOICES: MockIssuedInvoice[] = [
  {
    id: "nf_1",
    number: "00000123",
    tomadorLegalName: "Padaria Pão Dourado ME",
    tomadorCnpjDigits: "98765432000188",
    serviceCode: "17.10",
    serviceName: "Fornecimento de alimentação",
    serviceDescription:
      "Fornecimento de pães, salgados e bebidas conforme pedido #4421.",
    totalCents: 18990,
    issuedAt: "2026-03-26T14:32:00.000Z",
  },
  {
    id: "nf_2",
    number: "00000122",
    tomadorLegalName: "Tech Soluções em Software Ltda.",
    tomadorCnpjDigits: "11222333000181",
    serviceCode: "1.05",
    serviceName: "Licenciamento de direito de uso de programas de computação",
    serviceDescription:
      "Mensalidade plataforma SaaS — módulo fiscal e conciliação bancária.",
    totalCents: 49700,
    issuedAt: "2026-03-25T09:15:00.000Z",
  },
  {
    id: "nf_3",
    number: "00000121",
    tomadorLegalName: "Maria Consultoria — MEI",
    tomadorCnpjDigits: "12345678000199",
    serviceCode: "17.19",
    serviceName: "Treinamento em informática",
    serviceDescription: "Workshop 4h — organização financeira para MEI.",
    totalCents: 80000,
    issuedAt: "2026-03-22T16:45:00.000Z",
  },
  {
    id: "nf_4",
    number: "10050",
    tomadorLegalName: "Construtora Horizonte S.A.",
    tomadorCnpjDigits: "55666777000102",
    serviceCode: "7.10",
    serviceName: "Análise e desenvolvimento de sistemas",
    serviceDescription:
      "Especificação técnica e acompanhamento de implantação do ERP.",
    totalCents: 1250000,
    issuedAt: "2026-03-18T11:00:00.000Z",
  },
  {
    id: "nf_5",
    number: "00000119",
    tomadorLegalName: "Clínica Bem Estar Ltda.",
    tomadorCnpjDigits: "33444555000167",
    serviceCode: "4.12",
    serviceName: "Suporte técnico em informática",
    serviceDescription:
      "Suporte remoto — backup, antivírus e acesso à rede (março/2026).",
    totalCents: 35000,
    issuedAt: "2026-03-15T08:20:00.000Z",
  },
];

export function filterInvoicesByTomadorQuery(
  rows: MockIssuedInvoice[],
  rawQuery: string,
): MockIssuedInvoice[] {
  const trimmed = rawQuery.trim();
  if (!trimmed) return rows;
  const lower = trimmed.toLowerCase();
  const digits = trimmed.replace(/\D/g, "");
  return rows.filter((row) => {
    if (row.tomadorLegalName.toLowerCase().includes(lower)) return true;
    if (digits.length >= 2) {
      const cnpj = row.tomadorCnpjDigits.replace(/\D/g, "");
      if (cnpj.includes(digits)) return true;
    }
    return false;
  });
}
