export type PathParam = string | number

export interface RequestOptions {
  signal?: AbortSignal
}

export interface RunditSdkErrorDetails {
  status: number
  body: unknown
}

export declare class RunditSdkError extends Error {
  status: number
  body: unknown
  constructor(message: string, details: RunditSdkErrorDetails)
}

export interface CreateEmbedClientOptions {
  baseUrl?: string
  token: string
  fetch?: typeof fetch
  headers?: Record<string, string>
}

export interface SdkCompanyDto {
  id: number
  name: string
  type: string | null
  website?: string | null
  currency: string
  logoImageFileUuid: string | null
  legalName?: string | null
  status?: string | null
  description?: string | null
  vision?: string | null
  address?: string | null
  city?: string | null
  state?: string | null
  country?: string | null
  operatingCountries?: string[]
  vatNumber?: string | null
  foundingYear?: number | null
  established?: string | null
  fundingTotal?: number | null
  companyGroupIds?: number[]
}

export interface SdkCompanyReferenceDto {
  id: number
  name: string
  type: string | null
}

export interface SdkCompanyGroupReferenceDto {
  id: number
  name: string
}

export interface SdkFairValueItemDto {
  id: number
  companyGroupId: number
  fairValue: number
  type: "Auction" | "ConvertibleNote" | "ConvertToEquity" | "Dividend" | "EquityInvestment" | "EquityReceived" | "Extend" | "FutureEquityAgreement" | "Insolvency" | "IPO" | "LimitedAuction" | "OptionsReceived" | "OtherExit" | "OtherInvestment" | "OtherRealization" | "Payback" | "Proprietary" | "TradeSale" | "ValuationChange" | "WriteOff"
}

export type InvestorType = "organization" | "individual"

export interface SdkSignificantInvestorDto {
  investorType: InvestorType
  name: string
  lastName?: string
  email?: string
  website?: string
}

export interface SdkFundingRoundInfoDto {
  roundType?: "poc" | "pre-seed" | "seed" | "late-seed" | "seed-extension" | "pre-series-a-round" | "bridge-round" | "a-round" | "b-round" | "c-round" | "d-round-plus" | "d-round" | "e-round" | "f-round" | "g-round" | "h-round" | "i-round" | "j-round" | "k-round" | "l-round" | "m-round" | "n-round"
  roleInRound?: "lead" | "co-lead" | "minority-co-investor" | "did-not-participate"
  significantInvestors?: SdkSignificantInvestorDto[]
  roundSize?: number | null
  totalFundingRaised?: number | null
}

export interface SdkCompanyPositionDto {
  companyId: number
  companyGroupId?: number | null
  company?: SdkCompanyReferenceDto
  companyGroup?: SdkCompanyGroupReferenceDto
  investmentStatus?: string | null
  invested: number
  ownership?: number | null
  companyValuation?: number | null
  sharesOwnedTotal: number
  pricePerShare?: number | null
  sharesIssuedTotalDiluted: number
  sharesIssuedTotalCurrent: number
  fairValueWithoutEquity?: number | null
  fairValue?: number | null
  customSummaryFairValue?: number | null
  askFairValue?: boolean | null
  xirr?: number | null
  roi?: number | null
  realized?: number | null
  investments?: number | null
  defaultFairValueItems?: SdkFairValueItemDto[]
  totalProfits?: number | null
  exitProfits?: number | null
  equityFairValue?: number | null
  multiple?: number | null
  roundInfo?: SdkFundingRoundInfoDto
  valuationMethod?: "Historical" | "NewFinancingRound" | "PubliclyListedSecurity" | "Realization" | "RecentTransactionMultiples" | "RecentMarketMultiples" | "RecentMarketAndTransactionMultiples" | "DiscountToPrimaryRound" | "ThirdPartyOpinion" | "Dcf" | "Other"
  totalFundingRaised?: number | null
  averageInvestmentAmount?: number | null
  investedInitial?: number | null
  investedFollowOn?: number | null
  dateOfInitialInvestment?: string | null
  initialInvestmentStage?: "poc" | "pre-seed" | "seed" | "late-seed" | "seed-extension" | "pre-series-a-round" | "bridge-round" | "a-round" | "b-round" | "c-round" | "d-round-plus" | "d-round" | "e-round" | "f-round" | "g-round" | "h-round" | "i-round" | "j-round" | "k-round" | "l-round" | "m-round" | "n-round"
  latestInvestment?: number | null
  dateOfLatestInvestment?: string | null
  currentStage?: "poc" | "pre-seed" | "seed" | "late-seed" | "seed-extension" | "pre-series-a-round" | "bridge-round" | "a-round" | "b-round" | "c-round" | "d-round-plus" | "d-round" | "e-round" | "f-round" | "g-round" | "h-round" | "i-round" | "j-round" | "k-round" | "l-round" | "m-round" | "n-round"
  currency: string
  date: string
}

export interface SdkMetricUnitDto {
  unit: {  }
  currencyCode?: string | null
}

export interface SdkMetricTypeOptionDto {
  value: string
  isPositive: boolean
}

export interface SdkMetricTypeOptionConfigDto {
  options: SdkMetricTypeOptionDto[]
}

export interface SdkMetricTypeRangeConfigDto {
  min: number
  max: number
  step: number
}

export interface SdkMetricTypeDto {
  id: number
  name: string
  shortName?: string | null
  description?: string | null
  origin?: {  }
  aggMethod: {  }
  valueType?: {  }
  unit?: SdkMetricUnitDto
  optionConfig?: SdkMetricTypeOptionConfigDto
  rangeConfig?: SdkMetricTypeRangeConfigDto
}

export interface SdkMetricPointDto {
  date: string
  timeframe: {  }
  value: number | null
  optionValue: string | null
  valueError?: string | null
  aggregated?: boolean
}

export interface SdkCompanyMetricDto {
  id: number
  metricType: SdkMetricTypeDto
  points: SdkMetricPointDto[]
}

export interface SdkCompanyDashboardMetricsDto {
  companyId: number
  company: SdkCompanyReferenceDto
  metrics: SdkCompanyMetricDto[]
}

export interface SdkTransactionAdditionalInfoDto {
  personResponsible?: string | null
  rationale?: string | null
  info?: string | null
  warrant?: string | null
  earnOut?: string | null
}

export interface SdkOtherInvestmentTransactionDto {
  id: number
  type: "OtherInvestment"
  date: string
  companyId: number
  companyGroupId?: number | null
  company?: SdkCompanyReferenceDto
  companyGroup?: SdkCompanyGroupReferenceDto
  currency?: string | null
  additionalInfo?: SdkTransactionAdditionalInfoDto
  children?: (SdkEquityTransactionDto | SdkConvertibleNoteTransactionDto | SdkFutureEquityAgreementTransactionDto | SdkExtendTransactionDto | SdkConversionTransactionDto | SdkExitTransactionDto | SdkValuationChangeTransactionDto | SdkInsolvencyTransactionDto | SdkOtherInvestmentTransactionDto)[]
  invested: number
  name?: string | null
}

export interface SdkInsolvencyTransactionDto {
  id: number
  type: "Insolvency"
  date: string
  companyId: number
  companyGroupId?: number | null
  company?: SdkCompanyReferenceDto
  companyGroup?: SdkCompanyGroupReferenceDto
  currency?: string | null
  additionalInfo?: SdkTransactionAdditionalInfoDto
  children?: (SdkEquityTransactionDto | SdkConvertibleNoteTransactionDto | SdkFutureEquityAgreementTransactionDto | SdkExtendTransactionDto | SdkConversionTransactionDto | SdkExitTransactionDto | SdkValuationChangeTransactionDto | SdkInsolvencyTransactionDto | SdkOtherInvestmentTransactionDto)[]
  customSummaryFairValue?: number | null
}

