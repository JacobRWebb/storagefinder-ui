import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../store/useAuthStore';

export const Route = createFileRoute('/_protected')({
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
  component: ProtectedOutlet,
});

function ProtectedOutlet() {
  return null; // Will render nested routes
}
