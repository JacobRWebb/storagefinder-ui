import { create, StateCreator } from "zustand";

export interface AppState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>(((set: (partial: AppState | ((state: AppState) => AppState), replace?: boolean) => void) => ({
  sidebarOpen: false,
  setSidebarOpen: (open: boolean) => set((state) => ({ ...state, sidebarOpen: open })),

})) as StateCreator<AppState>);
