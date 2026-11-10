/* ==========================================================================
   COIR-SHIELD — SINGLE SOURCE OF TRUTH
   Every word, number and provenance tag on the website lives in this file.
   Edit here; never edit the layout files to change a fact.

   RULES WHEN EDITING
   1. Every number must be followed by ONE provenance tag:
        ▲ = our own validated measurement
        ●  = literature benchmark / published standard
        ○ = design target / pending validation
      Write it right after the number and unit, e.g. "1.3 mmol/g ▲".
   2. Anything not yet known is written as [TBD: what is needed].
      It shows on the site as a highlighted placeholder.
   3. **double asterisks** make text bold.
   4. Run `npm run build` then `npm run verify` after every edit. The verify
      script fails if a number has no tag or a banned term appears.
   5. Never add process recipes (concentrations, times, temperatures, loadings,
      masses). Describe what a zone does, not how it is made.
   ========================================================================== */

export const site = {
  name: 'Coir-Shield',
  tagline: 'Coconut-waste filtration, designed for arsenic and lead.',

  // true  -> <meta name="robots" content="noindex"> on every page (hidden from search engines)
  // false -> pages may be indexed
  noindex: true,

  contactEmail: '[TBD: team contact email]',

  nav: [
    { id: 'index', label: 'Home' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'customers', label: 'For Customers' },
    { id: 'evidence', label: 'Evidence' },
    { id: 'business', label: 'Business & Impact' },
    { id: 'team', label: 'Team' },
  ],
  navToggleLabel: 'Menu',
  skipLink: 'Skip to main content',

  disclaimer: {
    title: 'Prototype — not yet certified',
    text: 'Coir-Shield is a student research prototype. It has not been certified by any authority, and we make no claim that water passed through it is fit for drinking. Figures marked ○ are design targets that still need validation.',
  },

  provenance: {
    title: 'How to read our numbers',
    intro: 'Every number on this site carries one of three marks, so you can always tell what we have measured from what we are aiming for.',
    items: [
      { tag: '▲', name: 'Validated', desc: 'Our own measurement, made on our bench and cross-checked.' },
      { tag: '●', name: 'Literature', desc: 'A published benchmark, guideline or standard, with its source.' },
      { tag: '○', name: 'Target', desc: 'A design target or estimate that is still pending validation.' },
    ],
    short: '▲ validated · ● literature · ○ target',
  },

  footer: {
    blurb: 'A low-cost, zero-electricity, gravity-fed household water filter puck made largely from coconut agricultural waste.',
    context: 'Conrad Challenge 2026-27 · The Water Challenge',
    school: 'Jayshree Periwal International School (JPIS), Jaipur',
    navTitle: 'Pages',
    legendTitle: 'Number key',
    contactTitle: 'Contact',
    contactLabel: 'Email the team',
    rights: 'Coir-Shield student team.',
  },
};

/* --------------------------------------------------------------------------
   CHART DATA — charts on the Home, Evidence and Business pages read from here.
   status: 'validated' | 'preliminary' | 'pending'
   -------------------------------------------------------------------------- */
export const charts = {
  carboxylate: {
    status: 'validated',
    statusLabel: 'Validated ▲',
    title: 'Zone 2 carboxylate site density',
    unit: 'mmol/g',
    axisMax: 1.6, // right-hand edge of the chart, in mmol/g (layout only)
    measured: { label: 'Coir-Shield citrate-coir (our measurement)', value: 1.3, tag: '▲' },
    benchmark: {
      label: 'Citric-acid-esterified lignocellulose (Hoang et al. 2021)',
      low: 1.0,
      high: 1.2,
      tag: '●',
    },
    caption: 'Site density counts the binding sites on the fibre. It is not a lead-removal result: lead uptake still has to be measured in breakthrough tests.',
  },

  breakthrough: {
    status: 'pending',
    statusLabel: 'Pending ○',
    title: 'Breakthrough curve (outlet concentration against litres treated)',
    xLabel: 'Litres treated',
    yLabel: 'Outlet concentration',
    limit: { label: 'WHO guideline', value: 10, unit: 'µg/L', tag: '●' },
    target: { label: 'Design capacity', value: 450, unit: 'L', tag: '○', approx: true },
    influent: '[TBD: influent As and Pb concentrations used in the test]',
    pendingLabel: 'No data yet',
    pendingNote: 'Schematic only. The dashed lines mark the guideline and our design target; no measured points exist yet.',
    preliminaryNote: 'Preliminary data. Not yet replicated.',
    // When results exist, add points as { litres: number, ugL: number } and set status to 'preliminary'.
    points: [],
  },

  cost: {
    status: 'preliminary',
    statusLabel: 'Under optimisation ○',
    title: 'Prototype raw-material cost per puck',
    total: '₹92–106 ○',
    silverShare: 88, // percent of raw-material cost (layout + label)
    silverLabel: 'Silver',
    silverTag: '○',
    otherLabel: 'All other materials (the remainder)',
    caption: 'Silver dominates the cost. The silver loading is being re-derived and may fall substantially, which would cut the cost per puck.',
    footnote: 'Bill of materials priced at industrial commodity rates. The prototype itself was built with retail-sourced material, which costs more.',
  },
};

