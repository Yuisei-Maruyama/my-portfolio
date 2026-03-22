# CLAUDE.md — my-portfolio

## Role

あなたは**フロントエンドのシニアエンジニア**として作業すること。
実装は常に **Next.js の最適解**（App Router, Server Components, next/image, next/font, dynamic imports 等）で行うこと。

---

## 必須スキルルール

> **CRITICAL**: 以下のルールは全作業において最優先で適用すること。例外なし。

### RULE: UI/UX 新規作成・大幅変更時は `/frontend-design` スキルを必ず使用する

```
TRIGGER (以下のいずれかに該当する場合、MUST 実行):
  - 新しいコンポーネント / セクション / ページを作成する
  - 既存コンポーネントのビジュアルデザインを大幅に変更する
  - 新しい UI パターン（カード・フォーム・モーダル・アニメーション等）を追加する
  - レイアウト / グリッド構造を設計・再設計する

ACTION (トリガー条件に一致したら):
  Step 1: Skill ツールで skill="frontend-design" を呼び出す（/frontend-design と同義）
  Step 2: スキルの出力に従ってデザインを生成する
  Step 3: このプロジェクトのデザインシステム（Liquid Chrome テーマ、tailwind.md のトークン）に適合させる

MUST NOT:
  - スキルを呼び出さずに UI コードを直接書き始めること
  - スキル呼び出し前にコンポーネントの JSX / CSS を実装すること
```

**スキップ可能なケース（例外）:**
- 既存コンポーネントの誤字・文言修正のみ
- CSS の色・余白など1〜2行の微調整
- データ層（`src/data/`, `src/messages/`）のみの変更

---

## Project Overview

丸山唯成（Yuisei Maruyama）のポートフォリオサイト。水銀リキッド/鏡面反射テイストのデザイン。

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (strict)
- **CSS**: TailwindCSS 4 + CSS custom properties
- **i18n**: next-intl（日本語デフォルト + 英語、`localePrefix: "as-needed"`）
- **Animation**: Framer Motion（`MotionConfig reducedMotion="user"` でアクセシビリティ対応）
- **Icons**: react-icons
- **Package Manager**: pnpm
- **Runtime**: mise (Node.js 22)

## Design System

> **全実装で `tailwind.md` を参照すること。** デザイントークン（colors, fonts, spacing, borderRadius, letterSpacing, boxShadow, animation）の完全なリファレンスは [`tailwind.md`](./tailwind.md) に集約されている。ハードコード値ではなく、必ずトークンを使用すること。

### Colors

| Token | Value | Usage |
|---|---|---|
| `bg-primary` | `#09090B` | メイン背景（ほぼ真黒） |
| `bg-surface` | `#111114` | セクション背景 |
| `bg-card` | `#18181B` | カード背景 |
| `silver` | `#C0C0C8` | メインアクセント |
| `silver-light` | `#E8E8EC` | 明るいシルバー |
| `silver-bright` | `#F5F5F7` | 鏡面ハイライト |
| `silver-dim` | `#6B6B78` | 控えめシルバー |
| `text-primary` | `#EDEDF0` | メインテキスト |
| `text-secondary` | `#9898A1` | サブテキスト（WCAG AA 4.68:1） |
| `text-muted` | `#52525B` | 装飾テキスト専用（`aria-hidden` 要素のみ） |

### Typography

| Font | Variable | Usage |
|---|---|---|
| Dosis | `--font-dosis` | Hero名前（YUISEI MARUYAMA）のみ |
| Syne | `--font-display` / `--font-heading` | Display + 見出し（統一） |
| Geist Mono | `--font-mono` / `--font-body` | 本文、コード、ラベル |

### Design Concept: Liquid Chrome（リキッドクローム）

液体クロームのような、重厚で立体的な金属テクスチャ。

#### 質感の定義
- **3D 重厚感**: 文字が厚みを持った金属ブロックのように見える。下方向に8層の text-shadow を重ね、上方光源の立体感を表現
- **スペキュラーハイライト**: グラデーションの中に鋭い白色ピーク（#ffffff）を配置。暗部（#0a0a14）との急激な遷移で、磨かれたクロームの光の集中を再現
- **クロマティックエッジ**: 文字輪郭に沿った虹色スペクトル（赤・シアン・バイオレット・ゴールド）。クロームの曲面で光が分光する現象を模倣
- **液体感**: 背景にオーガニックなコースティクス（楕円形の radial-gradient が緩やかに漂流）。グリッドのような人工的パターンではなく、液体金属の表面張力を感じさせる有機的な光の揺らぎ

