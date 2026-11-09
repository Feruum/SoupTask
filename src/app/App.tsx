import { lazy, Suspense, useEffect, useState } from 'react';
import { Activity, LayoutDashboard, ArrowUpRight, ChartNoAxesColumn, Database, FlaskConical, Moon, ShieldAlert, Sun } from 'lucide-react';
import { Link, Navigate, NavLink, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { CatalogBoundary } from '@/features/shared/Catalog';
import type { RunRepository } from '@/data/repository';
import { Button } from '@/components/arc/button/button';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { motionTokens } from '@/components/arc/lib/motion-tokens';
import logo from '../../assets/soup-logo.svg';
import ornament from '../../assets/kazakh-ornament.png';
const DashboardPage = lazy(() => import('@/features/dashboard/DashboardPage').then(module => ({
  default: module.DashboardPage
})));
const RunsPage = lazy(() => import('@/features/runs/RunsPage').then(module => ({
  default: module.RunsPage
})));
const RunPage = lazy(() => import('@/features/runs/RunPage').then(module => ({
  default: module.RunPage
})));
const ComparePage = lazy(() => import('@/features/compare/ComparePage').then(module => ({
  default: module.ComparePage
})));
const QualityPage = lazy(() => import('@/features/quality/QualityPage').then(module => ({
  default: module.QualityPage
})));
export type Theme = 'dark' | 'light';
export interface ShellContext {
  theme: Theme;
}
function Shell({
  repository
}: {
  repository?: RunRepository;
}) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return localStorage.getItem('soup-theme') === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);
  const reducedMotion = useReducedMotion();
  const location = useLocation();
  useEffect(() => {
    document.getElementById('page-title')?.focus();
  }, [location.pathname]);
  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('soup-theme', next);
    } catch {/* Optional preference store. */}
    document.documentElement.dataset.theme = next;
  }
  return <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <aside className="sidebar" aria-label="Workspace">
        <Link className="brand" to="/dashboard" aria-label="Soup home"><img src={logo} alt="" width="40" height="40" /><span>Soup.</span></Link>
        <div className="workspace-label"><FlaskConical size={18} aria-hidden="true" /><span>Almaty Lab</span></div>
        <nav aria-label="Main navigation">
          {[{
          path: '/dashboard',
          label: 'Dashboard',
          Icon: LayoutDashboard
        }, {
          path: '/runs',
          label: 'Training runs',
          Icon: Activity
        }, {
          path: '/compare',
          label: 'Compare',
          Icon: ChartNoAxesColumn
        }, {
          path: '/data-quality',
          label: 'Data quality',
          Icon: ShieldAlert
        }].map(({
          path,
          label,
          Icon
        }) => <NavLink key={path} to={path} onKeyDown={() => setKeyboardNavigation(true)} onPointerDown={() => setKeyboardNavigation(false)}>{({
            isActive
          }) => <>
            {isActive && <motion.span aria-hidden="true" className="nav-selection" data-testid="nav-selection" layoutId={reducedMotion ? undefined : 'sidebar-selection'} transition={reducedMotion || keyboardNavigation ? {
              duration: 0
            } : motionTokens.spring.snappy} />}
            <Icon size={18} aria-hidden="true" /><span>{label}</span>
          </>}</NavLink>)}
        </nav>
        <div className="sidebar-bottom">
          <a className="docs-link" href="https://souplanding-omega.vercel.app/docs/" target="_blank" rel="noreferrer">Soup documentation <ArrowUpRight size={16} aria-hidden="true" /></a>
          <figure className="brand-signature"><img className="brand-ornament" src={ornament} alt="" width="176" height="59" /><figcaption>BUILT IN KAZAKHSTAN</figcaption></figure>
        </div>
      </aside>
      <div className="workspace-content">
        <header className="header">
          <div className="breadcrumb"><span>Workspace</span><span aria-hidden="true">/</span><span>qwen-kazakh</span></div>
          <div className="header-tools">
            <a className="mobile-docs" href="https://souplanding-omega.vercel.app/docs/" target="_blank" rel="noreferrer">Docs <ArrowUpRight size={14} aria-hidden="true" /></a>
            <span className="demo-indicator"><Database size={14} aria-hidden="true" />Demo data</span>
            <Button variant="secondary" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={toggleTheme}>
              <span className="theme-icon" aria-hidden="true"><AnimatePresence mode="popLayout" initial={false}><motion.span key={theme} initial={reducedMotion ? false : {
                  opacity: 0,
                  transform: 'rotate(-15deg) scale(0.92)'
                }} animate={{
                  opacity: 1,
                  transform: 'rotate(0deg) scale(1)'
                }} exit={reducedMotion ? {
                  opacity: 0
                } : {
                  opacity: 0,
                  transform: 'rotate(15deg) scale(0.92)'
                }} transition={{
                  duration: reducedMotion ? 0 : motionTokens.duration.fast,
                  ease: motionTokens.ease.enter
                }}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</motion.span></AnimatePresence></span>
            </Button>
          </div>
        </header>
        <main id="main-content" tabIndex={-1} className="page-content"><Suspense fallback={<output>Loading page…</output>}><CatalogBoundary repository={repository}><Outlet context={{
              theme
            } satisfies ShellContext} /></CatalogBoundary></Suspense></main>
      </div>
    </div>;
}
export function App({
  repository
}: {
  repository?: RunRepository;
} = {}) {
  return <Routes>
      <Route element={<Shell repository={repository} />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/runs" element={<RunsPage />} />
        <Route path="/runs/:runId" element={<RunPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/data-quality" element={<QualityPage />} />
        <Route path="*" element={<><h1 id="page-title" tabIndex={-1}>Not found</h1><p>This page does not exist.</p><Link className="text-link" to="/dashboard">Back to dashboard</Link></>} />
      </Route>
    </Routes>;
}
