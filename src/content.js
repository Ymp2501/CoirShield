/* ==========================================================================
   COIR-SHIELD — SINGLE SOURCE OF TRUTH
   Every word, number and provenance tag on the website lives in this file.
   Edit here; never edit the layout files to change a fact.

   RULES WHEN EDITING
   1. Every number must be followed by ONE provenance tag:
        ▲ = our own validated measurement
        ●  = literature / official source
        ○ = design target or estimate
      Write it right after the number and unit, e.g. "0.01 mg/L ●".
   2. Anything not yet known is written as [TBD: what is needed].
      It shows on the site as a highlighted placeholder.
   3. Markup you can use inside any text:
        **bold**
        [[source label|https://link]]   a source link (numbers inside it need no tag)
        [[note]]                        a source note with no link
        {{hi|हिन्दी}}                     Hindi text
   4. Run `npm run build` then `npm run verify` after every edit. The verify
      script fails if a number has no tag or a banned term appears.
   5. Never add process recipes (concentrations, times, temperatures, loadings,
      masses). Describe what a zone does, not how it is made.
   ========================================================================== */

export const site = {
  name: 'Coir-Shield',
  nameHi: '{{hi|जाँच शील्ड}}',
  taglineHi: '{{hi|जाँच से भरोसा}}: Trust you can test.',

  // true  -> <meta name="robots" content="noindex"> on every page (hidden from search engines)
  // false -> pages may be indexed
  noindex: true,

  // Colour scheme for the whole site: 'light' or 'dark'. (A build setting, not a visitor toggle.)
  theme: 'light',
  // true -> the Home hero sits on a dark band (brand rule: dark for the Home hero only). false -> hero is light too.
  darkHero: true,

  // true  -> show our own carboxyl-density measurement (▲) on Home, How It Works and Evidence
  // false -> hide it everywhere until replicates (n) and ± SD are ready to publish
  showValidatedResult: true,

  contactEmail: '[TBD: team contact email — use a dedicated project address]',

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
    text: 'Coir-Shield is a student research prototype. It has not been certified by any authority or tested by an independent laboratory, and we make no claim that water passed through it is fit for drinking. Figures marked ○ are design targets or estimates that still need validation.',
  },

  provenance: {
    title: 'How to read our numbers',
    intro: 'Every number on this site carries one of three marks, so you can always tell what we have measured from what we are aiming for.',
    items: [
      { tag: '▲', name: 'Validated', desc: 'Our own measurement, made on our bench and cross-checked.' },
      { tag: '●', name: 'Literature', desc: 'A published benchmark, guideline, standard or official source.' },
      { tag: '○', name: 'Target', desc: 'A design target or estimate that is still pending validation.' },
    ],
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
   CHART DATA — charts on the Evidence and Business pages read from here.
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
    caption: 'Site density counts the binding sites on the fibre. It is not a lead-removal result: lead uptake still has to be measured. Replicates and spread: [TBD: n and ± SD for this measurement].',
  },

  breakthrough: {
    status: 'pending',
    statusLabel: 'Pending ○',
    title: 'Breakthrough curve (outlet concentration against litres treated)',
    xLabel: 'Litres treated',
    yLabel: 'Outlet concentration',
    limit: { label: 'WHO guideline', value: 10, unit: 'µg/L', tag: '●' },
    target: { label: 'Design target', value: 450, unit: 'L', tag: '○', approx: true },
    influent: '[TBD: influent arsenic and lead concentrations used in the test]',
    pendingLabel: 'No data yet',
    pendingNote: 'Schematic only. The dashed lines mark the guideline and our design target; no measured points exist yet.',
    preliminaryNote: 'Preliminary data. Not yet replicated.',
    // When results exist, add points as { litres: number, ugL: number } and set status to 'preliminary'.
    points: [],
  },

  // Where each rupee of the target puck price goes. All estimates (○).
  unit: {
    status: 'preliminary',
    statusLabel: 'Estimate ○',
    title: 'Where the price of one puck goes',
    price: 99, // ₹, target monthly price with a returned puck
    priceLabel: '₹99 ○ target price per puck',
    items: [
      { label: 'Puck materials', value: 38, tag: '○' },
      { label: 'SHG seller margin and collection', value: 17.85, tag: '○' },
      { label: 'Transport', value: 2, tag: '○' },
      { label: 'Kiln co-processing (not yet quoted)', value: 5, tag: '○' },
      { label: 'Re-test and refund reserve', value: 15, tag: '○' },
      { label: 'Contribution', value: 19.65, tag: '○', highlight: true },
    ],
    // Shown when the items above do not add up to the price.
    remainderLabel: '[TBD: the cost lines above leave ₹1.50 of the price unaccounted for — confirm the missing line]',
    caption: 'Contribution is ₹19.65 ○ per ₹99 ○ puck, about 20% ○. Every figure here is an estimate, to be confirmed after final costing.',
    footnote: 'Bill of materials priced at industrial commodity rates. The prototype itself was built with retail-sourced material, which costs more.',
  },
};

/* --------------------------------------------------------------------------
   ZONES — shared by Home and How It Works
   `validated` lines appear only when site.showValidatedResult is true.
   -------------------------------------------------------------------------- */