#### 色彩設計
- **背景**: 深い黒（#09090B）。グリッドは使用しない
- **テキスト中央部**: 深い黒（#0a0a14）→ メタリックハイライト（#ffffff）の急激な遷移を2か所配置
- **テキスト影**: 上方光源を想定。下方向に暗い金属色（#2a2a3e → #08080e）の階段状グラデーション
- **テキスト輪郭**: 4方向に異なる色のスペクトル（drop-shadow）
- **オーブ**: 銀色の radial-gradient。中心が明るく端が急速に透明になる（表面張力を表現）
- **マウスエフェクト**: 中心に白いスペキュラースポット + 周囲にリング状のクロマティックフリンジ

#### 印象
高級感、未来的、ミステリアス、重厚

### Design Principles

- **Mercury Text (2層アーキテクチャ)**: ベース要素に solid color + 8層 text-shadow（3D影）、`::before` 疑似要素に 170deg クロームシリンダー鏡面グラデーション + カーソル追従スペキュラーハイライト（`radial-gradient` + CSS custom properties `--specular-x/y`）+ `background-clip: text`。`data-text` 属性で `content: attr(data-text)` を使用。YUISEI + MARUYAMA 両方に適用。フォントは Dosis:800（ExtraBold）。**PC のみ（≥1024px）**: ホバーした文字が個別に重力で落下（Framer Motion spring 物理: mass 2.5, stiffness 120, damping 14）+ 文字ごとに異なる回転（タンブル）。**スタッキング物理**: 先に落ちた文字は底、後の文字はその上に積み上がる（`STACK_COMPRESSION: 0.6` + jitter）。**プロフィールリビール**: 文字が落ちた跡地にプロフィール情報（Born/From/Interests）が `clipPath` アニメーションでリキッドに出現（3文字=Born, 6文字=From, 9文字=Interests）。`prefers-reduced-motion` 環境では MotionConfig により自動無効化
- **Mirror Card**: 強い金属光沢ボーダー + ホバー時に反射光スイープ + ベベルド金属プレート感（inset shadow）
- **Section Line**: 高輝度メタリックスイープ + 中心にシャープなスペキュラーピーク
- **Mercury Caustics**: 背景にオーガニックな楕円形 radial-gradient が緩やかに漂流するコースティクスパターン（グリッド不使用）
- **Liquid Orbs**: 高不透明度の銀色球体 + クロマティックティント + 表面張力感（中心40%フォールオフ）
- **Mouse Effect**: 白いスペキュラースポット（中心） + クロマティックフリンジ（ドーナツ型リング）
- **Restraint**: mercury-text はHero名前（YUISEI + MARUYAMA）のみ適用。他要素は金属光沢で統一

## Directory Structure

```
src/
├── app/
│   ├── globals.css          # Design system CSS + utilities
│   └── [locale]/
│       ├── layout.tsx       # Root layout (fonts, metadata, i18n, MotionProvider)
│       ├── page.tsx         # Home page (dynamic imports for below-fold)
│       └── sitemap.ts       # SEO sitemap generation (multi-lang)
├── components/
│   ├── MotionProvider.tsx   # Framer Motion reduced-motion wrapper
│   ├── LanguageSwitcher.tsx # JA/EN locale toggle
│   ├── Header.tsx           # Fixed nav (Syne font, numbered links, lang switcher)
│   ├── Hero.tsx             # Mercury text name + interactive orbs + mouse gradient
│   ├── About.tsx            # Bio card (translated)
│   ├── Skills.tsx           # Skill icon grid (4 categories: frontend/backend/tools/infra)
│   ├── Career.tsx           # Vertical timeline (translated)
│   ├── Works.tsx            # File-browser style project cards (translated)
│   ├── Contact.tsx          # GitHub, note, Instagram, Email
│   └── Footer.tsx           # Minimal footer (translated)
├── data/
│   ├── career.ts            # Career timeline data (id-based, text in messages)
│   ├── skills.ts            # Skills with icons (no levels)
│   └── works.ts             # Project showcase data (id-based, text in messages)
├── i18n/
│   ├── routing.ts           # Locale config (ja default, en)
│   ├── request.ts           # Server-side getRequestConfig
│   └── navigation.ts        # createNavigation (Link, useRouter, etc.)
├── lib/
│   ├── constants.ts         # Nav items, site config, FADE_IN animation
│   └── hooks.ts             # useMousePosition (rAF throttled)
├── messages/
│   ├── ja.json              # Japanese translations
│   └── en.json              # English translations
└── middleware.ts            # next-intl locale detection & redirect
```

## Commands

```bash
make dev        # Start dev server
make build      # Production build
make lint       # ESLint
make typecheck  # TypeScript check
make clean      # Remove .next and node_modules
```

## Coding Conventions

