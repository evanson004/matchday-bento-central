<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- League content (teams, fixtures, standings, news) lives in `src/lib/league.ts`; pages read from it so there is one source of truth until a backend exists.
- Bento tiles use the `tile`, `tile-sky`, `tile-soft`, `tile-ink`, `tile-interactive` utilities in `src/styles.css`; keep colours in tokens, not component classes.
- Each site section is its own route file; shared header/footer wrap `<Outlet />` in `__root.tsx`.
