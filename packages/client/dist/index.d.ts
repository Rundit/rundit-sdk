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

export interface CreateClientOptions {
  baseUrl?: string
  apiKey: string
  fetch?: typeof fetch
  headers?: Record<string, string>
}

export interface SdkProfileOptionDto {
  value: string
  label: string
}

export interface SdkProfilesConfigDto {
  roles?: SdkProfileOptionDto[]
  positions?: SdkProfileOptionDto[]
  educationLevels?: SdkProfileOptionDto[]
  genders?: SdkProfileOptionDto[]
  races?: SdkProfileOptionDto[]
  nationalities?: SdkProfileOptionDto[]
}

export interface SdkCompanyReferenceDto {
  id: number
  name: string
  type: string | null
}

export interface SdkProfileDto {
  surname: string | null
  email: string | null
  telephone: string | null
  country: string | null
  avatarImageFileUuid: string | null
  expertiseAreas: string | null
  educationLevel: string | null
  linkedIn: string | null
  github: string | null
  website: string | null
  gender: string | null
  birthYear: number | null
  race: string | null
  nationality: string | null
  ethnicity: string | null
  twitter: string | null
  facebook: string | null
  rolesInCompany: ("founder-cofounder" | "management" | "board-member" | "board-chairman")[]
  firstTimeFounder: boolean | null
  position: "chief-executive" | "chief-operating" | "chief-financial" | "chief-information" | "chief-technology" | "chief-marketing" | "chief-human-resources" | "chief-design" | "chief-data" | "chief-product" | "chief-customer" | "chief-revenue" | "chief-sales" | "president" | "vice-president" | "vp-operations" | "vp-finance" | "vp-technology" | "vp-marketing" | "vp-sales" | "vp-human-resources" | "vp-product" | "vp-design" | "vp-customer-support" | "vp-business-development" | "head-operations" | "head-finance" | "head-technology" | "head-marketing" | "head-human-resources" | "head-product" | "head-design" | "head-customer-support" | "head-business-development" | "lead-operations" | "lead-finance" | "lead-technology" | "lead-marketing" | "lead-human-resources" | "lead-product" | "lead-design" | "lead-customer-support" | "lead-business-development" | "chief-mobility-officer" | "evp-business-and-legal-affairs" | "global-general-manager" | "evp-international-co-productions" | "chief-creative-officer" | "executive-chairman" | "chief-experience-n-strategy-officer" | "chief-corporate-officer" | "chief-of-staff" | "chief-people-officer" | "chief-privacy-officer" | "chief-legal-officer" | "svp-people-operations-n-experience" | "svp-marketing" | "svp-product-n-analytics" | "evp-strategic-partnerships" | "svp-of-sales" | "svp-strategic-initiatives" | "head-of-talent" | "head-of-partnerships" | "engineering-manager" | "director-of-customer-success" | "chief-compliance-officer" | "chief-strategy-officer" | "general-counsel" | "vp-engineering" | "director-of-engineering" | "chief-engineer" | "chief-medical-officer" | "executive-editor" | "managing-editor" | "vp-strategy-and-transformation" | "chief-business-officer" | "advisor" | "other"
  id: string
  name: string | null
  companyId: number
  company: SdkCompanyReferenceDto
  avatarImageUrl: string | null
}

export interface SdkPaginationMetaDto {
  nextCursor: string | null
}

export interface SdkProfilesListResponseDto {
  data: SdkProfileDto[]
  meta: SdkPaginationMetaDto
}

export interface SdkCreateProfileDto {
  surname?: string | null
  email?: string | null
  telephone?: string | null
  country?: string | null
  avatarImageFileUuid?: string | null
  expertiseAreas?: string | null
  educationLevel?: "school" | "high-school" | "college" | "associate" | "bachelor" | "master" | "professional" | "doctoral"
  linkedIn?: string | null
  github?: string | null
  website?: string | null
  gender?: "male" | "female" | "other" | "n/a"
  birthYear?: number | null
  race?: "white" | "american-indian" | "asian" | "black" | "pacific" | "two-or-more" | "other"
  nationality?: string | null
  ethnicity?: string | null
  twitter?: string | null
  facebook?: string | null
  rolesInCompany?: ("founder-cofounder" | "management" | "board-member" | "board-chairman")[]
  position?: "chief-executive" | "chief-operating" | "chief-financial" | "chief-information" | "chief-technology" | "chief-marketing" | "chief-human-resources" | "chief-design" | "chief-data" | "chief-product" | "chief-customer" | "chief-revenue" | "chief-sales" | "president" | "vice-president" | "vp-operations" | "vp-finance" | "vp-technology" | "vp-marketing" | "vp-sales" | "vp-human-resources" | "vp-product" | "vp-design" | "vp-customer-support" | "vp-business-development" | "head-operations" | "head-finance" | "head-technology" | "head-marketing" | "head-human-resources" | "head-product" | "head-design" | "head-customer-support" | "head-business-development" | "lead-operations" | "lead-finance" | "lead-technology" | "lead-marketing" | "lead-human-resources" | "lead-product" | "lead-design" | "lead-customer-support" | "lead-business-development" | "chief-mobility-officer" | "evp-business-and-legal-affairs" | "global-general-manager" | "evp-international-co-productions" | "chief-creative-officer" | "executive-chairman" | "chief-experience-n-strategy-officer" | "chief-corporate-officer" | "chief-of-staff" | "chief-people-officer" | "chief-privacy-officer" | "chief-legal-officer" | "svp-people-operations-n-experience" | "svp-marketing" | "svp-product-n-analytics" | "evp-strategic-partnerships" | "svp-of-sales" | "svp-strategic-initiatives" | "head-of-talent" | "head-of-partnerships" | "engineering-manager" | "director-of-customer-success" | "chief-compliance-officer" | "chief-strategy-officer" | "general-counsel" | "vp-engineering" | "director-of-engineering" | "chief-engineer" | "chief-medical-officer" | "executive-editor" | "managing-editor" | "vp-strategy-and-transformation" | "chief-business-officer" | "advisor" | "other"
  firstTimeFounder?: boolean | null
  companyId: number
  name: string
}

export interface SdkUpdateProfileDto {
  surname?: string | null
  email?: string | null
  telephone?: string | null
  country?: string | null
  avatarImageFileUuid?: string | null
  expertiseAreas?: string | null
  educationLevel?: "school" | "high-school" | "college" | "associate" | "bachelor" | "master" | "professional" | "doctoral"
  linkedIn?: string | null
  github?: string | null
  website?: string | null
  gender?: "male" | "female" | "other" | "n/a"
  birthYear?: number | null
  race?: "white" | "american-indian" | "asian" | "black" | "pacific" | "two-or-more" | "other"
  nationality?: string | null
  ethnicity?: string | null
  twitter?: string | null
  facebook?: string | null
  rolesInCompany?: ("founder-cofounder" | "management" | "board-member" | "board-chairman")[]
  position?: "chief-executive" | "chief-operating" | "chief-financial" | "chief-information" | "chief-technology" | "chief-marketing" | "chief-human-resources" | "chief-design" | "chief-data" | "chief-product" | "chief-customer" | "chief-revenue" | "chief-sales" | "president" | "vice-president" | "vp-operations" | "vp-finance" | "vp-technology" | "vp-marketing" | "vp-sales" | "vp-human-resources" | "vp-product" | "vp-design" | "vp-customer-support" | "vp-business-development" | "head-operations" | "head-finance" | "head-technology" | "head-marketing" | "head-human-resources" | "head-product" | "head-design" | "head-customer-support" | "head-business-development" | "lead-operations" | "lead-finance" | "lead-technology" | "lead-marketing" | "lead-human-resources" | "lead-product" | "lead-design" | "lead-customer-support" | "lead-business-development" | "chief-mobility-officer" | "evp-business-and-legal-affairs" | "global-general-manager" | "evp-international-co-productions" | "chief-creative-officer" | "executive-chairman" | "chief-experience-n-strategy-officer" | "chief-corporate-officer" | "chief-of-staff" | "chief-people-officer" | "chief-privacy-officer" | "chief-legal-officer" | "svp-people-operations-n-experience" | "svp-marketing" | "svp-product-n-analytics" | "evp-strategic-partnerships" | "svp-of-sales" | "svp-strategic-initiatives" | "head-of-talent" | "head-of-partnerships" | "engineering-manager" | "director-of-customer-success" | "chief-compliance-officer" | "chief-strategy-officer" | "general-counsel" | "vp-engineering" | "director-of-engineering" | "chief-engineer" | "chief-medical-officer" | "executive-editor" | "managing-editor" | "vp-strategy-and-transformation" | "chief-business-officer" | "advisor" | "other"
  firstTimeFounder?: boolean | null
  companyId: number
  name?: string
}

export interface SdkProfileAvatarUploadDto {
  fileUuid: string
  uploadUrl: string
  httpMethod: "PUT"
  headers: {  }
  expiresIn: number
  maxBytes: number
}

export interface SdkPrepareProfileAvatarUploadDto {
  companyId: number
  filename: string
  filetype: "image/jpeg" | "image/png" | "image/webp"
  filesize: number
}

