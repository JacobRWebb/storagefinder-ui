# Item Tracker Frontend - Development Plan (plan.md)

This document outlines the units of work required to build the frontend for the Item Tracker application using React, Vite, TypeScript, TailwindCSS, Tanstack (Query & Router), and Zustand.

**Core Technologies:**

- **Framework/Library:** React 18+
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Routing:** Tanstack Router
- **Server State/Data Fetching:** Tanstack Query (React Query)
- **Client State Management:** Zustand
- **HTTP Client:** Axios (or Fetch API)

---

## Phase 0: Project Setup & Foundation

- [x] **Initialize Project:** Use Vite to create a new React TypeScript project.
- [x] **Install Core Dependencies:** Add React, TypeScript, TailwindCSS, Tanstack Query, Tanstack Router, Zustand, Axios, clsx/classnames.
- [x] **Basic Structure:** Create initial folder structure (`src/`, `components/`, `pages/`, `hooks/`, `services/`, `store/`, `types/`, `styles/`, `lib/`, `features/`).
- [x] **TypeScript Configuration:** Set up `tsconfig.json` (enable strict mode).
- [x] **TailwindCSS Setup:** Initialize Tailwind (`tailwind.config.js`, `postcss.config.js`), configure template paths, set up base styles in `src/styles/index.css`.
- [x] **Tanstack Router Setup:** Basic router configuration (`createReactRouter`, root route `__root.tsx` or similar). Implement basic layout component.
- [x] **Tanstack Query Setup:** Set up `QueryClient` and `QueryClientProvider` in `main.tsx` or `App.tsx`. Add `ReactQueryDevtools`.
- [x] **Zustand Setup:** Create initial store structure (`src/store/`). Example: `useAppStore` for global UI state.
- [x] **API Client Setup:** Create Axios instance (`src/services/apiClient.ts` or similar) with base URL. Set up request interceptor for adding Auth token (JWT). Set up response interceptor for basic error handling (e.g., logging, handling 401).
- [x] **Global Styles/Theme:** Define base theme customizations in `tailwind.config.js` (colors, fonts). Define global CSS variables if needed.
- [x] **Base Layout Component:** Create a reusable layout component (e.g., `components/Layout.tsx`) including Header, optional Sidebar, and main content area. Integrate with Tanstack Router's `<Outlet />`.

---

## Phase 1: Authentication

- [x] **Types:** Define TypeScript types/interfaces for Auth requests/responses (LoginRequest, LoginResponse, RegisterRequest, UserInfo).
- [x] **API Service:** Create `src/services/authApi.ts` with functions for `login`, `register`, `logout` (if backend endpoint exists), `getCurrentUser` (optional).
- [x] **Zustand Store:** Create `useAuthStore` slice to manage authentication status (isAuthenticated), user information, and JWT token. Implement actions to set/clear auth state.
- [x] **Token Storage:** Implement logic to securely store/retrieve JWT token (e.g., `localStorage` or secure alternative) upon login/logout via Zustand middleware (`persist`) or effects.
- [x] **Login Page:**
  - [x] Create route and component (`pages/LoginPage.tsx`).
  - [x] Build login form UI using TailwindCSS.
  - [x] Implement form state management (e.g., `react-hook-form` or simple `useState`).
  - [x] Add input validation (client-side).
  - [x] Implement `useMutation` (Tanstack Query) to call the login API service.
  - [x] Handle loading and error states from the mutation.
  - [x] On successful login: update Zustand store, store token, redirect to dashboard/home.
- [x] **Registration Page:**
  - [x] Create route and component (`pages/RegisterPage.tsx`).
  - [x] Build registration form UI.
  - [x] Implement form state and validation.
  - [x] Implement `useMutation` to call the register API service.
  - [x] Handle loading/error states.
  - [x] On successful registration: potentially auto-login or redirect to login page.
- [x] **Protected Routes:** Configure Tanstack Router to prevent access to protected pages if the user is not authenticated (check `useAuthStore`). Redirect to Login page.
- [x] **Logout Functionality:** Implement logout button (e.g., in Header), clear token, clear Zustand auth state, redirect to login page. Use `queryClient.clear()` to reset Tanstack Query cache on logout.
- [x] **Auth Interceptor:** Ensure Axios request interceptor correctly reads the token from storage/Zustand and adds the `Authorization: Bearer <token>` header.
- [x] **401 Handling:** Implement logic in Axios response interceptor or Tanstack Query global callbacks to handle 401 errors (e.g., force logout).

---

## Phase 2: Spaces Management

- [ ] **Types:** Define TypeScript types/interfaces for Space (SpaceDto, CreateSpaceDto, UpdateSpaceDto, MemberDto etc.).
- [ ] **API Service:** Create `src/services/spaceApi.ts` (getSpaces, getSpaceById, createSpace, updateSpace, deleteSpace, addMemberToSpace, removeMemberFromSpace).
- [ ] **Spaces List Page:**
  - [ ] Create route and component (`pages/SpacesPage.tsx`).
  - [ ] Use `useQuery` to fetch the list of accessible spaces. Define query key (e.g., `['spaces', 'list']`).
  - [ ] Display spaces (e.g., cards or table) with links to detail view.
  - [ ] Handle loading and error states.
  - [ ] Add "Create New Space" button/link.
