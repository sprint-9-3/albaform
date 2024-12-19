export interface AppliedAlbaData {
  id: number;
  updatedAt: string;
  createdAt: string;
  status: string;
  resumeName: string;
  resumeId: number;
  form: {
    owner: {
      imageUrl: string;
      storeName: string;
      id: number;
    };
    recruitmentEndDate: string;
    recruitmentStartDate: string;
    description: string;
    title: string;
    id: number;
  };
}

export interface AlbarformData {
  updatedAt: string;
  createdAt: string;
  isPublic: boolean;
  scrapCount: number;
  applyCount: number;
  imageUrls: string[];
  recruitmentEndDate: string;
  recruitmentStartDate: string;
  title: string;
  id: number;
}

export interface AlbaformDetailData {
  updatedAt: string;
  createdAt: string;
  preferred: string;
  age: string;
  education: string;
  gender: string;
  numberOfPositions: number;
  isPublic: boolean;
  hourlyWage: number;
  isNegotiableWorkDays: boolean;
  workDays: string[];
  workEndTime: string;
  workStartTime: string;
  workEndDate: string;
  workStartDate: string;
  location: string;
  imageUrls: string[];
  recruitmentEndDate: string;
  recruitmentStartDate: string;
  description: string;
  title: string;
  ownerId: number;
  id: number;
  scrapCount: number;
  applyCount: number;
  isScrapped: boolean;
  phoneNumber: string;
  storePhoneNumber: string;
  storeName: string;
}