export interface SdkValuationChangeTransactionDto {
  id: number
  type: "ValuationChange"
  date: string
  companyId: number
  companyGroupId?: number | null
  company?: SdkCompanyReferenceDto
  companyGroup?: SdkCompanyGroupReferenceDto
  currency?: string | null
  additionalInfo?: SdkTransactionAdditionalInfoDto
  children?: (SdkEquityTransactionDto | SdkConvertibleNoteTransactionDto | SdkFutureEquityAgreementTransactionDto | SdkExtendTransactionDto | SdkConversionTransactionDto | SdkExitTransactionDto | SdkValuationChangeTransactionDto | SdkInsolvencyTransactionDto | SdkOtherInvestmentTransactionDto)[]
  companyPostMoneyValuation?: number | null
  pricePerShare?: number | null
  sharesIssuedTotalDiluted?: number | null
  sharesIssuedTotalCurrent?: number | null
  valuationMethod?: "Historical" | "NewFinancingRound" | "PubliclyListedSecurity" | "Realization" | "RecentTransactionMultiples" | "RecentMarketMultiples" | "RecentMarketAndTransactionMultiples" | "DiscountToPrimaryRound" | "ThirdPartyOpinion" | "Dcf" | "Other"
  customSummaryFairValue?: number | null
}

export interface SdkTransactionPaymentDto {
  amount: number
  dueDate: string
}

export interface SdkExitTransactionDto {
  id: number
  type: "TradeSale" | "IPO" | "Auction" | "LimitedAuction" | "Proprietary" | "OtherExit" | "Dividend" | "OtherRealization"
  date: string
  companyId: number
  companyGroupId?: number | null
  company?: SdkCompanyReferenceDto
  companyGroup?: SdkCompanyGroupReferenceDto
  currency?: string | null
  additionalInfo?: SdkTransactionAdditionalInfoDto
  children?: (SdkEquityTransactionDto | SdkConvertibleNoteTransactionDto | SdkFutureEquityAgreementTransactionDto | SdkExtendTransactionDto | SdkConversionTransactionDto | SdkExitTransactionDto | SdkValuationChangeTransactionDto | SdkInsolvencyTransactionDto | SdkOtherInvestmentTransactionDto)[]
  profit?: number | null
  pricePerShare?: number | null
  sharesAcquired?: number | null
  companyPostMoneyValuation?: number | null
  ticker?: string | null
  name?: string | null
  payments?: SdkTransactionPaymentDto[]
}

export interface SdkConversionTransactionDto {
  id: number
  type: "ConvertToEquity" | "Payback" | "WriteOff"
  date: string
  companyId: number
  companyGroupId?: number | null
  company?: SdkCompanyReferenceDto
  companyGroup?: SdkCompanyGroupReferenceDto
  currency?: string | null
  additionalInfo?: SdkTransactionAdditionalInfoDto
  children?: (SdkEquityTransactionDto | SdkConvertibleNoteTransactionDto | SdkFutureEquityAgreementTransactionDto | SdkExtendTransactionDto | SdkConversionTransactionDto | SdkExitTransactionDto | SdkValuationChangeTransactionDto | SdkInsolvencyTransactionDto | SdkOtherInvestmentTransactionDto)[]
  parentId: number
  convertedTransactionType?: "Auction" | "ConvertibleNote" | "ConvertToEquity" | "Dividend" | "EquityInvestment" | "EquityReceived" | "Extend" | "FutureEquityAgreement" | "Insolvency" | "IPO" | "LimitedAuction" | "OptionsReceived" | "OtherExit" | "OtherInvestment" | "OtherRealization" | "Payback" | "Proprietary" | "TradeSale" | "ValuationChange" | "WriteOff"
  amountConverted?: number | null
  writeOffAmount?: number | null
  pricePerShare?: number | null
  sharesAcquired?: number | null
  payments?: SdkTransactionPaymentDto[]
}

export interface SdkExtendTransactionDto {
  id: number
  type: "Extend"
  date: string
  companyId: number
  companyGroupId?: number | null
  company?: SdkCompanyReferenceDto
  companyGroup?: SdkCompanyGroupReferenceDto
  currency?: string | null
  additionalInfo?: SdkTransactionAdditionalInfoDto
  children?: (SdkEquityTransactionDto | SdkConvertibleNoteTransactionDto | SdkFutureEquityAgreementTransactionDto | SdkExtendTransactionDto | SdkConversionTransactionDto | SdkExitTransactionDto | SdkValuationChangeTransactionDto | SdkInsolvencyTransactionDto | SdkOtherInvestmentTransactionDto)[]
  parentId: number
  maturityDate?: string | null
  transactionFairValue?: number | null
}

export interface SdkFutureEquityAgreementTransactionDto {
  id: number
  type: "FutureEquityAgreement"
  date: string
  companyId: number
  companyGroupId?: number | null
  company?: SdkCompanyReferenceDto
  companyGroup?: SdkCompanyGroupReferenceDto
  currency?: string | null
  additionalInfo?: SdkTransactionAdditionalInfoDto
  children?: (SdkEquityTransactionDto | SdkConvertibleNoteTransactionDto | SdkFutureEquityAgreementTransactionDto | SdkExtendTransactionDto | SdkConversionTransactionDto | SdkExitTransactionDto | SdkValuationChangeTransactionDto | SdkInsolvencyTransactionDto | SdkOtherInvestmentTransactionDto)[]
  invested: number
  valuationCap?: number | null
  discountRate?: number | null
  valuationTiming?: string | null
  companyPostMoneyValuation?: number | null
  warrantedOwnership?: number | null
}

export interface SdkConvertibleNoteTransactionDto {
  id: number
  type: "ConvertibleNote"
  date: string
  companyId: number
  companyGroupId?: number | null
  company?: SdkCompanyReferenceDto
  companyGroup?: SdkCompanyGroupReferenceDto
  currency?: string | null
  additionalInfo?: SdkTransactionAdditionalInfoDto
  children?: (SdkEquityTransactionDto | SdkConvertibleNoteTransactionDto | SdkFutureEquityAgreementTransactionDto | SdkExtendTransactionDto | SdkConversionTransactionDto | SdkExitTransactionDto | SdkValuationChangeTransactionDto | SdkInsolvencyTransactionDto | SdkOtherInvestmentTransactionDto)[]
  invested: number
  valuationCap?: number | null
  discountRate?: number | null
  interestRate?: number | null
  interestType?: string | null
  compounded?: string | null
  dayCountConvention?: string | null
  maturityDate?: string | null
  warrantedOwnership?: number | null
  payments?: SdkTransactionPaymentDto[]
}

export interface SdkEquityTransactionDto {
  id: number
  type: "EquityInvestment" | "EquityReceived" | "OptionsReceived"
  date: string
  companyId: number
  companyGroupId?: number | null
  company?: SdkCompanyReferenceDto
  companyGroup?: SdkCompanyGroupReferenceDto
  currency?: string | null
  additionalInfo?: SdkTransactionAdditionalInfoDto
  children?: (SdkEquityTransactionDto | SdkConvertibleNoteTransactionDto | SdkFutureEquityAgreementTransactionDto | SdkExtendTransactionDto | SdkConversionTransactionDto | SdkExitTransactionDto | SdkValuationChangeTransactionDto | SdkInsolvencyTransactionDto | SdkOtherInvestmentTransactionDto)[]
  invested?: number | null
  pricePerShare?: number | null
  sharesAcquired?: number | null
  sharesIssuedTotalDiluted?: number | null
  sharesIssuedTotalCurrent?: number | null
  companyPostMoneyValuation?: number | null
}

export interface SdkCompanyReportSummaryDto {
  id: number
  title: string
  date: string
  timeframe: {  }
  publishedAt: string | null
  company: SdkCompanyReferenceDto
}

export interface SdkCompanyDashboardDto {
  company: SdkCompanyDto
  positions: SdkCompanyPositionDto[]
  metrics: SdkCompanyDashboardMetricsDto
  transactions: (SdkEquityTransactionDto | SdkConvertibleNoteTransactionDto | SdkFutureEquityAgreementTransactionDto | SdkExtendTransactionDto | SdkConversionTransactionDto | SdkExitTransactionDto | SdkValuationChangeTransactionDto | SdkInsolvencyTransactionDto | SdkOtherInvestmentTransactionDto)[]
  reports: SdkCompanyReportSummaryDto[]
}

