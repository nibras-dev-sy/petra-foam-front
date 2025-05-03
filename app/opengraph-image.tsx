import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Petra Foam - Advanced Thermal Insulation Solutions'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(to right, #1e40af, #3b82f6)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: 32,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            marginBottom: 20,
          }}
        >
          PETRA FOAM
        </div>
        <div
          style={{
            fontSize: 36,
            maxWidth: '80%',
            textAlign: 'center',
          }}
        >
          Advanced Thermal Insulation Solutions
        </div>
      </div>
    ),
    { ...size }
  )
} 