/* --------------------------------------------------------------------------
   ZONES — shared by Home and How It Works
   -------------------------------------------------------------------------- */
export const zones = [
  {
    id: 'zone0',
    label: 'Zone 0',
    name: 'Iron pre-removal',
    short: 'Iron guard',
    plain: 'Takes dissolved iron out of the water first, so the next zone is free to deal with arsenic.',
    target: 'Design target: remove ~98% ○ of dissolved iron (Fe²⁺) before the water reaches Zone 1.',
    chemistryTitle: 'The chemistry',
    chemistry: [
      'This is the gating requirement for the whole puck. Groundwater in the field carries far more dissolved iron (Fe²⁺) than arsenic.',
      'Left alone, field-level Fe²⁺ would use up ~65× ○ more MnO₂ in Zone 1 than As(III) does (a stoichiometric estimate), and would release Mn²⁺ far above the WHO limit of 0.08 mg/L ●.',
      'Removing iron first protects the oxidant in Zone 1 and keeps manganese leaching in check. Both claims are pending validation.',
    ],
  },
  {
    id: 'zone1',
    label: 'Zone 1',
    name: 'Fe-Mn coconut-shell biochar',
    short: 'Arsenic zone',
    plain: 'Changes arsenic into a form that sticks, then holds on to it.',
    target: 'Target contaminant: arsenic. This is the only zone designed to capture arsenic.',
    chemistryTitle: 'The chemistry',
    chemistry: [
      'In the reducing aquifers of the Indo-Gangetic Plain, arsenic is mostly As(III), which is uncharged at drinking-water pH and hard to adsorb.',
      'MnO₂ on the biochar oxidises As(III) to As(V) (arsenate). The arsenate is then adsorbed on the iron-bearing surface of the same biochar.',
      'That is why the oxidation step exists: without it, most of the arsenic would pass straight through.',
    ],
  },
  {
    id: 'zone2',
    label: 'Zone 2',
    name: 'Citrate-coir with silver',
    short: 'Lead zone',
    plain: 'Coconut fibre with negatively charged sites grabs lead, and a little silver keeps slime from growing.',
    target: 'Target contaminant: lead (Pb²⁺). Measured site density: 1.3 mmol/g ▲.',
    chemistryTitle: 'The chemistry',
    chemistry: [
      'Citric-acid treatment gives the alkali-pretreated coir carboxylate groups. At drinking-water pH these carry a negative charge and capture metal cations such as Pb²⁺.',
      'We measured 1.3 mmol/g ▲ of carboxylate sites, against a literature benchmark of 1.0–1.2 mmol/g ● for citric-acid-esterified lignocellulose (Hoang et al. 2021).',
      'Silver nanoparticles on the fibre suppress biofilm. The coir is not an arsenic adsorbent: arsenate is negatively charged, so arsenic is handled in Zone 1.',
    ],
  },
];

/* --------------------------------------------------------------------------
   LIFECYCLE — the take-back loop (How It Works, Business)
   icon names: factory, shop, drop, return, truck, flame
   -------------------------------------------------------------------------- */