export interface SdkPaginationMetaDto {
  nextCursor: string | null
}

export interface SdkBatchDashboardResponseDto {
  data: SdkCompanyDashboardDto[]
  meta: SdkPaginationMetaDto
}

export interface GetBatchDashboardBodyDto {
  companyIds: number[]
  currency: string
  metricsFrom?: string
  metricsTimeframe?: "Month" | "Quarter" | "Year"
  metricTypeNames?: string[]
  metricTypeIds?: number[]
  conversionStrategy?: "LATEST_FX_RATE" | "ENTITY_DATE_RATE"
  transactionLimit?: number
  reportLimit?: number
}

export interface SdkCompactCompanyDto {
  id: number
  name: string
  type: string | null
  website?: string | null
  currency: string
  logoImageFileUuid: string | null
}

export interface SdkCompaniesListResponseDto {
  data: SdkCompactCompanyDto[]
  meta: SdkPaginationMetaDto
}

export interface SdkCompactCompanyGroupDto {
  id: number
  name: string
  isDemo: boolean
  colorId?: number | null
  companyIds?: number[]
}

export interface SdkCompanyGroupsListResponseDto {
  data: SdkCompactCompanyGroupDto[]
  meta: SdkPaginationMetaDto
}

export interface SdkCompanyGroupBasicInformationDto {
  fullName?: string | null
  domicile?: string | null
  managementCompany?: string | null
  generalPartner?: string | null
  vintageYear?: number | null
  fundCurrency?: string | null
  closingDates?: string[]
  legalForm?: string | null
  term?: string | null
  endedness?: string | null
}

export interface SdkCompanyGroupInvestmentFocusDto {
  investmentFocusAndPlan?: string | null
  investmentFocusStage?: string | null
  investmentFocusGeography?: string | null
  investmentFocusIndustry?: string | null
  maximumInvestment?: string | null
  maximumLeverage?: string | null
  investmentPeriod?: string | null
  valuationPolicyGuidelines?: string | null
  reInvestmentPolicy?: string | null
  otherInvestmentRestrictions?: string | null
  accountingPrinciples?: string | null
}

export interface SdkCompanyGroupKeyEconomicTermsDto {
  hurdleRateAndCarry?: string | null
  managementFees?: string | null
  carriedInterest?: string | null
  feeOffsets?: string | null
}

export interface SdkCompanyGroupAifmdDto {
  financialConductAuthority?: string | null
  depositary?: string | null
  countryOfRegulation?: string | null
  independentRiskManager?: string | null
  independentValuer?: string | null
}

export interface SdkCompanyGroupServiceProvidersDto {
  auditors?: string | null
  administrator?: string | null
  lawyer?: string | null
  bankingFacilities?: string | null
  taxAndRegulatory?: string | null
  lpAdvisoryCommittee?: string | null
  membersOfLpAdvisoryCommittee?: string | null
}

export interface SdkCompanyGroupDetailsDto {
  basicInformation?: SdkCompanyGroupBasicInformationDto
  investmentFocus?: SdkCompanyGroupInvestmentFocusDto
  keyEconomicTerms?: SdkCompanyGroupKeyEconomicTermsDto
  aifmd?: SdkCompanyGroupAifmdDto
  serviceProviders?: SdkCompanyGroupServiceProvidersDto
}

export interface SdkCompanyGroupDto {
  id: number
  name: string
  isDemo: boolean
  colorId?: number | null
  companyIds?: number[]
  companies?: SdkCompactCompanyDto[]
  details?: SdkCompanyGroupDetailsDto
}

export interface SdkLatestMetricValueDto {
  metricTypeId: number
  metricTypeName: string
  value?: number | null
  optionValue?: string | null
  date: string
  unit?: SdkMetricUnitDto
}

export interface SdkPortfolioCompanySummaryDto {
  companyId: number
  companyGroupId?: number | null
  company?: SdkCompanyReferenceDto
  companyGroup?: SdkCompanyGroupReferenceDto
  investmentStatus?: string | null
  invested: number
  fairValue?: number | null
  multiple?: number | null
  roi?: number | null
  xirr?: number | null
  ownership?: number | null
  realized?: number | null
  latestMetrics: SdkLatestMetricValueDto[]
  currency: string
  date: string
}

export interface SdkPortfolioSummaryListResponseDto {
  data: SdkPortfolioCompanySummaryDto[]
  meta: SdkPaginationMetaDto
}

export interface SdkCompanyPositionsListResponseDto {
  data: SdkCompanyPositionDto[]
  meta: SdkPaginationMetaDto
}

export interface SdkPortfolioPositionDto {
  companyIds?: number[]
  currency: string
  date: string
  fairValue?: number | null
  invested?: number | null
  multiple?: number | null
  ownership?: number | null
  realized?: number | null
  xirr?: number | null
  fvPlusRealized?: number | null
  totalFundingRaised?: number | null
  valuation?: number | null
  investments?: number | null
  realizations?: number | null
  roi?: number | null
  numberOfActiveCompanies: number
  numberOfFullyExitedCompanies: number
  investedEquity?: number | null
  investedSAFE?: number | null
  investedConvertibleNote?: number | null
  investedInitial?: number | null
  investedFollowOn?: number | null
  numberOfCompanies: number
  averageInvestmentAmount?: number | null
}

export interface SdkTransactionTypeSummaryDto {
  type: "Auction" | "ConvertibleNote" | "ConvertToEquity" | "Dividend" | "EquityInvestment" | "EquityReceived" | "Extend" | "FutureEquityAgreement" | "Insolvency" | "IPO" | "LimitedAuction" | "OptionsReceived" | "OtherExit" | "OtherInvestment" | "OtherRealization" | "Payback" | "Proprietary" | "TradeSale" | "ValuationChange" | "WriteOff"
  count: number
  amount: number
}

export interface SdkTransactionSummaryPeriodDto {
  period: string
  totalInvested: number
  totalRealized: number
  transactionCount: number
  companyCount: number
  byType: SdkTransactionTypeSummaryDto[]
}

export interface SdkTransactionSummaryResponseDto {
  data: SdkTransactionSummaryPeriodDto[]
  meta: SdkPaginationMetaDto
}

export interface SdkTransactionsListResponseDto {
  data: (SdkEquityTransactionDto | SdkConvertibleNoteTransactionDto | SdkFutureEquityAgreementTransactionDto | SdkExtendTransactionDto | SdkConversionTransactionDto | SdkExitTransactionDto | SdkValuationChangeTransactionDto | SdkInsolvencyTransactionDto | SdkOtherInvestmentTransactionDto)[]
  meta: SdkPaginationMetaDto
}

export interface SdkMetricTypesListResponseDto {
  data: SdkMetricTypeDto[]
  meta: SdkPaginationMetaDto
}

export interface SdkCompanyMetricsDto {
  companyId: number
  company: SdkCompanyReferenceDto
  metrics: SdkCompanyMetricDto[]
}

export interface SdkCompanyMetricsListResponseDto {
  data: SdkCompanyMetricsDto[]
  meta: SdkPaginationMetaDto
}

export interface MetricSearchDto {
  limit?: number
  cursor?: string
  companyIds?: number[]
  companyNameSearch?: string[]
  companyGroupIds?: number[]
  metricTypeIds?: number[]
  metricTypeNames?: string[]
  timeframe?: "Month" | "Quarter" | "Year"
  from?: string
  to?: string
  currency?: string
  conversionStrategy?: "LATEST_FX_RATE" | "ENTITY_DATE_RATE"
}

export interface SdkMetricTypeReferenceDto {
  id: number
  name: string
}

export interface SdkMetricCompareValueDto {
  companyId: number
  value?: number | null
  optionValue?: string | null
  change?: number | null
}

export interface SdkMetricCompareRowDto {
  date: string
  timeframe: {  }
  values: SdkMetricCompareValueDto[]
}

export interface SdkMetricCompareResponseDto {
  metricType: SdkMetricTypeReferenceDto
  unit?: SdkMetricUnitDto
  companies: SdkCompanyReferenceDto[]
  rows: SdkMetricCompareRowDto[]
}

