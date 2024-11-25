// tailwind 동적 스타일을 위한 함수
export const cls = (...cls: string[]) => {
  return cls.join(" ");
};