export const lifecycle = {
  centre: ['Take-back', 'loop'],
  alt: 'Diagram of the Coir-Shield loop: the puck is made, sold at a kirana store, used at home, returned to the store, collected by a distributor truck, and treated at a regional hub.',
  steps: [
    { icon: 'factory', short: 'Made', title: 'Made', text: 'The puck is made largely from coconut agricultural waste: shell for the biochar, coir fibre for the lead zone.' },
    { icon: 'shop', short: 'Sold', title: 'Sold at the kirana store', text: 'Households buy it as a monthly subscription from the local kirana store, through existing rural FMCG distribution.' },
    { icon: 'drop', short: 'Used', title: 'Used at home', text: 'Water runs through the puck by gravity. No electricity, no pump.' },
    { icon: 'return', short: 'Returned', title: 'Returned', text: 'The household brings the spent puck back to the store. Returning it unlocks the lower price on the next one.' },
    { icon: 'truck', short: 'Collected', title: 'Collected by the FMCG truck', text: 'Distributor trucks that already deliver to the store carry spent pucks on their return trip to a regional hub.' },
    { icon: 'flame', short: 'Hub', title: 'End of life at the hub', text: 'Design target ○: thermal treatment (pyrolysis) stabilises the biomass and concentrates the captured metals for specialist recovery. Emissions control is required, because arsenic compounds can volatilise at pyrolysis temperatures. Metal recovery is a potential recovery pathway, under evaluation.' },
  ],
};

/* ==========================================================================
   PAGES
   ========================================================================== */