export interface SdkMetricCompareMultiResponseDto {
  comparisons: SdkMetricCompareResponseDto[]
}

export interface MetricCompareDto {
  limit?: number
  cursor?: string
  metricTypeIds: number[]
  companyIds?: number[]
  companyNameSearch?: string[]
  companyGroupIds?: number[]
  timeframe?: "Month" | "Quarter" | "Year"
  from?: string
  to?: string
  currency?: string
  conversionStrategy?: "LATEST_FX_RATE" | "ENTITY_DATE_RATE"
  includeChange?: boolean
}

export interface SdkAggregatedPointDto {
  date: string
  timeframe: {  }
  value: number | null
  companyCount: number
}

export interface SdkAggregatedMetricDto {
  metricType: SdkMetricTypeReferenceDto
  unit?: SdkMetricUnitDto
  aggregation: "SUM" | "AVG" | "MEDIAN" | "MIN" | "MAX" | "COUNT"
  companyGroup?: SdkCompanyGroupReferenceDto
  points: SdkAggregatedPointDto[]
}

export interface SdkMetricAggregateResponseDto {
  data: SdkAggregatedMetricDto[]
  meta: SdkPaginationMetaDto
}

export interface MetricAggregateDto {
  limit?: number
  cursor?: string
  metricTypeIds: number[]
  aggregation: "SUM" | "AVG" | "MEDIAN" | "MIN" | "MAX" | "COUNT"
  companyIds?: number[]
  companyGroupIds?: number[]
  timeframe?: "Month" | "Quarter" | "Year"
  from?: string
  to?: string
  currency?: string
  conversionStrategy?: "LATEST_FX_RATE" | "ENTITY_DATE_RATE"
  groupByCompanyGroup?: boolean
}

export interface SdkCompanyReportsListResponseDto {
  data: SdkCompanyReportSummaryDto[]
  meta: SdkPaginationMetaDto
}

export interface SdkUserReferenceDto {
  id: number
  name: string
}

export type SdkReportSectionType = "text"

export interface SdkTextReportSectionDto {
  id: number
  type: SdkReportSectionType
  order: number
  title: string
  content: string | null
}

export interface SdkMarkdownReportSectionDto {
  id: number
  type: SdkReportSectionType
  order: number
  title: string
  content: string | null
}

export interface SdkCompanyReportAttachmentDto {
  id: number
  name: string
  url: string | null
}

export interface SdkImageReportSectionDto {
  id: number
  type: SdkReportSectionType
  order: number
  title: string
  imageUrl: string | null
  file: SdkCompanyReportAttachmentDto
}

export interface SdkSingleChoiceReportSectionDto {
  id: number
  type: SdkReportSectionType
  order: number
  title: string
  options: string[]
  selectedOptions: string[]
}

export interface SdkMultiChoiceReportSectionDto {
  id: number
  type: SdkReportSectionType
  order: number
  title: string
  options: string[]
  selectedOptions: string[]
}

export interface SdkCompanyReportDto {
  id: number
  title: string
  date: string
  timeframe: {  }
  publishedAt: string | null
  company: SdkCompanyReferenceDto
  createdBy: SdkUserReferenceDto
  sections: (SdkTextReportSectionDto | SdkMarkdownReportSectionDto | SdkImageReportSectionDto | SdkSingleChoiceReportSectionDto | SdkMultiChoiceReportSectionDto)[]
  attachments: SdkCompanyReportAttachmentDto[]
}

export type CompaniesGetDashboardsResponse = SdkBatchDashboardResponseDto

export type CompaniesGetDashboardsBody = GetBatchDashboardBodyDto

export type CompaniesGetDashboardResponse = SdkCompanyDashboardDto

export type CompaniesGetOneResponse = SdkCompanyDto

export type CompaniesGetAllResponse = SdkCompaniesListResponseDto

export type CompanyGroupsGetAllResponse = SdkCompanyGroupsListResponseDto

export type CompanyGroupsGetOneResponse = SdkCompanyGroupDto

export type PositionsGetPortfolioSummaryResponse = SdkPortfolioSummaryListResponseDto

export type PositionsGetCompanyPositionsResponse = SdkCompanyPositionsListResponseDto

export type PositionsGetPortfolioPositionsResponse = SdkPortfolioPositionDto

export type TransactionsGetSummaryResponse = SdkTransactionSummaryResponseDto

export type TransactionsGetCompanyTransactionsResponse = SdkTransactionsListResponseDto

export type TransactionsGetTransactionsResponse = SdkTransactionsListResponseDto

export type MetricsGetTypesResponse = SdkMetricTypesListResponseDto

export type MetricsSearchResponse = SdkCompanyMetricsListResponseDto

export type MetricsSearchBody = MetricSearchDto

export type MetricsCompareResponse = SdkMetricCompareMultiResponseDto

export type MetricsCompareBody = MetricCompareDto

export type MetricsAggregateResponse = SdkMetricAggregateResponseDto

export type MetricsAggregateBody = MetricAggregateDto

export type CompanyReportsListResponse = SdkCompanyReportsListResponseDto

export type CompanyReportsGetOneResponse = SdkCompanyReportDto

export interface CompaniesGetDashboardQuery {
  /**
   * Reporting currency code (ISO 4217).
   */
  currency: string
  /**
   * Lower bound for metric data points (ISO 8601). Omit to include all available history.
   */
  metricsFrom?: string
  /**
   * Maximum number of transactions to include (most recent first). Defaults to 10.
   */
  transactionLimit?: number
  /**
   * Maximum number of reports to include (most recent first). Defaults to 5.
   */
  reportLimit?: number
}

export interface CompaniesGetAllQuery {
  /**
   * Maximum items per page. Currently accepted but not enforced; reserved for future pagination.
   */
  limit?: number
  /**
   * Opaque cursor from a previous response's meta.nextCursor. Currently accepted but ignored.
   */
  cursor?: string
  /**
   * Restrict results to these company identifiers
   */
  companyIds?: number[]
  /**
   * Restrict results to companies that belong to any of these company groups
   */
  companyGroupIds?: number[]
  /**
   * Case-insensitive substring match on company display name. Pass an array to resolve multiple companies in one call — a company matches if its name contains ANY of the listed substrings (OR semantics). Combine with companyIds/companyGroupIds to find specific companies without first listing the entire portfolio.
   */
  nameSearch?: string[]
}

export interface CompanyGroupsGetAllQuery {
  /**
   * Maximum items per page. Currently accepted but not enforced; reserved for future pagination.
   */
  limit?: number
  /**
   * Opaque cursor from a previous response's meta.nextCursor. Currently accepted but ignored.
   */
  cursor?: string
  /**
   * Restrict results to these company group identifiers
   */
  companyGroupIds?: number[]
  /**
   * Case-insensitive substring match on company group display name. Pass an array to resolve multiple groups in one call — a group matches if its name contains ANY of the listed substrings (OR semantics). Useful for finding funds or visibility groups by name without first listing all groups.
   */
  nameSearch?: string[]
}

export interface PositionsGetPortfolioSummaryQuery {
  /**
   * Maximum items per page. Currently accepted but not enforced; reserved for future pagination.
   */
  limit?: number
  /**
   * Opaque cursor from a previous response's meta.nextCursor. Currently accepted but ignored.
   */
  cursor?: string
  /**
   * Restrict to companies that belong to any of these company groups.
   */
  companyGroupIds?: number[]
  /**
   * Restrict to these company identifiers.
   */
  companyIds?: number[]
  /**
   * Reporting currency code (ISO 4217).
   */
  currency: string
  /**
   * Position summary date (ISO 8601). Defaults to today.
   */
  date?: string
  /**
   * Metric type names to include in the latest metrics snapshot. Defaults to MRR, Cash Balance, Headcount, Net Burn Rate, and Runway.
   */
  metricTypeNames?: string[]
}

export interface PositionsGetCompanyPositionsQuery {
  /**
   * Maximum items per page. Currently accepted but not enforced; reserved for future pagination.
   */
  limit?: number
  /**
   * Opaque cursor from a previous response's meta.nextCursor. Currently accepted but ignored.
   */
  cursor?: string
  /**
   * Optional list of company group identifiers to filter the position breakdown
   */
  companyGroupIds?: number[]
  /**
   * Reporting currency code
   */
  currency: string
  /**
   * Optional summary date in ISO format
   */
  date?: string
}