- 全コンポーネントは**アロー関数**で定義
- `export default` は named const + 末尾 export パターン
- TailwindCSS のカスタムフォントは `font-[family-name:var(--font-xxx)]` 形式
- framer-motion の `ease` プロパティに配列を使わない（型推論問題を回避）
- データは `src/data/` に分離し、コンポーネントから import
- below-fold セクションは `next/dynamic` で遅延読み込み
- `FADE_IN` 定数は `src/lib/constants.ts` で一元管理（重複排除）
- `text-muted` は装飾的テキスト（`aria-hidden="true"`）にのみ使用。情報テキストには `text-secondary` を使用

## Performance

- SSG（全ページ静的生成）
- Dynamic imports for below-fold sections
- `display: "swap"` for all fonts
- CSS-only animations for repeating effects (sweep, pulse, orbs). Mercury text uses cursor-following specular highlight (no keyframe animation)
- Framer Motion は entry animations のみ（`filter: blur` 禁止 — GPU再描画コスト大）
- `scroll-padding-top: 4rem` でアンカーナビゲーション対応

## Accessibility

- `MotionConfig reducedMotion="user"` で Framer Motion アニメーションを `prefers-reduced-motion` に連動
- `@media (prefers-reduced-motion: reduce)` で CSS アニメーション + トランジションを無効化
- `:focus-visible` スタイルを全要素に定義（`outline: 2px solid var(--silver)`）
- 装飾要素に `aria-hidden="true"` を付与（セクション番号、アイコン、区切り線等）
- モバイルメニュー: `aria-expanded`, `aria-controls`, `role="menu"`, `Escape` キー対応
- スキルカード: シンプルなアイコン + 名前のカードグリッド
- 外部リンク: `aria-label` に "(opens in new tab)" を明記
- カラーコントラスト: `text-secondary` (#9898A1) は WCAG AA 4.68:1 on #09090B

## SEO

- `metadataBase` + `alternates.canonical` 設定済み
- JSON-LD Person スキーマ（`description`, `worksFor` 含む）
- `sitemap.ts` による自動 sitemap 生成
- `public/robots.txt` 設置済み
- OGP / Twitter Card メタデータ設定済み
- **TODO**: OGP画像 (`/public/og-image.png`, 1200x630px) を作成して配置

## i18n (next-intl)

- **URL構成**: `/` → 日本語（デフォルト、prefix なし）、`/en` → 英語
- **localePrefix**: `as-needed`（デフォルト locale は prefix なし）
- **翻訳ファイル**: `src/messages/ja.json`, `src/messages/en.json`
- **翻訳対象**: メタデータ、Hero説明、About bio、Career/Works のタイトル・説明・ハイライト、Contact説明、Footer
- **翻訳不要**: 技術名、NAV_ITEMS ラベル、アイコン、期間テキスト
- **データ構造**: career.ts / works.ts は id ベース。テキストは messages JSON に格納し、コンポーネントで `t("key")` / `t.raw("key")` で取得
- **言語切り替え**: Header に `JA / EN` トグル（LanguageSwitcher コンポーネント）

## コンテンツ修正ルール（必須）

このポートフォリオは**面談時に使用する**ため、コンテンツの正確性とアピール力が重要。

### 修正時の手順

1. **必ずユーザーに質問してから修正する**: 曖昧な内容、不明点があれば `AskUserQuestion` で徹底的にクリアにする
2. **具体的な実績を引き出す**: 数値、規模、技術的チャレンジ、成果を確認する
3. **NDA に配慮**: クライアント名は匿名化済み。具体的な社名・サービス名を追加しない
4. **JA/EN 両方を更新**: `src/messages/ja.json` と `src/messages/en.json` は常にセットで修正する
5. **事実のみ記載**: ユーザーが確認していない実績や数値を勝手に追加しない

### 質問すべき項目例

- 技術的な詳細（使用API、アーキテクチャ、ライブラリ）
- チーム規模・役割（リード経験、具体的な責任範囲）
- 成果・数値（パフォーマンス改善率、規模感、公開可否）
- アピールしたいポイント（面談で特に強調したい経験）

## Interactive Background

- **マウス追従グラデーション**: Hero セクションに銀色 radial-gradient オーバーレイ（`useMousePosition` フック）
- **パララックスオーブ**: 既存 CSS animated orbs にマウス位置ベースの translate オフセット（係数 0.02〜0.04）
- **パフォーマンス**: `requestAnimationFrame` でスロットリング、`prefers-reduced-motion` / タッチデバイスで自動スキップ

---

## 品質保証プロセス（必須）

作業完了時に以下の5つの専門家レビューを**サブエージェント**で実施し、指摘された問題を**すべて修正**すること。

### 1. UI/UX デザイナーレビュー

以下の観点で評価し、問題があれば修正:

- **カラーパレット**: シルバーグラデーションの一貫性、WCAG AA コントラスト比 (4.5:1以上)
- **タイポグラフィ**: フォントの組み合わせ、日本語フォールバック、可読性
- **エフェクト品質**: mercury-text, mirror-card, liquid orbs の費用対効果
- **視覚的階層**: 情報優先度がデザインで正しく伝わるか
- **一貫性**: コンポーネント間でデザイン言語が統一されているか
- **レスポンシブ**: モバイルでのタップターゲット (最小44px), レイアウト崩れ

### 2. アクセシビリティスペシャリストレビュー

以下の観点で評価し、問題があれば修正:

- **WCAG 2.1 AA**: 全テキスト/背景のコントラスト比
- **キーボードナビゲーション**: `:focus-visible`, Tab順序, Escape キー対応
- **スクリーンリーダー**: `aria-label`, `aria-hidden`, `role`, セマンティックHTML
- **`prefers-reduced-motion`**: CSS + Framer Motion 両方の対応
- **ランドマークロール**: `<nav aria-label>`, `<main>`, `<footer>`
- **インタラクティブ要素**: `aria-expanded`, `aria-controls`, `role="progressbar"`

### 3. SEO スペシャリストレビュー

以下の観点で評価し、問題があれば修正:

- **メタデータ**: `title`, `description`, `metadataBase`, `canonical`
- **OGP / Twitter Cards**: `images` 含む完全な設定
- **構造化データ**: JSON-LD の正確性（`Person`, `worksFor` 等）
- **sitemap.xml / robots.txt**: 存在と内容の正確性
- **セマンティックHTML**: heading 階層 (h1→h2→h3→h4) の正しさ
- **Core Web Vitals**: LCP, INP, CLS への影響

### 4. フロントエンドエンジニアレビュー

以下の観点で評価し、問題があれば修正:

- **ビルド**: `pnpm build` エラーゼロ
- **旧コード残存**: `grep` で旧テーマ/旧名前の残存チェック
- **パフォーマンス**: `filter: blur()` 禁止、不要な GPU レイヤー排除
- **TypeScript**: 型安全性、`as const` の適切な使用
- **コード品質**: 定数の重複排除、Server/Client Component の適切な分離
- **バンドルサイズ**: dynamic import, tree shaking の確認

### 5. Web パフォーマンススペシャリストレビュー

以下の観点で評価し、Lighthouse スコア 95+ を目指して修正:

- **LCP (Largest Contentful Paint)**: Hero セクションの初期描画速度、フォント読み込み戦略
- **INP (Interaction to Next Paint)**: JS メインスレッドのブロック、イベントハンドラの応答速度
- **CLS (Cumulative Layout Shift)**: フォントスワップによるレイアウトシフト、画像の `width`/`height` 指定
- **FCP (First Contentful Paint)**: クリティカル CSS のインライン化、レンダーブロッキングリソースの排除
- **バンドルサイズ**: `next/dynamic` の活用、不要な依存関係の排除、tree shaking 確認
- **フォント最適化**: `display: "swap"`, `preload`, サブセット化、不要なウェイトの削除
- **アニメーション負荷**: `will-change` の適切な使用、`filter: blur()` 禁止（GPU 再描画コスト大）、CSS アニメーション優先
- **画像最適化**: `next/image` の使用、WebP/AVIF フォーマット、適切な `sizes` 属性
- **HTTP キャッシュ**: 静的アセットの Cache-Control ヘッダー
- **サードパーティスクリプト**: 外部リソースの遅延読み込み、`dns-prefetch` / `preconnect`

### レビュー実行方法

```
サブエージェントに以下のプロンプトで依頼:
- 全コンポーネントファイルを読み込む
- 上記5つの観点で評価
- 問題点をコード修正案付きで出力
- 修正後に再度ビルド検証
```

### 検証コマンド

```bash
# ビルド検証
pnpm build

# 旧テーマ残存チェック（該当がゼロであること）
rg "Yuinari|cyan|#06D8D7|glitch|scanline|neon|amber|Orbitron|bg-void" src/

# アクセシビリティ自動チェック（導入済みの場合）
# npx axe-core <URL>
```

## Lighthouse 運用ルール

### 実行方法

```bash
# ローカルで Lighthouse を実行
pnpm build && pnpm start &
sleep 3
npx lighthouse http://localhost:3000 --output=json --output-path=/tmp/lh-report.json --chrome-flags="--headless"

# スコア確認
cat /tmp/lh-report.json | jq '.categories.performance.score * 100'

# プロセス停止
kill %1
```

### 閾値

- **Performance**: 90 以上（目標 95+）
- **Accessibility**: 90 以上
- **Best Practices**: 90 以上
- **SEO**: 90 以上

### 運用

- パフォーマンスに影響する変更（画像追加、フォント変更、アニメーション追加等）を行った際は、作業完了時に Lighthouse を実行してスコアを確認する
- スコアが閾値を下回った場合は、原因を特定して修正してからコミットする
