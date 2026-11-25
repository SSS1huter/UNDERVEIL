# VEILWARD — The Underveil Archive

베일워드 세계관 사이트. 빌드 과정 없이 HTML 파일 그대로 올리는 정적 사이트(GitHub Pages).

## 페이지

| 파일 | 내용 |
|---|---|
| `index.html` | 언더베일: 프롤로그, 훅·렌즈·수면 아래로, 분류(인외·하우스·각성자), 게이트, 요정길 |
| `factions.html` | 세력: 관계도, 베일워드(조직 구조도, 하우스), 언바운드, 언스원 |
| `personnel.html` | 인물 명부: 카드를 누르면 파일 창. 지금은 발레르만 공개, 나머지는 봉인 |
| `valer.html` | 발레르 모르베인 소개 (표지 · 프로필 · 아스토라스 그룹) |
| `persona.html` | 페소 만들기: 페소 양식 항목을 채우면 바로 완성, 복사 |

## GitHub Pages

저장소 **Settings → Pages → Build and deployment**에서 Source를 `Deploy from a branch`, Branch를 `main` / `(root)`로 두고 Save. 1~2분 뒤 `https://sss1huter.github.io/UNDERVEIL/`로 열린다. `.nojekyll`은 지우지 않는다.

## 이미지

`images/` 안의 그림은 전부 메타데이터(NovelAI 정보 포함)를 지운 파일이다. 새 그림을 넣을 때도 지운 뒤 넣는다.

## 폴더

```
index.html  factions.html  personnel.html  valer.html  persona.html
assets/css/   tailwind.css · animate.min.css · veil.css (사이트 전용)
assets/js/    veil.js
assets/fonts/ Pretendard(동적 서브셋) · Noto Serif
images/       그림
```