export interface PositionsGetPortfolioPositionsQuery {
  /**
   * Optional list of company group identifiers to filter the portfolio positions
   */
  companyGroupIds?: number[]
  /**
   * Optional list of company identifiers to narrow the aggregation to
   */
  companyIds?: number[]
  /**
   * Reporting currency code
   */
  currency: string
  /**
   * Optional summary date in ISO format
   */
  date?: string
}

export interface TransactionsGetSummaryQuery {
  /**
   * Maximum items per page. Currently accepted but not enforced; reserved for future pagination.
   */
  limit?: number
  /**
   * Opaque cursor from a previous response's meta.nextCursor. Currently accepted but ignored.
   */
  cursor?: string
  /**
   * Restrict to companies that belong to any of these company groups.
   */
  companyGroupIds?: number[]
  /**
   * Restrict to these company identifiers.
   */
  companyIds?: number[]
  /**
   * Reporting currency code (ISO 4217).
   */
  currency: string
  /**
   * Group results by this period granularity. When omitted, returns a single summary across all time.
   */
  groupBy?: "Month" | "Quarter" | "Year"
  /**
   * Lower bound for transaction date (ISO 8601, inclusive).
   */
  from?: string
  /**
   * Upper bound for transaction date (ISO 8601, inclusive).
   */
  to?: string
}

export interface TransactionsGetCompanyTransactionsQuery {
  /**
   * Maximum items per page. Currently accepted but not enforced; reserved for future pagination.
   */
  limit?: number
  /**
   * Opaque cursor from a previous response's meta.nextCursor. Currently accepted but ignored.
   */
  cursor?: string
  /**
   * Optional company group identifiers to filter transactions by
   */
  companyGroupIds?: number[]
  /**
   * Restrict results to these transaction types
   */
  types?: ("Auction" | "ConvertibleNote" | "ConvertToEquity" | "Dividend" | "EquityInvestment" | "EquityReceived" | "Extend" | "FutureEquityAgreement" | "Insolvency" | "IPO" | "LimitedAuction" | "OptionsReceived" | "OtherExit" | "OtherInvestment" | "OtherRealization" | "Payback" | "Proprietary" | "TradeSale" | "ValuationChange" | "WriteOff")[]
  /**
   * Exclude transactions on or after this ISO 8601 date (cut-off filter)
   */
  priorTo?: string
}

export interface TransactionsGetTransactionsQuery {
  /**
   * Maximum items per page. Currently accepted but not enforced; reserved for future pagination.
   */
  limit?: number
  /**
   * Opaque cursor from a previous response's meta.nextCursor. Currently accepted but ignored.
   */
  cursor?: string
  /**
   * Optional company group identifiers to filter transactions by
   */
  companyGroupIds?: number[]
  /**
   * Restrict results to these transaction types
   */
  types?: ("Auction" | "ConvertibleNote" | "ConvertToEquity" | "Dividend" | "EquityInvestment" | "EquityReceived" | "Extend" | "FutureEquityAgreement" | "Insolvency" | "IPO" | "LimitedAuction" | "OptionsReceived" | "OtherExit" | "OtherInvestment" | "OtherRealization" | "Payback" | "Proprietary" | "TradeSale" | "ValuationChange" | "WriteOff")[]
  /**
   * Exclude transactions on or after this ISO 8601 date (cut-off filter)
   */
  priorTo?: string
  /**
   * Optional company identifiers to filter transactions by
   */
  companyIds?: number[]
}

export interface CompanyReportsListQuery {
  /**
   * Maximum items per page. Currently accepted but not enforced; reserved for future pagination.
   */
  limit?: number
  /**
   * Opaque cursor from a previous response's meta.nextCursor. Currently accepted but ignored.
   */
  cursor?: string
  /**
   * Restrict results to these companies. Defaults to all companies the caller can access.
   */
  companyIds?: number[]
  /**
   * Restrict to companies that belong to any of these company groups.
   */
  companyGroupIds?: number[]
  /**
   * Case-insensitive substring match on the reporting company name. Pass an array to resolve multiple companies in one call — a report matches if its company name contains ANY of the listed substrings (OR semantics). Intersects with `companyIds`/`companyGroupIds`.
   */
  companyNameSearch?: string[]
  /**
   * Restrict to a reporting period granularity (Month, Quarter, Year).
   */
  timeframe?: "Month" | "Quarter" | "Year"
  /**
   * Lower bound for the reporting period date (ISO 8601, inclusive).
   */
  from?: string
  /**
   * Upper bound for the reporting period date (ISO 8601, inclusive).
   */
  to?: string
}

export interface CompaniesNamespace {
  /**
   * PREFERRED tool for multi-company analysis — full dashboards for many companies in one call
   * PREFERRED tool for multi-company analysis. Returns full dashboards (company metadata, positions, metrics with data points, recent transactions, report summaries) for many companies in a single request, grouped per company. Use this instead of looping `GET /companies/:id/dashboard` (the N+1 pattern) whenever the agent needs to look at more than one company — it returns the same shape per company but in one round trip. Typical workflow: resolve company ids (e.g. `GET /companies?nameSearch=["acme","beta"]`), then call this with their `companyIds`. Use `metricTypeIds` or `metricTypeNames` to scope the returned metrics. `metricsFrom` (ISO 8601) sets a lower-bound date for metric data points; omit to include all history. `metricsTimeframe` restricts data point granularity to Month, Quarter, or Year. `currency` (ISO 4217, required) FX-converts all monetary metrics across the batch. `conversionStrategy` controls which rate is applied: `LATEST_FX_RATE` (default) or `ENTITY_DATE_RATE` (the rate on each point's own date). `transactionLimit` / `reportLimit` cap list sizes per company (defaults: 10 and 5 respectively).
   * Parameters: body: CompaniesGetDashboardsBody
   * Returns: CompaniesGetDashboardsResponse
   */
  getDashboards(body: CompaniesGetDashboardsBody, init?: RequestOptions): Promise<CompaniesGetDashboardsResponse>
  /**
   * Get full company dashboard for ONE company
   * Returns company metadata, positions per fund, all metrics with data points, recent transactions, and report summaries for a single company. For more than one company, prefer POST /companies/dashboards (`companies.getDashboards`) instead — it returns the same payload per company in one call and avoids the N+1 pattern. Use `metricsFrom` to limit metric history, `transactionLimit` and `reportLimit` to cap list sizes.
   * Parameters: path: id (number); query: currency (string), metricsFrom? (string), transactionLimit? (number), reportLimit? (number)
   * Returns: CompaniesGetDashboardResponse
   */
  getDashboard(id: number, query?: CompaniesGetDashboardQuery, init?: RequestOptions): Promise<CompaniesGetDashboardResponse>
  /**
   * Get one company available to the SDK consumer
   * Returns the full company object for a single company. Includes all compact-list fields (id, name, type, currency, website, logo) plus extended metadata: legal name, status, description, vision, address, city, state, country, operating countries, VAT number, founding year, established date, total funding, and accessible fund ids (as `companyGroupIds`). Returns 404 if the company does not exist or is inaccessible to the caller.
   * Parameters: path: id (number)
   * Returns: CompaniesGetOneResponse
   */
  getOne(id: number, init?: RequestOptions): Promise<CompaniesGetOneResponse>
  /**
   * List companies available to the SDK consumer
   * Returns the compact form (id, name, currency, type, website, logo) for every company the caller can read. Filter by `companyIds`, `companyGroupIds`, and/or `nameSearch` (case-insensitive substring on display name; accepts an array to resolve multiple companies at once with OR semantics — e.g. `nameSearch=["acme","beta","gamma"]` returns any company whose name contains any of the three substrings). Avoids listing the full portfolio when the agent only knows companies by name.
   * Parameters: query: limit? (number), cursor? (string), companyIds? (number[]), companyGroupIds? (number[]), nameSearch? (string[])
   * Returns: CompaniesGetAllResponse
   */
  getAll(query?: CompaniesGetAllQuery, init?: RequestOptions): Promise<CompaniesGetAllResponse>
}

