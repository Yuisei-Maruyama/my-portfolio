# Tailwind Design Token Reference

AI 向けデザイントークンリファレンス。全実装でこのファイルを参照すること。

## Colors

| Token | CSS Variable | Utility Class | Value | Usage |
|-------|-------------|---------------|-------|-------|
| bg-primary | `--bg-primary` | `bg-bg-primary` | `#09090B` | メイン背景 |
| bg-surface | `--bg-surface` | `bg-bg-surface` | `#111114` | セクション背景 |
| bg-card | `--bg-card` | `bg-bg-card` | `#18181B` | カード背景 |
| bg-card-hover | `--bg-card-hover` | `bg-bg-card-hover` | `#1F1F23` | カードホバー |
| silver | `--silver` | `text-silver`, `bg-silver`, `border-silver` | `#C0C0C8` | メインアクセント |
| silver-50 | `--silver-50` | `bg-silver-50` | `rgba(192,192,200,0.06)` | 微細背景 |
| silver-100 | `--silver-100` | `border-silver-100` | `rgba(192,192,200,0.12)` | ボーダー(薄) |
| silver-200 | `--silver-200` | `border-silver-200` | `rgba(192,192,200,0.25)` | ボーダー(中) |
| silver-300 | `--silver-300` | `border-silver-300` | `rgba(192,192,200,0.40)` | ボーダー(濃) |
| silver-400 | `--silver-400` | `bg-silver-400` | `rgba(192,192,200,0.60)` | 選択背景 |
| silver-light | `--silver-light` | `text-silver-light` | `#E8E8EC` | 明るいシルバー |
| silver-bright | `--silver-bright` | `text-silver-bright` | `#F5F5F7` | 鏡面ハイライト |
| silver-dim | `--silver-dim` | `text-silver-dim` | `#6B6B78` | 控えめシルバー |
| text-primary | `--text-primary` | `text-text-primary` | `#EDEDF0` | メインテキスト |
| text-secondary | `--text-secondary` | `text-text-secondary` | `#9898A1` | サブテキスト (WCAG AA) |
| text-muted | `--text-muted` | `text-text-muted` | `#52525B` | 装飾テキスト (`aria-hidden` のみ) |

## Fonts

| Token | CSS Variable | Utility Class | Font | Usage |
|-------|-------------|---------------|------|-------|
| display | `--font-display` / `--font-syne` | `font-display` | Syne | Display・見出し |
| heading | `--font-heading` / `--font-syne` | `font-heading` | Syne | 見出し |
| mono | `--font-mono` / `--font-geist-mono` | `font-mono` | Geist Mono | 本文・ラベル |
| body | `--font-body` / `--font-geist-mono` | `font-body` | Geist Mono | 本文 |
| bp | `--font-bp` / `--font-barlow-condensed` | `font-bp` | Barlow Condensed | ボーディングパス |
| dosis | `--font-dosis` | `font-[family-name:var(--font-dosis)]` | Dosis | Hero 名前のみ |

## Font Sizes

| Token | Utility Class | Value |
|-------|---------------|-------|
| xs | `text-xs` | `12px` |
| sm | `text-sm` | `14px` |
| md | `text-md` | `16px` |
| lg | `text-lg` | `18px` |
| detail | `var(--text-detail)` | `14px` (mobile) / `16px` (desktop) |

## Spacing

| Token | CSS Variable | Utility Class | Value | Usage |
|-------|-------------|---------------|-------|-------|
| bp-sm | — | `space-y-bp-sm`, `gap-bp-sm` | `24px` | BP small gap |
| bp-md | — | `space-y-bp-md`, `gap-bp-md` | `32px` | BP medium gap |
| bp-lg | — | `space-y-bp-lg`, `gap-bp-lg` | `40px` | BP large gap |
| bp-pad | `--spacing-bp-pad` | `p-bp-pad` | `24px` | カードパディング (desktop) |
| bp-pad-mobile | `--spacing-bp-pad-mobile` | `p-bp-pad-mobile` | `16px` | カードパディング (mobile) |
| bp-header-mb | `--spacing-bp-header-mb` | `mb-bp-header-mb` | `12px` | BP header margin-bottom |
| bp-divider-mb | `--spacing-bp-divider-mb` | `mb-bp-divider-mb` | `20px` | BP divider margin-bottom |
| bp-body-gap | `--spacing-bp-body-gap` | `gap-bp-body-gap` | `24px` | BP body flex gap |
| bp-perf-y | `--spacing-bp-perf-y` | `my-bp-perf-y` | `20px` | perforation margin-y |
| bp-stub-pt | `--spacing-bp-stub-pt` | `pt-bp-stub-pt` | `16px` | stub padding-top |
| bp-qr-pad | `--spacing-bp-qr-pad` | `p-bp-qr-pad` | `8px` | QR wrapper padding |

## Border Radius

| Token | CSS Variable | Utility Class | Value | Usage |
|-------|-------------|---------------|-------|-------|
| card | `--radius-card` | `rounded-card` | `12px` | boarding-pass, cards |
| qr | `--radius-qr` | `rounded-qr` | `8px` | QR wrapper |
| tag | `--radius-tag` | `rounded-tag` | `2px` | tech-tag, stamp, focus-visible |
| btn | `--radius-btn` | `rounded-btn` | `4px` | reset button |