export const zones = [
  {
    id: 'zone0',
    label: 'Zone 0',
    name: 'Iron pre-removal',
    short: 'Iron guard',
    plain: 'Takes dissolved iron out of the water first, so it cannot use up the arsenic chemistry in the next zone.',
    target: 'Design target: remove ~98% ○ of dissolved iron (Fe²⁺) before the water reaches Zone 1. Iron removal protects the arsenic zone; we do not claim it as a health benefit.',
    chemistryTitle: 'The chemistry',
    chemistry: [
      'This is the gating requirement for the whole puck. Groundwater in the field carries far more dissolved iron (Fe²⁺) than arsenic.',
      'Left alone, field-level Fe²⁺ would use up ~65× ○ more MnO₂ in Zone 1 than As(III) does (a stoichiometric estimate), and would release Mn²⁺ far above the WHO limit of 0.08 mg/L ●.',
      'Removing iron first protects the oxidant in Zone 1 and keeps manganese release in check. Both claims are pending validation.',
    ],
  },
  {
    id: 'zone1',
    label: 'Zone 1',
    name: 'Fe-Mn coconut-shell biochar',
    short: 'Arsenic zone',
    plain: 'Changes arsenic into a form that sticks, then holds on to it, all on one surface.',
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
    plain: 'Coconut fibre with negatively charged sites captures lead last, and mops up any manganese released upstream. A little silver stops slime growing inside the puck.',
    target: 'Target contaminant: lead (Pb²⁺).',
    validatedTarget: 'Measured site density: 1.3 mmol/g ▲.',
    chemistryTitle: 'The chemistry',
    chemistry: [
      'Citric-acid treatment gives the alkali-pretreated coir carboxylate groups. At drinking-water pH these carry a negative charge and capture metal cations such as Pb²⁺.',
      'Silver nanoparticles on the fibre suppress biofilm inside the puck only. The coir is not an arsenic adsorbent: arsenate is negatively charged, so arsenic is handled in Zone 1.',
    ],
    validatedChemistry: 'We measured 1.3 mmol/g ▲ of carboxylate sites, against a literature benchmark of 1.0–1.2 mmol/g ● for citric-acid-esterified lignocellulose (Hoang et al. 2021).',
  },
];

/* --------------------------------------------------------------------------
   JOURNEY — the life of one puck (How It Works, Business)
   icon names: factory, flask, users, drop, return, box, flame
   -------------------------------------------------------------------------- */
