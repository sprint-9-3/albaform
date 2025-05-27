# 🚀 알바 지원은 쉽고 빠르게! Albaform!
## https://albaform-five.vercel.app/
![대표](https://github.com/user-attachments/assets/6b62a4cb-a645-430a-ac82-3d117d53fe17)

## 💁‍♂️ 소개
Albaform은 쉽고 빠르게 공고를 등록하고 지원할 수 있는 긱워커 플랫폼입니다. </br>
기존에 다른 플랫폼과 차별점으로 두는 것은 복잡한 UI를 과감히 배제했고, </br>
본질에 집중한 심플한 설계로 공고 모집과 지원 과정을 혁신적으로 간소화했습니다. </br>
</br>
- 제작기간: 2024. 11. 21 ~ 2024. 12. 28
- 제작 인원: 4명
- 역할
    - 정준영(팀장) : 랜딩페이지, 헤더 및 사이드바, 알바폼 상세페이지, 내 지원 상세페이지, react-calender 작업, 간편 로그인 및 회원가입
    - 전상민 : 알바토크 페이지, 지원하기 페이지, 마이페이지, 공통 모달 작업
    - 문창기 : 로그인 및 회원가입, 알바폼만들기 페이지, 알바폼수정하기 페이지, 공통 드롭다운 작업, 미들웨어 및 인스턴스 작업
    - 정우영 : 알바 목록 페이지, 알바토크 글쓰기 페이지, 알바토크 상세 보기 페이지, 내 알바폼 페이지, 공통 버튼 및 공통 토스트 작업

## 👥 팀원

| 문창기 | 정준영 | 전상민 | 정우영 | 
| :---: | :---: | :---: | :---: |
|<img src="https://avatars.githubusercontent.com/u/126491953?v=4" width="100" height="100">|<img src="https://avatars.githubusercontent.com/u/81373171?v=4" width="100" height="100">|<img src="https://avatars.githubusercontent.com/u/174448906?v=4" width="100" height="100">|<img src="https://avatars.githubusercontent.com/u/79072510?v=4" width="100" height="100">|
|<a href="https://github.com/byeolee1221">byeolee1221</a>|<a href="https://github.com/junjeeong">junjeong</a>|<a href="https://github.com/venise5224">venise5224</a>|<a href="https://github.com/wooy0">wooy0</a>|

## 📂 시작 가이드
### 요구사항
  * bun 1.1.31
  * jotai 2.10.3
  * js-cookie 2.2.1
  * next 15.0.3
  * react 19.0.0-rc
  * react-calendar 5.1.0
  * react-hook-form 7.53.2
  * zod 3.23.8

### 설치
```
$ git clone https://github.com/sprint-9-3/albaform.git albaform
$ cd albaform
$ bun install
$ bun run dev
```

## 🛠️ 주요 기능 

### 1️⃣ 지원자와 사장님으로 구분된 회원가입

- 구직자와 구인자별로 서로 다른 전용페이지 접근, 서비스 분기처리를 위해 지원자와 사장님으로 구분하여 회원가입을 할 수 있습니다.
- 카카오 간편로그인을 통해 카카오의 정보를 사용하여 편리하게 회원가입을 할 수도 있습니다.

### 2️⃣ 알바폼 만들고 구직자 지원받기

- 알바정보를 담은 알바폼을 작성하여 알바 구직자에게 노출시켜 지원받을 수 있습니다.
- 지원자가 생기면 알바폼에서 지원내역을 확인하여 이력서를 받아 확인할 수 있습니다.
- 지원자에게 진행결과를 모달을 통해 손쉽게 통지할 수 있습니다.

### 3️⃣ 알바폼 지원하기

- 구직자는 무한스크롤로 구현된 알바목록에서 원하는 알바를 찾아서 쉽게 지원할 수 있습니다.
- 지원하지 않고 관심있는 알바를 스크랩하여 모아두고 원할 때 지원할 수 있습니다.

### 4️⃣ 알바토크

- 회원들끼리 알바와 관련하여 여러가지 정보를 공유할 수 있는 서비스입니다.
- 무한스크롤로 구현되어 있어 여러 게시글들을 편하게 볼 수 있으며, 심플한 UI로 회원들과 손쉽게 정보 공유를 할 수 있습니다.

### 5️⃣ 카카오맵 API를 연동한 가게위치 표출

- 가게위치를 단순히 글자로만 위치를 검색하는 것보다, 카카오맵을 통해 시각적으로 위치를 확인하여 정확한 위치를 알릴 수 있도록 하여 사용자 경험을 향상시키려고 했습니다.
- 구직자도 시각적인 위치 확인을 통해 보다 정확하고 신속하게 가게를 찾아갈 수 있습니다.

## 👨‍💻 기술스택

<img src="https://github.com/user-attachments/assets/7fbce4f3-dbf9-42ea-abd5-34fea333eeff" width="12%" height="12%"> &nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/user-attachments/assets/bc73becf-117b-473c-ac99-25e7076f54f6" width="10%" height="10%"> &nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/user-attachments/assets/6d770581-15e8-405e-81d3-7e0e7451a2f2" width="12%" height="12%"> &nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/user-attachments/assets/c35c92b2-2070-4196-8964-c84864fae752" width="10%" height="10%"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/user-attachments/assets/91820898-62f6-4965-9a84-047bbcae7598" width="10%" height="10%"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/user-attachments/assets/00d84e07-3e18-4a82-b147-bd0d4330f350" width="10%" height="10%"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/user-attachments/assets/467d8a77-1e28-4c6d-9bc6-b7e520b8551c" width="10%" height="10%"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/user-attachments/assets/71f4bfa2-6088-4c7e-bdf5-feaedf850233" width="9%" height="9%"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/user-attachments/assets/f38e0e0e-78e7-4602-bbea-03f277f9497f" width="12%" height="12%"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/user-attachments/assets/3d567d52-2883-450b-ac3f-d124bbc79689" width="9%" height="9%"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/user-attachments/assets/4eeacf3f-e690-43b3-aa52-18c8646497a5" width="12%" height="12%"> 
<img src="https://github.com/user-attachments/assets/6266651b-3fe4-4dcb-ae77-1c05da773eac" width="14%" height="14%">

## 🎥 시연 영상

### 랜딩페이지
<img src="https://github.com/user-attachments/assets/9ab3fa78-0391-4c4d-837e-962448b5de80" alt="랜딩페이지" width="600" />

### 로그인
<img src="https://github.com/user-attachments/assets/c303ff1a-8b86-4242-9c59-fd11ffc3e604" alt="로그인 - 지원자" width="600" />

### 회원가입
<img src="https://github.com/user-attachments/assets/ed421eb7-efbb-472b-8379-570f26ecc458" alt="회원가입 - 지원자" width="600" />

### 알바 목록페이지
<img src="https://github.com/user-attachments/assets/942b6b5d-5b87-48d9-ad7c-39e80f37f2fd" alt="알바목록 페이지" width="600" />

### 알바 목록 상세 페이지
<img src="https://github.com/user-attachments/assets/2228800c-aa4e-4ccd-9887-39b60ad0e142" alt="알바 상세 페이지" width="600" />

### 알바 토크 페이지
<img src="https://github.com/user-attachments/assets/493ddd9a-7dda-4c10-9a76-b04c62671e76" alt="알바 토크 페이지" width="600" />

### 알바 토크 상세 페이지
<img src="https://github.com/user-attachments/assets/eac6052c-bd02-4499-bd3c-de2f9262eb26" alt="알바-토크-상세페이지" width="600" />

### 알바 토크 글쓰기
<img src="https://github.com/user-attachments/assets/63db5284-1691-4a3e-89f0-6c2803a6b7d1" alt="알바토크 글쓰기" width="600" />

### 내 알바폼
<img src="https://github.com/user-attachments/assets/5a90dd32-708c-44ba-a4c2-6276a7d92648" alt="내 알바폼" width="600" />

### 마이 페이지
<img src="https://github.com/user-attachments/assets/79bbb351-dda4-471a-8cd3-c9c1409bdd0a" alt="마이페이지" width="600" />

### 알바폼 만들기 페이지
<img src="https://github.com/user-attachments/assets/3d6da416-2db3-4039-ba89-bae8ed7c7b39" alt="알바폼-만들기" width="600" />

### 지원하기 페이지
<img src="https://github.com/user-attachments/assets/306c98c5-59c2-4ab4-a1bb-86a0d5427204" alt="지원하기" width="600" />