## Letter Spacing

| Token | CSS Variable | Utility Class | Value | Usage |
|-------|-------------|---------------|-------|-------|
| label | `--tracking-label` | `tracking-label` | `0.2em` | uppercase labels (BP labels, Typography label) |
| nav | `--tracking-nav` | `tracking-nav` | `0.15em` | navigation, captions |
| tag | `--tracking-tag` | `tracking-tag` | `0.05em` | tech tags, stamps |
| btn | `--tracking-btn` | `tracking-btn` | `0.1em` | buttons, footer, language switcher |
| display | `--tracking-display` | `tracking-display` | `0.3em` | overline display |

## Box Shadow

| Token | Utility Class | Usage |
|-------|---------------|-------|
| glow-sm | `shadow-glow-sm` | 微細グロー |
| glow-md | `shadow-glow-md` | 中程度グロー |
| glow-lg | `shadow-glow-lg` | 大きいグロー |

## Animation

| Token | Utility Class | Duration | Usage |
|-------|---------------|----------|-------|
| blink | `animate-blink` | 1s step-end | カーソル点滅 |
| sweep | `animate-sweep` | 4s ease-in-out | section-line スイープ |
| pulse-dot | `animate-pulse-dot` | 2.5s ease-in-out | タイムラインドット |
| mercury-flow | `animate-mercury-flow` | 6s ease-in-out | 水銀フロー |

## Typography Component Variants

`<Text variant="..." />` で使用。`src/components/Typography.tsx` 参照。

| Variant | Default Tag | Font | Size | Tracking | Color | Other |
|---------|-----------|------|------|----------|-------|-------|
| `label` | `<span>` | mono | sm / md | `tracking-label` | text-secondary | uppercase, block |
| `value` | `<div>` | heading | lg | — | text-primary | font-semibold |
| `caption` | `<span>` | mono | sm / md | — | silver | — |
| `body` | `<p>` | — | sm | — | text-secondary | leading-relaxed |
| `overline` | `<span>` | display | sm / md | `tracking-display` | text-secondary | — |
| `tag` | `<span>` | mono | sm / md | `tracking-tag` | silver | — |

## Layout Spacing Patterns

| Pattern | Classes | Usage |
|---------|---------|-------|
| Section padding | `py-28 px-5 sm:px-8` | 各セクション共通 |
| Section header gap | `gap-4 mb-16` | セクションヘッダー下マージン |
| Container | `max-w-6xl mx-auto` | コンテンツ幅制限 |
| Hero top padding | `pt-24 lg:pt-32` | ヘッダーとの間隔確保 |
| Header height | `h-14` | 固定ヘッダー高さ |

## CSS Classes (globals.css)

globals.css で定義された非ユーティリティクラス。Tailwind ユーティリティと併用。

| Class | Usage |
|-------|-------|
| `.mercury-text` | Liquid Chrome テキスト（Hero名前のみ） |
| `.mirror-card` | 金属光沢カード |
| `.section-line` | メタリックスイープ区切り線 |
| `.corner-frame` | コーナーフレーム装飾 |
| `.boarding-pass` | ボーディングパスカード |
| `.boarding-pass-header` | BP ヘッダー行 |
| `.boarding-pass-divider` | BP 区切り線 |
| `.boarding-pass-body` | BP ボディ flex |
| `.boarding-pass-label` | BP ラベル (uppercase, tracking-label) |
| `.boarding-pass-value` | BP 値テキスト |
| `.boarding-pass-code` | BP コードテキスト |
| `.boarding-pass-stamp` | BP スタンプバッジ |
| `.boarding-pass-qr-wrapper` | QR コードラッパー |
| `.boarding-pass-photo` | プロフィール写真 |
| `.boarding-pass-perforation` | ミシン目（切り取り線） |
| `.boarding-pass-stub` | 切り離し部分 |
| `.tech-tag` | 技術タグバッジ |
| `.cut-hit-area` | ハサミ操作領域 |
| `.cut-canvas` | 切り取りアニメーション Canvas |
| `.cut-reset-btn` | 再接着ボタン |
| `.hero-specular` | マウス追従スペキュラー反射 |
| `.hero-chromatic` | マウス追従クロマティックフリンジ |
| `.orb` | 浮遊する液体オーブ |
| `.cursor-blink` | カーソル点滅 |
| `.pulse-dot` | パルスドット |
| `.content-auto` | `content-visibility: auto` 最適化 |

## Styling Rules

### Tailwind ユーティリティで書くもの
- レイアウト (flex, grid, spacing, sizing)
- レスポンシブ (sm:, md:, lg:)
- テキストスタイル (font, text, tracking, leading)
- カラー (text-*, bg-*, border-*)
- ステート (hover:, focus:, group-hover:)

### CSS (globals.css) で書くもの
- 複雑なセレクタ (::before, ::after, :focus-visible)
- 複数プロパティの連携が必要なコンポーネント (boarding-pass, mirror-card)
- keyframe アニメーション
- box-shadow の複雑な合成
- gradient の長い定義
- マウス追従エフェクト (CSS custom properties)
