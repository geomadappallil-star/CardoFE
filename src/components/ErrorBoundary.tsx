import React, { Component, ErrorInfo, ReactNode } from 'react';

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
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Cardo Board application:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleHardReset = async () => {
    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
        }
      }
      if ('caches' in window) {
        const cacheKeys = await caches.keys();
        for (const key of cacheKeys) {
          await caches.delete(key);
        }
      }
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.warn('Error during reset:', e);
    }
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
              CB
            </div>
            <h1 className="text-xl font-bold text-white mb-2">Cardo Board Application</h1>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              We encountered a temporary rendering or caching issue. Click below to reload the latest spice intelligence data.
            </p>
            {this.state.error?.message && (
              <div className="bg-slate-950 p-3 rounded-lg text-xs font-mono text-rose-400 mb-6 text-left overflow-x-auto border border-rose-950/50">
                {this.state.error.message}
              </div>
            )}
            <div className="flex flex-col gap-3">
              <button
                onClick={this.handleReload}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-medium rounded-lg transition-all shadow-lg shadow-emerald-600/20"
              >
                Reload Application
              </button>
              <button
                onClick={this.handleHardReset}
                className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 hover:text-white text-xs font-medium rounded-lg transition-all"
              >
                Clear Cache & Fresh Start
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
