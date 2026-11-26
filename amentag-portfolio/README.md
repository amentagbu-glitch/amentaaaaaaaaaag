# Oussama Amentag portfolio (Blogger redesign)

Redesign of https://amentaag.blogspot.com/ with the same pages (Home, About me, My works, My resume, Contact me) and labels (Film, Photography, Projects).

- `t1/` is template T1: light/dark, viewfinder hero, film-strip cards.
- `t2/` is template T2: dark and cinematic, giant serif name with the portrait set into it, a projector-beam light that follows the mouse, page-cut transitions. It shares T1's images (`t2/img` links to `t1/img`).
- `t3/` is template T3: T2 plus project footage inside the name, a film-leader countdown intro, a scroll timecode bar, scrubbable project covers and magnetic buttons. Shares T1's images.
- `t4/` is template T4: T3 plus a showreel player (chapters per project, play/pause, timecode) and an interactive projection-mapping wall on a kasbah facade. Shares T1's images.
- `t5/` is template T5 (not chosen, kept for reference): the site is Oussama's video-editing suite. Home is an edit page (program monitor playing the showreel, media pool with label bins, inspector, draggable timeline with V2/V1/A1 tracks and client-quote markers that play as subtitles, J/K/L and space shortcuts). Resume is a career timeline with an inspector; Contact is a "Deliver" render-settings form. Shares T1's images.
- `t6/` is template T6, the current direction: T4's content and look with full motion design built on GSAP 3.12.5 + ScrollTrigger (loaded from cdnjs): a title-sequence intro once per visit (counter, name rising letter by letter, curtain wipe), headings rising word by word, photos wiping open with a slow zoom and parallax, a statement that lights up word by word on scroll, a pinned sideways-scrolling "Frames from the field" section, count-up numbers and a header that hides on scroll down. Everything is shown without motion when the visitor prefers reduced motion or the library fails to load.
- Open any of them through a local web server, for example `python3 -m http.server` inside the folder.
- Step 2 (to do): convert it into a Blogger theme `.xml` that pulls posts and labels from Blogger, ready to upload with Theme → Restore.
