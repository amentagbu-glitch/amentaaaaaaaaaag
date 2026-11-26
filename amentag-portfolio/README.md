# Oussama Amentag portfolio (Blogger redesign)

Redesign of https://amentaag.blogspot.com/ with the same pages (Home, About me, My works, My resume, Contact me) and labels (Film, Photography, Projects).

- `t1/` is template T1: light/dark, viewfinder hero, film-strip cards.
- `t2/` is template T2: dark and cinematic, giant serif name with the portrait set into it, a projector-beam light that follows the mouse, page-cut transitions. It shares T1's images (`t2/img` links to `t1/img`).
- Open either one through a local web server, for example `python3 -m http.server` inside the folder.
- Step 2 (to do): convert it into a Blogger theme `.xml` that pulls posts and labels from Blogger, ready to upload with Theme → Restore.
