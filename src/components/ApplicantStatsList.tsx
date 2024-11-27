interface ApplicantData {
  applicantId: number;
  updatedAt: string;
  createdAt: string;
  status: "REJECTED" | "INTERVIEW_PENDING" | "INTERVIEW_COMPLETED" | "HIRED";
  introduction: string;
  resumeName: string;
  resumeId: number;
  experienceMonths: number;
  phoneNumber: string;
  name: string;
  id: number;
}
interface ApplicantListData {
  list: ApplicantData[];
}

const ApplicantStatsList = ({ list }: ApplicantListData) => {
  return (
    <table>
      <thead>
        <tr>
          <th>이름</th>
          <th>전화번호</th>
          <th>경력</th>
          <th>상태</th>
        </tr>
      </thead>
      <tbody className="text-black-4 text-md">
        {list.map((el) => (
          <tr key={el.applicantId}>
            <td className="underline">{el.name}</td>
            <td>{el.phoneNumber}</td>
            <td>{el.experienceMonths}</td>
            <td>{el.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApplicantStatsList;
