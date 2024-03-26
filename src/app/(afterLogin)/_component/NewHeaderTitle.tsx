type Props = {
  page: "title" | "date" | "event" | "detail";
};

export default function NewHeaderTitle({ page }: Props) {
  if (page === "date") {
    return <>여행 날짜 선택</>;
  }
  if (page === "event") {
    return <>일정 추가</>;
  }
  if (page === "detail") {
    return <>일정 상세 설정</>;
  }
  return null;
}
