# VALER WORLD

발레르 월드 세계관 사이트. 빌드 과정 없이 HTML 파일 그대로 올리면 되는 정적 사이트.

## 페이지

| 파일 | 내용 |
|---|---|
| `index.html` | 메인: 훅, LONDON 렌즈, 거울 스카이라인, 언더베일 설명, 세계관·캐릭터 입구 |
| `world.html` | 세계관: 하우스 아스타로트, 언더베일의 3진영(베일워드 / 언바운드 / 언스원) |
| `characters.html` | 캐릭터: 인물 목록, 발레르(표지, 프로필, 아스토라스, 이면의 사람들, 도입부, 추천 페소, 페소 양식, 코멘트) |

## GitHub Pages에 올리기

1. GitHub에서 새 저장소를 만든다 (예: `valer-world`).
2. 이 폴더 안의 파일을 **전부** 저장소 맨 위에 올린다. `index.html`이 저장소 첫 화면에 보여야 한다.
   `.nojekyll` 파일도 같이 올린다. 숨김 파일이라 안 보이면 업로드 창에 폴더째 끌어다 놓으면 된다.
3. 저장소 **Settings → Pages → Build and deployment**에서 Source를 `Deploy from a branch`, Branch를 `main` / `(root)`로 두고 Save.
4. 1~2분 뒤 `https://<아이디>.github.io/valer-world/` 주소로 열린다.

## 이미지 넣기

- **표지 인물 사진**: `images/portrait.jpg` 이름으로 넣으면 캐릭터 페이지 표지에 자동으로 들어간다. 세로 컷 권장. 사진이 있으면 "인물 이미지 · 세로 표지 컷" 안내 글자는 저절로 사라진다.
- 얼굴컷·장면 컷 자리(베네딕트, 엔조, 루시퍼, 도입부 1·2)는 지금 점선 칸이다. 이미지가 생기면 해당 칸을 바꾸면 된다.

## 폴더

```
index.html  world.html  characters.html
assets/css/   tailwind.css (원본 클래스) · animate.min.css · site.css (사이트 전용)
assets/js/    site.js (스크롤 등장, 표지 플래시)
assets/fonts/ Pretendard, Noto Serif (사이트에 직접 포함)
images/       문장·인장·텍스처 등
```

폰트 라이선스: Pretendard, Noto Serif 모두 SIL Open Font License 1.1.
