export type BusinessInfoKey =
  | "tradeName"
  | "representative"
  | "industry"
  | "businessForm"
  | "established"
  | "location"
  | "contact";

export type BusinessServiceId = "web-dev" | "consulting" | "contract";

export const businessInfoKeys: BusinessInfoKey[] = [
  "tradeName",
  "representative",
  "industry",
  "businessForm",
  "established",
  "location",
  "contact",
];

export const businessServiceIds: BusinessServiceId[] = [
  "web-dev",
  "consulting",
  "contract",
];

export const businessContactEmail = "yuisei.work@gmail.com";
