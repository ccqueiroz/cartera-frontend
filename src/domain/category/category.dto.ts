import { BaseDto } from "../core/baseDto/baseDto.dto";

export const ICON_SLUGS = {
  default: "default",
  "restaurantes-e-alimentacao": "restaurantes-e-alimentacao",
  supermercado: "supermercado",
  "compras-e-lazer": "compras-e-lazer",
  "saude-e-bem-estar": "saude-e-bem-estar",
  "eventos-e-festas": "eventos-e-festas",
  "educacao-e-leitura": "educacao-e-leitura",
  "moradia-e-manutencao-residencial": "moradia-e-manutencao-residencial",
  "assinatura-de-internet-telefonia-e-streamings":
    "assinatura-de-internet-telefonia-e-streamings",
  "servicos-e-utilidades-publicas": "servicos-e-utilidades-publicas",
  "transporte-e-mobilidade": "transporte-e-mobilidade",
  "seguros-e-protecao": "seguros-e-protecao",
  "vestuario-e-acessorios": "vestuario-e-acessorios",
  "viagens-e-turismo": "viagens-e-turismo",
  "presentes-e-doacoes": "presentes-e-doacoes",
  "taxas-e-impostos": "taxas-e-impostos",
  "cuidados-com-pets": "cuidados-com-pets",
  "cuidados-com-dependentes": "cuidados-com-dependentes",
  "servicos-de-limpeza-e-lavanderia": "servicos-de-limpeza-e-lavanderia",
  "despesas-de-negocios-e-escritorio": "despesas-de-negocios-e-escritorio",
  "tecnologia-e-software": "tecnologia-e-software",
  "servicos-profissionais": "servicos-profissionais",
  "artigos-esportivos-e-hobbies": "artigos-esportivos-e-hobbies",
  "despesa-com-cartao-de-credito": "despesa-com-cartao-de-credito",
  "consumos-diversos": "consumos-diversos",
  "salariopro-labore": "salariopro-labore",
  "recebimento-por-servico-prestado": "recebimento-por-servico-prestado",
  "alugueis-e-rendimentos-de-ativos": "alugueis-e-rendimentos-de-ativos",
  "investimentos-e-rendimentos-financeiros":
    "investimentos-e-rendimentos-financeiros",
  "reembolsos-e-indenizacoes": "reembolsos-e-indenizacoes",
  "comissoes-e-bonificacoes": "comissoes-e-bonificacoes",
  "doacoes-e-herancas": "doacoes-e-herancas",
  "aportes-e-financiamentos": "aportes-e-financiamentos",
  "receitas-de-parcerias-e-patrocinios": "receitas-de-parcerias-e-patrocinios",
  "aposentadorias-e-pensoes": "aposentadorias-e-pensoes",
  "receitas-diversas": "receitas-diversas",
} as const;

export type IconSlug = (typeof ICON_SLUGS)[keyof typeof ICON_SLUGS];

export enum CategoryType {
  BILLS = "BILLS",
  RECEIVABLE = "RECEIVABLE",
}

export type CategoryDTO = {
  id: string;
  description: string;
  type: CategoryType;
  iconSlug: IconSlug;
} & BaseDto;