export interface CompanyGroupsNamespace {
  /**
   * List funds available to the SDK consumer
   * Returns compact fund metadata (id, name, demo flag, color, member company ids). Filter by `companyGroupIds` and/or `nameSearch` (case-insensitive substring on name; accepts an array to resolve multiple groups in one call with OR semantics — e.g. `nameSearch=["fund i","fund ii"]`).
   * Parameters: query: limit? (number), cursor? (string), companyGroupIds? (number[]), nameSearch? (string[])
   * Returns: CompanyGroupsGetAllResponse
   */
  getAll(query?: CompanyGroupsGetAllQuery, init?: RequestOptions): Promise<CompanyGroupsGetAllResponse>
  /**
   * Get one fund available to the SDK consumer
   * Returns full fund details. Includes all compact-list fields (id, name, type, currency, logo) plus extended fund metadata: legal name, domicile, management company, GP, vintage year, fund currency, opening and closing dates, legal form, investment policy, fees, regulatory info, and service providers. Also includes the list of member companies the caller can access. Returns 404 if the fund does not exist or is inaccessible to the caller.
   * Parameters: path: id (number)
   * Returns: CompanyGroupsGetOneResponse
   */
  getOne(id: number, init?: RequestOptions): Promise<CompanyGroupsGetOneResponse>
}

export interface PositionsNamespace {
  /**
   * Get portfolio summary with positions and key metrics per company
   * Returns one row per company with position data (invested, fair value, multiple, ROI) and latest values for selected metrics. Defaults to MRR, Cash Balance, Headcount, Net Burn Rate, and Runway. Override with `metricTypeNames`. Designed for portfolio overview tables.
   * Parameters: query: limit? (number), cursor? (string), companyGroupIds? (number[]), companyIds? (number[]), currency (string), date? (string), metricTypeNames? (string[])
   * Returns: PositionsGetPortfolioSummaryResponse
   */
  getPortfolioSummary(query?: PositionsGetPortfolioSummaryQuery, init?: RequestOptions): Promise<PositionsGetPortfolioSummaryResponse>
  /**
   * Get positions for one company
   * Returns all fund-level positions for a single company — one entry per fund (`companyGroupId`) that holds a position in the company. Each entry carries invested amount, fair market value, ownership percentage, share counts, multiple, and ROI, all FX-converted to `currency` (ISO 4217, required). Filter by `companyGroupIds` to scope to specific funds. Use `date` (ISO 8601) for a historical snapshot; omit to use the latest available data.
   * Parameters: path: id (number); query: limit? (number), cursor? (string), companyGroupIds? (number[]), currency (string), date? (string)
   * Returns: PositionsGetCompanyPositionsResponse
   */
  getCompanyPositions(id: number, query?: PositionsGetCompanyPositionsQuery, init?: RequestOptions): Promise<PositionsGetCompanyPositionsResponse>
  /**
   * Get aggregated portfolio position totals
   * Returns a single aggregated position object that sums invested amount, fair market value, ownership percentage, share counts, multiple, and ROI across all accessible companies (optionally filtered by `companyIds` and/or `companyGroupIds` to scope to specific funds). `currency` (ISO 4217, required) converts all monetary values. Use `date` (ISO 8601) for a historical snapshot; omit for the latest available data. For a per-company breakdown instead of a single aggregate, use `GET /positions/portfolio/summary`.
   * Parameters: query: companyGroupIds? (number[]), companyIds? (number[]), currency (string), date? (string)
   * Returns: PositionsGetPortfolioPositionsResponse
   */
  getPortfolioPositions(query?: PositionsGetPortfolioPositionsQuery, init?: RequestOptions): Promise<PositionsGetPortfolioPositionsResponse>
}

export interface TransactionsNamespace {
  /**
   * Get transaction activity summary
   * Returns aggregated transaction statistics: total invested, total realized, transaction count, company count, and breakdown by transaction type. Optionally group by period (Month, Quarter, Year). Filter by company, fund (`companyGroupIds`), and date range.
   * Parameters: query: limit? (number), cursor? (string), companyGroupIds? (number[]), companyIds? (number[]), currency (string), groupBy? ("Month" | "Quarter" | "Year"), from? (string), to? (string)
   * Returns: TransactionsGetSummaryResponse
   */
  getSummary(query?: TransactionsGetSummaryQuery, init?: RequestOptions): Promise<TransactionsGetSummaryResponse>
  /**
   * Get transactions for one company
   * Returns all transactions for a single company, ordered by date descending. Each transaction is a typed variant — narrow it via its `type` field. Filter by `companyGroupIds` to scope to a specific fund, `types` to limit to specific transaction kinds, and `priorTo` (ISO 8601) for a historical snapshot. Requires transaction read access on the company.
   * Parameters: path: id (number); query: limit? (number), cursor? (string), companyGroupIds? (number[]), types? (("Auction" | "ConvertibleNote" | "ConvertToEquity" | "Dividend" | "EquityInvestment" | "EquityReceived" | "Extend" | "FutureEquityAgreement" | "Insolvency" | "IPO" | "LimitedAuction" | "OptionsReceived" | "OtherExit" | "OtherInvestment" | "OtherRealization" | "Payback" | "Proprietary" | "TradeSale" | "ValuationChange" | "WriteOff")[]), priorTo? (string)
   * Returns: TransactionsGetCompanyTransactionsResponse
   */
  getCompanyTransactions(id: number, query?: TransactionsGetCompanyTransactionsQuery, init?: RequestOptions): Promise<TransactionsGetCompanyTransactionsResponse>
  /**
   * Get transactions for multiple companies
   * Returns transactions across multiple companies. Each transaction is a typed variant — narrow it via its `type` field. Filter by `companyIds`, `companyGroupIds`, `types`, and `priorTo` (ISO 8601 upper-bound date for a historical snapshot). When `companyIds` is provided, the caller must have transaction read access on every listed company.
   * Parameters: query: limit? (number), cursor? (string), companyGroupIds? (number[]), types? (("Auction" | "ConvertibleNote" | "ConvertToEquity" | "Dividend" | "EquityInvestment" | "EquityReceived" | "Extend" | "FutureEquityAgreement" | "Insolvency" | "IPO" | "LimitedAuction" | "OptionsReceived" | "OtherExit" | "OtherInvestment" | "OtherRealization" | "Payback" | "Proprietary" | "TradeSale" | "ValuationChange" | "WriteOff")[]), priorTo? (string), companyIds? (number[])
   * Returns: TransactionsGetTransactionsResponse
   */
  getTransactions(query?: TransactionsGetTransactionsQuery, init?: RequestOptions): Promise<TransactionsGetTransactionsResponse>
}

