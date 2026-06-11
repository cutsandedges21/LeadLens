import { ImageResponse } from 'next/og'

// iOS home-screen icon (PNG generated at the edge). Apple masks the corners,
// so the artwork fills a full square.
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111827',
        }}
      >
        <svg width="118" height="118" viewBox="0 0 32 32" fill="none">
          <circle cx="13.5" cy="13.5" r="7" stroke="#ffffff" strokeWidth="2.6" />
          <circle cx="13.5" cy="13.5" r="3" fill="#2b8cff" />
          <path
            d="M19 19L25.5 25.5"
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  )
}
