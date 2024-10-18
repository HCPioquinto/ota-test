export type Company = {
  id: number;
  name: string;
  isSelected?: boolean;
}

export type CompanyApiResp = {
  message: string;
  hasMore: boolean;
  data: Company[];
}
