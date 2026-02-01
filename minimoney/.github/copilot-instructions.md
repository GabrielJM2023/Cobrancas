# Copilot instructions for Minimoney (frontend)

Purpose: give AI coding agents immediate, actionable knowledge so they can make safe, small, high-value changes to this repo.

Quick start
- Dev: `npm install` (if needed) then `npm start` (runs CRA dev server).
- Build: `npm run build`.

High-level architecture
- React single-page app created with Create React App (CRA).
- Routing: `react-router-dom` configured in `src/index.js`. Main app routes live under `/home` with child routes: `/home/categorias`, `/home/novatransacao`, `/home/DashBoard`.
- UI pattern: pages live in `src/pages/**` (each page uses `page.jsx` + `*.css`). Reusable components live in `src/Components/**`.
- Styling: plain CSS files (one per component/page) — not CSS modules.
- No global state library — pages use local React state and simple derived values.

Key integration points
- Supabase client: `src/lib/supabaseCliente.js` exports `supabase` (used for auth and DB). Many files call `supabase.auth.getUser()` then query app tables.
  - Important tables (as found in the code):
    - `Usuario` (query: `select id` where `FK_user_id` = supabase user id)
    - `Categoria` (`id, Nome, Tipo, FK_ID_Usuario`)
    - `Transacao` (`id, Tipo, Valor, Data, Descricao, FK_ID_Categoria, FK_ID_Usuario`)
  - Auth patterns:
    - `supabase.auth.getUser()` — get current user
    - `supabase.auth.signInWithPassword({email, password})` — login
    - `supabase.auth.onAuthStateChange(...)` and `supabase.auth.getSession()` — session handling
  - Example pattern (from `src/pages/Home/NovaTransacao/page.jsx`):

    const { data: { user } } = await supabase.auth.getUser();
    const { data: usuario } = await supabase.from('Usuario').select('id').eq('FK_user_id', user.id).single();
    const { data } = await supabase.from('Transacao').select(...).eq('FK_ID_Usuario', usuario.id);

- Connectivity: `src/lib/monitorConexao.js` listens for `online`/`offline` and redirects to `/sem-conexao` saving interrupted route in `sessionStorage`.

Conventions / patterns an agent should follow
- Language/strings: UI text and variable names are in Portuguese. Keep new messages consistent and localized.
- File layout: put pages in `src/pages/<Page>/page.jsx` and CSS in same folder named `*.css`.
- CRUD pattern: fetch supabase user → query `Usuario` table to get tenant `id` → operate on entity tables (`Categoria`, `Transacao`). Follow existing `.single()` and `.select()` usage to match existing assumptions.
- Error handling: existing pages show errors via state (e.g., `pErro`) and `console.error`. Keep messaging concise and surfacing a user-friendly message for unexpected errors.
- UI components: reuse `src/Components/Button/button.jsx` for buttons and `src/Components/NavBar/NavBar.jsx` for navigation actions.
- Charts: `recharts` used in Dashboard — prefer adding data formatting logic in the page that renders the chart.
- Numbers/dates: numeric inputs use `react-number-format`. Dates are treated as ISO `YYYY-MM-DD` strings (HTML `input[type=date]`).

Safety & repo specifics
- `src/lib/supabaseCliente.js` contains the Supabase URL and key (currently in repo). Treat any key changes carefully — prefer adding environment variable support if adding secrets.
- Avoid changing route names and table column names; they are referenced directly in many places.

PR guidance for agents
- Make minimal, focused PRs (single small feature or bugfix).
- Keep UI and data logic separated: update page-level code for data flows and create/update CSS in the same folder for styles.
- Follow existing naming (Portuguese labels, `page.jsx` files, `CamelCase` components).
- Add console logs sparingly; prefer returning user-visible errors when it affects flow.

If anything is unclear or you'd like more examples (queries, page lifecycle, or typical UI patterns), say exactly which file/flow you want expanded and I will add targeted instructions. ✅
