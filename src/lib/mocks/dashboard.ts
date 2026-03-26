export type CompanyRegime = "mei" | "simples_nacional";

export type MockCompany = {
  id: string;
  legalName: string;
  tradeName: string;
  cnpjDigits: string;
  logoUrl: string | null;
  regime: CompanyRegime;
};

export type MockUser = {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string | null;
};

/** Mock active company (replace with Supabase + RLS later). */
export const mockCompany: MockCompany = {
  id: "cmp_mock_1",
  legalName: "Contaby Serviços Contábeis Ltda.",
  tradeName: "Contaby Contabilidade",
  cnpjDigits: "12345678000199",
  logoUrl: null,
  regime: "mei",
};

export const mockUser: MockUser = {
  id: "usr_mock_1",
  fullName: "Maria Silva",
  email: "maria.silva@example.com",
  avatarUrl: null,
};

export const mockCompanies: MockCompany[] = [
  mockCompany,
  {
    id: "cmp_mock_2",
    legalName: "Padaria Pão Dourado ME",
    tradeName: "Pão Dourado",
    cnpjDigits: "98765432000188",
    logoUrl: null,
    regime: "mei",
  },
];

export function formatCnpj(digits: string): string {
  const d = digits.replace(/\D/g, "");
  if (d.length !== 14) return digits;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}
