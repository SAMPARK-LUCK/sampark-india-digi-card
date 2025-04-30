
export interface CardInfo {
  id?: string;
  employeeCode: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  bio: string;
  theme: string;
  profilePicture: string | null;
  companyLogo: string | null;
  isActive?: boolean;
  lastUpdated?: string;
}

export type CardCollection = {
  [employeeCode: string]: CardInfo;
};