export interface MetricsNamespace {
  /**
   * List metric types available to the SDK consumer
   * Returns predefined metric types plus user-defined metric types scoped to the caller — VC group custom types for VC users, company custom types for company users. Each entry carries the metric shape needed to interpret values: `valueType` is `"numeric"` (read `point.value` as a number; may carry `rangeConfig` with min/max/step for ranged metrics) or `"option"` (read `point.optionValue` as a string from `optionConfig.options[]` — this is how boolean / yes-no metrics are encoded, as two options typically labelled "Yes"/"No"). `unit.unit` describes the measurement (`Currency`, `Percentage`, `Number`, time units, ...); `unit.currencyCode` is intentionally null on this endpoint because monetary types resolve their concrete currency per company — call /metrics to receive `unit.currencyCode` populated with each company's native currency, or pass `currency` to convert all monetary metrics to a chosen target.
   * Returns: MetricsGetTypesResponse
   */
  getTypes(init?: RequestOptions): Promise<MetricsGetTypesResponse>
  /**
   * Read metric values for accessible companies, grouped by company
   * Returns metric data points for companies the caller can access (companies in the caller's VC group portfolio, or the caller's own company for company users). Each entry carries company and metric type references with id and human-readable name. Each point carries both `value` (number, for `valueType === "numeric"`, including ranged numerics constrained by the type's `rangeConfig`) and `optionValue` (string, for `valueType === "option"`, matching one of `metricType.optionConfig.options[].value` — this is how boolean/yes-no metrics report their reading); read whichever matches the metric type's `valueType`. Filter by company id, company name substring (`companyNameSearch`), company group, metric type id, metric type name (`metricTypeNames`), timeframe, and date range to narrow the response. Pass `currency` (ISO 4217) to FX-convert monetary metrics to that target currency in one call instead of fetching company currencies separately.
   * Parameters: body: MetricsSearchBody
   * Returns: MetricsSearchResponse
   */
  search(body: MetricsSearchBody, init?: RequestOptions): Promise<MetricsSearchResponse>
  /**
   * Compare metrics across companies
   * Returns date-aligned rows for one or more metric types across multiple companies. Pass `metricTypeIds` (resolve from /metrics/types) to compare several metrics in a single round trip; names are not accepted on this endpoint to keep selection stable. Each row contains one value per company for a given period. Optionally includes period-over-period percentage change. Use `companyIds`, `companyNameSearch`, or `companyGroupIds` to select companies.
   * Parameters: body: MetricsCompareBody
   * Returns: MetricsCompareResponse
   */
  compare(body: MetricsCompareBody, init?: RequestOptions): Promise<MetricsCompareResponse>
  /**
   * Aggregate metrics across portfolio companies
   * Returns aggregated metric values (SUM, AVG, MEDIAN, MIN, MAX, COUNT) across companies for each reporting period. Pass `metricTypeIds` (resolve from /metrics/types) to select what to aggregate; names are not accepted on this endpoint to keep selection stable. Optionally group results by fund (`companyGroupId`) for fund-level breakdowns. MIN, MAX, and COUNT are always computed. SUM, AVG, and MEDIAN are only produced when the metric type enables them in its `summaryAggregationMethods` configuration; otherwise `point.value` is `null` for that aggregation.
   * Parameters: body: MetricsAggregateBody
   * Returns: MetricsAggregateResponse
   */
  aggregate(body: MetricsAggregateBody, init?: RequestOptions): Promise<MetricsAggregateResponse>
}

export interface CompanyReportsNamespace {
  /**
   * List published company reports accessible to the caller (metadata only)
   * Returns lightweight report metadata (id, title, period, publisher company reference). Use GET /company-reports/:id to fetch the full content of a specific report. Visibility is determined by the caller's roles — VC users see reports for managed-portfolio companies, company employees see their own company's reports, portfolio investors see Published reports shared with their visibility groups. Filters narrow the list by company ids, funds (`companyGroupIds`), company name substring (`companyNameSearch`), and reporting period (timeframe + date range).
   * Parameters: query: limit? (number), cursor? (string), companyIds? (number[]), companyGroupIds? (number[]), companyNameSearch? (string[]), timeframe? ("Month" | "Quarter" | "Year"), from? (string), to? (string)
   * Returns: CompanyReportsListResponse
   */
  list(query?: CompanyReportsListQuery, init?: RequestOptions): Promise<CompanyReportsListResponse>
  /**
   * Fetch the full content of a single company report
   * Returns the report metadata plus structured sections (text/markdown/image) and attachments with pre-signed URLs. Returns 404 if the report does not exist and 403 if the caller cannot access it under their role-based permissions.
   * Parameters: path: id (number)
   * Returns: CompanyReportsGetOneResponse
   */
  getOne(id: number, init?: RequestOptions): Promise<CompanyReportsGetOneResponse>
}

export interface EmbedClient {
  companies: CompaniesNamespace
  companyGroups: CompanyGroupsNamespace
  positions: PositionsNamespace
  transactions: TransactionsNamespace
  metrics: MetricsNamespace
  companyReports: CompanyReportsNamespace
}

export declare function createEmbedClient(options: CreateEmbedClientOptions): EmbedClient

