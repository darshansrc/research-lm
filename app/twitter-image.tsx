import { ImageResponse } from 'next/og'
import { BrainCircuit } from 'lucide-react'

export const runtime = 'edge'

export const alt = 'ResearchLM - Your Research Assistant'
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
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <BrainCircuit size={200} color="#0070f3" />
          <span style={{ marginLeft: '20px', fontSize: '72px', fontWeight: 'bold', color: '#0070f3' }}>ResearchLM</span>
        </div>
        <div style={{ fontSize: '36px', textAlign: 'center', maxWidth: '80%', color: '#333' }}>
          Your AI-powered research assistant for analyzing data, taking notes, and creating diagrams
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