export const lifecycle = {
  centre: ['Life of', 'one puck'],
  alt: 'Diagram of the life of one Coir-Shield puck: made from coconut waste, offered after a free water test, delivered to the door by a self-help group, used at home, returned in a sealed bag, aggregated at block level, and co-processed in a cement kiln.',
  steps: [
    { icon: 'factory', short: 'Made', title: 'Made', text: 'The puck is made largely from coconut agricultural waste: shell for the biochar, coir fibre for the lead zone.' },
    { icon: 'flask', short: 'Tested', title: 'Water tested first', text: 'A partner NGO runs free water-testing camps and refers households whose water is above the limit.' },
    { icon: 'users', short: 'Delivered', title: 'Sold and swapped at the door', text: 'Women’s self-help groups (SHGs, NRLM) sell the puck and swap it at the door each month. Kirana stores are refill points for walk-ins.' },
    { icon: 'drop', short: 'Used', title: 'Used at home', text: 'Water runs through the puck by gravity. No electricity, no plumbing, no dosing.' },
    { icon: 'return', short: 'Returned', title: 'Returned in a sealed bag', text: 'The spent puck is sealed in its return bag and collected on the same visit. Its QR code is scanned.' },
    { icon: 'box', short: 'Aggregated', title: 'Aggregated at block level', text: 'SHGs bring spent pucks to a block or district aggregation point, where they are dried and shredded.' },
    { icon: 'flame', short: 'Kiln', title: 'Co-processed in a cement kiln', text: 'Design target ○: the shredded material is co-processed in a cement kiln at more than 1,400 °C ●, where the metals are bound into clinker. No kiln operator has quoted for this yet.' },
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
        'Arsenic and lead are invisible, odourless and tasteless, so families cannot tell their water is unsafe.',
        'Across the Indo-Gangetic Plain (IGP), many households drink groundwater from handpumps and borewells. Both metals are toxic when people drink them over years. The World Health Organization guideline for each is 10 µg/L ●, and both values are designated provisional.',
        'Most filters that deal with these metals need electricity, plumbing or costly replacement parts. Households that depend on a handpump often have none of those.',
      ],
      facts: [
        {
          label: 'Arsenic',
          value: 'Arsenic above the permissible limit has been reported in isolated pockets of 230 ● districts across 25 ● states and UTs.',
          source: '[[Ministry of Jal Shakti, Rajya Sabha Starred Q. 136, 9 Dec 2024|https://rsdebate.nic.in/bitstream/123456789/751713/1/PQ_266_09122024_S136_p1_p5.pdf]]',
        },
        {
          label: 'Uttar Pradesh',
          value: 'In Uttar Pradesh alone, 29 ● districts.',
          source: '[[CGWB Annual Ground Water Quality Report 2024, via Toxics Link|https://toxicslink.org/?p=9236]]',
        },
        {
          label: 'Lead (national context only)',
          value: 'Lead has been found in groundwater in parts of 92 ● districts in 14 ● states.',
          source: '[[Lok Sabha Starred Q. 407, 31 Mar 2022|https://eparlib.nic.in/bitstream/123456789/979283/1/AU4827.pdf]]',
          note: '[TBD: district-level lead source for the pilot district — needed before any lead claim there]',
        },
      ],
    },

    solution: {
      eyebrow: 'The solution',
      title: 'One puck. Three zones. No electricity.',
      lead: 'Water drips through the puck under its own weight. Each zone has one job. The order of the zones is the innovation, not any single reaction.',
      cta: { label: 'Open the full model', href: 'how-it-works' },
    },

    positioning: {
      title: 'What it is for, and what it is not',
      text: 'Coir-Shield targets the chemical layer (arsenic and lead). It is designed to run alongside boiling or other microbial treatment, not replace it.',
    },

    snapshot: {
      eyebrow: 'Where we stand',
      title: 'What we have measured, and what we are still aiming for',
      lead: 'We label every number. Most of what you see here is a target we still have to earn.',
      cardTitle: 'Evidence snapshot',
      cardStatus: 'Prototype stage',
      stats: [
        { value: '1.3 mmol/g ▲', label: 'Carboxylate sites on our citrate-coir. Literature benchmark: 1.0–1.2 mmol/g ● (Hoang et al. 2021).', validatedOnly: true },
        { value: '~450 L ○', label: 'Design target per puck, to breakthrough at 10 µg/L ●. Not a measured capacity.' },
        { value: '30 days ○', label: 'Maximum replacement interval. Column breakthrough testing will set the real interval.' },
        { value: '₹99 ○', label: 'Target monthly price for a puck when the old one is returned.' },
      ],
      cta: { label: 'See all the evidence', href: 'evidence' },
    },

    impact: {
      eyebrow: 'Intended impact',
      title: 'What we want Coir-Shield to change',
      lead: 'These are intentions, not results. We will only claim impact once the tests on our Evidence page are done.',
      items: [
        { icon: 'drop', title: 'Lower exposure at home', text: 'Cut the arsenic and lead that households take in through drinking and cooking water, at the point where they collect it.' },
        { icon: 'users', title: 'Income for rural women', text: 'Self-help group members sell, deliver and collect the pucks, and earn on each one.' },
        { icon: 'leaf', title: 'Waste becomes the filter', text: 'Coconut shell and coir, both agricultural waste, are the main raw materials. The filter draws no grid power.' },
        { icon: 'return', title: 'Captured metals do not go back to the village', text: 'Spent pucks are collected in sealed bags and sent for kiln co-processing instead of being thrown away locally.' },
      ],
      goals: [
        'Pilot: 300 ○ households in one arsenic-hotspot block, found through NGO testing camps and served by an SHG federation.',
        'A self-sustaining district operation needs about 570 ○ households (break-even at about 19 ○ pucks a day).',
      ],
    },

    explore: {
      eyebrow: 'Explore',
      title: 'Find what you came for',
      cards: [
        { href: 'how-it-works', icon: 'layers', title: 'How It Works', text: 'The filter, the puck in cross-section, the chemistry, and the life of one puck.' },
        { href: 'customers', icon: 'home', title: 'For Customers', text: 'Step-by-step guides for households, SHG sellers and kirana refill points.' },
        { href: 'evidence', icon: 'flask', title: 'Evidence', text: 'What is measured, the validation plan, and the standards we work to.' },
        { href: 'business', icon: 'coin', title: 'Business & Impact', text: 'Testing camps, doorstep swaps, prices, unit economics and competition.' },
        { href: 'team', icon: 'users', title: 'Team', text: 'Who we are, our mission, vision and values, and how to reach us.' },
      ],
    },
  },

  /* ---------------------------------------------------------- HOW IT WORKS */
  how: {
    title: 'How It Works — Coir-Shield',
    description: 'The Coir-Shield model: the two-chamber gravity filter, a cross-section of the three-zone puck, the chemistry of each zone, the life of one puck, and what we deliberately do not target.',

    hero: {
      eyebrow: 'The model',
      title: 'How Coir-Shield works',
      lead: 'Pour borewell or handpump water into the upper chamber. Gravity pulls it down through the three zones of the puck. Draw treated water from the tap in the lower chamber. No electricity, no plumbing, no dosing.',
    },

    device: {
      eyebrow: 'The filter',
      title: 'A two-chamber gravity filter',
      lead: 'The puck twists into a bayonet collar between the two chambers, so all the water has to pass through it.',
      alt: 'Cross-section of the Coir-Shield filter. A lid covers an upper chamber that holds raw water, with a splash plate under the lid. The puck sits in a bayonet collar with a gasket between the upper and lower chambers, above a perforated support plate. Treated water collects in the lower chamber and is drawn from a tap.',
      labels: { raw: 'Raw water', treated: 'Treated water', puck: 'Puck' },
      partsTitle: 'Parts of the filter',
      parts: [
        { key: 'A', name: 'Upper chamber', text: 'Holds the raw water. Food-grade HDPE, ~5–10 L ○.' },
        { key: 'B', name: 'Splash plate', text: 'Aerates the water as it is poured in ○.' },
        { key: 'C', name: 'Bayonet collar and silicone gasket', text: 'Seals the puck in place so 100% ○ of the flow goes through it.' },
        { key: 'D', name: 'Perforated support plate', text: 'Holds the puck up and lets treated water drip through ○.' },
        { key: 'E', name: 'Lower chamber and tap', text: 'Stores treated water until you draw it ○.' },
        { key: 'F', name: 'Lid', text: 'Keeps dust and insects out ○.' },
      ],
      facts: [
        { label: 'Puck size', value: 'Ø 9.0 cm × ~5.5 cm ○, replaceable' },
        { label: 'Flow', value: '~3–4 L/h ○ by gravity' },
        { label: 'Daily use', value: '~15 L/day ○ of drinking and cooking water, when the upper chamber is refilled twice a day' },
      ],
    },

    model: {
      title: 'Inside the puck',
      figureCaption: 'Cross-section, not to scale. Iron is stopped in Zone 0, arsenic in Zone 1, lead in Zone 2.',
      order: {
        title: 'Why this order',
        text: 'Iron is removed first so it cannot use up the arsenic chemistry. Arsenic is oxidised and captured on one surface. Lead is captured last, where the coir also mops up any manganese released upstream. The order of the zones is the innovation, not any single reaction.',
      },
      window: {
        title: 'Operating window',
        value: 'pH 6.5–8.0 ○',
        text: 'This is a design decision, not a literature optimum. It is bounded by the Indian drinking-water standard BIS IS 10500:2012 and by arsenate adsorption chemistry (Dixit & Hering 2003; Jang et al. 2006).',
      },
      capacity: {
        title: 'Design target',
        value: '~450 L ○',
        text: '~450 L per puck ○ is the design target (15 L/day × 30 days ○), not a measured capacity. Column breakthrough tests decide it. 30 days ○ is the maximum; column breakthrough testing will set the real interval. One service-life model suggested arsenic capacity could run out in ~9 days ○ under its default inputs.',
      },
      influent: {
        title: 'Test water',
        text: 'Influent concentration for testing: [TBD: influent arsenic and lead concentrations]. Under consideration: the NSF/ANSI 53 challenge levels, 0.050 mg/L ● arsenic and 0.15 mg/L ● lead.',
        source: '[[WWD magazine, arsenic|https://www.wwdmag.com/arsenic]] · [[Pentek US-1000 manual, p. 7|https://www.manualslib.com/manual/499157/Pentek-Us-1000.html?page=7]]',
      },
    },

    svg: {
      alt: 'Cross-section of the Coir-Shield puck. Raw groundwater carrying iron, arsenic and lead enters at the top. Zone 0 stops iron. Zone 1, an iron-manganese coconut-shell biochar, oxidises and captures arsenic. Zone 2, citrate-coir with silver, captures lead. Filtered water leaves at the bottom.',
      inlet: 'Raw groundwater in',
      outlet: 'Filtered water out',
      stops: { zone0: 'Fe stops here', zone1: 'As stops here', zone2: 'Pb stops here' },
    },

    monitoring: {
      eyebrow: 'Optional',
      title: 'An optional monitoring layer',
      lead: 'If the electronics fail, the puck still works. Sensors can only shorten the replacement cycle, never extend it.',
      items: [
        { icon: 'gauge', title: 'Two level sensors', text: 'Track how much water has flowed through the puck.' },
        { icon: 'target', title: 'One hardness sensor', text: 'An early warning: calcium breaks through the coir zone before lead does. It is a breakthrough proxy only. It never tells a household that its water is unsafe.' },
        { icon: 'box', title: 'ESP32 and a household app', text: 'A small controller sends readings to an app, which may ask for an earlier puck change.' },
        { icon: 'alert', title: 'What the sensors do not do', text: 'The sensors do not measure arsenic or lead.' },
      ],
    },

    lifecycle: {
      eyebrow: 'The full journey',
      title: 'From coconut waste to the kiln',
      lead: 'A filter that traps toxic metals has to be taken back. Every puck is tracked from the day it is issued to the day it is returned.',
    },

    scope: {
      eyebrow: 'Honest scope',
      title: 'What we deliberately don’t target, and why',
      lead: 'Coir-Shield targets arsenic and lead only. Saying no to the rest is part of the design.',
      items: [
        { name: 'Chromium (Cr)', reason: 'The hazardous form, chromate Cr(VI), is anionic and repelled by the coir’s negative sites. Worse, the manganese oxide in Zone 1 can oxidise Cr(III) to carcinogenic Cr(VI). So chromium is out of scope, and target districts should have low chromium.' },
        { name: 'Mercury (Hg)', reason: 'Hg²⁺ is a soft acid; the coir’s carboxylate oxygen is a hard base, so binding is weak (HSAB).' },
        { name: 'Cadmium (Cd)', reason: 'Cadmium exceedances in the IGP are mostly industrial, not geogenic, and calcium in hard water would crowd it off the sites.' },
        { name: 'Fluoride', reason: 'Dropped; it would need an aluminium-oxide stage.' },
        { name: 'Microbes', reason: 'Not claimed. Silver only stops biofilm inside the puck; Coir-Shield is not a disinfection device.' },
        { name: 'Iron', reason: 'Removed to protect the arsenic zone, but not claimed as a health benefit.' },
        { name: 'Hardness (calcium)', reason: 'Not a target. Hardness has no WHO health-based guideline. In the optional sensor kit it is used only as an early-warning signal.' },
        { name: 'Arsenic on the coir', reason: 'The coir zone is for lead. Arsenic is handled by the biochar in Zone 1.' },
      ],
    },
  },

  /* --------------------------------------------------------- FOR CUSTOMERS */
  customers: {
    title: 'For Customers — Coir-Shield',
    description: 'How households, self-help group sellers and kirana refill points would use Coir-Shield: water testing, setup, daily use, monthly swap, returns and prices. Prototype, not yet on sale.',

    hero: {
      eyebrow: 'For customers',
      title: 'How you would use Coir-Shield',
      lead: 'Pick your guide. Each one is a few short steps.',
      notice: 'Coir-Shield is a prototype. It is not on sale yet and is not yet certified. Everything on this page is planned ○: it shows how the service is designed to work.',
    },

    tabsLabel: 'Choose your guide',
    tabs: [
      {
        id: 'household',
        label: 'I use water at home',
        title: 'For households',
        intro: 'No power. No plumbing. It starts with a free test of your own water.',
        steps: [
          { icon: 'flask', title: 'Get your water tested', text: 'A partner NGO tests your handpump water for free. If it is above the safe limit, you are offered Coir-Shield.' },
          { icon: 'fit', title: 'Set it up', text: 'Twist the puck into the collar (under a minute, no tools). Before first use, pour two full upper chambers (~5 L ○) through and throw that water away. This washes out the first-flush silver, tannins and fine particles.' },
          { icon: 'drop', title: 'Use it every day', text: 'Fill the top chamber twice a day. Drink from the tap. Keep boiling or treating your water for germs as you do now.' },
          { icon: 'calendar', title: 'Change the puck on time', text: 'Replace every 30 days ○ at most. Your SHG didi brings the new puck to your door on the date printed on your swap card. If you use the optional sensor kit, the app may ask you to replace it sooner, never later.' },
          { icon: 'return', title: 'Hand back the old puck', text: 'Seal the old puck in the return bag. The SHG collector takes it on the same visit; the QR code is scanned.' },
        ],
        pricesTitle: 'Planned prices',
        pricesNote: 'Target prices ○, to be confirmed after final costing.',
        prices: [
          { title: 'Filter unit', price: 'Free', note: 'For NGO-referred households in the pilot (CSR-funded).' },
          { title: 'First puck', price: '₹99 ○', note: 'Paid once, when you start.' },
          { title: 'Monthly puck, old one returned', price: '₹99 ○', note: 'The usual price each month.', good: true },
          { title: 'Monthly puck, no return', price: '₹149 ○', note: 'A higher price applies when no spent puck comes back.' },
        ],
        notesTitle: 'Good to know',
        notes: [
          '**Planned guarantee ○** (only once laboratory and column tests exist): free re-test of your filtered water near the end of your first month. If a puck within its replacement date fails to bring arsenic below the limit, that month’s ₹99 ○ is refunded.',
          'Storage: keep new pucks sealed in their pouch, dry and out of direct sun.',
          'Shelf life: being tested. [TBD: shelf life — needs a stability test]',
          'Do not throw a used puck away or burn it. It holds the metals it has trapped. Always return it in the sealed bag.',
          'The puck is designed for arsenic and lead. It is not designed to remove germs or to soften hard water.',
        ],
      },
      {
        id: 'shg',
        label: 'I am an SHG seller',
        title: 'For self-help group sellers',
        intro: 'Sell, deliver and collect. You earn on every puck and every return.',
        steps: [
          { icon: 'users', title: 'Meet referred households', text: 'The partner NGO passes on households whose water tested above the limit.' },
          { icon: 'home', title: 'Sell and deliver at the door', text: 'Bring the puck to the household, collect payment, and scan the QR code when you issue it.' },
          { icon: 'calendar', title: 'Swap every month', text: 'Return on the date printed on the swap card with a new puck.' },
          { icon: 'return', title: 'Collect the spent puck', text: 'Take the old puck in its sealed return bag on the same visit and scan its QR code. Do not open spent pucks.' },
          { icon: 'box', title: 'Bring pucks to the aggregation point', text: 'Take collected pucks to the block or district aggregation point. Frequency: [TBD: collection frequency, to be agreed with the SHG federation].' },
        ],
        earnTitle: 'What you earn',
        earn: [
          { title: 'Seller margin', price: '₹14.85 ○', note: '15% ○ of MRP on each ₹99 ○ puck.', good: true },
          { title: 'Return bonus', price: '₹3 ○', note: 'For every spent puck you bring back.' },
        ],
        notesTitle: 'Good to know',
        notes: [
          'The model is designed to create income for rural women entrepreneurs.',
          'You never open, clean or treat spent pucks. You only collect them.',
        ],
      },
      {
        id: 'kirana',
        label: 'I run a kirana store',
        title: 'For kirana refill points',
        intro: 'A small shelf of refills for customers who walk in.',
        steps: [
          { icon: 'box', title: 'Hold a small stock', text: 'Keep a case of 12 ○ sealed pucks for walk-in refills. Store them dry and out of direct sun.' },
          { icon: 'shop', title: 'Sell refills', text: 'Sell a sealed puck to a customer who needs one between doorstep visits.' },
          { icon: 'return', title: 'Keep the return bin', text: 'Keep a sealed, labelled return bin. Write one register line for each returned puck. Do not open spent pucks.' },
          { icon: 'users', title: 'Hand over to the SHG', text: 'The SHG collector takes the bin’s contents to the aggregation point.' },
        ],
        earnTitle: 'What you earn',
        earn: [{ title: 'Refill-point margin', price: '[TBD: kirana margin per refill]', note: 'To be agreed.' }],
        notesTitle: 'Good to know',
        notes: ['Used pucks stay sealed in the return bin until they are collected.'],
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
    description: 'Coir-Shield evidence base: provenance legend, what is measured so far, the validation plan, what decides the replacement interval, and WHO and BIS regulatory anchors. Prototype, not yet certified.',

    hero: {
      eyebrow: 'Evidence',
      title: 'What we know, what we cite, what we still owe',
      lead: 'We would rather show an honest to-do list than a page of numbers we cannot defend.',
    },

    validated: {
      eyebrow: 'Validated result',
      title: 'Binding sites on our citrate-coir',
      paras: [
        'Zone 2 depends on carboxylate groups: they are the sites that hold lead. We measured how many there are per gram of our citrate-coir.',
        'Result: 1.3 mmol/g ▲. The literature benchmark for citric-acid-esterified lignocellulose is 1.0–1.2 mmol/g ● (Hoang et al. 2021).',
      ],
      methodTitle: 'How we measured it',
      method: [
        'NaOH back-titration, against HCl that we standardised with Na₂CO₃.',
        'Corroborated gravimetrically, as an independent cross-check.',
        'Replicates and spread: [TBD: n and ± SD for this measurement].',
      ],
      limitsTitle: 'What this result does not show',
      limits: 'Site density is a capacity indicator. It does not tell us how many litres a puck treats before lead breaks through. That needs the column tests listed below.',
    },
    // Shown instead of the block above when site.showValidatedResult is false.
    noValidated: {
      eyebrow: 'Validated results',
      title: 'No validated results published yet',
      text: 'We publish a ▲ result only when it has been replicated and its spread is known. Until then, everything on this page is a literature value ● or a target ○.',
    },

    interval: {
      eyebrow: 'Replacement interval',
      title: 'Monthly replacement is not yet proven',
      paras: [
        '~450 L per puck ○ is the design target (15 L/day × 30 days ○), not a measured capacity.',
        '30 days ○ is the maximum; column breakthrough testing will set the real interval.',
        'One service-life model suggested arsenic capacity could run out in ~9 days ○ under its default inputs. We show that number because it is the one that could change the product most.',
      ],
    },

    bench: {
      eyebrow: 'Test bench',
      title: 'How we test',
      lead: 'Performance will be reported as bed volumes or litres to breakthrough at a stated influent concentration. We do not report a bare removal percentage.',
      items: [
        { icon: 'gauge', title: 'Dissolved oxygen (DO) sensor', text: 'Tracks oxygen in the test water. Oxygen affects how iron and arsenic behave, so we log it during runs.' },
        { icon: 'gauge', title: 'Oxidation-reduction potential (ORP) sensor', text: 'Shows whether the water is reducing or oxidising. IGP aquifers are reducing, which is why As(III) dominates there.' },
        { icon: 'flask', title: 'Silver nanoparticle check', text: 'Quality check by spectrophotometer: a surface plasmon resonance peak at 400–420 nm ●. Status: [TBD: has the check been done, and what was the result].' },
        { icon: 'shield', title: 'Independent laboratory', text: 'Not yet tested by an independent lab. Planned before any field pilot.' },
      ],
    },

    plan: {
      eyebrow: 'Validation plan',
      title: 'What we still have to prove',
      lead: 'Bench tests first, then columns, then an independent laboratory, then the field.',
      columns: ['Test', 'Method or question', 'Limit or pass mark', 'Status'],
      // The first row's status switches with site.showValidatedResult (see v1Done / v1Planned).
      v1Done: 'Measured: 1.3 mmol/g ▲. Replicates: [TBD: n and ± SD]',
      v1Planned: 'Planned ○',
      rows: [
        ['V1 · Carboxyl density', 'NaOH back-titration', 'Benchmark 1.0–1.2 mmol/g ● (Hoang et al. 2021)', '@V1'],
        ['V2 · Oxidant capacity', 'Iodometric titration of Zone 1', 'To be set before the run', 'Planned ○'],
        ['V3 · Anion capture', 'Phosphate as an arsenate stand-in, molybdenum blue read at 880 nm ●', '[TBD: pass mark — set it before running V3]', 'Planned ○'],
        ['V4 · Lead uptake', 'Raw coir against treated coir against esterified coir', 'To be set before the run', 'Planned ○'],
        ['V5 · Silver release', 'Silver in the treated water', 'Below 0.1 mg/L ●', 'Planned ○'],
        ['V6 · Manganese release', 'With and without Zone 0, which targets ~98% ○ iron removal', 'Below 0.08 mg/L ● (WHO)', 'Planned ○'],
        ['V7 · Flow decline', 'Flow rate as the puck ages', 'Design flow ~3–4 L/h ○', 'Planned ○'],
        ['“What we add” panel', 'Everything the puck could add to the water', 'To be set before the run', 'Planned ○'],
        ['Container blank', 'The same test with no puck, to rule out the housing', 'No change from blank', 'Planned ○'],
        ['Column breakthrough', 'Litres treated before the outlet reaches 10 µg/L ●, across pH 6.5–8.0 ○', 'Target ~450 L ○', 'Planned ○'],
        ['Ester stability', 'Do the binding sites last for 30 days ○ in water', 'To be set before the run', 'Planned ○'],
        ['TCLP leaching', 'Do spent pucks hold on to their metals', 'To be set before the run', 'Planned ○'],
        ['Independent lab verification', 'An accredited laboratory repeats key results', '[TBD: laboratory and method]', 'Planned before any field pilot'],
        ['NGO field pilot', 'Real households, real water', '[TBD: partner NGO and SHG federation]', 'Planned ○'],
      ],
    },

    chartsBlock: {
      eyebrow: 'Charts',
      title: 'Data, wired to one file',
      lead: 'These charts read from the same data file as the rest of the site. When a result is not in yet, the chart says so.',
    },

    regulatory: {
      eyebrow: 'Regulatory anchors',
      title: 'The limits we work to',
      lead: 'We design against two documents: the WHO Guidelines for Drinking-water Quality (GDWQ), 4th edition, with its 2021 manganese addendum, and the Indian standard BIS IS 10500:2012.',
      columns: ['Parameter', 'WHO GDWQ', 'IS 10500:2012 acceptable limit', 'IS 10500:2012 table', 'Role in Coir-Shield'],
      rows: [
        ['Arsenic', '10 µg/L ● (provisional)', '0.01 mg/L ●', 'Table 3 (toxic)', 'Target contaminant'],
        ['Lead', '10 µg/L ● (provisional)', '0.01 mg/L ●, no relaxation', 'Table 3 (toxic)', 'Target contaminant'],
        ['Manganese', '0.08 mg/L ● (2021)', '0.1 mg/L ● (permissible 0.3 mg/L ●)', 'Table 2 (undesirable)', 'Must not be released from Zone 1'],
        ['Silver', 'No health-based guideline; provisional reference value 0.1 mg/L ●', '0.1 mg/L ●, no relaxation', 'Table 2 (undesirable)', 'Must not be released from Zone 2'],
        ['Hardness', 'No health-based guideline', 'Not a Coir-Shield parameter', 'Not applicable', 'Not a target'],
      ],
      framing: 'Everything Coir-Shield removes is in IS 10500’s toxic table; everything it can add (silver, manganese) is in the “undesirable in excess” table, kept below limits.',
      note: 'Compliance with these limits has not been demonstrated yet. They are the yardsticks for the tests above.',
      source: 'Sources: [[BIS IS 10500:2012|https://consumerhelpline.gov.in/public/assets/docs/bis/IS10500-2012.pdf]] · [[WHO silver fact sheet, 2022|https://cdn.who.int/media/docs/default-source/wash-documents/water-safety-and-quality/chemical-fact-sheets-2022/silver-fact-sheet-2022.pdf]]',
    },
  },

  /* --------------------------------------------------------------- BUSINESS */
  business: {
    title: 'Business & Impact — Coir-Shield',
    description: 'The Coir-Shield business model: NGO testing camps, self-help group doorstep swaps, kirana refill points, target prices, unit economics, end-of-life plan and competition.',

    hero: {
      eyebrow: 'Business & impact',
      title: 'Test first. Then earn the sale.',
      lead: 'Trust is the main barrier. So the model starts with a free test of the household’s own water, and puts a neighbour, not an advert, at the door.',
    },

    market: {
      eyebrow: 'Market',
      title: 'Who it is for',
      paras: [
        'Our first market is households in the Indo-Gangetic Plain that drink groundwater and face arsenic or lead exposure.',
        'They need something that works without electricity, costs little each month, and comes from someone they already trust.',
      ],
      facts: [
        { label: 'Total market (being re-verified)', value: '~35.4M ○ households' },
        { label: 'Serviceable market (being re-verified)', value: '~12M ○ households' },
        { label: 'Obtainable market (being re-verified)', value: '~360,000 ○ households' },
        { label: 'Pilot location', value: 'An arsenic-hotspot block such as Ballia, UP, reached through an existing SHG federation and a partner NGO already testing water there.' },
        { label: 'Partners', value: '[TBD: partner NGO and SHG federation, even if “in discussion”]' },
      ],
    },

    research: {
      eyebrow: 'Customer research',
      title: 'What a simulated panel told us',
      label: 'Simulated, not real customers',
      text: 'A simulated buyer panel of 20 ○ people (AI-generated personas, not real customers): 2 of 20 ○ bought the original pitch; 9 of 20 ○ bought once it included their own water test, an independent lab report and a re-test guarantee. Trust is the main barrier. Real household interviews are planned.',
      note: 'The panel tested a kirana-sale version of the offer, not SHG doorstep delivery.',
    },

    gtm: {
      eyebrow: 'Go-to-market',
      title: 'From a water test to a monthly swap',
      lead: 'No paid ads. Each step hands the household to someone it already knows.',
      steps: [
        { icon: 'flask', title: 'NGO testing camps', text: 'A partner NGO runs free water-testing camps.' },
        { icon: 'arrow', title: 'Referral', text: 'Households above the limit are referred.' },
        { icon: 'users', title: 'SHG doorstep sale and monthly swap', text: 'Women’s self-help groups (SHGs, NRLM) sell the puck and swap it at the door, collecting the spent puck on the same visit.' },
        { icon: 'shop', title: 'Kirana refill points', text: 'Kirana stores hold a small stock for walk-in refills.' },
        { icon: 'megaphone', title: 'CSR and state programmes', text: 'CSR and state programmes (JJM, state water missions) for bulk orders and subsidised units for the poorest households.' },
      ],
    },

    pricing: {
      eyebrow: 'Prices and revenue',
      title: 'Return the puck, pay less',
      lead: 'Target prices ○, to be confirmed after final costing.',
      options: [
        { title: 'Monthly puck, old one returned', price: '₹99 ○', note: 'Also the price of the first puck.', good: true },
        { title: 'Monthly puck, no return', price: '₹149 ○', note: 'The gap is the reason to bring the spent puck back.' },
        { title: 'Filter unit', price: 'Free in the pilot', note: 'For NGO-referred households, CSR-funded. Unit cost ₹104–223 ○, one-time.' },
      ],
      streamsTitle: 'Revenue streams',
      streams: ['Recurring monthly pucks (the core).', 'One-time filter-unit sales.', 'Subsidised bulk contracts.'],
    },

    unit: {
      eyebrow: 'Unit economics',
      title: 'Costs: all estimates',
      paras: [
        'Puck materials cost about ₹38 ○. Silver is about ₹11 ○ of that at the target loading, or ₹14–28 ○ at the current bench loading.',
        'Per puck we also pay about ₹17.85 ○ for the SHG margin and collection, about ₹2 ○ for transport, about ₹5 ○ for kiln co-processing (not yet quoted), and about ₹15 ○ for re-tests and refunds.',
        'The filter unit costs ₹104–223 ○, one-time. [[B2B listings, Jun 2026]]',
      ],
      facts: [
        { label: 'Break-even', value: 'About 19 ○ pucks a day (~570 ○ households)' },
        { label: 'Pilot, year one', value: 'The pilot of 300 ○ households loses about ₹93,000 ○' },
        { label: 'Cash needed', value: 'About ₹3.5 lakh ○, including ₹66,900 ○ for CSR-funded filter units. To be funded by grants and CSR.' },
      ],
    },

    eol: {
      eyebrow: 'End of life',
      title: 'What happens to a spent puck',
      status: 'Design target ○',
      paras: [
        'Spent pucks are sealed in a return bag, QR-scanned, and aggregated at block level.',
        'They are dried and shredded, then co-processed in a cement kiln at more than 1,400 °C ●, where the metals are bound into clinker.',
        'No kiln operator has quoted for this yet, and leaching tests on spent pucks are still on our validation plan.',
      ],
      link: 'See the life of one puck',
    },

    advantage: {
      eyebrow: 'Sustainable advantage',
      title: 'Know-how and network, not secret chemistry',
      text: 'The ordered-zone design, our grafting and loading process parameters, field data from Indian groundwater, and an SHG collection network that takes years to build.',
      note: 'Intellectual property: planned patent.',
    },

    competition: {
      eyebrow: 'Competition',
      title: 'How we compare',
      lead: 'Competitor prices are published retail figures. [[Checked 10 Nov 2026]]',
      columns: ['Option', 'Cost', 'What to know', 'Source'],
      rows: [
        ['Coir-Shield (design)', '₹99 ○ a month target; filter unit free in the pilot', 'Gravity-fed, no electricity. Designed for arsenic and lead ○. Doorstep swap and take-back.', 'This site'],
        ['Tata Swach gravity', '₹2,499–4,599 ●', 'Targets microbes, not arsenic.', '[[Smartprix|https://www.smartprix.com/water_purifiers/tata_swach-brand/price-2000_to_5000]]'],
        ['Electric RO (e.g. KENT Grand)', '₹11,899–12,499 ● plus about ₹5,000 ● a year for service', 'Needs power and pressure, wastes water.', '[[PriceBefore|https://www.pricebefore.com/kent-grand-ro-water-purifier-11119-ro-uv-uf-tds-m11903.html]]'],
        ['Community plants / AMRIT', 'A few paise per litre where a working plant exists', '25% ● of 577 ● West Bengal plants surveyed were defunct.', '[[VIT research publication|https://research.vit.ac.in/publication/million-dollar-arsenic-removal-plants-in-west-bengal-india-useful]]'],
      ],
      signal: 'Demand signal: KENT launched a non-electric gravity purifier (Gold Plus) in June 2025. [[Expert Market Research|https://www.expertmarketresearch.com/reports/india-water-purifier-market]]',
    },

    impact: {
      eyebrow: 'Impact',
      title: 'Beyond the water',
      items: [
        { icon: 'users', title: 'Social', text: 'Income for SHG women who sell, deliver and collect.' },
        { icon: 'leaf', title: 'Climate', text: 'No grid demand, and an agricultural-waste feedstock.' },
        { icon: 'coin', title: 'Cost-effectiveness', text: '[TBD: cost per household per year — recompute with current costs before showing]' },
      ],
    },

    risks: {
      eyebrow: 'Open questions',
      title: 'What could stop us, and what we are doing about it',
      items: [
        { title: 'Replacement interval', text: 'Thirty days is a maximum, not a proven capacity. Column breakthrough tests decide it, and a shorter interval would change the price.' },
        { title: 'Silver cost', text: 'Silver is the largest material cost. The loading is still being settled, so prices are targets.' },
        { title: 'Iron in field water', text: 'Zone 0 must hit its iron target, or Zone 1 is exhausted early and manganese can be released.' },
        { title: 'Trust', text: 'Households have no way to see the result. That is why the model starts with a test and plans a re-test guarantee.' },
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

    // Drafts. Rewrite in the team's own words.
    mvv: {
      mission: {
        title: 'Mission',
        text: 'To put affordable, electricity-free arsenic and lead filtration within reach of households in the Indo-Gangetic Plain, using coconut waste and the people they already trust.',
      },
      vision: {
        title: 'Vision',
        text: 'A future in which no family has to choose between the water it can reach and the water it can trust.',
      },
      valuesTitle: 'Values',
      values: [
        { title: 'Evidence before claims', text: 'Every number is tagged as measured, cited or targeted.' },
        { title: 'Honest scope', text: 'We name what the puck does not do, and why.' },
        { title: 'Design for the last mile', text: 'If it needs power, plumbing or a paid advert, it is not our design.' },
        { title: 'Finish the job', text: 'A filter is not finished until the spent puck is safely dealt with.' },
      ],
    },

    members: {
      eyebrow: 'Members',
      title: 'Who we are',
      list: [
        { name: 'Vardaan Potdar', role: 'Founder & CEO', resp: '[TBD: responsibilities]', bio: '[TBD: short bio]' },
        { name: 'Aradhya [TBD: surname]', role: 'CTO', resp: '[TBD: responsibilities]', bio: '[TBD: short bio]' },
        { name: 'Swarit Garg', role: 'CFO', resp: '[TBD: responsibilities]', bio: '[TBD: short bio]' },
        { name: 'Ayush Agarwal', role: 'COO', resp: '[TBD: responsibilities]', bio: '[TBD: short bio]' },
      ],
      coachLabel: 'Coach',
      coach: { name: '[TBD: coach name]', role: 'Team coach', resp: '', bio: '[TBD: coach title and affiliation]' },
      schoolLabel: 'School',
      school: 'Jayshree Periwal International School (JPIS), Jaipur',
    },

    contact: {
      eyebrow: 'Contact',
      title: 'Talk to us',
      text: 'Judges, mentors, SHG federations, NGOs and curious households are all welcome to write.',
      button: 'Email the team',
    },
  },
};