export declare const routeManifest: {
  companies: {
    getDashboards: { method: "POST"; path: "/companies/dashboards"; summary: "PREFERRED tool for multi-company analysis — full dashboards for many companies in one call"; description: "PREFERRED tool for multi-company analysis. Returns full dashboards (company metadata, positions, metrics with data points, recent transactions, report summaries) for many companies in a single request, grouped per company. Use this instead of looping `GET /companies/:id/dashboard` (the N+1 pattern) whenever the agent needs to look at more than one company — it returns the same shape per company but in one round trip. Typical workflow: resolve company ids (e.g. `GET /companies?nameSearch=[\"acme\",\"beta\"]`), then call this with their `companyIds`. Use `metricTypeIds` or `metricTypeNames` to scope the returned metrics. `metricsFrom` (ISO 8601) sets a lower-bound date for metric data points; omit to include all history. `metricsTimeframe` restricts data point granularity to Month, Quarter, or Year. `currency` (ISO 4217, required) FX-converts all monetary metrics across the batch. `conversionStrategy` controls which rate is applied: `LATEST_FX_RATE` (default) or `ENTITY_DATE_RATE` (the rate on each point's own date). `transactionLimit` / `reportLimit` cap list sizes per company (defaults: 10 and 5 respectively)."; exampleCall: "client.companies.getDashboards({ companyIds: [123], currency: 'USD' })"; responseType: "CompaniesGetDashboardsResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    getDashboard: { method: "GET"; path: "/companies/:id/dashboard"; summary: "Get full company dashboard for ONE company"; description: "Returns company metadata, positions per fund, all metrics with data points, recent transactions, and report summaries for a single company. For more than one company, prefer POST /companies/dashboards (`companies.getDashboards`) instead — it returns the same payload per company in one call and avoids the N+1 pattern. Use `metricsFrom` to limit metric history, `transactionLimit` and `reportLimit` to cap list sizes."; exampleCall: "client.companies.getDashboard(123, { currency: 'USD' })"; responseType: "CompaniesGetDashboardResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    getOne: { method: "GET"; path: "/companies/:id"; summary: "Get one company available to the SDK consumer"; description: "Returns the full company object for a single company. Includes all compact-list fields (id, name, type, currency, website, logo) plus extended metadata: legal name, status, description, vision, address, city, state, country, operating countries, VAT number, founding year, established date, total funding, and accessible fund ids (as `companyGroupIds`). Returns 404 if the company does not exist or is inaccessible to the caller."; exampleCall: "client.companies.getOne(123)"; responseType: "CompaniesGetOneResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    getAll: { method: "GET"; path: "/companies"; summary: "List companies available to the SDK consumer"; description: "Returns the compact form (id, name, currency, type, website, logo) for every company the caller can read. Filter by `companyIds`, `companyGroupIds`, and/or `nameSearch` (case-insensitive substring on display name; accepts an array to resolve multiple companies at once with OR semantics — e.g. `nameSearch=[\"acme\",\"beta\",\"gamma\"]` returns any company whose name contains any of the three substrings). Avoids listing the full portfolio when the agent only knows companies by name."; exampleCall: "client.companies.getAll({ limit: 123 })"; responseType: "CompaniesGetAllResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
  }
  companyGroups: {
    getAll: { method: "GET"; path: "/company-groups"; summary: "List funds available to the SDK consumer"; description: "Returns compact fund metadata (id, name, demo flag, color, member company ids). Filter by `companyGroupIds` and/or `nameSearch` (case-insensitive substring on name; accepts an array to resolve multiple groups in one call with OR semantics — e.g. `nameSearch=[\"fund i\",\"fund ii\"]`)."; exampleCall: "client.companyGroups.getAll({ limit: 123 })"; responseType: "CompanyGroupsGetAllResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    getOne: { method: "GET"; path: "/company-groups/:id"; summary: "Get one fund available to the SDK consumer"; description: "Returns full fund details. Includes all compact-list fields (id, name, type, currency, logo) plus extended fund metadata: legal name, domicile, management company, GP, vintage year, fund currency, opening and closing dates, legal form, investment policy, fees, regulatory info, and service providers. Also includes the list of member companies the caller can access. Returns 404 if the fund does not exist or is inaccessible to the caller."; exampleCall: "client.companyGroups.getOne(123)"; responseType: "CompanyGroupsGetOneResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
  }
  positions: {
    getPortfolioSummary: { method: "GET"; path: "/positions/portfolio/summary"; summary: "Get portfolio summary with positions and key metrics per company"; description: "Returns one row per company with position data (invested, fair value, multiple, ROI) and latest values for selected metrics. Defaults to MRR, Cash Balance, Headcount, Net Burn Rate, and Runway. Override with `metricTypeNames`. Designed for portfolio overview tables."; exampleCall: "client.positions.getPortfolioSummary({ currency: 'USD' })"; responseType: "PositionsGetPortfolioSummaryResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    getCompanyPositions: { method: "GET"; path: "/positions/companies/:id"; summary: "Get positions for one company"; description: "Returns all fund-level positions for a single company — one entry per fund (`companyGroupId`) that holds a position in the company. Each entry carries invested amount, fair market value, ownership percentage, share counts, multiple, and ROI, all FX-converted to `currency` (ISO 4217, required). Filter by `companyGroupIds` to scope to specific funds. Use `date` (ISO 8601) for a historical snapshot; omit to use the latest available data."; exampleCall: "client.positions.getCompanyPositions(123, { currency: 'USD' })"; responseType: "PositionsGetCompanyPositionsResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    getPortfolioPositions: { method: "GET"; path: "/positions/portfolio"; summary: "Get aggregated portfolio position totals"; description: "Returns a single aggregated position object that sums invested amount, fair market value, ownership percentage, share counts, multiple, and ROI across all accessible companies (optionally filtered by `companyIds` and/or `companyGroupIds` to scope to specific funds). `currency` (ISO 4217, required) converts all monetary values. Use `date` (ISO 8601) for a historical snapshot; omit for the latest available data. For a per-company breakdown instead of a single aggregate, use `GET /positions/portfolio/summary`."; exampleCall: "client.positions.getPortfolioPositions({ currency: 'USD' })"; responseType: "PositionsGetPortfolioPositionsResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
  }
  transactions: {
    getSummary: { method: "GET"; path: "/transactions/summary"; summary: "Get transaction activity summary"; description: "Returns aggregated transaction statistics: total invested, total realized, transaction count, company count, and breakdown by transaction type. Optionally group by period (Month, Quarter, Year). Filter by company, fund (`companyGroupIds`), and date range."; exampleCall: "client.transactions.getSummary({ currency: 'USD' })"; responseType: "TransactionsGetSummaryResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    getCompanyTransactions: { method: "GET"; path: "/transactions/companies/:id"; summary: "Get transactions for one company"; description: "Returns all transactions for a single company, ordered by date descending. Each transaction is a typed variant — narrow it via its `type` field. Filter by `companyGroupIds` to scope to a specific fund, `types` to limit to specific transaction kinds, and `priorTo` (ISO 8601) for a historical snapshot. Requires transaction read access on the company."; exampleCall: "client.transactions.getCompanyTransactions(123, { limit: 123 })"; responseType: "TransactionsGetCompanyTransactionsResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    getTransactions: { method: "GET"; path: "/transactions"; summary: "Get transactions for multiple companies"; description: "Returns transactions across multiple companies. Each transaction is a typed variant — narrow it via its `type` field. Filter by `companyIds`, `companyGroupIds`, `types`, and `priorTo` (ISO 8601 upper-bound date for a historical snapshot). When `companyIds` is provided, the caller must have transaction read access on every listed company."; exampleCall: "client.transactions.getTransactions({ limit: 123 })"; responseType: "TransactionsGetTransactionsResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
  }
  metrics: {
    getTypes: { method: "GET"; path: "/metrics/types"; summary: "List metric types available to the SDK consumer"; description: "Returns predefined metric types plus user-defined metric types scoped to the caller — VC group custom types for VC users, company custom types for company users. Each entry carries the metric shape needed to interpret values: `valueType` is `\"numeric\"` (read `point.value` as a number; may carry `rangeConfig` with min/max/step for ranged metrics) or `\"option\"` (read `point.optionValue` as a string from `optionConfig.options[]` — this is how boolean / yes-no metrics are encoded, as two options typically labelled \"Yes\"/\"No\"). `unit.unit` describes the measurement (`Currency`, `Percentage`, `Number`, time units, ...); `unit.currencyCode` is intentionally null on this endpoint because monetary types resolve their concrete currency per company — call /metrics to receive `unit.currencyCode` populated with each company's native currency, or pass `currency` to convert all monetary metrics to a chosen target."; exampleCall: "client.metrics.getTypes()"; responseType: "MetricsGetTypesResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    search: { method: "POST"; path: "/metrics"; summary: "Read metric values for accessible companies, grouped by company"; description: "Returns metric data points for companies the caller can access (companies in the caller's VC group portfolio, or the caller's own company for company users). Each entry carries company and metric type references with id and human-readable name. Each point carries both `value` (number, for `valueType === \"numeric\"`, including ranged numerics constrained by the type's `rangeConfig`) and `optionValue` (string, for `valueType === \"option\"`, matching one of `metricType.optionConfig.options[].value` — this is how boolean/yes-no metrics report their reading); read whichever matches the metric type's `valueType`. Filter by company id, company name substring (`companyNameSearch`), company group, metric type id, metric type name (`metricTypeNames`), timeframe, and date range to narrow the response. Pass `currency` (ISO 4217) to FX-convert monetary metrics to that target currency in one call instead of fetching company currencies separately."; exampleCall: "client.metrics.search({})"; responseType: "MetricsSearchResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    compare: { method: "POST"; path: "/metrics/compare"; summary: "Compare metrics across companies"; description: "Returns date-aligned rows for one or more metric types across multiple companies. Pass `metricTypeIds` (resolve from /metrics/types) to compare several metrics in a single round trip; names are not accepted on this endpoint to keep selection stable. Each row contains one value per company for a given period. Optionally includes period-over-period percentage change. Use `companyIds`, `companyNameSearch`, or `companyGroupIds` to select companies."; exampleCall: "client.metrics.compare({ metricTypeIds: [1,7] })"; responseType: "MetricsCompareResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    aggregate: { method: "POST"; path: "/metrics/aggregate"; summary: "Aggregate metrics across portfolio companies"; description: "Returns aggregated metric values (SUM, AVG, MEDIAN, MIN, MAX, COUNT) across companies for each reporting period. Pass `metricTypeIds` (resolve from /metrics/types) to select what to aggregate; names are not accepted on this endpoint to keep selection stable. Optionally group results by fund (`companyGroupId`) for fund-level breakdowns. MIN, MAX, and COUNT are always computed. SUM, AVG, and MEDIAN are only produced when the metric type enables them in its `summaryAggregationMethods` configuration; otherwise `point.value` is `null` for that aggregation."; exampleCall: "client.metrics.aggregate({ metricTypeIds: [1,7], aggregation: \"SUM\" })"; responseType: "MetricsAggregateResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
  }
  companyReports: {
    list: { method: "GET"; path: "/company-reports"; summary: "List published company reports accessible to the caller (metadata only)"; description: "Returns lightweight report metadata (id, title, period, publisher company reference). Use GET /company-reports/:id to fetch the full content of a specific report. Visibility is determined by the caller's roles — VC users see reports for managed-portfolio companies, company employees see their own company's reports, portfolio investors see Published reports shared with their visibility groups. Filters narrow the list by company ids, funds (`companyGroupIds`), company name substring (`companyNameSearch`), and reporting period (timeframe + date range)."; exampleCall: "client.companyReports.list({ limit: 123 })"; responseType: "CompanyReportsListResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    getOne: { method: "GET"; path: "/company-reports/:id"; summary: "Fetch the full content of a single company report"; description: "Returns the report metadata plus structured sections (text/markdown/image) and attachments with pre-signed URLs. Returns 404 if the report does not exist and 403 if the caller cannot access it under their role-based permissions."; exampleCall: "client.companyReports.getOne(123)"; responseType: "CompanyReportsGetOneResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
  }
}
