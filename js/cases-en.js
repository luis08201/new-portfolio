export const CASES_META_EN = {
  forja: {
    "meta.title": "Forja: a filterable catalog with Finsweet | Case study | Luis Selva",
    "meta.description":
      "Forja case study: a course catalog filtered with Finsweet Attributes, data-driven detail pages and an accessible enrollment form, in Spanish and English.",
  },
  burgerlicious: {
    "meta.title": "Burgerlicious: Webflow vs Framer | Case study | Luis Selva",
    "meta.description":
      "Burgerlicious case study: the same restaurant template in Webflow and in Framer, with CMS, GSAP interactions and React code overrides.",
  },
};

export const CASES_EN = {
  "case.back": "← All projects",
  "case.home": "Back to portfolio ↑",
  "case.script": "Case study",
  "case.type": "Type",
  "case.role": "My role",
  "case.stack": "Stack",
  "case.year": "Year",
  "case.goal": "Goal",
  "case.myRole": "My role",
  "case.architecture": "Architecture",
  "case.challenge": "Challenge",
  "case.solution": "Solution",
  "case.responsive": "Enrollment and responsive",
  "case.screens": "Screens",
  "case.result": "Result",
  "case.next.forja": "Case study: Forja",
  "case.next.burger": "Case study: Burgerlicious",
  "link.code": "View code",

  "forja.lead":
    "A website for a fictional technical institute in Managua. I designed and coded it end to end to solve a typical Webflow problem: a catalog with filters, search and detail pages, maintained from a single data source.",
  "forja.type": "Personal project · original demo",
  "forja.role": "Design, content, development and QA",
  "forja.coverAlt": "Forja home page on desktop",
  "forja.goal":
    "<p>Show how I build a catalog website like the ones made with Webflow CMS and Finsweet: visitors find a course in seconds, and adding a new one doesn't require touching the HTML.</p>",
  "forja.roleText": `<ul>
              <li>I defined the architecture and wrote the content for all 12 courses, in Spanish and English.</li>
              <li>I designed the interface and the CSS component system.</li>
              <li>I coded the catalog, the detail pages, the enrollment form and the language switch.</li>
              <li>I ran QA on desktop, tablet and mobile, with the keyboard and with reduced motion.</li>
            </ul>`,
  "forja.architecture": `<p>Four pages and one data source. A JavaScript module plays the role of a CMS collection: each course has a title, summary, area, mode, price, dates, syllabus, requirements and instructor, in both languages.</p>
            <ul>
              <li><strong>Home:</strong> value proposition, areas and upcoming courses.</li>
              <li><strong>Catalog:</strong> all 12 courses with filters by area, mode and search.</li>
              <li><strong>Detail:</strong> a single template (<code>curso.html?c=slug</code>) for every course, like a Webflow CMS template page.</li>
              <li><strong>Enrollment:</strong> a form with the course preselected from the detail page.</li>
            </ul>`,
  "forja.challenge":
    "<p>Finsweet Attributes is built for Webflow: it expects the Webflow runtime and reads the cards only once when it starts. In Forja the cards are rendered with JavaScript and rebuilt when the language changes, so the filter kept pointing at cards that no longer existed.</p>",
  "forja.solution": `<ul>
              <li>I load the Finsweet script only after the first render and stub <code>Webflow.push</code> so it starts without the Webflow runtime.</li>
              <li>When the language changes I rebuild the cards and restart the List module with <code>restart()</code>, so the counter and filters stay correct.</li>
              <li>Each card carries hidden fields (<code>fs-list-field</code>) with the area, mode and accent-free keywords, so “electronica” matches “electrónica”.</li>
              <li>Filters are reflected in the URL (<code>?area_equal=tecnologia</code>): the breadcrumb on a detail page opens the catalog already filtered.</li>
            </ul>`,
  "forja.responsive":
    "<p>The form validates each field when you leave it, ties every error to its field and moves focus to the first error. It's a demo: no data is sent. On mobile, the menu opens and closes with the keyboard (Escape) and the cards go from four columns to one.</p>",
  "forja.alt.catalog": "Forja catalog filtered by Technology on desktop",
  "forja.alt.course": "Detail page for the Web programming course",
  "forja.alt.homeM": "Forja home on mobile",
  "forja.alt.catalogM": "Catalog filters on mobile",
  "forja.alt.formM": "Enrollment form on mobile",
  "forja.cap.catalog": "Catalog filtered by area, with a results counter.",
  "forja.cap.course": "Detail page generated from the course data.",
  "forja.cap.homeM": "Home on mobile.",
  "forja.cap.catalogM": "Filters on mobile.",
  "forja.cap.formM": "Enrollment form.",
  "forja.result": `<ul>
              <li>12 courses in 4 areas, filterable by area, mode and text, with a results counter and an empty state.</li>
              <li>A bilingual site; the language you pick is shared with this portfolio.</li>
              <li>GSAP animations that respect the reduced-motion preference.</li>
            </ul>
            <p class="case-credits">Photos: Unsplash. Libraries: Finsweet Attributes v2 and GSAP. Design, code and copy: Luis Selva.</p>`,

  "burger.lead":
    "A burger restaurant template I created in Webflow to sell, then rebuilt in Framer. This case compares how I solved the same things on both platforms.",
  "burger.demoWf": "Webflow demo",
  "burger.demoFr": "Framer demo",
  "burger.type": "Own template · sample content",
  "burger.role": "CMS, components, animations, SEO and QA in both versions",
  "burger.stack": "Webflow (CMS, Ecommerce, GSAP Interactions) · Framer (CMS, React code overrides)",
  "burger.coverAlt": "Burgerlicious home page in Webflow",
  "burger.goal":
    "<p>Have a restaurant template ready to sell: a menu and blog managed from the CMS, clear pages to order and get in touch, and animations that add personality without hurting load times.</p>",
  "burger.roleText": `<p><strong>In Webflow</strong> I started from the Ecommerce template I made in 2024 and cleaned it up:</p>
            <ul>
              <li>New CMS fields (featured, badge, vegetarian, spicy, calories, allergens and SEO on dishes; date and read time on the blog) and grouped field names for editors.</li>
              <li>Realistic copy instead of lorem ipsum, a CTA Banner component and SEO on every page.</li>
              <li>Four GSAP interactions: hero intro, word-by-word headings, cards on scroll and a hover lift.</li>
            </ul>
            <p><strong>In Framer</strong> I rebuilt it from scratch: 7 pages across three breakpoints, 4 CMS collections, category filters and the burger animation with code overrides.</p>`,
  "burger.compareTitle": "Webflow vs Framer",
  "burger.feature": "Feature",
  "burger.compare": `<tr><th scope="row">Pages</th><td>Home, Menu, About, Contact, Blog and Chef, plus CMS and checkout templates</td><td>Home, Menu, About, Contact and Blog, plus dish and article templates</td></tr>
                <tr><th scope="row">CMS</th><td>Dishes (Ecommerce products), categories, blog, blog categories and chefs</td><td>Dishes, categories, blog and blog categories</td></tr>
                <tr><th scope="row">Menu filter</th><td>Links to category pages (the page reloads)</td><td>Tabs on the same page, with the category in the URL</td></tr>
                <tr><th scope="row">Animations</th><td>GSAP Interactions: hero intro, headings, cards on scroll and hover</td><td>Native effects and code overrides: the burger comes apart on scroll and the copy stays pinned</td></tr>
                <tr><th scope="row">Ordering</th><td>Webflow Ecommerce cart, demo only: no payments configured</td><td>No ecommerce: “Order now” leads to the contact page</td></tr>
                <tr><th scope="row">Forms</th><td>Native Webflow forms</td><td>Native Framer form</td></tr>
                <tr><th scope="row">Breakpoints</th><td>Desktop, tablet and mobile</td><td>Desktop, tablet (810 px) and mobile (390 px)</td></tr>`,
  "burger.demoNote":
    "<p><strong>What works and what's a demo.</strong> The CMS, filters and animations work in both versions. The Webflow cart is the template's Ecommerce structure, with no payments enabled. The forms are each platform's native forms and I haven't tested them with real submissions. Testimonials, FAQ answers and the address are still sample content.</p>",
  "burger.challenge":
    "<p>In Webflow, the hero burger comes apart layer by layer as you scroll. In Framer, the native scroll effects only switch between states: they don't follow the scroll continuously, so the effect looked jumpy.</p>",
  "burger.solution": `<ul>
              <li>I wrote React code overrides, one per layer, that read the container's position and move each layer with a spring (<code>useSpring</code>), calibrated against the Webflow version's measurements.</li>
              <li>Another override pins the hero copy on desktop only, using <code>matchMedia</code>.</li>
              <li>On tablet and mobile I scaled the burger down to the Webflow sizes so it doesn't cover the copy.</li>
            </ul>`,
  "burger.alt.wfMenu": "Burgerlicious menu page in Webflow",
  "burger.alt.frItem": "A dish page in the Framer version",
  "burger.alt.frHome": "Burgerlicious home in Framer",
  "burger.alt.wfM": "Webflow version home on mobile",
  "burger.alt.frM": "Framer version home on mobile",
  "burger.cap.wfMenu": "Webflow: menu from the CMS.",
  "burger.cap.frItem": "Framer: dish template with “Order now”.",
  "burger.cap.frHome": "Framer: the rebuilt home page.",
  "burger.cap.wfM": "Webflow on mobile.",
  "burger.cap.frM": "Framer on mobile.",
  "burger.result": `<ul>
              <li>Two published versions with equivalent content that can be compared side by side.</li>
              <li>Dishes and articles editable from the CMS on both platforms.</li>
              <li>Animations that respect the reduced-motion preference.</li>
            </ul>
            <p class="case-credits">Product photos: template assets. Fonts: Tanker and Inter. Structure, content, animations and QA: Luis Selva.</p>
            <p class="case-links">
              <a href="https://preview.webflow.com/preview/burgerlicious?utm_medium=preview_link&amp;utm_source=designer&amp;utm_content=burgerlicious&amp;preview=13c2b8aefe0be28419e0fbde25394973&amp;locale=en&amp;workflow=preview" target="_blank" rel="noopener">Preview in Webflow</a>
              <a href="https://framer.com/projects/Burgerlicious--Z3IbG6fEh3c73QAXGYFD-8Tz8F" target="_blank" rel="noopener">Preview in Framer</a>
            </p>`,
};
