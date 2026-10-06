import { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Error capturado en la aplicación:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.warn('Error al limpiar localStorage:', e);
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            backgroundColor: '#121D28',
            color: '#FFFFFF',
            textAlign: 'center',
            fontFamily: "'Nunito', sans-serif"
          }}
        >
          <div
            style={{
              background: '#223447',
              border: '2px solid #38536F',
              borderRadius: '20px',
              padding: '28px',
              maxWidth: '440px',
              width: '100%',
              boxShadow: '0 8px 0 #0C151F'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}
            >
              <AlertTriangle size={36} color="#EF4444" />
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '8px', color: '#FFFFFF' }}>
              Estado Seguro Recuperado
            </h2>

            <p style={{ color: '#94A3B8', fontSize: '0.92rem', marginBottom: '20px', lineHeight: 1.5 }}>
              Detectamos una interrupción en el inicio. Pulsa el botón de abajo para reiniciar PrograApp con tu entorno limpio y listo.
            </p>

            {this.state.error && (
              <pre
                style={{
                  background: '#121D28',
                  color: '#F87171',
                  fontSize: '0.78rem',
                  padding: '12px',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  overflowX: 'auto',
                  textAlign: 'left',
                  maxHeight: '120px'
                }}
              >
                {this.state.error.message}
              </pre>
            )}

            <button
              onClick={this.handleReset}
              style={{
                width: '100%',
                padding: '14px 20px',
                background: '#FF9500',
                border: 'none',
                borderRadius: '14px',
                color: '#FFFFFF',
                fontWeight: 900,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 0 #C96F00'
              }}
            >
              <RotateCcw size={18} />
              Reiniciar App y Datos
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
