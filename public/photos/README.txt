CURRENT PLACEHOLDER PHOTOS  (public/photos/wedding/)
----------------------------------------------------
The site currently uses 14 wedding photos from public/photos/wedding/.
They are PLACEHOLDERS: several carry other photographers' watermarks and are
only ~735px wide. Replace them with your own work before launch.

In src/data/site.ts, w('temple-sunset') means public/photos/wedding/temple-sunset.jpg.
To swap a photo, drop your file in with the same name (or change the name in
site.ts). The story galleries draw from the `pool` list in site.ts: add
[name, width/height ratio] there when you add more photos.
The hero wants a landscape photo at least 2400px wide.

PUT YOUR PHOTOS HERE
--------------------
Any path you write in src/data/site.ts is looked up under /public.
So '/photos/hero-1.jpg' means the file public/photos/hero-1.jpg.
While you run `npm run dev`, a missing file shows a coloured plate
labelled with the path it is waiting for.

Suggested sizes (JPG or WebP, around 80% quality):

  hero-1.jpg … hero-3.jpg   LANDSCAPE, 2400px wide. These fill the
                            wide cinematic plate at the top, so give
                            them room at the lower left and lower
                            right — the studio name sits across those
                            corners.
  approach.jpg              portrait, 1200px tall
  stories/<id>/cover.jpg    landscape, 2000px wide
  stories/<id>/01.jpg …     mixed orientation, 1600px on the long edge
  chapters/01.jpg … 05.jpg  portrait, 1600px tall
  latest/01.jpg … 10.jpg    portrait, 1200px tall
  people/01.jpg … 03.jpg    square, 600px (testimonial portraits)
  film-poster.jpg           landscape, 2400px wide

Large files are what make a photography site feel slow. Resize before
uploading rather than dropping camera originals in here.

NOTE: SLOTS THAT HAVE NO PHOTO YET
----------------------------------
Photo1.jpg is shown in every slot that is still waiting for its own picture,
each time cropped to a different part of it. When you add the real file for a
slot (for example chapters/01.jpg), it replaces the borrowed one automatically.

New slots in the sections that had no photo before:
  stats.jpg        landscape, 2400px wide  (band behind the numbers)
  experience.jpg   portrait, 1200px tall
  contact.jpg      landscape, 1600px wide

For a sharp full-screen hero, use a landscape photo at least 2400px wide.

Story folders (public/photos/stories/<folder>/): meenakshi-karthik, kavya-arun,
priya-vignesh, anjali-harish. Each takes cover.jpg and 01.jpg … 12.jpg.
Extra slots: stories.jpg (wide banner under the Stories heading),
footer.jpg (wide banner above the footer).
