import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/site'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #f8fafc 0%, #eaf7ff 45%, #f7fffb 100%)',
          color: '#102033',
          fontFamily: 'Inter, Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 18,
              background: 'linear-gradient(135deg, #0f70d7 0%, #00a8b8 100%)',
              color: '#ffffff',
              fontSize: 42,
              fontWeight: 800,
            }}
          >
            C
          </div>
          <div style={{ fontSize: 34, fontWeight: 800 }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 900 }}>
          <div style={{ fontSize: 70, lineHeight: 1.02, fontWeight: 850 }}>
            Soluciones digitales para operar mejor
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.35, color: '#425466' }}>
            Plataformas web, automatizaciones, dashboards e integraciones para negocios que buscan claridad,
            eficiencia y mejores experiencias.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, color: '#0f70d7', fontSize: 24, fontWeight: 700 }}>
          <span>Procesos</span>
          <span>Datos</span>
          <span>Experiencia</span>
          <span>Resultados</span>
        </div>
      </div>
    ),
    size
  )
}
