'use client'

// シェーダーグラデーションコンポーネントのインポート
import { MeshGradient } from '@paper-design/shaders-react'
import clsx from 'clsx'
import {
  type FC,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import type { Simplify } from 'type-fest'

// コンポーネントのプロパティ型定義
type ShaderBackgroundProps = Simplify<{
  children: ReactNode // 子要素
}>

export const ShaderBackground = (({ children }) => {
  // コンテナ要素への参照
  const containerRef = useRef<HTMLDivElement>(null)
  // マウスホバー状態（現在は未使用だが将来の拡張用）
  const [_, setIsActive] = useState(false)
  // SVGフィルターのユニークID生成
  const glassEffectId = useId()
  const gooeyFilterId = useId()

  // マウスイベントリスナーの設定
  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      // マウスホバーイベントリスナーを追加
      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    // クリーンアップ関数：コンポーネントアンマウント時にイベントリスナーを削除
    return () => {
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black relative overflow-hidden"
    >
      {/* SVGフィルター定義 */}
      <svg
        className={clsx('absolute', 'inset-0', 'w-0', 'h-0')}
        aria-hidden="true"
      >
        <defs>
          {/* ガラス効果フィルター */}
          <filter
            id={glassEffectId}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            {/* ノイズパターンを生成 */}
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            {/* ノイズを使って歪み効果を適用 */}
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            {/* 色調整（青みがかった透明感） */}
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          {/* グミのような粘性効果フィルター */}
          <filter
            id={gooeyFilterId}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            {/* ガウシアンブラーでエッジをぼかす */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            {/* コントラストを高めて粘性効果を作成 */}
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            {/* 元の画像とグミ効果を合成 */}
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* 背景シェーダーグラデーション */}
      {/* 第1層：メインのグラデーション */}
      <MeshGradient
        className={clsx('absolute', 'inset-0', 'w-full', 'h-full')}
        colors={['#e0eaff', '#464cecb5', '#5b8efb', '#abcbde99']}
        speed={0.3}
      />
      {/* 第2層：オーバーレイグラデーション（透明度60%） */}
      <MeshGradient
        className={clsx('absolute inset-0 w-full h-full opacity-60')}
        colors={['#e0eaff', '#464cecb5', '#5b8efb']}
        speed={0.6}
      />

      {/* 子要素（コンテンツ） */}
      {children}
    </div>
  )
}) satisfies FC<ShaderBackgroundProps>