export const pages = {
  /* ------------------------------------------------------------------ HOME */
  home: {
    title: 'Coir-Shield — arsenic and lead filtration from coconut waste',
    description: 'Coir-Shield is a low-cost, zero-electricity, gravity-fed household water filter puck made from coconut waste, designed for arsenic and lead in Indo-Gangetic Plain groundwater. Student prototype, not yet certified.',

    hero: {
      eyebrow: 'Conrad Challenge 2026-27 · The Water Challenge',
      title: ['Arsenic and lead filtration,', 'built from ', 'coconut waste', '.'], // 3rd item is highlighted
      sub: 'Coir-Shield is a low-cost, zero-electricity, gravity-fed household water filter puck, designed for the groundwater of the Indo-Gangetic Plain.',
      primary: { label: 'See how it works', href: 'how-it-works' },
      secondary: { label: 'Check the evidence', href: 'evidence' },
      figureCaption: 'Cross-section of the puck. Water moves down through three zones by gravity.',
    },

    problem: {
      eyebrow: 'The problem',
      title: 'The water looks clean. The risk is invisible.',
      paras: [
        'Across the Indo-Gangetic Plain (IGP), many households drink groundwater from hand pumps and tube wells. Arsenic and lead are the main threats in that groundwater, and neither has a taste, colour or smell.',
        'Both are toxic when people drink them over years. The World Health Organization guideline for each is 10 µg/L ●, and both values are designated provisional.',
        'Most filters that deal with these metals need electricity, plumbing or costly replacement parts. Households that depend on a hand pump often have none of those.',
      ],
      facts: [
        { label: 'Target contaminants', value: 'Arsenic (As) and lead (Pb) only' },
        { label: 'WHO guideline, each', value: '10 µg/L ●' },
        { label: 'People exposed in the IGP', value: '[TBD: exposure statistic with source]' },
      ],
    },

    solution: {
      eyebrow: 'The solution',
      title: 'One puck. Three zones. No electricity.',
      lead: 'Water drips through the puck under its own weight. Each zone has one job, and the order matters.',
      cta: { label: 'Open the full model', href: 'how-it-works' },
    },

    snapshot: {
      eyebrow: 'Where we stand',
      title: 'What we have measured, and what we are still aiming for',
      lead: 'We label every number. One result is validated on our bench. The rest are targets we still have to earn.',
      cardTitle: 'Evidence snapshot',
      cardStatus: 'Prototype stage',
      stats: [
        { value: '1.3 mmol/g ▲', label: 'Carboxylate sites on our citrate-coir' },
        { value: '1.0–1.2 mmol/g ●', label: 'Literature benchmark (Hoang et al. 2021)' },
        { value: '~450 L ○', label: 'Design capacity per puck, to breakthrough at 10 µg/L ●' },
        { value: '₹92–106 ○', label: 'Prototype raw-material cost per puck, under optimisation' },
      ],
      cta: { label: 'See all the evidence', href: 'evidence' },
    },

    impact: {
      eyebrow: 'Intended impact',
      title: 'What we want Coir-Shield to change',
      lead: 'These are intentions, not results. We will only claim impact once the tests on our Evidence page are done.',
      items: [
        { icon: 'drop', title: 'Lower exposure at home', text: 'Cut the arsenic and lead that households take in through drinking water, at the point where they collect it.' },
        { icon: 'coin', title: 'A price that fits a monthly budget', text: 'A returned puck unlocks a subsidised price for the next one, for example ₹30 ○.' },
        { icon: 'leaf', title: 'Waste becomes the filter', text: 'Coconut shell and coir, both agricultural waste, are the main raw materials.' },
        { icon: 'return', title: 'Captured metals do not go back to the village', text: 'Spent pucks are collected and treated at a hub instead of being thrown away locally.' },
      ],
      tbd: '[TBD: quantified impact goal, e.g. households reached in a pilot, with source or plan]',
    },

    explore: {
      eyebrow: 'Explore',
      title: 'Find what you came for',
      cards: [
        { href: 'how-it-works', icon: 'layers', title: 'How It Works', text: 'The puck in cross-section, the chemistry, and the full take-back loop.' },
        { href: 'customers', icon: 'home', title: 'For Customers', text: 'Step-by-step guides for households and for kirana store owners.' },
        { href: 'evidence', icon: 'flask', title: 'Evidence', text: 'Our validated result, the test bench, pending tests and the standards we work to.' },
        { href: 'business', icon: 'coin', title: 'Business & Impact', text: 'Kirana go-to-market, the deposit-return model and cost.' },
        { href: 'team', icon: 'users', title: 'Team', text: 'Who we are, our mission, vision and values, and how to reach us.' },
      ],
    },
  },

  /* ---------------------------------------------------------- HOW IT WORKS */
  how: {
    title: 'How It Works — Coir-Shield',
    description: 'The Coir-Shield model: a cross-section of the three-zone puck, the chemistry of each zone, the take-back lifecycle, and what we deliberately do not target.',

    hero: {
      eyebrow: 'The model',
      title: 'How Coir-Shield works',
      lead: 'Three zones in one puck. Water enters at the top and gravity does the rest: Zone 0 → Zone 1 → Zone 2.',
    },

    model: {
      title: 'Inside the puck',
      figureCaption: 'Cross-section, not to scale. Iron is stopped in Zone 0, arsenic in Zone 1, lead in Zone 2.',
      window: {
        title: 'Operating window',
        value: 'pH 6.5–8.0 ○',
        text: 'This is a design decision, not a literature optimum. It is bounded by the Indian drinking-water standard BIS IS 10500:2012 and by arsenate adsorption chemistry (Dixit & Hering 2003; Jang et al. 2006).',
      },
      capacity: {
        title: 'Design capacity',
        value: '~450 L ○',
        text: 'Per puck, to breakthrough at the WHO guideline of 10 µg/L ●. Influent concentration for this target: [TBD: stated influent As and Pb concentrations].',
      },
      benefitsTitle: 'What the design gives the user',
      benefits: [
        { icon: 'bolt', title: 'Zero electricity', text: 'Gravity-fed. It works where power is unreliable.' },
        { icon: 'coin', title: 'Low cost', text: 'Made largely from coconut waste, sold through shops that already exist.' },
        { icon: 'target', title: 'Built for local water', text: 'Aimed at the two main groundwater threats in the IGP: arsenic and lead.' },
        { icon: 'return', title: 'No loose ends', text: 'A deposit-return loop brings spent pucks back for controlled treatment.' },
      ],
    },

    svg: {
      alt: 'Cross-section of the Coir-Shield puck. Raw groundwater carrying iron, arsenic and lead enters at the top. Zone 0 stops iron. Zone 1, an iron-manganese coconut-shell biochar, oxidises and captures arsenic. Zone 2, citrate-coir with silver, captures lead. Filtered water leaves at the bottom.',
      inlet: 'Raw groundwater in',
      outlet: 'Filtered water out',
      stops: { zone0: 'Fe stops here', zone1: 'As stops here', zone2: 'Pb stops here' },
    },

    lifecycle: {
      eyebrow: 'The full loop',
      title: 'From coconut waste to the hub, and round again',
      lead: 'A filter that traps toxic metals has to be taken back. The loop uses trucks and shops that are already there.',
    },

    scope: {
      eyebrow: 'Honest scope',
      title: 'What we deliberately don’t target, and why',
      lead: 'Coir-Shield targets arsenic and lead only. Saying no to the rest is part of the design.',
      items: [
        { name: 'Mercury (Hg)', reason: 'Scoped out on chemistry grounds (HSAB). Mercury is a soft acid; the oxygen-donor carboxylate sites on our coir are hard bases, so the match is weak.' },
        { name: 'Chromium (Cr)', reason: 'Scoped out on chemistry grounds (HSAB). [TBD: team to confirm the exact chromium rationale, including speciation]' },
        { name: 'Cadmium (Cd)', reason: 'Scoped out because we do not have enough evidence. We will not claim what we cannot support.' },
        { name: 'Hardness (calcium)', reason: 'Not a target. Hardness has no WHO health-based guideline, and softening is not what this puck is for.' },
        { name: 'Arsenic on the coir', reason: 'The coir zone is for lead. Arsenic is handled by the biochar in Zone 1.' },
      ],
    },
  },

  /* --------------------------------------------------------- FOR CUSTOMERS */
  customers: {
    title: 'For Customers — Coir-Shield',
    description: 'How households and kirana store owners would use Coir-Shield: buying, fitting, daily use, replacement, returns, stocking and pickup. Prototype, not yet on sale.',

    hero: {
      eyebrow: 'For customers',
      title: 'How you would use Coir-Shield',
      lead: 'Pick your guide. Each one is a few short steps.',
      notice: 'Coir-Shield is a prototype. It is not on sale yet and is not yet certified. This page shows how the service is designed to work.',
    },

    tabsLabel: 'Choose your guide',
    tabs: [
      {
        id: 'household',
        label: 'I use water at home',
        title: 'For households',
        intro: 'No power. No plumbing. Buy it where you already shop.',
        steps: [
          { icon: 'shop', title: 'Buy it at your kirana store', text: 'Ask for Coir-Shield at your local kirana store. You sign up once and get a new puck each month.' },
          { icon: 'fit', title: 'Fit the puck', text: 'Place the puck in the filter holder. [TBD: fitting instructions and compatible container]' },
          { icon: 'drop', title: 'Use it every day', text: 'Pour water in at the top. It drips through on its own. No electricity needed.' },
          { icon: 'calendar', title: 'Know when to change it', text: 'Change the puck when you see the signal: [TBD: replacement signal]. Each puck is designed for ~450 L ○.' },
          { icon: 'return', title: 'Bring the old puck back', text: 'Hand the used puck to the shopkeeper. You then pay the lower price for the next one, for example ₹30 ○. Without a return, the price is higher: [TBD: non-return price].' },
        ],
        notesTitle: 'Good to know',
        notes: [
          'Do not throw a used puck away or burn it. It holds the metals it has trapped. Always return it.',
          'The puck is designed for arsenic and lead. It is not designed to remove germs or to soften hard water.',
          'Questions the team still has to answer: [TBD: storage, first-use rinse and shelf life guidance].',
        ],
      },
      {
        id: 'kirana',
        label: 'I run a kirana store',
        title: 'For kirana store owners',
        intro: 'A small product that brings customers back every month.',
        steps: [
          { icon: 'box', title: 'Stock the pucks', text: 'New pucks arrive with your usual FMCG delivery. [TBD: pack size and storage needs]' },
          { icon: 'users', title: 'Sign up households', text: 'Customers subscribe at your counter and collect one puck each month.' },
          { icon: 'return', title: 'Run the take-back counter', text: 'When a customer returns a used puck, give them the lower price. Put the used puck in the return bin. [TBD: return bin and handling instructions]' },
          { icon: 'truck', title: 'Hand over at truck pickup', text: 'Your distributor’s truck already comes to you. On its return trip it takes the used pucks to the regional hub.' },
          { icon: 'coin', title: 'Earn on every puck', text: 'What you earn: [TBD: owner margin per puck and any take-back fee].' },
        ],
        notesTitle: 'Good to know',
        notes: [
          'You do not open, clean or treat used pucks. You only collect them.',
          'Used pucks stay in the return bin until the truck comes.',
          'Still to be agreed with distributors: [TBD: pickup frequency and paperwork].',
        ],
      },
    ],

    help: {
      title: 'Still have a question?',
      text: 'Write to the team and we will answer.',
    },
  },

  /* --------------------------------------------------------------- EVIDENCE */
  evidence: {
    title: 'Evidence — Coir-Shield',
    description: 'Coir-Shield evidence base: provenance legend, validated carboxylate site density against its literature benchmark, the test bench, pending tests, and WHO and BIS regulatory anchors. Prototype, not yet certified.',

    hero: {
      eyebrow: 'Evidence',
      title: 'What we know, what we cite, what we still owe',
      lead: 'We would rather show one solid measurement and an honest to-do list than a page of numbers we cannot defend.',
    },

    validated: {
      eyebrow: 'Validated result',
      title: 'More binding sites than the literature benchmark',
      paras: [
        'Zone 2 depends on carboxylate groups: they are the sites that hold lead. We measured how many there are per gram of our citrate-coir.',
        'Result: 1.3 mmol/g ▲. The literature benchmark for citric-acid-esterified lignocellulose is 1.0–1.2 mmol/g ● (Hoang et al. 2021).',
      ],
      methodTitle: 'How we measured it',
      method: [
        'NaOH back-titration, against HCl that we standardised with Na₂CO₃.',
        'Corroborated gravimetrically, as an independent cross-check.',
        'Replicates and uncertainty: [TBD: number of replicates and measurement uncertainty].',
      ],
      limitsTitle: 'What this result does not show',
      limits: 'Site density is a capacity indicator. It does not yet tell us how many litres a puck treats before lead breaks through. That needs the column tests listed below.',
    },

    bench: {
      eyebrow: 'Test bench',
      title: 'How we test',
      lead: 'Performance will be reported as bed volumes or litres to breakthrough at a stated influent concentration. We do not report a bare removal percentage.',
      items: [
        { icon: 'gauge', title: 'Dissolved oxygen (DO) sensor', text: 'Tracks oxygen in the test water. Oxygen affects how iron and arsenic behave, so we log it during runs.' },
        { icon: 'gauge', title: 'Oxidation-reduction potential (ORP) sensor', text: 'Shows whether the water is reducing or oxidising. IGP aquifers are reducing, which is why As(III) dominates there.' },
        { icon: 'flask', title: 'Silver nanoparticle check', text: 'Spectrophotometer check for the surface plasmon resonance peak of silver nanoparticles, expected at λmax 400–420 nm ●. Status: [TBD: confirm whether completed, with result].' },
        { icon: 'flask', title: 'Arsenate capture proxy', text: 'A molybdenum-blue phosphate assay used as a stand-in for arsenate capture. Status: pending ○.' },
      ],
    },

    chartsBlock: {
      eyebrow: 'Charts',
      title: 'Data, wired to one file',
      lead: 'These charts read from the same data file as the rest of the site. When a result is not in yet, the chart says so.',
    },

    pending: {
      eyebrow: 'Pending tests',
      title: 'What we still have to prove',
      lead: 'Each row is a claim we make as a design target ○. None is validated yet.',
      columns: ['Test', 'What it must show', 'Target or limit', 'Status'],
      rows: [
        ['Zone 0 iron removal', 'Dissolved Fe²⁺ is removed before Zone 1', '~98% ○ of Fe²⁺', 'Pending ○'],
        ['Manganese leaching', 'Mn²⁺ released from Zone 1 stays under the WHO limit', '0.08 mg/L ●', 'Pending ○'],
        ['Silver leaching', 'Silver released from Zone 2 stays under the BIS limit', '[TBD: BIS IS 10500:2012 Table 2 value for Ag]', 'Pending ○'],
        ['Arsenate capture proxy', 'Molybdenum-blue phosphate assay tracks capture in Zone 1', '[TBD: acceptance criterion]', 'Pending ○'],
        ['Arsenic breakthrough', 'Litres treated before the outlet reaches the guideline', '~450 L ○ at 10 µg/L ●', 'Pending ○'],
        ['Lead breakthrough', 'Litres treated before the outlet reaches the guideline', '~450 L ○ at 10 µg/L ●', 'Pending ○'],
        ['Operating pH window', 'Performance holds across the design window', 'pH 6.5–8.0 ○', 'Pending ○'],
        ['Independent verification', 'An accredited laboratory repeats key results', '[TBD: laboratory and method, e.g. ICP-MS]', '[TBD: plan and date]'],
      ],
    },

    regulatory: {
      eyebrow: 'Regulatory anchors',
      title: 'The limits we work to',
      lead: 'We design against two documents: the WHO Guidelines for Drinking-water Quality (GDWQ), 4th edition, and the Indian standard BIS IS 10500:2012.',
      columns: ['Parameter', 'WHO GDWQ, 4th edition', 'BIS IS 10500:2012', 'Role in Coir-Shield'],
      rows: [
        ['Arsenic (As)', '10 µg/L ● (provisional)', 'Table 3, toxic substances. [TBD: quote the limit from the standard]', 'Target contaminant'],
        ['Lead (Pb)', '10 µg/L ● (provisional)', 'Table 3, toxic substances. [TBD: quote the limit from the standard]', 'Target contaminant'],
        ['Manganese (Mn)', '0.08 mg/L ●', 'Table 2, undesirable substances. [TBD: quote the limit from the standard]', 'Must not leach from Zone 1'],
        ['Silver (Ag)', '[TBD: confirm WHO position on silver]', 'Table 2, undesirable substances. [TBD: quote the limit from the standard]', 'Must not leach from Zone 2'],
        ['Hardness', 'No health-based guideline', 'Not a Coir-Shield parameter', 'Not a target'],
      ],
      note: 'Compliance with these limits has not been demonstrated yet. They are the yardsticks for the pending tests above.',
    },
  },

  /* --------------------------------------------------------------- BUSINESS */
  business: {
    title: 'Business & Impact — Coir-Shield',
    description: 'The Coir-Shield business model: kirana store go-to-market, monthly subscription with deposit-return pricing, cost under optimisation, end-of-life plan and open questions.',

    hero: {
      eyebrow: 'Business & impact',
      title: 'A filter that travels on roads already driven',
      lead: 'We do not build a new supply chain. We use the kirana stores and FMCG trucks that already reach rural households.',
    },

    market: {
      eyebrow: 'Market',
      title: 'Who it is for',
      paras: [
        'Our first market is households in the Indo-Gangetic Plain that drink groundwater and face arsenic or lead exposure.',
        'They need something that works without electricity, costs little each month, and is sold somewhere they already go.',
      ],
      facts: [
        { label: 'Households in the target area', value: '[TBD: market size with source]' },
        { label: 'Pilot location', value: '[TBD: pilot district or village]' },
        { label: 'Customer research', value: '[TBD: interviews or survey results]' },
      ],
    },

    gtm: {
      eyebrow: 'Go-to-market',
      title: 'Sold where people already shop',
      lead: 'The kirana store is the most trusted shop in a village. That is our sales counter and our return point.',
      items: [
        { icon: 'shop', title: 'Kirana stores as the channel', text: 'Coir-Shield rides on existing rural FMCG distribution. No new shops, no new sales force.' },
        { icon: 'calendar', title: 'Monthly subscription', text: 'One puck each month. A steady habit for the household and steady footfall for the shop.' },
        { icon: 'truck', title: 'Reverse logistics for free capacity', text: 'Distributor trucks collect spent pucks on return trips they already make.' },
        { icon: 'megaphone', title: 'Marketing plan', text: '[TBD: awareness and marketing plan, channels and budget]' },
      ],
    },

    pricing: {
      eyebrow: 'Subscription and deposit',
      title: 'Return the puck, pay less',
      lead: 'Deposit-return pricing gives every household a reason to bring the spent puck back.',
      options: [
        { title: 'With a returned puck', price: '₹30 ○', note: 'Example subsidised price for the next puck.', good: true },
        { title: 'Without a return', price: '[TBD: non-return price]', note: 'A higher price applies when no spent puck comes back.', good: false },
      ],
      why: 'The price gap pays for itself in two ways: it keeps toxic metals out of village waste, and it secures the material flow to the hub.',
    },

    cost: {
      eyebrow: 'Cost',
      title: 'Cost per puck: under optimisation',
      paras: [
        'Prototype raw-material cost is ₹92–106 ○ per puck. About 88% ○ of that is silver.',
        'The silver loading is being re-derived and may fall substantially. Because silver is nearly all of the cost, that single change would move the price more than anything else.',
      ],
      facts: [
        { label: 'Manufacturing and packaging cost', value: '[TBD: per-puck estimate]' },
        { label: 'Distribution and kirana margin', value: '[TBD: per-puck estimate]' },
        { label: 'Break-even and funding need', value: '[TBD: financial model]' },
      ],
    },

    eol: {
      eyebrow: 'End of life',
      title: 'What happens to a spent puck',
      status: 'Design target ○',
      paras: [
        'At the regional hub, thermal treatment (pyrolysis) is planned to stabilise the biomass and concentrate the captured metals for specialist recovery.',
        'Emissions control is required, because arsenic compounds can volatilise at pyrolysis temperatures.',
        'Recovery of the concentrated metals is a potential recovery pathway, under evaluation. We have no recovery partner and make no revenue claim from it.',
      ],
    },

    competition: {
      eyebrow: 'Competition',
      title: 'How we compare',
      lead: 'We will fill this table only with figures we can source.',
      columns: ['Option', 'Needs electricity', 'Monthly cost', 'Targets As and Pb', 'Take-back'],
      rows: [
        ['Coir-Shield (design)', 'No', '[TBD: subscription price]', 'Yes, by design ○', 'Yes, deposit-return'],
        ['[TBD: competitor or alternative]', '[TBD]', '[TBD]', '[TBD]', '[TBD]'],
        ['[TBD: competitor or alternative]', '[TBD]', '[TBD]', '[TBD]', '[TBD]'],
      ],
    },

    risks: {
      eyebrow: 'Open questions',
      title: 'What could stop us, and what we are doing about it',
      items: [
        { title: 'Silver cost', text: 'Silver is about 88% ○ of raw-material cost. We are re-deriving the loading.' },
        { title: 'Iron in field water', text: 'Zone 0 must hit its iron target, or Zone 1 is exhausted early and manganese can leach.' },
        { title: 'Hub emissions', text: 'Pyrolysis needs emissions control for arsenic. The hub design is not final.' },
        { title: 'Replacement signal', text: 'Households need a clear cue to change the puck: [TBD: replacement signal].' },
      ],
    },
  },

  /* ------------------------------------------------------------------ TEAM */
  team: {
    title: 'Team — Coir-Shield',
    description: 'The Coir-Shield team from Jayshree Periwal International School, Jaipur: our story, mission, vision, values, members and contact.',

    hero: {
      eyebrow: 'Team',
      title: 'Students, a bench, and a stubborn problem',
      lead: 'We are a student team from Jayshree Periwal International School (JPIS), Jaipur, entering the Conrad Challenge 2026-27 in The Water Challenge category.',
    },

    story: {
      eyebrow: 'Our story',
      title: 'Why we started',
      paras: [
        '[TBD: team story — how the project began and why this problem matters to the team, in the team’s own words]',
        'What we can already say: we chose arsenic and lead in Indo-Gangetic Plain groundwater because the threat is invisible, and because the households facing it are the least likely to have power or money for a conventional purifier.',
        'We build and test the puck ourselves, and we tag every number on this site so that readers can check us.',
      ],
    },

    mvv: {
      mission: {
        title: 'Mission',
        text: 'To put affordable, electricity-free arsenic and lead filtration within reach of households in the Indo-Gangetic Plain, using coconut waste and the shops they already trust.',
      },
      vision: {
        title: 'Vision',
        text: 'A future in which no family has to choose between the water it can reach and the water it can trust.',
      },
      valuesTitle: 'Values',
      values: [
        { title: 'Evidence before claims', text: 'Every number is tagged as measured, cited or targeted.' },
        { title: 'Honest scope', text: 'We name what the puck does not do, and why.' },
        { title: 'Design for the last mile', text: 'If it needs power, plumbing or a new shop, it is not our design.' },
        { title: 'Close the loop', text: 'A filter is not finished until the spent puck is safely dealt with.' },
      ],
    },

    members: {
      eyebrow: 'Members',
      title: 'Who we are',
      list: [
        { name: 'Vardaan Potdar', role: 'Project lead · Bench work', bio: 'Leads the project and the laboratory work.' },
        { name: 'Ayush [TBD: surname]', role: '[TBD: role]', bio: '[TBD: short bio]' },
        { name: '[TBD: third team member]', role: '[TBD: role]', bio: 'We are recruiting this team member.' },
      ],
      coachLabel: 'Coach',
      coach: { name: '[TBD: coach name]', role: 'Team coach', bio: '[TBD: coach title and affiliation]' },
      schoolLabel: 'School',
      school: 'Jayshree Periwal International School (JPIS), Jaipur',
    },

    contact: {
      eyebrow: 'Contact',
      title: 'Talk to us',
      text: 'Judges, mentors, kirana owners and curious households are all welcome to write.',
      button: 'Email the team',
    },
  },
};
