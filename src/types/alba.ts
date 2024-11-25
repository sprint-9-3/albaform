export interface AppliedAlbaData {
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
  id: number;
}
