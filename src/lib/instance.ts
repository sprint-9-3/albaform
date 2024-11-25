import Cookies from "js-cookie";

// 요청 시 사용하여 토큰 확인 및 갱신, 재요청까지 처리할 수 있는 함수입니다.
// 토큰이 필요한 요청을 할 때 fetch 대신 instance를 사용합니다.
const instance = async (url: string, options: RequestInit = {}) => {
  const accessToken = Cookies.get("accessToken");

  if (accessToken) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  let response = await fetch(url, { ...options });

  if (response.status === 401) {
    const refreshToken = Cookies.get("refreshToken");

    if (refreshToken) {
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        {
          method: "POST",
          body: JSON.stringify({ refreshToken }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (refreshResponse.ok) {
        const tokenData = await refreshResponse.json();
        const { accessToken: newAccessToken } = tokenData;

        Cookies.set("accessToken", newAccessToken);

        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        response = await fetch(url, { ...options });
      } else {
        console.error("토큰갱신 실패");
        throw new Error("장시간 미활동으로 인해 로그인이 해제되었습니다.");
      }
    }
  }

  if (!response.ok) {
    console.error("요청 실패", response.statusText, response.status);
    throw new Error("요청 실패");
  }

  return await response.json(); // 각 요청의 응답을 json으로 반환합니다.
};

export default instance;