- [ ] **Create Space:**
  - [ ] Create component (modal or dedicated page `pages/CreateSpacePage.tsx`).
  - [ ] Build form UI.
  - [ ] Implement form state and validation.
  - [ ] Use `useMutation` to call `createSpace` API.
  - [ ] On success: invalidate the `['spaces', 'list']` query, potentially navigate to the new space's detail page or back to the list.
- [ ] **Space Detail Page:**
  - [ ] Create route and component (`pages/SpaceDetailPage.tsx` with dynamic param `:spaceId`).
  - [ ] Use route loader or `useQuery` with space ID to fetch space details. Define query key (e.g., `['spaces', 'detail', spaceId]`).
  - [ ] Display space information (Name, Description).
  - [ ] Handle loading/error states.
  - [ ] (Placeholder for Container/Item lists - See Phase 3 & 4).
  - [ ] (Placeholder for Membership management UI).
- [ ] **Edit Space:**
  - [ ] Implement UI (modal or inline on detail page).
  - [ ] Pre-fill form with existing data.
  - [ ] Use `useMutation` to call `updateSpace` API.
  - [ ] On success: invalidate relevant space queries (`['spaces', 'list']`, `['spaces', 'detail', spaceId]`).
- [ ] **Delete Space:**
  - [ ] Implement delete button/action (likely on Detail page or List page).
  - [ ] Add confirmation dialog component.
  - [ ] Use `useMutation` to call `deleteSpace` API.
  - [ ] On success: invalidate `['spaces', 'list']` query, navigate away from detail page if applicable.
- [ ] **Space Membership Management (UI within Space Detail Page):**
  - [ ] Display list of current members (users/groups). Fetch data if needed.
  - [ ] UI to add a member (e.g., input field to search/enter user email/group name).
  - [ ] API call (`useMutation`) for `addMemberToSpace`.
  - [ ] API call (`useMutation`) for `removeMemberFromSpace`.
  - [ ] Update member list UI on success (invalidate relevant queries).

---

## Phase 3: Containers Management (within a Space)

- [ ] **Types:** Define TypeScript types/interfaces for Container (ContainerDto, CreateContainerDto, UpdateContainerDto).
- [ ] **API Service:** Create `src/services/containerApi.ts` (getContainersBySpace, getContainerById, createContainer, updateContainer, deleteContainer). Note: API endpoints likely nested under spaces (e.g., `/api/spaces/{spaceId}/containers`).
- [ ] **List Containers (UI within Space Detail Page):**
  - [ ] Create component (`features/containers/ContainerList.tsx`).
  - [ ] Use `useQuery` to fetch containers for the _current_ space ID. Define query key (e.g., `['containers', { spaceId: spaceId }]`).
  - [ ] Display containers.
  - [ ] Handle loading/error states.
  - [ ] Add "Create Container" button/form trigger.
- [ ] **Create Container:**
  - [ ] Implement UI (modal or inline form within Space Detail).
  - [ ] Form state and validation. Requires `spaceId`.
  - [ ] Use `useMutation` to call `createContainer` API.
  - [ ] On success: invalidate the `['containers', { spaceId: spaceId }]` query.
- [ ] **Edit Container:**
  - [ ] Implement UI (modal or inline).
  - [ ] Use `useMutation` to call `updateContainer` API.
  - [ ] On success: invalidate container query for the space.
- [ ] **Delete Container:**
  - [ ] Implement UI with confirmation.
  - [ ] Use `useMutation` to call `deleteContainer` API.
  - [ ] On success: invalidate container query for the space.
- [ ] **(Optional) Container Detail View:** Decide if clicking a container shows items within it on the same page or navigates elsewhere.

---

## Phase 4: Items Management (within Space/Container)

- [ ] **Types:** Define TypeScript types/interfaces for Item (ItemDto, CreateItemDto, UpdateItemDto).
- [ ] **API Service:** Create `src/services/itemApi.ts` (getItems, getItemById, createItem, updateItem, deleteItem). Endpoints might be `/api/items` or nested under spaces/containers. Clarify API structure.
- [ ] **List Items (UI within Space Detail / Container View):**
  - [ ] Create reusable component (`features/items/ItemList.tsx`).
  - [ ] Use `useQuery` to fetch items based on context (either `spaceId` only OR `spaceId` and `containerId`). Define query keys carefully (e.g., `['items', { spaceId: spaceId, containerId: null }]`, `['items', { spaceId: spaceId, containerId: containerId }]`).
  - [ ] Display items (table, list, cards).
  - [ ] Handle loading/error states.
  - [ ] Add "Create Item" button/form trigger.
