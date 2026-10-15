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

- Keep the portfolio as a single TanStack index route with section anchor navigation; all content belongs to the same page.
- Define portfolio styling in src/styles.css and use semantic tokens and the shared Button for interactive controls to keep presentation consistent.
- Distinguish example project concepts and unprovided credentials from verified owner facts; do not invent personal contact details or account URLs.
- Keep personal chat as a floating AI Elements panel, with memory confined to React state and full UI message history sent through the public streaming server route.
- Keep AI prompts and gateway helpers in server-only modules; server-owned access blocks live in a private service-role-only table so terminal denials survive restarts without storing conversations.
