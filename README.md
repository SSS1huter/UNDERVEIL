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

`images/` 안의 그림은 전부 메타데이터(NovelAI 정보 포함)를 지운 WebP다. `og_*.jpg`는 링크를 공유할 때 뜨는 미리보기 그림(1200×630). 새 그림을 넣을 때도 메타데이터를 지운 뒤 넣는다.

## 폴더

```
index.html  factions.html  personnel.html  valer.html  persona.html
assets/css/   site.css  (tailwind + animate + 사이트 전용 스타일을 합쳐 안 쓰는 규칙을 걷어내고 압축한 것)
assets/js/    veil.js   (압축본)
assets/fonts/ Pretendard: pretendard-site.woff2(사이트에 쓰인 글자) · pretendard-ks.woff2(자주 쓰는 한글 나머지, 입력할 때만 내려받음) / Noto Serif
images/       그림 (WebP) · 공유 미리보기(og_*.jpg)
```

CSS·JS·HTML은 압축본이라 여기서 직접 고치기보다 원본에서 고친 뒤 다시 만든다. 압축 전 원본은 커밋 `54b94e8`까지의 기록에 남아 있다.

공유 미리보기 주소는 `https://sss1huter.github.io/UNDERVEIL/` 기준이다. 주소가 바뀌면(개인 도메인 등) 각 페이지의 `og:url` · `og:image` · `canonical`도 바꿔야 한다.
