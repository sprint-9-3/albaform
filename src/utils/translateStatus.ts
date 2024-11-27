const translateStatus = (
  status: "REJECTED" | "INTERVIEW_PENDING" | "INTERVIEW_COMPLETED" | "HIRED"
) => {
  switch (status) {
    case "REJECTED":
      return "거절";
    case "INTERVIEW_PENDING":
      return "면접 대기";
    case "INTERVIEW_COMPLETED":
      return "면접 완료";
    case "HIRED":
      return "채용 완료";
    default:
      return "";
  }
};

export default translateStatus;