- [ ] **Create Item:**
  - [ ] Implement UI (modal or dedicated page).
  - [ ] Form state and validation. Needs `spaceId` and optional `containerId`. May need dropdowns to select space/container if not context-bound.
  - [ ] Use `useMutation` to call `createItem` API.
  - [ ] On success: invalidate the relevant item list query (or queries).
- [ ] **Edit Item:**
  - [ ] Implement UI (modal or inline).
  - [ ] Use `useMutation` to call `updateItem` API.
  - [ ] On success: invalidate relevant item queries.
- [ ] **Delete Item:**
  - [ ] Implement UI with confirmation.
  - [ ] Use `useMutation` to call `deleteItem` API.
  - [ ] On success: invalidate relevant item queries.
- [ ] **(Optional) Item Detail View:** Modal or separate page if more details need to be shown.

---

## Phase 5: Search Functionality

- [ ] **Types:** Define TypeScript types for Search request/response (SearchRequestDto, SearchResultDto - might contain item/container excerpts).
- [ ] **API Service:** Add search function to an appropriate service (e.g., `searchApi.ts` or `itemApi.ts`) calling the backend search endpoint (`/api/search?q=...`).
- [ ] **Search Input Component:**
  - [ ] Create reusable component (`components/SearchInput.tsx`), likely placed in the Header.
  - [ ] Manage input state.
  - [ ] Trigger search on submit or debounce input changes.
- [ ] **Search Results Display:**
  - [ ] Decide on display method (dedicated page `/search`, dropdown below input, etc.).
  - [ ] Create route/component if needed (`pages/SearchPage.tsx`).
  - [ ] Use `useQuery` to fetch search results based on the query parameter. Define query key (e.g., `['search', { query: searchQuery }]`). Enable/disable query based on input.
  - [ ] Display results, indicating item/container type and location (Space/Container name).
  - [ ] Handle loading/error/no results states.
  - [ ] Add links from results to the relevant Space/Container/Item detail view if possible.

---

## Phase 6: Group Management (Basic View) & User Profile

- [ ] **Types:** Define Group types (GroupDto).
- [ ] **API Service:** Add functions to get groups user belongs to (`groupApi.ts` or `userApi.ts`).
- [ ] **My Groups View:** (Optional based on priority)
  - [ ] Component/Page to list groups the user is a member of.
  - [ ] Use `useQuery` to fetch data.
- [ ] **User Profile/Settings Page:** (Optional based on priority)
  - [ ] Route and component (`pages/ProfilePage.tsx`).
  - [ ] Display user information (from `useAuthStore`).
  - [ ] (Future) Allow password change, profile updates if API supports it.

---

## Phase 7: Cross-Cutting Concerns & Polish

- [ ] **Responsiveness:** Review all pages and components for usability on different screen sizes (mobile, tablet, desktop) using TailwindCSS responsive modifiers.
- [ ] **Error Handling:** Implement user-friendly error messages for API failures (using `error` state from `useMutation`/`useQuery` and displaying toasts/alerts). Handle form validation errors clearly.
- [ ] **Loading States:** Implement consistent loading indicators (spinners, skeletons) using `isLoading`/`isFetching` states from Tanstack Query. Use Tanstack Router's pending states if applicable.
- [ ] **Accessibility (A11y):** Perform basic accessibility audit (semantic HTML, keyboard navigation, focus management, color contrast, ARIA attributes where necessary). Use ESLint JSX-A11y plugin.
- [ ] **Code Cleanup:** Refactor code, remove console logs, ensure consistent naming and style.
- [ ] **Component Reusability:** Identify and extract common UI patterns into reusable components in `src/components/`.
- [ ] **Testing (Initial Setup & Key Flows):**
  - [ ] Set up testing environment (Jest, React Testing Library, related TS types).
  - [ ] Write basic unit tests for utility functions or complex hooks.
  - [ ] Write basic integration tests for key user flows (e.g., Login, Create Space).
  - [ ] Configure test scripts in `package.json`.

---

## Phase 8: Build & Deployment Preparation

- [ ] **Build Process:** Test the production build using `npm run build`. Analyze bundle size if necessary.
- [ ] **Environment Variables:** Ensure configuration for production API URL and other necessary environment variables using Vite's `.env.production` mechanism.
- [ ] **Dockerfile:** (If using Docker) Create `Dockerfile` for building and serving the frontend application (e.g., using Nginx).
- [ ] **Deployment Strategy:** Define how the frontend will be hosted (e.g., AWS S3/CloudFront, Netlify, Vercel, Azure Static Web Apps, container orchestrator).

---

**Notes:**

- This plan is iterative. Tasks within phases might overlap or be re-prioritized.
- Each checklist item represents a unit of work, potentially broken down further during development.
- Regularly test interactions with the actual C# backend API as it becomes available.
- Prioritize core functionality (Auth, Spaces, Items) first.