export interface SdkCompleteProfileAvatarUploadDto {
  companyId: number
  fileUuid: string
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
  realizedMultiple?: number | null
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
  unit: "Percentage" | "Currency" | "Number" | "Second" | "Minute" | "Hour" | "Day" | "Week" | "Month" | "Quarter" | "Year"
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

export interface SdkMetricTypeSummaryDto {
  id: number
  name: string
  shortName?: string | null
  valueType?: "numeric" | "option"
  unit?: SdkMetricUnitDto
  optionConfig?: SdkMetricTypeOptionConfigDto
  rangeConfig?: SdkMetricTypeRangeConfigDto
}

export interface SdkMetricPointDto {
  date: string
  timeframe: "Month" | "Quarter" | "Year"
  value: number | null
  optionValue: string | null
  valueError?: string | null
  aggregated?: boolean
}

export interface SdkMetricSubRowDto {
  id: number
  flavor: "forecast" | "budget"
  points: SdkMetricPointDto[]
}

export interface SdkCompanyMetricDto {
  id: number
  metricType: SdkMetricTypeSummaryDto
  points: SdkMetricPointDto[]
  subRows?: SdkMetricSubRowDto[]
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
  timeframe: "Month" | "Quarter" | "Year"
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

export interface SdkBatchDashboardResponseDto {
  data: SdkCompanyDashboardDto[]
  meta: SdkPaginationMetaDto
}

export interface GetBatchDashboardBodyDto {
  limit?: number
  cursor?: string
  companyIds: number[]
  currency: string
  metricsFrom?: string
  metricsTo?: string
  metricsTimeframe?: "Month" | "Quarter" | "Year"
  metricsPointLimit?: number
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
  realizedMultiple?: number | null
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

export interface SdkMetricTypeDto {
  id: number
  name: string
  shortName?: string | null
  valueType?: "numeric" | "option"
  unit?: SdkMetricUnitDto
  optionConfig?: SdkMetricTypeOptionConfigDto
  rangeConfig?: SdkMetricTypeRangeConfigDto
  summaryAggregationMethods: ("SUM" | "AVG" | "MEDIAN" | "COUNT_POSITIVES" | "AVG_POSITIVES_PERCENTAGE")[]
  description?: string | null
  origin?: "Predefined" | "UserDefined"
  aggMethod: "SUM" | "LAST_AVAILABLE" | "AVG" | "NONE"
}

export interface SdkMetricTypesListResponseDto {
  data: SdkMetricTypeDto[]
  meta: SdkPaginationMetaDto
}

export interface SdkCreateMetricOptionDto {
  value: string
  isPositive: boolean
}

export interface SdkCreateMetricOptionsDto {
  options: SdkCreateMetricOptionDto[]
}

export interface SdkCreateMetricRangeDto {
  min: number
  max: number
  step: number
}

export interface SdkCreateMetricTypeDto {
  name: string
  shortName?: string
  description?: string
  valueType: "numeric" | "option"
  unit?: "Percentage" | "Currency" | "Number" | "Second" | "Minute" | "Hour" | "Day" | "Week" | "Month" | "Quarter" | "Year"
  aggMethod: "SUM" | "LAST_AVAILABLE" | "AVG" | "NONE"
  summaryAggregationMethods: ("SUM" | "AVG" | "MEDIAN" | "COUNT_POSITIVES" | "AVG_POSITIVES_PERCENTAGE")[]
  optionConfig?: SdkCreateMetricOptionsDto
  rangeConfig?: SdkCreateMetricRangeDto
}

export interface SdkMetricBatchWriteResponseDto {
  companyCount: number
  metricCount: number
  pointsWritten: number
}

export interface SdkMetricPointWriteDto {
  date: string
  value: number | null
  optionValue: string | null
  timeframe: "Month" | "Quarter" | "Year"
}

export interface SdkMetricBatchWriteItemDto {
  metricTypeId?: number
  metricTypeName?: string
  flavor?: "actual" | "forecast" | "budget"
  points: SdkMetricPointWriteDto[]
}

export interface SdkCompanyMetricBatchWriteDto {
  companyId: number
  currency: string
  items: SdkMetricBatchWriteItemDto[]
}

export interface SdkMetricBatchWriteRequestDto {
  companies: SdkCompanyMetricBatchWriteDto[]
}

export interface SdkMetricPointsWriteResponseDto {
  metricId: number
  companyId: number
  points: SdkMetricPointDto[]
}

export interface SdkMetricPointsWriteRequestDto {
  points: SdkMetricPointWriteDto[]
}

export interface SdkMetricPointDeleteDto {
  date: string
  timeframe: "Month" | "Quarter" | "Year"
}

export interface SdkMetricPointsDeleteRequestDto {
  points: SdkMetricPointDeleteDto[]
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
  includePoints?: boolean
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
  pointLimit?: number
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
  timeframe: "Month" | "Quarter" | "Year"
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
  metricTypeIds?: number[]
  metricTypeNames?: string[]
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
  timeframe: "Month" | "Quarter" | "Year"
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
  metricTypeIds?: number[]
  metricTypeNames?: string[]
  aggregation: "SUM" | "AVG" | "MEDIAN" | "MIN" | "MAX" | "COUNT"
  companyIds?: number[]
  companyNameSearch?: string[]
  companyGroupIds?: number[]
  timeframe?: "Month" | "Quarter" | "Year"
  from?: string
  to?: string
  currency?: string
  conversionStrategy?: "LATEST_FX_RATE" | "ENTITY_DATE_RATE"
  groupByCompanyGroup?: boolean
}

export interface SdkMetricImportResultDto {
  index: number
  status: "applied" | "unchanged" | "error"
  metricTypeId?: number
  metricId?: number
  templateEntryId?: string
  flavor: "actual" | "forecast" | "budget"
  pointsWritten: number
  pointsUnchanged: number
  actions: string[]
  templateCompanyIds: number[]
  errorStatus?: number
  error?: string
}

export interface SdkCompanyMetricImportResponseDto {
  companyId: number
  currency: string
  success: boolean
  results: SdkMetricImportResultDto[]
}

export interface SdkMetricImportResponseDto {
  success: boolean
  pointsWritten: number
  pointsUnchanged: number
  companies: SdkCompanyMetricImportResponseDto[]
}

export interface SdkMetricImportItemDto {
  metricTypeId?: number
  metricTypeName?: string
  createType?: SdkCreateMetricTypeDto
  flavor?: "actual" | "forecast" | "budget"
  points: SdkMetricPointWriteDto[]
}

export interface SdkCompanyMetricImportDto {
  companyId: number
  currency: string
  items: SdkMetricImportItemDto[]
}

export interface SdkMetricImportDto {
  provisionMissing?: boolean
  companies: SdkCompanyMetricImportDto[]
  onConflict?: "reject" | "overwrite"
}

export interface SdkMetricUsageCompanyDto {
  id: number
  name: string
}

export interface SdkMetricTypeUsageDto {
  usedInTemplate: boolean
  companyCount: number
  companies: SdkMetricUsageCompanyDto[]
}

export interface SdkDeletedMetricTypeDto {
  metricTypeId: number
}

export interface SdkTemplateCompanyFilterDto {
  type: "all" | "group" | "company"
  value?: number
}

export interface SdkTemplateEntryDto {
  metricTypeId: number
  hasForecast: boolean
  hasBudget: boolean
  companyFilter: SdkTemplateCompanyFilterDto[]
  position?: number
  id: string
  metricTemplateId: string
}

export interface SdkMetricTemplateDto {
  id: string
  entries: SdkTemplateEntryDto[]
}

export interface SdkTemplateEntryWriteDto {
  metricTypeId: number
  hasForecast: boolean
  hasBudget: boolean
  companyFilter: SdkTemplateCompanyFilterDto[]
  position?: number
}

export interface SdkDeletedMetricDto {
  metricId: number
  companyId: number
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

export interface SdkChartReportSectionDto {
  id: number
  type: SdkReportSectionType
  order: number
  title: string
  content: {  }
}

export interface SdkTableReportSectionDto {
  id: number
  type: SdkReportSectionType
  order: number
  title: string
  content: {  }
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
  timeframe: "Month" | "Quarter" | "Year"
  publishedAt: string | null
  company: SdkCompanyReferenceDto
  createdBy: SdkUserReferenceDto
  sections: (SdkTextReportSectionDto | SdkMarkdownReportSectionDto | SdkImageReportSectionDto | SdkChartReportSectionDto | SdkTableReportSectionDto | SdkSingleChoiceReportSectionDto | SdkMultiChoiceReportSectionDto)[]
  attachments: SdkCompanyReportAttachmentDto[]
}

export type ProfilesGetConfigResponse = SdkProfilesConfigDto

export type ProfilesListResponse = SdkProfilesListResponseDto

export type ProfilesCreateResponse = SdkProfileDto

export type ProfilesCreateBody = SdkCreateProfileDto

export type ProfilesGetOneResponse = SdkProfileDto

export type ProfilesUpdateResponse = SdkProfileDto

export type ProfilesUpdateBody = SdkUpdateProfileDto

export type ProfilesDeleteResponse = unknown

export type ProfilesPrepareAvatarUploadResponse = SdkProfileAvatarUploadDto

export type ProfilesPrepareAvatarUploadBody = SdkPrepareProfileAvatarUploadDto

export type ProfilesCompleteAvatarUploadResponse = SdkProfileDto

export type ProfilesCompleteAvatarUploadBody = SdkCompleteProfileAvatarUploadDto

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

export type MetricsCreateTypeResponse = SdkMetricTypeDto

export type MetricsCreateTypeBody = SdkCreateMetricTypeDto

export type MetricsWritePointsBatchResponse = SdkMetricBatchWriteResponseDto

export type MetricsWritePointsBatchBody = SdkMetricBatchWriteRequestDto

export type MetricsWritePointsResponse = SdkMetricPointsWriteResponseDto

export type MetricsWritePointsBody = SdkMetricPointsWriteRequestDto

export type MetricsDeletePointsResponse = SdkMetricPointsWriteResponseDto

export type MetricsDeletePointsBody = SdkMetricPointsDeleteRequestDto

export type MetricsSearchResponse = SdkCompanyMetricsListResponseDto

export type MetricsSearchBody = MetricSearchDto

export type MetricsCompareResponse = SdkMetricCompareMultiResponseDto

export type MetricsCompareBody = MetricCompareDto

export type MetricsAggregateResponse = SdkMetricAggregateResponseDto

export type MetricsAggregateBody = MetricAggregateDto

export type MetricsImportResponse = SdkMetricImportResponseDto

export type MetricsImportBody = SdkMetricImportDto

export type MetricsGetTypeUsageResponse = SdkMetricTypeUsageDto

export type MetricsDeleteTypeResponse = SdkDeletedMetricTypeDto

export type MetricTemplatesGetResponse = SdkMetricTemplateDto

export type MetricTemplatesCreateEntryResponse = SdkTemplateEntryDto

export type MetricTemplatesCreateEntryBody = SdkTemplateEntryWriteDto

export type MetricTemplatesUpdateEntryResponse = SdkTemplateEntryDto

export type MetricTemplatesUpdateEntryBody = SdkTemplateEntryWriteDto

export type MetricTemplatesDeleteEntryResponse = SdkTemplateEntryDto

export type MetricsDeleteResponse = SdkDeletedMetricDto

export type CompanyReportsListResponse = SdkCompanyReportsListResponseDto

export type CompanyReportsGetOneResponse = SdkCompanyReportDto

export interface ProfilesGetConfigQuery {
  /**
   * Return only these reference-data sections. Omit or pass [] for the complete config.
   */
  sections?: ("roles" | "positions" | "educationLevels" | "genders" | "races" | "nationalities")[]
}

export interface ProfilesListQuery {
  /**
   * Maximum items per page (1-500). Omit to receive the full result set in one response. Values outside that range are rejected with 422 rather than clamped, so a page is never quietly smaller than requested.
   */
  limit?: number
  /**
   * Opaque cursor from a previous response's `meta.nextCursor`. Repeat the original filters and pass nextCursor as cursor; limit can be omitted because the cursor carries its page size. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions.
   */
  cursor?: string
  /**
   * Filter founders by a recorded Yes/No answer. false does not match unknown answers or non-founders.
   */
  firstTimeFounder?: boolean
  /**
   * Filter by a company position from profiles.getConfig.
   */
  position?: "chief-executive" | "chief-operating" | "chief-financial" | "chief-information" | "chief-technology" | "chief-marketing" | "chief-human-resources" | "chief-design" | "chief-data" | "chief-product" | "chief-customer" | "chief-revenue" | "chief-sales" | "president" | "vice-president" | "vp-operations" | "vp-finance" | "vp-technology" | "vp-marketing" | "vp-sales" | "vp-human-resources" | "vp-product" | "vp-design" | "vp-customer-support" | "vp-business-development" | "head-operations" | "head-finance" | "head-technology" | "head-marketing" | "head-human-resources" | "head-product" | "head-design" | "head-customer-support" | "head-business-development" | "lead-operations" | "lead-finance" | "lead-technology" | "lead-marketing" | "lead-human-resources" | "lead-product" | "lead-design" | "lead-customer-support" | "lead-business-development" | "chief-mobility-officer" | "evp-business-and-legal-affairs" | "global-general-manager" | "evp-international-co-productions" | "chief-creative-officer" | "executive-chairman" | "chief-experience-n-strategy-officer" | "chief-corporate-officer" | "chief-of-staff" | "chief-people-officer" | "chief-privacy-officer" | "chief-legal-officer" | "svp-people-operations-n-experience" | "svp-marketing" | "svp-product-n-analytics" | "evp-strategic-partnerships" | "svp-of-sales" | "svp-strategic-initiatives" | "head-of-talent" | "head-of-partnerships" | "engineering-manager" | "director-of-customer-success" | "chief-compliance-officer" | "chief-strategy-officer" | "general-counsel" | "vp-engineering" | "director-of-engineering" | "chief-engineer" | "chief-medical-officer" | "executive-editor" | "managing-editor" | "vp-strategy-and-transformation" | "chief-business-officer" | "advisor" | "other"
  /**
   * Match any of these positions (OR). Intersects with other filters, including scalar position when supplied.
   */
  positions?: ("chief-executive" | "chief-operating" | "chief-financial" | "chief-information" | "chief-technology" | "chief-marketing" | "chief-human-resources" | "chief-design" | "chief-data" | "chief-product" | "chief-customer" | "chief-revenue" | "chief-sales" | "president" | "vice-president" | "vp-operations" | "vp-finance" | "vp-technology" | "vp-marketing" | "vp-sales" | "vp-human-resources" | "vp-product" | "vp-design" | "vp-customer-support" | "vp-business-development" | "head-operations" | "head-finance" | "head-technology" | "head-marketing" | "head-human-resources" | "head-product" | "head-design" | "head-customer-support" | "head-business-development" | "lead-operations" | "lead-finance" | "lead-technology" | "lead-marketing" | "lead-human-resources" | "lead-product" | "lead-design" | "lead-customer-support" | "lead-business-development" | "chief-mobility-officer" | "evp-business-and-legal-affairs" | "global-general-manager" | "evp-international-co-productions" | "chief-creative-officer" | "executive-chairman" | "chief-experience-n-strategy-officer" | "chief-corporate-officer" | "chief-of-staff" | "chief-people-officer" | "chief-privacy-officer" | "chief-legal-officer" | "svp-people-operations-n-experience" | "svp-marketing" | "svp-product-n-analytics" | "evp-strategic-partnerships" | "svp-of-sales" | "svp-strategic-initiatives" | "head-of-talent" | "head-of-partnerships" | "engineering-manager" | "director-of-customer-success" | "chief-compliance-officer" | "chief-strategy-officer" | "general-counsel" | "vp-engineering" | "director-of-engineering" | "chief-engineer" | "chief-medical-officer" | "executive-editor" | "managing-editor" | "vp-strategy-and-transformation" | "chief-business-officer" | "advisor" | "other")[]
  companyIds?: number[]
  /**
   * Restrict to companies in these funds
   */
  companyGroupIds?: number[]
  /**
   * Case-insensitive company name substrings (OR)
   */
  companyNameSearch?: string[]
  /**
   * Case-insensitive person full-name substrings (OR)
   */
  nameSearch?: string[]
  /**
   * Match any of these recorded roles; omitted returns the whole directory
   */
  rolesInCompany?: ("founder-cofounder" | "management" | "board-member" | "board-chairman")[]
}

export interface ProfilesGetOneQuery {
  /**
   * Company context for this directory entry. Must match an existing association; profiles cannot be moved to another company.
   */
  companyId: number
}

export interface ProfilesDeleteQuery {
  /**
   * Company context for this directory entry. Must match an existing association; profiles cannot be moved to another company.
   */
  companyId: number
}

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
   * Inclusive upper bound for metric data points (ISO 8601). Pair with metricsPointLimit: 1 for latest values as of this date; omit to allow future-dated points.
   */
  metricsTo?: string
  /**
   * Restrict metric data points to this reporting period granularity.
   */
  metricsTimeframe?: "Month" | "Quarter" | "Year"
  /**
   * Keep only the most recent N data points per metric (applied after `metricsFrom` / `metricsTo` / `metricsTimeframe`). Omit for the full history; `1` yields the latest dated point, which may be in the future. Set `metricsTo` to today for current values and `metricsTimeframe` for a single granularity.
   */
  metricsPointLimit?: number
  /**
   * Metric type names to include (case-insensitive exact match on display name or `shortName`). Omit to include all metrics. Names that match no accessible metric type are ignored.
   */
  metricTypeNames?: string[]
  /**
   * Metric type identifiers to include. Intersected with `metricTypeNames` when both are provided.
   */
  metricTypeIds?: number[]
  /**
   * FX rate selection when converting monetary metrics. `LATEST_FX_RATE` (default) uses the most recent rate; `ENTITY_DATE_RATE` uses the rate on each point's date.
   */
  conversionStrategy?: "LATEST_FX_RATE" | "ENTITY_DATE_RATE"
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
   * Maximum items per page (1-500). Omit to receive the full result set in one response. Values outside that range are rejected with 422 rather than clamped, so a page is never quietly smaller than requested.
   */
  limit?: number
  /**
   * Opaque cursor from a previous response's `meta.nextCursor`. Repeat the original filters and pass nextCursor as cursor; limit can be omitted because the cursor carries its page size. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions.
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
   * Maximum items per page (1-500). Omit to receive the full result set in one response. Values outside that range are rejected with 422 rather than clamped, so a page is never quietly smaller than requested.
   */
  limit?: number
  /**
   * Opaque cursor from a previous response's `meta.nextCursor`. Repeat the original filters and pass nextCursor as cursor; limit can be omitted because the cursor carries its page size. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions.
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
   * Maximum items per page (1-500). Omit to receive the full result set in one response. Values outside that range are rejected with 422 rather than clamped, so a page is never quietly smaller than requested.
   */
  limit?: number
  /**
   * Opaque cursor from a previous response's `meta.nextCursor`. Repeat the original filters and pass nextCursor as cursor; limit can be omitted because the cursor carries its page size. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions.
   */
  cursor?: string
  /**
   * CompanyGroup (default) returns one row per company and fund. Company combines all selected, accessible funds into one row per company using the investment engine totals; companyGroupId is null and companyGroup is omitted.
   */
  groupBy?: "CompanyGroup" | "Company"
  /**
   * Sort before pagination. For the top companies by fair value use groupBy: Company, sortBy: fairValue, sortDirection: desc, limit: 3. Missing values sort last; company and fund ids break ties.
   */
  sortBy?: "companyId" | "fairValue" | "invested" | "realized" | "multiple"
  sortDirection?: "asc" | "desc"
  /**
   * Include the latest monthly metric snapshot as of date (defaults to today). Set false for position-only queries: skips metric computation and returns latestMetrics: [].
   */
  includeMetrics?: boolean
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
   * Metric type names to include in the latest metrics snapshot (case-insensitive exact match on display name or `shortName`). Defaults to MRR, Cash Balance, Headcount, Net Burn Rate, and Runway. Names that match no accessible metric type are ignored.
   */
  metricTypeNames?: string[]
}

export interface PositionsGetCompanyPositionsQuery {
  /**
   * Maximum items per page (1-500). Omit to receive the full result set in one response. Values outside that range are rejected with 422 rather than clamped, so a page is never quietly smaller than requested.
   */
  limit?: number
  /**
   * Opaque cursor from a previous response's `meta.nextCursor`. Repeat the original filters and pass nextCursor as cursor; limit can be omitted because the cursor carries its page size. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions.
   */
  cursor?: string
  /**
   * Optional list of company group identifiers to filter the position breakdown
   */
  companyGroupIds?: number[]
  /**
   * Reporting currency code (ISO 4217)
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
   * Reporting currency code (ISO 4217)
   */
  currency: string
  /**
   * Optional summary date in ISO format
   */
  date?: string
}

export interface TransactionsGetSummaryQuery {
  /**
   * Maximum items per page (1-500). Omit to receive the full result set in one response. Values outside that range are rejected with 422 rather than clamped, so a page is never quietly smaller than requested.
   */
  limit?: number
  /**
   * Opaque cursor from a previous response's `meta.nextCursor`. Repeat the original filters and pass nextCursor as cursor; limit can be omitted because the cursor carries its page size. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions.
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
   * Maximum items per page (1-500). Omit to receive the full result set in one response. Values outside that range are rejected with 422 rather than clamped, so a page is never quietly smaller than requested.
   */
  limit?: number
  /**
   * Opaque cursor from a previous response's `meta.nextCursor`. Repeat the original filters and pass nextCursor as cursor; limit can be omitted because the cursor carries its page size. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions.
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
   * Maximum items per page (1-500). Omit to receive the full result set in one response. Values outside that range are rejected with 422 rather than clamped, so a page is never quietly smaller than requested.
   */
  limit?: number
  /**
   * Opaque cursor from a previous response's `meta.nextCursor`. Repeat the original filters and pass nextCursor as cursor; limit can be omitted because the cursor carries its page size. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions.
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

export interface MetricsGetTypesQuery {
  /**
   * Maximum items per page (1-500). Omit to receive the full result set in one response. Values outside that range are rejected with 422 rather than clamped, so a page is never quietly smaller than requested.
   */
  limit?: number
  /**
   * Opaque cursor from a previous response's `meta.nextCursor`. Repeat the original filters and pass nextCursor as cursor; limit can be omitted because the cursor carries its page size. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions.
   */
  cursor?: string
  origin?: "Predefined" | "UserDefined"
  /**
   * Case-insensitive substring match on metric type name or `shortName`. Pass an array to look up several types in one call — a type matches if ANY listed substring occurs (OR semantics). Use it to find ids or exact names without paging the whole catalogue.
   */
  nameSearch?: string[]
}

export interface CompanyReportsListQuery {
  /**
   * Maximum items per page (1-500). Omit to receive the full result set in one response. Values outside that range are rejected with 422 rather than clamped, so a page is never quietly smaller than requested.
   */
  limit?: number
  /**
   * Opaque cursor from a previous response's `meta.nextCursor`. Repeat the original filters and pass nextCursor as cursor; limit can be omitted because the cursor carries its page size. Valid solely for the endpoint, filters, and caller that produced it — change any of them and you get 422; start again without a cursor. Paging reflects the data as of each request, so rows added or removed mid-walk can shift positions.
   */
  cursor?: string
  /**
   * Descending sort, with report id descending as a tiebreaker and missing dates last. date (default) is the reporting period; publishedAt is the publication timestamp. Use publishedAt with limit: 1 for the most recently published report.
   */
  sortBy?: "date" | "publishedAt"
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

export interface ProfilesNamespace {
  /**
   * Get allowed profile field values and labels
   * Reference data for directory CRUD: roles, positions, education levels, genders, races and nationalities. Use sections to request only what you need (e.g. ["roles","positions"]); omitted or [] returns the complete config. Contains no customer profiles. Use the option value, not its label, when writing.
   * Parameters: query: sections? (("roles" | "positions" | "educationLevels" | "genders" | "races" | "nationalities")[])
   * Returns: ProfilesGetConfigResponse
   */
  getConfig(query?: ProfilesGetConfigQuery, init?: RequestOptions): Promise<ProfilesGetConfigResponse>
  /**
   * List the founders, management and board directory
   * Returns full profile fields for accessible companies, one entry per profile and company. Filter by company ids, funds, company name, person name, recorded roles, firstTimeFounder, position or positions (OR within the array). Filters intersect. firstTimeFounder=false matches recorded No answers only, not unknown answers or non-founders. Omitted roles returns the whole directory. Absence of a role means not recorded, not a verified negative. First-time-founder null means Not specified. Ordered by company id then profile UUID; repeat the original filters when passing the next cursor. Existing legacy free-text values remain readable; format validation applies to supplied write fields.
   * Parameters: query: limit? (number), cursor? (string), firstTimeFounder? (boolean), position? ("chief-executive" | "chief-operating" | "chief-financial" | "chief-information" | "chief-technology" | "chief-marketing" | "chief-human-resources" | "chief-design" | "chief-data" | "chief-product" | "chief-customer" | "chief-revenue" | "chief-sales" | "president" | "vice-president" | "vp-operations" | "vp-finance" | "vp-technology" | "vp-marketing" | "vp-sales" | "vp-human-resources" | "vp-product" | "vp-design" | "vp-customer-support" | "vp-business-development" | "head-operations" | "head-finance" | "head-technology" | "head-marketing" | "head-human-resources" | "head-product" | "head-design" | "head-customer-support" | "head-business-development" | "lead-operations" | "lead-finance" | "lead-technology" | "lead-marketing" | "lead-human-resources" | "lead-product" | "lead-design" | "lead-customer-support" | "lead-business-development" | "chief-mobility-officer" | "evp-business-and-legal-affairs" | "global-general-manager" | "evp-international-co-productions" | "chief-creative-officer" | "executive-chairman" | "chief-experience-n-strategy-officer" | "chief-corporate-officer" | "chief-of-staff" | "chief-people-officer" | "chief-privacy-officer" | "chief-legal-officer" | "svp-people-operations-n-experience" | "svp-marketing" | "svp-product-n-analytics" | "evp-strategic-partnerships" | "svp-of-sales" | "svp-strategic-initiatives" | "head-of-talent" | "head-of-partnerships" | "engineering-manager" | "director-of-customer-success" | "chief-compliance-officer" | "chief-strategy-officer" | "general-counsel" | "vp-engineering" | "director-of-engineering" | "chief-engineer" | "chief-medical-officer" | "executive-editor" | "managing-editor" | "vp-strategy-and-transformation" | "chief-business-officer" | "advisor" | "other"), positions? (("chief-executive" | "chief-operating" | "chief-financial" | "chief-information" | "chief-technology" | "chief-marketing" | "chief-human-resources" | "chief-design" | "chief-data" | "chief-product" | "chief-customer" | "chief-revenue" | "chief-sales" | "president" | "vice-president" | "vp-operations" | "vp-finance" | "vp-technology" | "vp-marketing" | "vp-sales" | "vp-human-resources" | "vp-product" | "vp-design" | "vp-customer-support" | "vp-business-development" | "head-operations" | "head-finance" | "head-technology" | "head-marketing" | "head-human-resources" | "head-product" | "head-design" | "head-customer-support" | "head-business-development" | "lead-operations" | "lead-finance" | "lead-technology" | "lead-marketing" | "lead-human-resources" | "lead-product" | "lead-design" | "lead-customer-support" | "lead-business-development" | "chief-mobility-officer" | "evp-business-and-legal-affairs" | "global-general-manager" | "evp-international-co-productions" | "chief-creative-officer" | "executive-chairman" | "chief-experience-n-strategy-officer" | "chief-corporate-officer" | "chief-of-staff" | "chief-people-officer" | "chief-privacy-officer" | "chief-legal-officer" | "svp-people-operations-n-experience" | "svp-marketing" | "svp-product-n-analytics" | "evp-strategic-partnerships" | "svp-of-sales" | "svp-strategic-initiatives" | "head-of-talent" | "head-of-partnerships" | "engineering-manager" | "director-of-customer-success" | "chief-compliance-officer" | "chief-strategy-officer" | "general-counsel" | "vp-engineering" | "director-of-engineering" | "chief-engineer" | "chief-medical-officer" | "executive-editor" | "managing-editor" | "vp-strategy-and-transformation" | "chief-business-officer" | "advisor" | "other")[]), companyIds? (number[]), companyGroupIds? (number[]), companyNameSearch? (string[]), nameSearch? (string[]), rolesInCompany? (("founder-cofounder" | "management" | "board-member" | "board-chairman")[])
   * Returns: ProfilesListResponse
   */
  list(query?: ProfilesListQuery, init?: RequestOptions): Promise<ProfilesListResponse>
  /**
   * Create a founder, management or board profile
   * Creates a directory profile for a company. Requires name, companyId and at least one role or position. Optional fields default to null, including firstTimeFounder. Non-null firstTimeFounder requires the founder role. Uses profiles.getConfig option values. Managed-company and connected-company editing permissions apply.
   * Parameters: body: ProfilesCreateBody
   * Returns: ProfilesCreateResponse
   */
  create(body: ProfilesCreateBody, init?: RequestOptions): Promise<ProfilesCreateResponse>
  /**
   * Get a full directory profile
   * Requires the profile UUID and companyId from a directory entry. Returns all fields in that company context without disclosing other company associations.
   * Parameters: path: id (string); query: companyId (number)
   * Returns: ProfilesGetOneResponse
   */
  getOne(id: string, query?: ProfilesGetOneQuery, init?: RequestOptions): Promise<ProfilesGetOneResponse>
  /**
   * Partially update a directory profile
   * PATCH semantics: omitted fields are preserved; null clears optional scalar fields, position or firstTimeFounder. Name cannot be cleared. rolesInCompany replaces only the specified company roles; other role fields are preserved when omitted. Removing founder status clears its first-time answer. At least one role or position must remain. companyId must be an existing association. Updates are atomic. Requires edit access to every company association because personal fields are shared.
   * Parameters: path: id (string); body: ProfilesUpdateBody
   * Returns: ProfilesUpdateResponse
   */
  update(id: string, body: ProfilesUpdateBody, init?: RequestOptions): Promise<ProfilesUpdateResponse>
  /**
   * Delete a directory profile
   * Permanently deletes the profile and all company role associations. Requires companyId matching the directory entry and delete permission for every associated company. Does not delete a platform user account.
   * Parameters: path: id (string); query: companyId (number)
   * Returns: ProfilesDeleteResponse
   */
  delete(id: string, query?: ProfilesDeleteQuery, init?: RequestOptions): Promise<ProfilesDeleteResponse>
  /**
   * Prepare a profile avatar upload
   * Returns a short-lived, single-use PUT URL for an existing profile. Accepts JPEG, PNG or WebP, up to 5 MiB and 16 megapixels. The host or client must send the exact raw image bytes to uploadUrl with the returned headers; do not send base64, multipart or JSON, and never forward the Rundit API key. This tool does not read chat attachments or local paths. After uploading, call profiles.completeAvatarUpload with fileUuid. Requires edit access to every company associated with the profile. If the upload is explicitly blocked by the client network policy, explain the restriction and ask the user or their administrator to allowlist the exact hostname from uploadUrl, not a wildcard covering all storage domains. Once access is granted, prepare a fresh upload URL and retry. If policy cannot be changed, suggest uploading through the Rundit UI. Do not assume other upload failures are network restrictions: expired signatures, invalid headers and permission errors require separate diagnosis.
   * Parameters: path: id (string); body: ProfilesPrepareAvatarUploadBody
   * Returns: ProfilesPrepareAvatarUploadResponse
   */
  prepareAvatarUpload(id: string, body: ProfilesPrepareAvatarUploadBody, init?: RequestOptions): Promise<ProfilesPrepareAvatarUploadResponse>
  /**
   * Complete and attach a profile avatar upload
   * Call after sending raw image bytes to the URL returned by prepareAvatarUpload. Verifies upload ownership, actual size and image contents, then atomically attaches it and replaces the previous avatar. Requires the same uploading user, matching profile/company, and edit access to every associated company. Retrying the currently attached upload is safe. A failed completion preserves the existing avatar. Returns the updated profile and avatarImageUrl. Remove an avatar through profiles.update with avatarImageFileUuid: null.
   * Parameters: path: id (string); body: ProfilesCompleteAvatarUploadBody
   * Returns: ProfilesCompleteAvatarUploadResponse
   */
  completeAvatarUpload(id: string, body: ProfilesCompleteAvatarUploadBody, init?: RequestOptions): Promise<ProfilesCompleteAvatarUploadResponse>
}

export interface CompaniesNamespace {
  /**
   * PREFERRED tool for multi-company analysis — full dashboards for many companies in one call
   * PREFERRED tool for multi-company analysis. Returns full dashboards (company metadata, positions, metrics with data points, recent transactions, report summaries) for many companies in a single request, grouped per company. Use this instead of looping `GET /companies/:id/dashboard` (the N+1 pattern) whenever the agent needs to look at more than one company — it returns the same shape per company but in one round trip. Typical workflow: resolve company ids (e.g. `GET /companies?nameSearch=["acme","beta"]`), then call this with their `companyIds`. Use `metricTypeIds` or `metricTypeNames` (case-insensitive exact match on full name or `shortName`) to scope the returned metrics. `metricsFrom` (ISO 8601) sets a lower-bound date for metric data points; omit to include all history. `metricsTimeframe` restricts data point granularity to Month, Quarter, or Year. `metricsPointLimit` keeps only the most recent N points per metric (`1` = latest dated point; set `metricsTo` to today to exclude future values) — full histories for many companies add up quickly. `currency` (ISO 4217, required) FX-converts all monetary metrics across the batch. `conversionStrategy` controls which rate is applied: `LATEST_FX_RATE` (default) or `ENTITY_DATE_RATE` (the rate on each point's own date). `transactionLimit` / `reportLimit` cap list sizes per company (defaults: 10 and 5 respectively). Dashboards come back in the order the `companyIds` were requested, so `limit`/`cursor` paging is stable.
   * Parameters: body: CompaniesGetDashboardsBody
   * Returns: CompaniesGetDashboardsResponse
   */
  getDashboards(body: CompaniesGetDashboardsBody, init?: RequestOptions): Promise<CompaniesGetDashboardsResponse>
  /**
   * Get full company dashboard for ONE company
   * Returns company metadata, positions per fund, metrics with data points, recent transactions, and report summaries for a single company. For more than one company, prefer POST /companies/dashboards (`companies.getDashboards`) instead — it returns the same payload per company in one call and avoids the N+1 pattern. Takes the same metric options as the batch route: `metricTypeNames` / `metricTypeIds` scope which metrics are included, `metricsTimeframe` picks a granularity, `metricsFrom`, `metricsTo`, and `metricsPointLimit` limit history (`metricsPointLimit: 1` = latest dated point; set `metricsTo` to today for current values — prefer it over `metricsFrom` for "latest" reads, since a date lower bound hides values last reported before it). `transactionLimit` and `reportLimit` cap list sizes.
   * Parameters: path: id (number); query: currency (string), metricsFrom? (string), metricsTo? (string), metricsTimeframe? ("Month" | "Quarter" | "Year"), metricsPointLimit? (number), metricTypeNames? (string[]), metricTypeIds? (number[]), conversionStrategy? ("LATEST_FX_RATE" | "ENTITY_DATE_RATE"), transactionLimit? (number), reportLimit? (number)
   * Returns: CompaniesGetDashboardResponse
   */
  getDashboard(id: number, query?: CompaniesGetDashboardQuery, init?: RequestOptions): Promise<CompaniesGetDashboardResponse>
  /**
   * Get one company available to the SDK consumer
   * Returns the full company object for a single company. Includes all compact-list fields (id, name, type, currency, website, logo) plus extended metadata: legal name, status, description, vision, address, city, state, country, operating countries, VAT number, founding year, established date, total funding, and accessible fund ids (as `companyGroupIds`). Returns 403 (not 404) both when the company does not exist and when it is outside the caller's access — existence is deliberately not disclosed. Once the request is authenticated and carries the required scope, a 403 on this route therefore means an unknown or inaccessible id; resolve ids via `GET /companies` first. (A missing API key scope also yields 403, with an "Insufficient API key scopes" message.)
   * Parameters: path: id (number)
   * Returns: CompaniesGetOneResponse
   */
  getOne(id: number, init?: RequestOptions): Promise<CompaniesGetOneResponse>
  /**
   * List companies available to the SDK consumer
   * Returns the compact form (id, name, currency, type, website, logo) for every company the caller can read. Filter by `companyIds`, `companyGroupIds`, and/or `nameSearch` (case-insensitive substring on display name; accepts an array to resolve multiple companies at once with OR semantics — e.g. `nameSearch=["acme","beta","gamma"]` returns any company whose name contains any of the three substrings). Avoids listing the full portfolio when the agent only knows companies by name. Ordered by company id ascending.
   * Parameters: query: limit? (number), cursor? (string), companyIds? (number[]), companyGroupIds? (number[]), nameSearch? (string[])
   * Returns: CompaniesGetAllResponse
   */
  getAll(query?: CompaniesGetAllQuery, init?: RequestOptions): Promise<CompaniesGetAllResponse>
}

export interface CompanyGroupsNamespace {
  /**
   * List funds available to the SDK consumer
   * Returns compact fund metadata (id, name, demo flag, color, member company ids). Filter by `companyGroupIds` and/or `nameSearch` (case-insensitive substring on name; accepts an array to resolve multiple groups in one call with OR semantics — e.g. `nameSearch=["fund i","fund ii"]`). Ordered by fund id ascending.
   * Parameters: query: limit? (number), cursor? (string), companyGroupIds? (number[]), nameSearch? (string[])
   * Returns: CompanyGroupsGetAllResponse
   */
  getAll(query?: CompanyGroupsGetAllQuery, init?: RequestOptions): Promise<CompanyGroupsGetAllResponse>
  /**
   * Get one fund available to the SDK consumer
   * Returns full fund details. Includes all compact-list fields (id, name, type, currency, logo) plus extended fund metadata: legal name, domicile, management company, GP, vintage year, fund currency, opening and closing dates, legal form, investment policy, fees, regulatory info, and service providers. Also includes the list of member companies the caller can access. Returns 403 (not 404) both when the fund does not exist and when it is outside the caller's access — existence is deliberately not disclosed. Once the request is authenticated and carries the required scope, a 403 on this route therefore means an unknown or inaccessible id; resolve ids via `GET /company-groups` first. (A missing API key scope also yields 403, with an "Insufficient API key scopes" message.)
   * Parameters: path: id (number)
   * Returns: CompanyGroupsGetOneResponse
   */
  getOne(id: number, init?: RequestOptions): Promise<CompanyGroupsGetOneResponse>
}

export interface PositionsNamespace {
  /**
   * Get portfolio summary with positions and key metrics per company
   * Returns position data (invested, fair value, multiple, ROI) and latest monthly metrics as of `date` (today by default). One row per company and fund by default; `groupBy: Company` combines selected accessible funds into one row per company. For top 3 companies by fair value use `groupBy: Company`, `sortBy: fairValue`, `sortDirection: desc`, `limit: 3`, `includeMetrics: false`. Sorting happens before pagination; metrics are loaded only for the returned page. Default metrics are MRR, Cash Balance, Headcount, Net Burn Rate, and Runway. Override with `metricTypeNames` or set `includeMetrics: false` to skip metrics entirely. Without a limit all rows are returned and can be large. Default order is company id, then fund id.
   * Parameters: query: limit? (number), cursor? (string), groupBy? ("CompanyGroup" | "Company"), sortBy? ("companyId" | "fairValue" | "invested" | "realized" | "multiple"), sortDirection? ("asc" | "desc"), includeMetrics? (boolean), companyGroupIds? (number[]), companyIds? (number[]), currency (string), date? (string), metricTypeNames? (string[])
   * Returns: PositionsGetPortfolioSummaryResponse
   */
  getPortfolioSummary(query?: PositionsGetPortfolioSummaryQuery, init?: RequestOptions): Promise<PositionsGetPortfolioSummaryResponse>
  /**
   * Get positions for one company
   * Returns all fund-level positions for a single company — one entry per fund (`companyGroupId`) that holds a position in the company. Each entry carries invested amount, fair market value, ownership percentage, share counts, multiple, and ROI, all FX-converted to `currency` (ISO 4217, required). Filter by `companyGroupIds` to scope to specific funds. Use `date` (ISO 8601) for a historical snapshot; omit to use the latest available data. Ordered by fund id ascending.
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
   * Returns aggregated transaction statistics: total invested, total realized, transaction count, company count, and breakdown by transaction type. Optionally group by period (Month, Quarter, Year). Filter by company, fund (`companyGroupIds`), and date range. Ordered by period ascending.
   * Parameters: query: limit? (number), cursor? (string), companyGroupIds? (number[]), companyIds? (number[]), currency (string), groupBy? ("Month" | "Quarter" | "Year"), from? (string), to? (string)
   * Returns: TransactionsGetSummaryResponse
   */
  getSummary(query?: TransactionsGetSummaryQuery, init?: RequestOptions): Promise<TransactionsGetSummaryResponse>
  /**
   * Get transactions for one company
   * Returns all transactions for a single company, ordered by date descending then id descending. Each transaction is a typed variant — narrow it via its `type` field. Filter by `companyGroupIds` to scope to a specific fund, `types` to limit to specific transaction kinds, and `priorTo` (ISO 8601) for a historical snapshot. Requires transaction read access on the company.
   * Parameters: path: id (number); query: limit? (number), cursor? (string), companyGroupIds? (number[]), types? (("Auction" | "ConvertibleNote" | "ConvertToEquity" | "Dividend" | "EquityInvestment" | "EquityReceived" | "Extend" | "FutureEquityAgreement" | "Insolvency" | "IPO" | "LimitedAuction" | "OptionsReceived" | "OtherExit" | "OtherInvestment" | "OtherRealization" | "Payback" | "Proprietary" | "TradeSale" | "ValuationChange" | "WriteOff")[]), priorTo? (string)
   * Returns: TransactionsGetCompanyTransactionsResponse
   */
  getCompanyTransactions(id: number, query?: TransactionsGetCompanyTransactionsQuery, init?: RequestOptions): Promise<TransactionsGetCompanyTransactionsResponse>
  /**
   * Get transactions for multiple companies
   * Returns transactions across multiple companies. Each transaction is a typed variant — narrow it via its `type` field. Filter by `companyIds`, `companyGroupIds`, `types`, and `priorTo` (ISO 8601 upper-bound date for a historical snapshot). When `companyIds` is provided, the caller must have transaction read access on every listed company. Ordered by date descending, then id descending.
   * Parameters: query: limit? (number), cursor? (string), companyGroupIds? (number[]), types? (("Auction" | "ConvertibleNote" | "ConvertToEquity" | "Dividend" | "EquityInvestment" | "EquityReceived" | "Extend" | "FutureEquityAgreement" | "Insolvency" | "IPO" | "LimitedAuction" | "OptionsReceived" | "OtherExit" | "OtherInvestment" | "OtherRealization" | "Payback" | "Proprietary" | "TradeSale" | "ValuationChange" | "WriteOff")[]), priorTo? (string), companyIds? (number[])
   * Returns: TransactionsGetTransactionsResponse
   */
  getTransactions(query?: TransactionsGetTransactionsQuery, init?: RequestOptions): Promise<TransactionsGetTransactionsResponse>
}

export interface MetricsNamespace {
  /**
   * Search metric types available to the SDK consumer
   * Returns predefined metric types plus user-defined metric types scoped to the caller — VC group custom types for VC users, company custom types for company users. Each entry carries the metric shape needed to interpret values: `valueType` is `"numeric"` (read `point.value` as a number; may carry `rangeConfig` with min/max/step for ranged metrics) or `"option"` (read `point.optionValue` as a string from `optionConfig.options[]` — this is how boolean / yes-no metrics are encoded, as two options typically labelled "Yes"/"No"). `unit.unit` describes the measurement (`Currency`, `Percentage`, `Number`, time units, ...); `unit.currencyCode` is intentionally null on this endpoint because monetary types resolve their concrete currency per company — call /metrics to receive `unit.currencyCode` populated with each company's native currency, or pass `currency` to convert all monetary metrics to a chosen target. Filter with `nameSearch` (case-insensitive substring on name or `shortName`, OR across an array) to find a few types without paging the whole catalogue — e.g. `nameSearch=["mrr","burn"]`. Ordered by metric type id ascending.
   * Parameters: query: limit? (number), cursor? (string), origin? ("Predefined" | "UserDefined"), nameSearch? (string[])
   * Returns: MetricsGetTypesResponse
   */
  getTypes(query?: MetricsGetTypesQuery, init?: RequestOptions): Promise<MetricsGetTypesResponse>
  /**
   * Create a VC-owned custom metric type
   * Creates a definition only, not company rows. Add the returned type to a metric template to request it from companies. Ownership is derived from the API key user. Numeric, ranged numeric and option metrics are supported; formulas are not.
   * Parameters: body: MetricsCreateTypeBody
   * Returns: MetricsCreateTypeResponse
   */
  createType(body: MetricsCreateTypeBody, init?: RequestOptions): Promise<MetricsCreateTypeResponse>
  /**
   * Deprecated: upsert points for existing metrics across multiple companies
   * @deprecated Use metrics.import; this operation will be removed in a future release.

Deprecated; retained for compatibility and scheduled for future removal. Prefer metrics.import. For existing-row upserts use onConflict=overwrite and provisionMissing=false. Import writes immediately; requires metrics:write, metric-types:read and metric-templates:read; uses period-start dates; returns per-item results and can partially succeed, so inspect success and item statuses. This endpoint retains its existing behavior: companies contains companyId, native currency and metric items selected by type id or exact name/shortName, optionally flavor actual/forecast/budget. Upserts replace existing values. Returns company, metric and point counts. Does not create metric types, rows or template requests; missing rows return 404. VC API-key callers only; metrics:write and metric-value edit access are required for every company. Non-managed companies must explicitly grant investor metric editing. All access, currencies, rows and values are checked before writes begin. Limits: 100 companies, 50 items per company, 1000 items and 10000 points total, 250 points per item. Duplicate companies/rows/periods are rejected. Set exactly one of value or optionValue and the other to null. No deletion or FX conversion. Unexpected persistence failures may leave earlier companies written; replaying the same values is safe.
   * Parameters: body: MetricsWritePointsBatchBody
   * Returns: MetricsWritePointsBatchResponse
   */
  writePointsBatch(body: MetricsWritePointsBatchBody, init?: RequestOptions): Promise<MetricsWritePointsBatchResponse>
  /**
   * Upsert metric points
   * Writes points for one metric instance. Requires metric-value edit access; non-managed companies must explicitly grant investor metric editing. Set exactly one of value or optionValue according to the metric type and set the other field to null.
   * Parameters: path: metricId (number); body: MetricsWritePointsBody
   * Returns: MetricsWritePointsResponse
   */
  writePoints(metricId: number, body: MetricsWritePointsBody, init?: RequestOptions): Promise<MetricsWritePointsResponse>
  /**
   * Delete selected metric points
   * Deletes stored points identified by exact date and timeframe for one metric instance. Missing points are a no-op. Requires metric-value edit access; non-managed companies must explicitly grant investor metric editing. Does not delete the metric row, metric type, template entry, or underlying points of calculated aggregates. Calculated values may still appear on reads when other stored points can be aggregated. Returns remaining stored points within the requested date bounds.
   * Parameters: path: metricId (number); body: MetricsDeletePointsBody
   * Returns: MetricsDeletePointsResponse
   */
  deletePoints(metricId: number, body: MetricsDeletePointsBody, init?: RequestOptions): Promise<MetricsDeletePointsResponse>
  /**
   * Read metric values for accessible companies, grouped by company
   * Row existence does not imply a current investor request: removing template targeting preserves reported data. Use metricTemplates.get and its company/group targeting to inspect request state; entries outside full targeting visibility are omitted, so absence from a restricted template response is not proof of no request. Returns metric data points for companies the caller can access (companies in the caller's VC group portfolio, or the caller's own company for company users). Each entry carries company and metric type references with id and human-readable name. Each point carries both `value` (number, for `valueType === "numeric"`, including ranged numerics constrained by the type's `rangeConfig`) and `optionValue` (string, for `valueType === "option"`, matching one of `metricType.optionConfig.options[].value` — this is how boolean/yes-no metrics report their reading); read whichever matches the metric type's `valueType`. Each entry embeds a metric type *summary* (id, name, shortName, valueType, unit, plus option/range config when relevant); the full definition lives on /metrics/types. Filter by company id, company name substring (`companyNameSearch`), company group, metric type id, metric type name (`metricTypeNames` — case-insensitive exact match on either the full name or the `shortName`, so "MRR" and "MRR - Monthly Recurring Revenue" both work), timeframe, and date range to narrow the response. Pass `currency` (ISO 4217) to FX-convert monetary metrics to that target currency in one call instead of fetching company currencies separately. Use `pointLimit` to keep only the most recent N points per metric (`pointLimit: 1` = latest dated point; set `to` to today to exclude future values) — without it every historical point is returned, which can be very large across a portfolio. Entries are ordered by company id ascending — one entry per company, so `limit` pages whole companies, never partial metric lists.
   * Parameters: body: MetricsSearchBody
   * Returns: MetricsSearchResponse
   */
  search(body: MetricsSearchBody, init?: RequestOptions): Promise<MetricsSearchResponse>
  /**
   * Compare metrics across companies
   * Returns date-aligned rows for one or more metric types across multiple companies. Select metric types with `metricTypeIds` and/or `metricTypeNames` (case-insensitive exact match on name or `shortName`, e.g. "MRR"); several metrics are compared in a single round trip, one entry per metric type in `metricTypeIds` order; name-only selections follow catalogue order. Each row contains one value per company for a given period. Optionally includes period-over-period percentage change. Use `companyIds`, `companyNameSearch`, or `companyGroupIds` to select companies.
   * Parameters: body: MetricsCompareBody
   * Returns: MetricsCompareResponse
   */
  compare(body: MetricsCompareBody, init?: RequestOptions): Promise<MetricsCompareResponse>
  /**
   * Aggregate metrics across portfolio companies
   * Returns aggregated metric values (SUM, AVG, MEDIAN, MIN, MAX, COUNT) across companies for each reporting period. Select metric types with `metricTypeIds` and/or `metricTypeNames` (case-insensitive exact match on name or `shortName`, e.g. "MRR"). Optionally group results by fund (`companyGroupId`) for fund-level breakdowns. MIN, MAX, and COUNT are always computed. SUM, AVG, and MEDIAN are only produced when the metric type enables them in its `summaryAggregationMethods` configuration; otherwise `point.value` is `null` for that aggregation. Every requested metric type the caller can access yields one entry (per fund when grouped) — with an empty `points` array when none of the selected companies has a value for it, so "no data" is explicit rather than a missing row. Ids that match no accessible metric type produce no entry. Select companies with `companyIds`, `companyNameSearch`, or `companyGroupIds`; when those select no company at all the response is an empty list. Ordered by fund id, then in the order the metric types were requested (`metricTypeIds` order; name-resolved types follow the catalogue order).
   * Parameters: body: MetricsAggregateBody
   * Returns: MetricsAggregateResponse
   */
  aggregate(body: MetricsAggregateBody, init?: RequestOptions): Promise<MetricsAggregateResponse>
  /**
   * Import metrics across many companies in one call
   * Preferred multi-company write operation. Every item supplies exactly one of metricTypeId, metricTypeName or createType; never combine selectors. provisionMissing defaults to true; set false for existing-row-only writes. For migration from writePointsBatch use onConflict=overwrite and provisionMissing=false, then handle per-item statuses. Requires metric-value edit access for every company; non-managed companies must explicitly grant investor metric editing. This grant only permits point values, not provisioning metric rows or changing templates. Writes immediately; there is no preview mode. Import a fund in one request: companies contains up to 100 companies, each with its native currency and up to 50 metric items; maximum 1000 items and 10000 points overall. Resolve types by id or exact name, optionally create custom definitions, request missing rows through the VC template, and write actual/forecast/budget points. No instance-id discovery needed. Rejects conflicting stored values unless overwrite is explicit. Access and currency are validated for all companies before writes. Results follow input order and return counts and ids, never point echoes. Each item is atomic; failed items roll back their database changes. The batch can partially succeed: check success and item statuses. Existing targeting is preserved. Dynamic scopes: metric-types:write for type creation, metric-templates:write for template changes. Replays reuse compatible types and skip identical points. Template changes can notify companies after commit; forecast/budget flags affect existing targets and require full targeting access. Dates are period starts. No formulas or forecast intervals.
   * Parameters: body: MetricsImportBody
   * Returns: MetricsImportResponse
   */
  import(body: MetricsImportBody, init?: RequestOptions): Promise<MetricsImportResponse>
  /**
   * Get custom metric type usage
   * Returns template usage and accessible companies with rows referencing this VC-owned custom type. Inaccessible company details are never returned. Deletion checks all references, including those outside the caller visibility.
   * Parameters: path: metricTypeId (number)
   * Returns: MetricsGetTypeUsageResponse
   */
  getTypeUsage(metricTypeId: number, init?: RequestOptions): Promise<MetricsGetTypeUsageResponse>
  /**
   * Delete an unused custom metric type
   * Deletes a VC-owned custom definition only when no company row or template entry references it. Returns 409 when in use. Does not cascade-delete company data or templates. Predefined types cannot be deleted.
   * Parameters: path: metricTypeId (number)
   * Returns: MetricsDeleteTypeResponse
   */
  deleteType(metricTypeId: number, init?: RequestOptions): Promise<MetricsDeleteTypeResponse>
  /**
   * Delete a company metric row and its data
   * Destructively deletes the company row and all child forecast/budget rows and points. Requires company metric DELETE permission and rejects rows or children still requested by any investor with 409. Remove template requests first. Does not delete the metric type or edit a template. Missing rows return 404.
   * Parameters: path: metricId (number)
   * Returns: MetricsDeleteResponse
   */
  delete(metricId: number, init?: RequestOptions): Promise<MetricsDeleteResponse>
}

export interface MetricTemplatesNamespace {
  /**
   * Get the VC metric template
   * Use template targeting to determine which metrics are currently requested from a company. A company row may remain after a request is removed; row existence alone is not request state. Returns the caller VC template and entries whose complete targeting is accessible. Entries define requested metric types, company/group filters and forecast/budget rows. An entry hidden due to wider targeting cannot be replaced by creating another entry for the same type.
   * Returns: MetricTemplatesGetResponse
   */
  get(init?: RequestOptions): Promise<MetricTemplatesGetResponse>
  /**
   * Request a metric through the VC template
   * Creates company metric rows or links existing rows for matching companies, and synchronizes forecast/budget requests. May notify companies. Selectors are OR-combined. Duplicate type entries return 409, never replace existing targeting. all targets the entire VC portfolio and requires a VC admin. Does not write point values.
   * Parameters: path: templateId (string); body: MetricTemplatesCreateEntryBody
   * Returns: MetricTemplatesCreateEntryResponse
   */
  createEntry(templateId: string, body: MetricTemplatesCreateEntryBody, init?: RequestOptions): Promise<MetricTemplatesCreateEntryResponse>
  /**
   * Update a metric template entry
   * Replaces targeting and requested forecast/budget flags. Requires access to both old and new targets. Keep metricTypeId unchanged. Removing companies stops requesting the metric; stored data is preserved. Does not change metric points or the custom type definition.
   * Parameters: path: templateId (string), entryId (string); body: MetricTemplatesUpdateEntryBody
   * Returns: MetricTemplatesUpdateEntryResponse
   */
  updateEntry(templateId: string, entryId: string, body: MetricTemplatesUpdateEntryBody, init?: RequestOptions): Promise<MetricTemplatesUpdateEntryResponse>
  /**
   * Stop requesting a metric through the template
   * Removes the template entry and unlinks this VC from matching company metrics and their forecast/budget rows. Preserves stored actual, forecast and budget data and other investors requests. Empty, unrequested rows may be removed. Does not delete the metric type. Use metrics.delete only for explicit data deletion.
   * Parameters: path: templateId (string), entryId (string)
   * Returns: MetricTemplatesDeleteEntryResponse
   */
  deleteEntry(templateId: string, entryId: string, init?: RequestOptions): Promise<MetricTemplatesDeleteEntryResponse>
}

export interface CompanyReportsNamespace {
  /**
   * List published company reports accessible to the caller (metadata only)
   * Returns lightweight report metadata (id, title, period, publisher company reference). Use GET /company-reports/:id to fetch the full content of a specific report. Visibility is determined by the caller's roles — VC users see reports for managed-portfolio companies, company employees see their own company's reports, portfolio investors see Published reports shared with their visibility groups. Filters narrow the list by company ids, funds (`companyGroupIds`), company name substring (`companyNameSearch`), and reporting period (timeframe + date range). Ordered by reporting period date descending, then id descending by default. Use `sortBy: publishedAt` and `limit: 1` for the most recently published report; publication order can differ from period order.
   * Parameters: query: limit? (number), cursor? (string), sortBy? ("date" | "publishedAt"), companyIds? (number[]), companyGroupIds? (number[]), companyNameSearch? (string[]), timeframe? ("Month" | "Quarter" | "Year"), from? (string), to? (string)
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

export interface RunditClient {
  profiles: ProfilesNamespace
  companies: CompaniesNamespace
  companyGroups: CompanyGroupsNamespace
  positions: PositionsNamespace
  transactions: TransactionsNamespace
  metrics: MetricsNamespace
  metricTemplates: MetricTemplatesNamespace
  companyReports: CompanyReportsNamespace
}

export declare function createClient(options: CreateClientOptions): RunditClient

export declare const routeManifest: {
  profiles: {
    getConfig: { method: "GET"; path: "/profiles/config"; summary: "Get allowed profile field values and labels"; description: "Reference data for directory CRUD: roles, positions, education levels, genders, races and nationalities. Use sections to request only what you need (e.g. [\"roles\",\"positions\"]); omitted or [] returns the complete config. Contains no customer profiles. Use the option value, not its label, when writing."; exampleCall: "client.profiles.getConfig({ sections: ['example'] })"; responseType: "ProfilesGetConfigResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    list: { method: "GET"; path: "/profiles"; summary: "List the founders, management and board directory"; description: "Returns full profile fields for accessible companies, one entry per profile and company. Filter by company ids, funds, company name, person name, recorded roles, firstTimeFounder, position or positions (OR within the array). Filters intersect. firstTimeFounder=false matches recorded No answers only, not unknown answers or non-founders. Omitted roles returns the whole directory. Absence of a role means not recorded, not a verified negative. First-time-founder null means Not specified. Ordered by company id then profile UUID; repeat the original filters when passing the next cursor. Existing legacy free-text values remain readable; format validation applies to supplied write fields."; exampleCall: "client.profiles.list({ limit: 123 })"; responseType: "ProfilesListResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    create: { method: "POST"; path: "/profiles"; summary: "Create a founder, management or board profile"; description: "Creates a directory profile for a company. Requires name, companyId and at least one role or position. Optional fields default to null, including firstTimeFounder. Non-null firstTimeFounder requires the founder role. Uses profiles.getConfig option values. Managed-company and connected-company editing permissions apply."; exampleCall: "client.profiles.create({ companyId: 123, name: 'example' })"; responseType: "ProfilesCreateResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    getOne: { method: "GET"; path: "/profiles/:id"; summary: "Get a full directory profile"; description: "Requires the profile UUID and companyId from a directory entry. Returns all fields in that company context without disclosing other company associations."; exampleCall: "client.profiles.getOne('123', { companyId: 123 })"; responseType: "ProfilesGetOneResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    update: { method: "PATCH"; path: "/profiles/:id"; summary: "Partially update a directory profile"; description: "PATCH semantics: omitted fields are preserved; null clears optional scalar fields, position or firstTimeFounder. Name cannot be cleared. rolesInCompany replaces only the specified company roles; other role fields are preserved when omitted. Removing founder status clears its first-time answer. At least one role or position must remain. companyId must be an existing association. Updates are atomic. Requires edit access to every company association because personal fields are shared."; exampleCall: "client.profiles.update('123', { companyId: 123 })"; responseType: "ProfilesUpdateResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    delete: { method: "DELETE"; path: "/profiles/:id"; summary: "Delete a directory profile"; description: "Permanently deletes the profile and all company role associations. Requires companyId matching the directory entry and delete permission for every associated company. Does not delete a platform user account."; exampleCall: "client.profiles.delete('123', { companyId: 123 })"; responseType: "ProfilesDeleteResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    prepareAvatarUpload: { method: "POST"; path: "/profiles/:id/avatar/uploads"; summary: "Prepare a profile avatar upload"; description: "Returns a short-lived, single-use PUT URL for an existing profile. Accepts JPEG, PNG or WebP, up to 5 MiB and 16 megapixels. The host or client must send the exact raw image bytes to uploadUrl with the returned headers; do not send base64, multipart or JSON, and never forward the Rundit API key. This tool does not read chat attachments or local paths. After uploading, call profiles.completeAvatarUpload with fileUuid. Requires edit access to every company associated with the profile. If the upload is explicitly blocked by the client network policy, explain the restriction and ask the user or their administrator to allowlist the exact hostname from uploadUrl, not a wildcard covering all storage domains. Once access is granted, prepare a fresh upload URL and retry. If policy cannot be changed, suggest uploading through the Rundit UI. Do not assume other upload failures are network restrictions: expired signatures, invalid headers and permission errors require separate diagnosis."; exampleCall: "client.profiles.prepareAvatarUpload('123', { companyId: 123, filename: 'example', filetype: \"image/jpeg\", filesize: 123 })"; responseType: "ProfilesPrepareAvatarUploadResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    completeAvatarUpload: { method: "POST"; path: "/profiles/:id/avatar/uploads/complete"; summary: "Complete and attach a profile avatar upload"; description: "Call after sending raw image bytes to the URL returned by prepareAvatarUpload. Verifies upload ownership, actual size and image contents, then atomically attaches it and replaces the previous avatar. Requires the same uploading user, matching profile/company, and edit access to every associated company. Retrying the currently attached upload is safe. A failed completion preserves the existing avatar. Returns the updated profile and avatarImageUrl. Remove an avatar through profiles.update with avatarImageFileUuid: null."; exampleCall: "client.profiles.completeAvatarUpload('123', { companyId: 123, fileUuid: '123' })"; responseType: "ProfilesCompleteAvatarUploadResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
  }
  companies: {
    getDashboards: { method: "POST"; path: "/companies/dashboards"; summary: "PREFERRED tool for multi-company analysis — full dashboards for many companies in one call"; description: "PREFERRED tool for multi-company analysis. Returns full dashboards (company metadata, positions, metrics with data points, recent transactions, report summaries) for many companies in a single request, grouped per company. Use this instead of looping `GET /companies/:id/dashboard` (the N+1 pattern) whenever the agent needs to look at more than one company — it returns the same shape per company but in one round trip. Typical workflow: resolve company ids (e.g. `GET /companies?nameSearch=[\"acme\",\"beta\"]`), then call this with their `companyIds`. Use `metricTypeIds` or `metricTypeNames` (case-insensitive exact match on full name or `shortName`) to scope the returned metrics. `metricsFrom` (ISO 8601) sets a lower-bound date for metric data points; omit to include all history. `metricsTimeframe` restricts data point granularity to Month, Quarter, or Year. `metricsPointLimit` keeps only the most recent N points per metric (`1` = latest dated point; set `metricsTo` to today to exclude future values) — full histories for many companies add up quickly. `currency` (ISO 4217, required) FX-converts all monetary metrics across the batch. `conversionStrategy` controls which rate is applied: `LATEST_FX_RATE` (default) or `ENTITY_DATE_RATE` (the rate on each point's own date). `transactionLimit` / `reportLimit` cap list sizes per company (defaults: 10 and 5 respectively). Dashboards come back in the order the `companyIds` were requested, so `limit`/`cursor` paging is stable."; exampleCall: "client.companies.getDashboards({ companyIds: [123], currency: 'USD' })"; responseType: "CompaniesGetDashboardsResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    getDashboard: { method: "GET"; path: "/companies/:id/dashboard"; summary: "Get full company dashboard for ONE company"; description: "Returns company metadata, positions per fund, metrics with data points, recent transactions, and report summaries for a single company. For more than one company, prefer POST /companies/dashboards (`companies.getDashboards`) instead — it returns the same payload per company in one call and avoids the N+1 pattern. Takes the same metric options as the batch route: `metricTypeNames` / `metricTypeIds` scope which metrics are included, `metricsTimeframe` picks a granularity, `metricsFrom`, `metricsTo`, and `metricsPointLimit` limit history (`metricsPointLimit: 1` = latest dated point; set `metricsTo` to today for current values — prefer it over `metricsFrom` for \"latest\" reads, since a date lower bound hides values last reported before it). `transactionLimit` and `reportLimit` cap list sizes."; exampleCall: "client.companies.getDashboard(123, { currency: 'USD' })"; responseType: "CompaniesGetDashboardResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    getOne: { method: "GET"; path: "/companies/:id"; summary: "Get one company available to the SDK consumer"; description: "Returns the full company object for a single company. Includes all compact-list fields (id, name, type, currency, website, logo) plus extended metadata: legal name, status, description, vision, address, city, state, country, operating countries, VAT number, founding year, established date, total funding, and accessible fund ids (as `companyGroupIds`). Returns 403 (not 404) both when the company does not exist and when it is outside the caller's access — existence is deliberately not disclosed. Once the request is authenticated and carries the required scope, a 403 on this route therefore means an unknown or inaccessible id; resolve ids via `GET /companies` first. (A missing API key scope also yields 403, with an \"Insufficient API key scopes\" message.)"; exampleCall: "client.companies.getOne(123)"; responseType: "CompaniesGetOneResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    getAll: { method: "GET"; path: "/companies"; summary: "List companies available to the SDK consumer"; description: "Returns the compact form (id, name, currency, type, website, logo) for every company the caller can read. Filter by `companyIds`, `companyGroupIds`, and/or `nameSearch` (case-insensitive substring on display name; accepts an array to resolve multiple companies at once with OR semantics — e.g. `nameSearch=[\"acme\",\"beta\",\"gamma\"]` returns any company whose name contains any of the three substrings). Avoids listing the full portfolio when the agent only knows companies by name. Ordered by company id ascending."; exampleCall: "client.companies.getAll({ limit: 123 })"; responseType: "CompaniesGetAllResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
  }
  companyGroups: {
    getAll: { method: "GET"; path: "/company-groups"; summary: "List funds available to the SDK consumer"; description: "Returns compact fund metadata (id, name, demo flag, color, member company ids). Filter by `companyGroupIds` and/or `nameSearch` (case-insensitive substring on name; accepts an array to resolve multiple groups in one call with OR semantics — e.g. `nameSearch=[\"fund i\",\"fund ii\"]`). Ordered by fund id ascending."; exampleCall: "client.companyGroups.getAll({ limit: 123 })"; responseType: "CompanyGroupsGetAllResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    getOne: { method: "GET"; path: "/company-groups/:id"; summary: "Get one fund available to the SDK consumer"; description: "Returns full fund details. Includes all compact-list fields (id, name, type, currency, logo) plus extended fund metadata: legal name, domicile, management company, GP, vintage year, fund currency, opening and closing dates, legal form, investment policy, fees, regulatory info, and service providers. Also includes the list of member companies the caller can access. Returns 403 (not 404) both when the fund does not exist and when it is outside the caller's access — existence is deliberately not disclosed. Once the request is authenticated and carries the required scope, a 403 on this route therefore means an unknown or inaccessible id; resolve ids via `GET /company-groups` first. (A missing API key scope also yields 403, with an \"Insufficient API key scopes\" message.)"; exampleCall: "client.companyGroups.getOne(123)"; responseType: "CompanyGroupsGetOneResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
  }
  positions: {
    getPortfolioSummary: { method: "GET"; path: "/positions/portfolio/summary"; summary: "Get portfolio summary with positions and key metrics per company"; description: "Returns position data (invested, fair value, multiple, ROI) and latest monthly metrics as of `date` (today by default). One row per company and fund by default; `groupBy: Company` combines selected accessible funds into one row per company. For top 3 companies by fair value use `groupBy: Company`, `sortBy: fairValue`, `sortDirection: desc`, `limit: 3`, `includeMetrics: false`. Sorting happens before pagination; metrics are loaded only for the returned page. Default metrics are MRR, Cash Balance, Headcount, Net Burn Rate, and Runway. Override with `metricTypeNames` or set `includeMetrics: false` to skip metrics entirely. Without a limit all rows are returned and can be large. Default order is company id, then fund id."; exampleCall: "client.positions.getPortfolioSummary({ currency: 'USD' })"; responseType: "PositionsGetPortfolioSummaryResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    getCompanyPositions: { method: "GET"; path: "/positions/companies/:id"; summary: "Get positions for one company"; description: "Returns all fund-level positions for a single company — one entry per fund (`companyGroupId`) that holds a position in the company. Each entry carries invested amount, fair market value, ownership percentage, share counts, multiple, and ROI, all FX-converted to `currency` (ISO 4217, required). Filter by `companyGroupIds` to scope to specific funds. Use `date` (ISO 8601) for a historical snapshot; omit to use the latest available data. Ordered by fund id ascending."; exampleCall: "client.positions.getCompanyPositions(123, { currency: 'USD' })"; responseType: "PositionsGetCompanyPositionsResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    getPortfolioPositions: { method: "GET"; path: "/positions/portfolio"; summary: "Get aggregated portfolio position totals"; description: "Returns a single aggregated position object that sums invested amount, fair market value, ownership percentage, share counts, multiple, and ROI across all accessible companies (optionally filtered by `companyIds` and/or `companyGroupIds` to scope to specific funds). `currency` (ISO 4217, required) converts all monetary values. Use `date` (ISO 8601) for a historical snapshot; omit for the latest available data. For a per-company breakdown instead of a single aggregate, use `GET /positions/portfolio/summary`."; exampleCall: "client.positions.getPortfolioPositions({ currency: 'USD' })"; responseType: "PositionsGetPortfolioPositionsResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
  }
  transactions: {
    getSummary: { method: "GET"; path: "/transactions/summary"; summary: "Get transaction activity summary"; description: "Returns aggregated transaction statistics: total invested, total realized, transaction count, company count, and breakdown by transaction type. Optionally group by period (Month, Quarter, Year). Filter by company, fund (`companyGroupIds`), and date range. Ordered by period ascending."; exampleCall: "client.transactions.getSummary({ currency: 'USD' })"; responseType: "TransactionsGetSummaryResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    getCompanyTransactions: { method: "GET"; path: "/transactions/companies/:id"; summary: "Get transactions for one company"; description: "Returns all transactions for a single company, ordered by date descending then id descending. Each transaction is a typed variant — narrow it via its `type` field. Filter by `companyGroupIds` to scope to a specific fund, `types` to limit to specific transaction kinds, and `priorTo` (ISO 8601) for a historical snapshot. Requires transaction read access on the company."; exampleCall: "client.transactions.getCompanyTransactions(123, { limit: 123 })"; responseType: "TransactionsGetCompanyTransactionsResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    getTransactions: { method: "GET"; path: "/transactions"; summary: "Get transactions for multiple companies"; description: "Returns transactions across multiple companies. Each transaction is a typed variant — narrow it via its `type` field. Filter by `companyIds`, `companyGroupIds`, `types`, and `priorTo` (ISO 8601 upper-bound date for a historical snapshot). When `companyIds` is provided, the caller must have transaction read access on every listed company. Ordered by date descending, then id descending."; exampleCall: "client.transactions.getTransactions({ limit: 123 })"; responseType: "TransactionsGetTransactionsResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
  }
  metrics: {
    getTypes: { method: "GET"; path: "/metrics/types"; summary: "Search metric types available to the SDK consumer"; description: "Returns predefined metric types plus user-defined metric types scoped to the caller — VC group custom types for VC users, company custom types for company users. Each entry carries the metric shape needed to interpret values: `valueType` is `\"numeric\"` (read `point.value` as a number; may carry `rangeConfig` with min/max/step for ranged metrics) or `\"option\"` (read `point.optionValue` as a string from `optionConfig.options[]` — this is how boolean / yes-no metrics are encoded, as two options typically labelled \"Yes\"/\"No\"). `unit.unit` describes the measurement (`Currency`, `Percentage`, `Number`, time units, ...); `unit.currencyCode` is intentionally null on this endpoint because monetary types resolve their concrete currency per company — call /metrics to receive `unit.currencyCode` populated with each company's native currency, or pass `currency` to convert all monetary metrics to a chosen target. Filter with `nameSearch` (case-insensitive substring on name or `shortName`, OR across an array) to find a few types without paging the whole catalogue — e.g. `nameSearch=[\"mrr\",\"burn\"]`. Ordered by metric type id ascending."; exampleCall: "client.metrics.getTypes({ limit: 123 })"; responseType: "MetricsGetTypesResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    createType: { method: "POST"; path: "/metrics/types"; summary: "Create a VC-owned custom metric type"; description: "Creates a definition only, not company rows. Add the returned type to a metric template to request it from companies. Ownership is derived from the API key user. Numeric, ranged numeric and option metrics are supported; formulas are not."; exampleCall: "client.metrics.createType({ name: 'example', valueType: \"numeric\", aggMethod: \"SUM\", summaryAggregationMethods: [\"SUM\"] })"; responseType: "MetricsCreateTypeResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    writePointsBatch: { method: "PUT"; path: "/metrics/points"; summary: "Deprecated: upsert points for existing metrics across multiple companies"; description: "@deprecated Use metrics.import; this operation will be removed in a future release.\n\nDeprecated; retained for compatibility and scheduled for future removal. Prefer metrics.import. For existing-row upserts use onConflict=overwrite and provisionMissing=false. Import writes immediately; requires metrics:write, metric-types:read and metric-templates:read; uses period-start dates; returns per-item results and can partially succeed, so inspect success and item statuses. This endpoint retains its existing behavior: companies contains companyId, native currency and metric items selected by type id or exact name/shortName, optionally flavor actual/forecast/budget. Upserts replace existing values. Returns company, metric and point counts. Does not create metric types, rows or template requests; missing rows return 404. VC API-key callers only; metrics:write and metric-value edit access are required for every company. Non-managed companies must explicitly grant investor metric editing. All access, currencies, rows and values are checked before writes begin. Limits: 100 companies, 50 items per company, 1000 items and 10000 points total, 250 points per item. Duplicate companies/rows/periods are rejected. Set exactly one of value or optionValue and the other to null. No deletion or FX conversion. Unexpected persistence failures may leave earlier companies written; replaying the same values is safe."; exampleCall: "client.metrics.writePointsBatch({ companies: [{ companyId: 123, currency: 'USD', items: [{ points: [{ date: '2024-12-31', value: 123, optionValue: null, timeframe: \"Month\" }] }] }] })"; responseType: "MetricsWritePointsBatchResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    writePoints: { method: "PUT"; path: "/metrics/:metricId/points"; summary: "Upsert metric points"; description: "Writes points for one metric instance. Requires metric-value edit access; non-managed companies must explicitly grant investor metric editing. Set exactly one of value or optionValue according to the metric type and set the other field to null."; exampleCall: "client.metrics.writePoints(123, { points: [{ date: '2024-12-31', value: 123, optionValue: null, timeframe: \"Month\" }] })"; responseType: "MetricsWritePointsResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    deletePoints: { method: "DELETE"; path: "/metrics/:metricId/points"; summary: "Delete selected metric points"; description: "Deletes stored points identified by exact date and timeframe for one metric instance. Missing points are a no-op. Requires metric-value edit access; non-managed companies must explicitly grant investor metric editing. Does not delete the metric row, metric type, template entry, or underlying points of calculated aggregates. Calculated values may still appear on reads when other stored points can be aggregated. Returns remaining stored points within the requested date bounds."; exampleCall: "client.metrics.deletePoints(123, { points: [{ date: '2024-12-31', timeframe: \"Month\" }] })"; responseType: "MetricsDeletePointsResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    search: { method: "POST"; path: "/metrics"; summary: "Read metric values for accessible companies, grouped by company"; description: "Row existence does not imply a current investor request: removing template targeting preserves reported data. Use metricTemplates.get and its company/group targeting to inspect request state; entries outside full targeting visibility are omitted, so absence from a restricted template response is not proof of no request. Returns metric data points for companies the caller can access (companies in the caller's VC group portfolio, or the caller's own company for company users). Each entry carries company and metric type references with id and human-readable name. Each point carries both `value` (number, for `valueType === \"numeric\"`, including ranged numerics constrained by the type's `rangeConfig`) and `optionValue` (string, for `valueType === \"option\"`, matching one of `metricType.optionConfig.options[].value` — this is how boolean/yes-no metrics report their reading); read whichever matches the metric type's `valueType`. Each entry embeds a metric type *summary* (id, name, shortName, valueType, unit, plus option/range config when relevant); the full definition lives on /metrics/types. Filter by company id, company name substring (`companyNameSearch`), company group, metric type id, metric type name (`metricTypeNames` — case-insensitive exact match on either the full name or the `shortName`, so \"MRR\" and \"MRR - Monthly Recurring Revenue\" both work), timeframe, and date range to narrow the response. Pass `currency` (ISO 4217) to FX-convert monetary metrics to that target currency in one call instead of fetching company currencies separately. Use `pointLimit` to keep only the most recent N points per metric (`pointLimit: 1` = latest dated point; set `to` to today to exclude future values) — without it every historical point is returned, which can be very large across a portfolio. Entries are ordered by company id ascending — one entry per company, so `limit` pages whole companies, never partial metric lists."; exampleCall: "client.metrics.search({})"; responseType: "MetricsSearchResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    compare: { method: "POST"; path: "/metrics/compare"; summary: "Compare metrics across companies"; description: "Returns date-aligned rows for one or more metric types across multiple companies. Select metric types with `metricTypeIds` and/or `metricTypeNames` (case-insensitive exact match on name or `shortName`, e.g. \"MRR\"); several metrics are compared in a single round trip, one entry per metric type in `metricTypeIds` order; name-only selections follow catalogue order. Each row contains one value per company for a given period. Optionally includes period-over-period percentage change. Use `companyIds`, `companyNameSearch`, or `companyGroupIds` to select companies."; exampleCall: "client.metrics.compare({})"; responseType: "MetricsCompareResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    aggregate: { method: "POST"; path: "/metrics/aggregate"; summary: "Aggregate metrics across portfolio companies"; description: "Returns aggregated metric values (SUM, AVG, MEDIAN, MIN, MAX, COUNT) across companies for each reporting period. Select metric types with `metricTypeIds` and/or `metricTypeNames` (case-insensitive exact match on name or `shortName`, e.g. \"MRR\"). Optionally group results by fund (`companyGroupId`) for fund-level breakdowns. MIN, MAX, and COUNT are always computed. SUM, AVG, and MEDIAN are only produced when the metric type enables them in its `summaryAggregationMethods` configuration; otherwise `point.value` is `null` for that aggregation. Every requested metric type the caller can access yields one entry (per fund when grouped) — with an empty `points` array when none of the selected companies has a value for it, so \"no data\" is explicit rather than a missing row. Ids that match no accessible metric type produce no entry. Select companies with `companyIds`, `companyNameSearch`, or `companyGroupIds`; when those select no company at all the response is an empty list. Ordered by fund id, then in the order the metric types were requested (`metricTypeIds` order; name-resolved types follow the catalogue order)."; exampleCall: "client.metrics.aggregate({ aggregation: \"SUM\" })"; responseType: "MetricsAggregateResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    import: { method: "POST"; path: "/metrics/import"; summary: "Import metrics across many companies in one call"; description: "Preferred multi-company write operation. Every item supplies exactly one of metricTypeId, metricTypeName or createType; never combine selectors. provisionMissing defaults to true; set false for existing-row-only writes. For migration from writePointsBatch use onConflict=overwrite and provisionMissing=false, then handle per-item statuses. Requires metric-value edit access for every company; non-managed companies must explicitly grant investor metric editing. This grant only permits point values, not provisioning metric rows or changing templates. Writes immediately; there is no preview mode. Import a fund in one request: companies contains up to 100 companies, each with its native currency and up to 50 metric items; maximum 1000 items and 10000 points overall. Resolve types by id or exact name, optionally create custom definitions, request missing rows through the VC template, and write actual/forecast/budget points. No instance-id discovery needed. Rejects conflicting stored values unless overwrite is explicit. Access and currency are validated for all companies before writes. Results follow input order and return counts and ids, never point echoes. Each item is atomic; failed items roll back their database changes. The batch can partially succeed: check success and item statuses. Existing targeting is preserved. Dynamic scopes: metric-types:write for type creation, metric-templates:write for template changes. Replays reuse compatible types and skip identical points. Template changes can notify companies after commit; forecast/budget flags affect existing targets and require full targeting access. Dates are period starts. No formulas or forecast intervals."; exampleCall: "client.metrics.import({ companies: [{ companyId: 123, currency: 'USD', items: [{ points: [{ date: '2024-12-31', value: 123, optionValue: null, timeframe: \"Month\" }] }] }] })"; responseType: "MetricsImportResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    getTypeUsage: { method: "GET"; path: "/metrics/types/:metricTypeId/usage"; summary: "Get custom metric type usage"; description: "Returns template usage and accessible companies with rows referencing this VC-owned custom type. Inaccessible company details are never returned. Deletion checks all references, including those outside the caller visibility."; exampleCall: "client.metrics.getTypeUsage(123)"; responseType: "MetricsGetTypeUsageResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    deleteType: { method: "DELETE"; path: "/metrics/types/:metricTypeId"; summary: "Delete an unused custom metric type"; description: "Deletes a VC-owned custom definition only when no company row or template entry references it. Returns 409 when in use. Does not cascade-delete company data or templates. Predefined types cannot be deleted."; exampleCall: "client.metrics.deleteType(123)"; responseType: "MetricsDeleteTypeResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    delete: { method: "DELETE"; path: "/metrics/:metricId"; summary: "Delete a company metric row and its data"; description: "Destructively deletes the company row and all child forecast/budget rows and points. Requires company metric DELETE permission and rejects rows or children still requested by any investor with 409. Remove template requests first. Does not delete the metric type or edit a template. Missing rows return 404."; exampleCall: "client.metrics.delete(123)"; responseType: "MetricsDeleteResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
  }
  metricTemplates: {
    get: { method: "GET"; path: "/metrics/templates"; summary: "Get the VC metric template"; description: "Use template targeting to determine which metrics are currently requested from a company. A company row may remain after a request is removed; row existence alone is not request state. Returns the caller VC template and entries whose complete targeting is accessible. Entries define requested metric types, company/group filters and forecast/budget rows. An entry hidden due to wider targeting cannot be replaced by creating another entry for the same type."; exampleCall: "client.metricTemplates.get()"; responseType: "MetricTemplatesGetResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    createEntry: { method: "POST"; path: "/metrics/templates/:templateId/entries"; summary: "Request a metric through the VC template"; description: "Creates company metric rows or links existing rows for matching companies, and synchronizes forecast/budget requests. May notify companies. Selectors are OR-combined. Duplicate type entries return 409, never replace existing targeting. all targets the entire VC portfolio and requires a VC admin. Does not write point values."; exampleCall: "client.metricTemplates.createEntry('123', { metricTypeId: 123, hasForecast: true, hasBudget: true, companyFilter: [{ type: \"all\" }] })"; responseType: "MetricTemplatesCreateEntryResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    updateEntry: { method: "PUT"; path: "/metrics/templates/:templateId/entries/:entryId"; summary: "Update a metric template entry"; description: "Replaces targeting and requested forecast/budget flags. Requires access to both old and new targets. Keep metricTypeId unchanged. Removing companies stops requesting the metric; stored data is preserved. Does not change metric points or the custom type definition."; exampleCall: "client.metricTemplates.updateEntry('123', '123', { metricTypeId: 123, hasForecast: true, hasBudget: true, companyFilter: [{ type: \"all\" }] })"; responseType: "MetricTemplatesUpdateEntryResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    deleteEntry: { method: "DELETE"; path: "/metrics/templates/:templateId/entries/:entryId"; summary: "Stop requesting a metric through the template"; description: "Removes the template entry and unlinks this VC from matching company metrics and their forecast/budget rows. Preserves stored actual, forecast and budget data and other investors requests. Empty, unrequested rows may be removed. Does not delete the metric type. Use metrics.delete only for explicit data deletion."; exampleCall: "client.metricTemplates.deleteEntry('123', '123')"; responseType: "MetricTemplatesDeleteEntryResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
  }
  companyReports: {
    list: { method: "GET"; path: "/company-reports"; summary: "List published company reports accessible to the caller (metadata only)"; description: "Returns lightweight report metadata (id, title, period, publisher company reference). Use GET /company-reports/:id to fetch the full content of a specific report. Visibility is determined by the caller's roles — VC users see reports for managed-portfolio companies, company employees see their own company's reports, portfolio investors see Published reports shared with their visibility groups. Filters narrow the list by company ids, funds (`companyGroupIds`), company name substring (`companyNameSearch`), and reporting period (timeframe + date range). Ordered by reporting period date descending, then id descending by default. Use `sortBy: publishedAt` and `limit: 1` for the most recently published report; publication order can differ from period order."; exampleCall: "client.companyReports.list({ limit: 123 })"; responseType: "CompanyReportsListResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
    getOne: { method: "GET"; path: "/company-reports/:id"; summary: "Fetch the full content of a single company report"; description: "Returns the report metadata plus structured sections (text/markdown/image) and attachments with pre-signed URLs. Returns 404 if the report does not exist and 403 if the caller cannot access it under their role-based permissions."; exampleCall: "client.companyReports.getOne(123)"; responseType: "CompanyReportsGetOneResponse"; pathParams: { name: string; type: string; description: string | null }[]; queryParams: { name: string; type: string; required: boolean; description: string | null }[] }
  }
}
