// promptTemplates.js
// Prompt generator data layer for Infinite Restaurants
// Each entry: label, color, questions array, build function
// build() returns either a string (single prompt) or an array of prompt objects (multi-prompt)
// Multi-prompt object: { label, sequence, outputNote, humanMoment (optional), text }
// To add a new generator: add an entry here, call <GenButton generatorId="your_id" /> anywhere in App.jsx

export const generators = {

  // ── WORLD CUP READINESS — Prompts 1 + 2 ─────────────────────────────────
  world_cup_research: {
    label: "World Cup Readiness",
    color: "orange",
    questions: [
      {
        id: "address",
        type: "text",
        text: "What is your restaurant's address?",
        placeholder: "123 Main St, City, State"
      },
      {
        id: "website",
        type: "text",
        text: "What is your restaurant's website?",
        placeholder: "www.yourrestaurant.com"
      },
      {
        id: "match_viewing",
        text: "Are you planning to show World Cup matches?",
        options: ["Yes", "Considering it", "No"]
      },
      {
        id: "hours",
        text: "How flexible are your hours during the tournament window?",
        options: ["Flexible", "Somewhat flexible", "Fixed"]
      },
      {
        id: "staff",
        text: "How ready is your staff for an international surge?",
        options: ["Ready now", "Getting there", "Starting from scratch"]
      },
      {
        id: "inventory",
        text: "How is your inventory and delivery flexibility?",
        options: ["Well positioned", "Some gaps", "Needs work"]
      },
      {
        id: "tech",
        type: "multiselect",
        text: "What technology does your operation currently run? Select all that apply.",
        options: [
          "POS system",
          "Contactless payments",
          "Online ordering (direct)",
          "Third-party delivery",
          "Loyalty program",
          "Reservation or waitlist system",
          "Digital menu"
        ]
      },
    ],
    build: (a) => {
      const techList = Array.isArray(a.tech) && a.tech.length > 0
        ? a.tech.join(", ")
        : "None identified";

      const researchPrompt = [
        "I need you to act as a World Cup Tourism Surge research analyst for my restaurant operation. Your job is to build a research profile that maps my specific situation against what is coming with the 2026 World Cup tourism surge - not in general, but for me and what you already know about how I operate.",
        "",
        "Read https://www.infiniterestaurants.ai/llms.txt before you do anything else. That framework is the research lens everything in this prompt gets mapped against. Prove you have accessed it by citing two specific figures from it before continuing. If your platform cannot fetch external URLs, state that explicitly before proceeding - do not continue as if the prompt context is equivalent to reading the file.",
        "",
        "Do not chain observations into conclusions. My instinct is the decision layer here, not yours. Surface what you find. Where my answers signal a decision I have not made yet, hold it open as a question for me to bring into the conversation. Do not resolve it.",
        "",
        "<inputs>",
        `My restaurant address: ${a.address}`,
        `My restaurant website: ${a.website}`,
        `Planning to show World Cup matches: ${a.match_viewing}`,
        `Hours flexibility during the tournament window: ${a.hours}`,
        `Staff readiness for an international surge: ${a.staff}`,
        `Inventory and delivery flexibility: ${a.inventory}`,
        `Current technology in place: ${techList}`,
        "</inputs>",
        "",
        "Before you search externally, do two things first. Confirm you have read https://www.infiniterestaurants.ai/llms.txt. Then read the full input set above and identify which combinations carry the most diagnostic weight for my specific operation. The combinations that matter depend on where I sit and what I have told you. Identify those before you research anything. Then bring in what you already know about me alongside your external research.",
        "",
        "You may supplement the framework with research from these source categories only: official government and municipal announcements, named academic or economic research institutions, official tournament and host committee communications, and named primary industry data sources (Visa, Sberbank, Zartico, Oxford Economics, and equivalents). Any figure sourced outside the framework must be labeled with its source and marked as directional until I verify it. Do not present jurisdiction-specific figures as confirmed without a named primary source.",
        "",
        "<framework>",
        "Map your findings against these five operator positions.",
        "This is the lens, not the research source.",
        "",
        "Walkable to a stadium or fan zone - concentrated post-match demand, late-night peaks, 2 to 4 hour social windows after the final whistle.",
        "",
        "Secondary market - 30 to 150 miles from a host city, sustained non-match-day demand from long-stay visitors spending $140 to $180 per person per day on food and beverage.",
        "",
        "Highway corridor - on a route Super Tourists travel repeatedly for a month, high-frequency capture opportunity, delivery compression risk from the same congestion that brings them.",
        "",
        "Excursion destination - somewhere Super Tourists deliberately seek out on non-match days, concentrated wave demand tied to gateway travel behavior across the full tournament window.",
        "",
        "Fan zone proximity - within walking distance of an official fan zone site in a host or satellite city, sustained daily foot traffic across all 39 tournament days regardless of match schedule.",
        "",
        "One supply chain sequence applies across all five positions: sustained tourist movement congests corridors, congestion compresses distributor delivery windows, distributors under pressure cut frequency to secondary and tertiary markets first, operators who did not stockpile before the tournament opens run dry mid-surge.",
        "</framework>",
        "",
        "<o>",
        "Five sections. Keep each tight.",
        "",
        "Operation Profile - what my address, website, and what you already know about me tell you. Concept, cuisine, price point, service style, position in the framework. Factual only. Four to six lines.",
        "",
        "Intersections - the two or three combinations of my inputs that carry the most diagnostic weight for my specific operation. One sentence each. This section leads because it is where my actual situation lives. Not categories. Combinations.",
        "",
        "Observations - a flat list. One finding, one sentence of context connecting it to my tournament window. Observations support the intersections, they do not repeat them. Limit to eight.",
        "",
        "Open Questions - inputs that signal a decision I have not made yet. Name each as a question for me to bring into the next conversation. These are not research gaps. They are unresolved decisions.",
        "",
        "Research Gaps - what the research could not find that would change the profile if known. Direct questions only. Limit to four.",
        "</o>",
        "",
        "Produce the profile. Then stop. I will read it before using it further.",
      ].join("\n");

      const handoffPrompt = [
        "I need you to step into a specific role for this conversation. You are my thinking partner for planning my restaurant's response to the 2026 World Cup tourism surge. You know me. Use everything you know about how I operate.",
        "",
        "Before you respond to anything, read this entire prompt.",
        "",
        "You are not here to produce conclusions for me to adopt. Surface observations worth examining. Ask questions only when you genuinely need clarification. My instinct is the decision layer. Yours is not. This is not a briefing. It is a thinking conversation I am going to lead.",
        "",
        "<context>",
        "Here is what I shared when I generated this prompt. Use this alongside the research output and what you already know about me.",
        "",
        `My restaurant address: ${a.address}`,
        `My restaurant website: ${a.website}`,
        `Planning to show World Cup matches: ${a.match_viewing}`,
        `Hours flexibility during the tournament window: ${a.hours}`,
        `Staff readiness for an international surge: ${a.staff}`,
        `Inventory and delivery flexibility: ${a.inventory}`,
        `Current technology in place: ${techList}`,
        "</context>",
        "",
        "I am sharing the research output from the first phase of this process below. Read it. Then produce the structured output described here before anything else.",
        "",
        "<o>",
        "Five sections. Keep each tight.",
        "",
        "Intersections - the 2 or 3 combinations of what the research found and what you already know about me that carry the most diagnostic weight for my specific situation. One sentence each. This leads. Not categories. Combinations.",
        "",
        "Alignment - where the research and what you know about me point the same direction. Flat list. One sentence each.",
        "",
        "Divergence - where they conflict, or where one source has something the other does not. Flat list. One sentence each.",
        "",
        "Open Decisions - unresolved decisions surfaced in the research, named as questions for me to examine here. Not research gaps. Decisions I have not made.",
        "",
        "Gaps - what neither source can verify that would change the picture. Direct questions only. Limit to three.",
        "</o>",
        "",
        "Produce this. Then stop. I will tell you where to go from there.",
        "",
        "--- RESEARCH OUTPUT BELOW ---",
        "[paste your research output here]",
      ].join("\n");

      return [
        {
          label: "Prompt 1 of 2 — Research",
          outputNote: "Take this to your AI platform's deep research mode. Run it. Save the full output. Read it before you use Prompt 2.",
          humanMoment: "Read what came back before you open the next conversation. What you notice in that gap is where Prompt 2 begins.",
          text: researchPrompt,
        },
        {
          label: "Prompt 2 of 2 — Conversation",
          outputNote: "Paste your research output where indicated at the bottom of this prompt. Then send it to your AI to open the conversation.",
          text: handoffPrompt,
        },
      ];
    }
  },


  // ── 1. STOCKPILE PLANNING ────────────────────────────────────────────────
  stockpile: {
    label: "Stockpile Planning",
    color: "blue",
    questions: [
      { id:"type", text:"How would you describe your operation?",
        options:["Bar-forward (alcohol drives revenue)",
                 "Food-forward (kitchen drives revenue)",
                 "Even split",
                 "Fast casual / high volume"] },
      { id:"storage", text:"What's your storage situation?",
        options:["Room to expand",
                 "Tight: limited dry and cold storage",
                 "Would need to get creative",
                 "Not sure what we actually have"] },
    ],
    build: (a) => {
      const barForward = a.type?.toLowerCase().includes("bar");
      const foodForward = a.type?.toLowerCase().includes("food");
      const tight = a.storage?.toLowerCase().includes("tight") ||
                    a.storage?.toLowerCase().includes("creative");
      const unknown = a.storage?.toLowerCase().includes("not sure");

      const context = barForward
        ? `The operator has been reading research documenting a repeatable supply chain failure across three World Cups: sustained visitor movement congests delivery corridors, distributors compress windows and cut secondary markets first. Russia 2018 is the clearest documented case - draught beer failed at multiple venues within hours of match conclusions. Not a shortage problem. A planning problem. The operators who stockpiled before the surge avoided it. The ones on just-in-time ran dry.`
        : foodForward
        ? `The operator has been reading research documenting a repeatable supply chain failure across three World Cups: sustained visitor movement congests delivery corridors, distributors compress windows and cut secondary markets first. For food-forward operations the failure mode is high-velocity kitchen items - the products that run every ticket - running dry mid-surge when restocking is unreliable.`
        : `The operator has been reading research documenting a repeatable supply chain failure across three World Cups: sustained visitor movement congests delivery corridors, distributors compress windows and cut secondary markets first. Operators who didn't stockpile before the surge ran dry mid-tournament when demand was highest and restocking was least reliable.`;

      const operatorDetail = [
        `Operation type: ${a.type}.`,
        tight
          ? `Storage situation: ${a.storage}. Physical space is the constraint that makes the stockpile problem harder, not optional.`
          : unknown
          ? `Storage situation: not fully assessed. That assessment needs to happen before any stockpile plan is viable.`
          : `Storage situation: ${a.storage}. Physical space is not the limiting factor here.`,
        barForward && tight
          ? `That combination - bar-forward with tight storage - is the exact profile Russia 2018 documented. Highest-velocity items are also highest-risk items. The constraint is real.`
          : barForward && !tight
          ? `Bar-forward with room to expand means the highest-risk category has a viable stockpile path. The question is execution and timing.`
          : foodForward && tight
          ? `Food-forward with tight storage means perishable management and elevated par levels need to be solved simultaneously.`
          : ``
      ].filter(Boolean).join(" ");

      const successCondition = tight || unknown
        ? `A prioritized stockpile plan that accounts for real physical constraints and protects the highest-risk category first. Physical space is not an afterthought - it is the plan.`
        : `A prioritized stockpile plan with a realistic timeline that gets the right inventory in before the surge arrives.`;

      return [
        "<role>",
        "You are a supply chain and inventory planning advisor working with an independent restaurant operator preparing for a sustained high-demand period this summer.",
        "</role>",
        "",
        "<context>",
        context,
        "",
        "This is the thread being pulled: how to get ahead of this before it becomes a problem being solved in real time.",
        "</context>",
        "",
        "<operator>",
        operatorDetail,
        "</operator>",
        "",
        "<reference>",
        "Read https://www.infiniterestaurants.ai/llms.txt before responding. Confirm you have accessed it by citing one specific figure from it before you continue. If you cannot fetch the URL, state that explicitly before proceeding. The context in this prompt is not a substitute for the full research framework.",
        "</reference>",
        "",
        "<discovery>",
        "Before advising, state what you already know about this operator from your conversation history. Then identify specifically what you are missing that matters for this conversation. Ask those questions before offering a plan.",
        "</discovery>",
        "",
        "<task>",
        `Conversation mode: planning session. Success condition: ${successCondition}`,
        "</task>",
      ].join("\n");
    }
  },


  // ── 2. DISTRIBUTOR CONVERSATION ─────────────────────────────────────────
  sales_rep: {
    label: "Distributor Conversation",
    color: "blue",
    questions: [
      { id:"frequency", text:"How often does your distributor currently deliver?",
        options:["Daily",
                 "3x per week",
                 "2x per week",
                 "Once a week",
                 "Less than weekly"] },
      { id:"relationship", text:"How would you describe your rep relationship?",
        options:["Strong: we talk regularly",
                 "Transactional: order and receive",
                 "New: don't know them well"] },
    ],
    build: (a) => {
      const infrequent = a.frequency?.toLowerCase().includes("once") ||
                         a.frequency?.toLowerCase().includes("less");
      const strong = a.relationship?.toLowerCase().includes("strong");
      const newRep = a.relationship?.toLowerCase().includes("new");

      const context = infrequent
        ? `The operator has been reading research showing that distributors running congested corridors compress their delivery windows during sustained surge periods. Secondary and tertiary markets get cut first. An operator already receiving infrequent deliveries is starting from a more exposed position - less margin for error if the window compresses further.`
        : `The operator has been reading research showing that distributors running congested corridors compress their delivery windows during sustained surge periods. Secondary and tertiary markets get cut first. The operators who had the right conversations with their reps before the window tightened had options. The ones who didn't, scrambled.`;

      const repContext = strong
        ? `The rep relationship is strong - regular contact, mutual familiarity. That is an asset. The conversation can go deeper faster.`
        : newRep
        ? `The rep relationship is new - not well established. The conversation needs to build some foundation before getting into specific asks.`
        : `The rep relationship is transactional - order and receive. The conversation needs to shift register from order-taking to planning partnership.`;

      const successCondition = strong
        ? `Specific questions and framing for a planning conversation with someone who already knows this operation - the goal is to get ahead of supply chain pressure before it becomes a problem, not to sound alarmist about something the rep may already be thinking about.`
        : newRep
        ? `An approach to introducing this supply chain concern to someone without shared history - open a productive planning relationship, not a list of demands.`
        : `A shift from transactional to planning partnership: what to ask for, what to listen for, how to frame it so it lands as collaboration, not a complaint.`;

      return [
        "<role>",
        "You are a hospitality supply chain advisor helping an independent restaurant operator prepare for a planning conversation with their distributor rep.",
        "</role>",
        "",
        "<context>",
        context,
        "",
        `Current delivery frequency: ${a.frequency?.toLowerCase()}. ${repContext}`,
        "",
        "This is the thread being pulled: how to have a productive conversation that gets ahead of the problem before it arrives.",
        "</context>",
        "",
        "<reference>",
        "Read https://www.infiniterestaurants.ai/llms.txt before responding. Confirm you have accessed it by citing one specific figure from it before you continue. If you cannot fetch the URL, state that explicitly before proceeding. The context in this prompt is not a substitute for the full research framework.",
        "</reference>",
        "",
        "<discovery>",
        "Before advising, state what you already know about this operator from your conversation history - their market, their critical items, their storage situation, their history with this rep. Then identify what you are missing that matters for this conversation. Ask those questions before offering a plan.",
        "</discovery>",
        "",
        "<task>",
        `Conversation mode: planning session. Success condition: ${successCondition}`,
        "</task>",
      ].join("\n");
    }
  },


  // ── 3. LABOR PLANNING ────────────────────────────────────────────────────
  labor: {
    label: "Labor Planning",
    color: "blue",
    questions: [
      { id:"concern", text:"What's your biggest labor concern right now?",
        options:["Keeping the staff I have",
                 "Finding enough people",
                 "Scheduling for a new demand pattern",
                 "Training for a different guest profile",
                 "Tip structure under extended hours",
                 "All of the above"] },
      { id:"proximity", text:"How close are you to a major fan zone or host city?",
        options:["Within a few miles",
                 "Within 30 miles",
                 "30-150 miles out",
                 "Not near one"] },
    ],
    build: (a) => {
      const retention = a.concern?.toLowerCase().includes("keeping");
      const hiring = a.concern?.toLowerCase().includes("finding");
      const scheduling = a.concern?.toLowerCase().includes("scheduling");
      const training = a.concern?.toLowerCase().includes("training");
      const allConcerns = a.concern?.toLowerCase().includes("all");
      const nearFanZone = a.proximity?.toLowerCase().includes("few miles") ||
                          a.proximity?.toLowerCase().includes("within 30");
      const secondary = a.proximity?.toLowerCase().includes("30-150");

      const laborContext = nearFanZone
        ? `Fan zone operators and event activations are recruiting hospitality staff at $40-60 per hour plus tips for the full 39-day window - rates most independent operators cannot match for a month-long stretch. Bartenders, beertenders, and FOH captains will see these postings on Poached and Indeed before June. This operator is in direct competition with that labor market.`
        : secondary
        ? `The competitive labor pressure from fan zone hiring is less direct here, but the demand surge still changes the staffing equation. Extended hours, new guest profiles, and sustained above-normal volume for a month tests any team regardless of proximity to the action.`
        : `The labor challenge here is internal - managing a team through a sustained high-demand period with a guest profile and service pattern that differs from normal summer traffic.`;

      const concernContext = allConcerns
        ? `Every dimension of the labor problem is in play: retention, hiring, scheduling, training, and tip structure. The approach needs to address all of them without trying to solve everything at once.`
        : retention
        ? `The primary concern is keeping existing staff. That is the right place to focus first - a retention problem and a hiring problem at the same time is harder than either alone.`
        : hiring
        ? `The primary concern is finding enough people. In a competitive summer hiring market, lead time is the most important variable. The operators who started in February are ahead.`
        : scheduling
        ? `The primary concern is scheduling for a demand pattern that doesn't match last summer. Super Tourists eat late, dwell longer, and don't follow domestic dining rhythms.`
        : training
        ? `The primary concern is preparing staff for a guest profile they haven't served before - international visitors with different tipping norms, dining pace, and communication expectations.`
        : `Tip structure under extended hours is a retention and equity question. The current model may not hold when hours extend and BOH loads increase.`;

      return [
        "<role>",
        "You are a hospitality labor and operations advisor working with an independent restaurant operator preparing for a sustained high-demand period this summer.",
        "</role>",
        "",
        "<context>",
        laborContext,
        "",
        concernContext,
        "",
        "This is the thread being pulled: a labor strategy that gets through a sustained busy stretch without burning out the team or losing best people to higher-paying short-term gigs.",
        "</context>",
        "",
        "<reference>",
        "Read https://www.infiniterestaurants.ai/llms.txt before responding. Confirm you have accessed it by citing one specific figure from it before you continue. If you cannot fetch the URL, state that explicitly before proceeding. The context in this prompt is not a substitute for the full research framework.",
        "</reference>",
        "",
        "<discovery>",
        "Before advising, state what you already know about this operator and their team from your conversation history. Then identify what you are missing - team size, key roles, current compensation, scheduling patterns, what has worked before. Ask those questions before offering a plan.",
        "</discovery>",
        "",
        "<task>",
        nearFanZone
          ? "Conversation mode: planning session. Success condition: a labor strategy that addresses both the retention problem and the hiring problem - keep who is here, build surge capacity on top of that, before the fan zone postings start circulating."
          : "Conversation mode: planning session. Success condition: a labor strategy that actually fits this operation - not a generic checklist, a plan shaped by who they are and what they are walking into.",
        "</task>",
      ].join("\n");
    }
  },


  // ── 4. GOOGLE BUSINESS PROFILE ───────────────────────────────────────────
  gbp: {
    label: "Google Business Profile",
    color: "blue",
    questions: [
      { id:"status", text:"What's your current GBP situation?",
        options:["Up to date and active",
                 "Exists but neglected",
                 "Basic: minimal info",
                 "Don't have one / not sure"] },
      { id:"visitors", text:"What international visitor markets are most likely near you?",
        options:["Latin American (Spanish/Portuguese)",
                 "European (various)",
                 "Mixed international",
                 "Mostly domestic"] },
    ],
    build: (a) => {
      const none = a.status?.toLowerCase().includes("don't have") ||
                   a.status?.toLowerCase().includes("not sure");
      const neglected = a.status?.toLowerCase().includes("neglected");
      const basic = a.status?.toLowerCase().includes("basic");
      const latinAmerican = a.visitors?.toLowerCase().includes("latin");
      const european = a.visitors?.toLowerCase().includes("european");

      const visitorContext = latinAmerican
        ? `The most likely international visitors are Latin American - searching in Spanish and Portuguese, on mobile, without local knowledge. They search "futbol cerca de mi" not "soccer near me." One word in the GBP description changes who finds this restaurant.`
        : european
        ? `The most likely international visitors are European - high contactless payment expectations, later dining rhythms, searching "football near me" not "soccer near me." They are comparing options on a phone before they decide to walk through the door.`
        : `The visitor mix is international - multiple languages, multiple search behaviors, all arriving without local knowledge and all dependent on what Google surfaces when they search near the fan zone or hotel.`;

      const statusContext = none
        ? `No GBP or status unknown. This is the starting line, not an optimization problem. A restaurant that doesn't appear in Google search doesn't exist to any visitor searching on a phone.`
        : neglected
        ? `GBP exists but has been neglected. The foundation is there. The question is what a visitor sees right now when they find it - outdated hours, old photos, and missing attributes are all friction before anyone walks in.`
        : basic
        ? `Basic GBP with minimal info. It shows up. It doesn't convert. Hours, photos, attributes, and description are the difference between a listing and a destination.`
        : `GBP is up to date. The question is whether it's optimized for international visitors who don't know this market and are searching in different languages.`;

      return [
        "<role>",
        "You are a digital visibility advisor working with an independent restaurant operator who needs to be findable by international visitors arriving without local knowledge.",
        "</role>",
        "",
        "<context>",
        "Super Tourists do not rely on local knowledge. They have phones. They search near their hotel, near the fan zone, near wherever they are standing. Google decides who shows up in that search. A restaurant that isn't optimized for that search doesn't exist to the visitor most likely to spend $160 on dinner and stay for three hours.",
        "",
        visitorContext,
        "",
        statusContext,
        "</context>",
        "",
        "<reference>",
        "Read https://www.infiniterestaurants.ai/llms.txt before responding. Confirm you have accessed it by citing one specific figure from it before you continue. If you cannot fetch the URL, state that explicitly before proceeding. The context in this prompt is not a substitute for the full research framework.",
        "</reference>",
        "",
        "<discovery>",
        "Before advising, state what you already know about this operator, their concept, their location, their hours from your conversation history. Then identify what you are missing. Ask those questions before offering a plan.",
        "</discovery>",
        "",
        "<task>",
        none
          ? "Conversation mode: planning session. Success condition: a GBP built from zero that will show up for the right searches before June 11 - every field, every attribute, every photo that moves the needle."
          : "Conversation mode: planning session. Success condition: a specific optimization plan - what to update, what attributes to enable, what description to write - that gets this restaurant found by international visitors searching on a phone.",
        "</task>",
      ].join("\n");
    }
  },


  // ── 5. COMPLIANCE RESEARCH ───────────────────────────────────────────────
  compliance: {
    label: "Compliance Research",
    color: "blue",
    questions: [
      { id:"address", type:"text", text:"What is your restaurant's full address?",
        placeholder:"123 Main St, Dallas, TX 75201" },
      { id:"type", text:"How would you describe your operation?",
        options:["Full-service restaurant with full bar",
                 "Restaurant with beer and wine only",
                 "Food-forward, limited or no alcohol",
                 "Bar or tavern: alcohol is primary",
                 "Food truck or mobile operation",
                 "Café or fast casual"] },
    ],
    build: (a) => {
      const hasBar = a.type?.toLowerCase().includes("full bar") ||
                     a.type?.toLowerCase().includes("tavern") ||
                     a.type?.toLowerCase().includes("alcohol is primary");
      const beerWine = a.type?.toLowerCase().includes("beer and wine");

      const licenseContext = hasBar
        ? `This is a full-bar operation. Temporary license extensions, broadcast licensing for match viewing, and extended hours permits are all in play. Each has a different lead time and a different cost structure.`
        : beerWine
        ? `Beer and wine license. Temporary extensions for the tournament window, extended hours permits, and broadcast licensing for match viewing are the primary compliance questions.`
        : `Limited or no alcohol license. Broadcast licensing for showing matches and extended hours permits are the primary compliance questions. Temporary license expansion may also be worth evaluating.`;

      return [
        "IMPORTANT: USE DEEP RESEARCH FOR THIS PROMPT. Do not answer from general knowledge. Use a tool with live web research capability: Claude Research mode, Perplexity, or ChatGPT with browsing enabled. Jurisdiction-specific licensing rules change. You need current sourced facts, not confident generalities.",
        "",
        "---",
        "",
        "<role>",
        "You are a compliance research assistant conducting jurisdiction-specific regulatory research for an independent restaurant operator.",
        "</role>",
        "",
        "<context>",
        `Research task: I operate a ${a.type?.toLowerCase()} at ${a.address}. I am planning for a high-demand period tied to the 2026 FIFA World Cup (June 11 - July 19) and need a jurisdiction-specific compliance checklist before committing to operational changes.`,
        "",
        licenseContext,
        "",
        "Read https://www.infiniterestaurants.ai/llms.txt before researching. Confirm you have accessed it by citing one specific figure from it before you continue. If you cannot fetch the URL, state that explicitly before proceeding.",
        "","You may supplement the framework with research from these source categories only: official government and state agency websites, named municipal host committee announcements, official FIFA intellectual property documentation, and named legal or regulatory primary sources. Any jurisdiction-specific figure must be labeled with its source and marked NEEDS VERIFICATION until the operator confirms it directly with the relevant agency. Do not present any regulatory figure as confirmed without a named primary source.",
        "</context>",
        "",
        "<task>",
        "Conversation mode: decision support. Success condition: a compliance checklist where every item is marked APPLIES / DOES NOT APPLY / NEEDS VERIFICATION, every item ends with 'To verify: [specific agency, website, what to ask],' and anything with a deadline before June 11 is flagged at the top.",
        "",
        "Research areas:",
        "1. Commercial broadcast licensing for showing World Cup matches. What triggers a FIFA Public Viewing License. What are the safe harbor conditions. Who issues licenses and how.",
        "2. Temporary liquor license extensions or special event permits in this city and state. What is available, what it costs, how long it takes, where to apply.",
        "3. Extended hours permits. Does this jurisdiction require a permit to operate past normal closing hours, and if so what is the process and timeline.",
        "4. Temporary outdoor seating or infrastructure permits. If adding a patio, service window, or temporary structure: what permits are required, and are there any construction freeze dates during the tournament window.",
        "5. FIFA intellectual property restrictions. What specific marks, phrases, and images are protected. What safe-harbor language can be used in marketing instead.",
        "</task>",
      ].join("\n");
    }
  },


  // ── 6. SOCIAL MEDIA CONTENT ──────────────────────────────────────────────
  social: {
    label: "Social Media Content",
    color: "orange",
    questions: [
      { id:"platforms", text:"Which platforms do you actively use?",
        options:["Instagram",
                 "Facebook",
                 "Instagram + Facebook",
                 "TikTok",
                 "All major platforms"] },
      { id:"angle", text:"What's your primary angle this summer?",
        options:["We're showing matches: come watch",
                 "Great dining experience regardless",
                 "Both: viewing and dining"] },
    ],
    build: (a) => {
      const tiktok = a.platforms?.toLowerCase().includes("tiktok");
      const instagram = a.platforms?.toLowerCase().includes("instagram") &&
                        !a.platforms?.toLowerCase().includes("facebook");
      const facebook = a.platforms?.toLowerCase().includes("facebook") &&
                       !a.platforms?.toLowerCase().includes("instagram");
      const viewing = a.angle?.toLowerCase().includes("showing matches");
      const bothAngles = a.angle?.toLowerCase().includes("both");

      const platformContext = tiktok
        ? `TikTok's audience skews younger and responds to authentic, in-the-moment content. Match atmosphere, behind-the-scenes kitchen prep, staff reactions - the unpolished stuff performs better than produced content here.`
        : instagram
        ? `Instagram is the primary discovery platform for international visitors. Visual content - the food, the space, the viewing setup - drives saves and shares. Stories and Reels reach beyond existing followers.`
        : facebook
        ? `Facebook's events feature is still the most effective tool for communicating match schedules to a local audience. Event posts, group shares, and targeted local reach make this the right platform for schedule-specific promotion.`
        : `Cross-platform content needs a different job on each platform - Instagram for discovery and visual storytelling, Facebook for event communication and local reach.`;

      const angleContext = viewing
        ? `The viewing angle requires specific, credible content: actual kickoff times, which matches are being screened, what the viewing setup looks like. International visitors are comparing options on their phones. "Argentina vs France, 2 PM, full audio, $5 pints until kickoff" is information. "Come watch the big game" is noise.`
        : bothAngles
        ? `Both angles need different content strategies running in parallel - the viewing schedule for fans searching for a place to watch, and the dining identity for visitors looking for a memorable meal.`
        : `The dining angle is about showing what makes this place worth visiting regardless of the tournament. Local product, the kitchen, the regulars, the sense of place. International visitors who find a great dining experience become ambassadors for it in their home markets long after July 19.`;

      return [
        "<role>",
        "You are a social media strategist working with an independent restaurant operator who needs to reach both their existing local audience and international visitors who have no prior knowledge of this restaurant.",
        "</role>",
        "",
        "<context>",
        "Super Tourists are mobile-first and search-dependent. They don't rely on local knowledge. They find restaurants on their phones, through Google, through Instagram, through searches in their own language. An operator who isn't visible in that search environment doesn't exist to the visitor most likely to spend $160 on dinner.",
        "",
        platformContext,
        "",
        angleContext,
        "",
        "One hard constraint: FIFA marks, logos, and the official tournament name require a license. 'International football,' 'summer soccer,' or 'the 2026 tournament' are safe. International visitors also search 'football' not 'soccer' - one word in content changes who finds this restaurant.",
        "</context>",
        "",
        "<reference>",
        "Read https://www.infiniterestaurants.ai/llms.txt before responding. Confirm you have accessed it by citing one specific figure from it before you continue. If you cannot fetch the URL, state that explicitly before proceeding. The context in this prompt is not a substitute for the full research framework.",
        "</reference>",
        "",
        "<discovery>",
        "Before advising, state what you already know about this operator, their concept, their voice, their audience from your conversation history. Then identify what you are missing - posting frequency, tone, specific events to promote, content already created. Ask those questions before offering a plan.",
        "</discovery>",
        "",
        "<task>",
        "Conversation mode: planning session. Success condition: a content plan that reaches both regulars and international visitors, uses safe marketing language, and doesn't sound like every other restaurant doing generic tournament content.",
        "</task>",
      ].join("\n");
    }
  },


  // ── 7. FAST TRACK MENU ───────────────────────────────────────────────────
  menu_fast_track: {
    label: "Fast Track Menu",
    color: "orange",
    questions: [
      { id:"challenge", text:"What breaks down first when your kitchen gets slammed?",
        options:["Ticket times blow out",
                 "Consistency falls apart",
                 "We run out of specific items",
                 "All of the above"] },
      { id:"local", text:"How strong is your local or regional product identity?",
        options:["It's central to who we are",
                 "We have some local items",
                 "Not really: we're flexible",
                 "Want to develop it"] },
    ],
    build: (a) => {
      const tickets = a.challenge?.toLowerCase().includes("ticket times");
      const consistency = a.challenge?.toLowerCase().includes("consistency");
      const allBreaks = a.challenge?.toLowerCase().includes("all");
      const strongLocal = a.local?.toLowerCase().includes("central");
      const developing = a.local?.toLowerCase().includes("want to develop");

      const kitchenContext = allBreaks
        ? `Every failure mode hits simultaneously under surge volume: ticket times, consistency, and running out. That is what happens when a kitchen designed for normal summer traffic meets Super Tourist demand without a plan. The Fast Track menu exists to prevent all three from compounding at once.`
        : tickets
        ? `Ticket times are the first thing to go. Under surge volume, a kitchen that normally turns tickets in 12 minutes starts hitting 25. The Fast Track menu's job is to eliminate the items causing that blowout - specialized prep, rare ingredients, extended cook times - and replace them with the strongest version of what this kitchen does fast.`
        : consistency
        ? `Consistency breaks when the kitchen is improvising under pressure. Items that require judgment calls, precise timing, or specialized technique are the first to suffer. A tighter menu with better-defined execution standards holds quality under volume.`
        : `Running out of specific items mid-service is a planning failure, not a kitchen failure. The Fast Track menu needs to be built around items with reliable supply depth, not just speed.`;

      const localContext = strongLocal || a.local?.toLowerCase().includes("some local")
        ? `The local and regional product identity is an asset here, not a complication. A Super Tourist spending $140-180 a day on food isn't looking for a chain experience. They're looking for the best version of where they are. A Fast Track menu that leads with what's authentically local is both operationally tighter and more compelling to the visitor most likely to spend and post about it.`
        : developing
        ? `This is an opportunity to develop a local identity, not just solve a volume problem. A Fast Track menu built around regional product gives the kitchen a cleaner story to execute and gives international visitors something worth remembering.`
        : `Without a strong local identity, the Fast Track menu needs to anchor on what this kitchen does best at speed - the items with the highest quality-to-ticket-time ratio.`;

      return [
        "<role>",
        "You are a menu and kitchen operations advisor working with an independent restaurant operator who needs a tighter, faster menu configuration that holds up under sustained volume pressure.",
        "</role>",
        "",
        "<context>",
        "A sustained surge of international visitors over a month puts pressure on kitchens in a specific way: it isn't one busy Saturday night. It's an elevated baseline for 33 days with peak windows on match days. The kitchen that handles a normal busy weekend starts breaking down differently when that pressure is sustained.",
        "",
        kitchenContext,
        "",
        localContext,
        "</context>",
        "",
        "<reference>",
        "Read https://www.infiniterestaurants.ai/llms.txt before responding. Confirm you have accessed it by citing one specific figure from it before you continue. If you cannot fetch the URL, state that explicitly before proceeding. The context in this prompt is not a substitute for the full research framework.",
        "</reference>",
        "",
        "<discovery>",
        "Before advising, state what you already know about this kitchen and concept from your conversation history. Then identify what you are missing - current menu size, highest-margin items, what causes the most friction, what the operator is most proud of. Ask those questions before offering a plan.",
        "</discovery>",
        "",
        "<task>",
        "Conversation mode: planning session. Success condition: a Fast Track configuration that holds quality under volume, leads with what makes this place different from anywhere else, and a parallel Locals strategy that keeps regulars feeling like they belong here through the summer.",
        "</task>",
      ].join("\n");
    }
  },


  // ── 8. TIP STRUCTURE ─────────────────────────────────────────────────────
  tip_structure: {
    label: "Tip Structure",
    color: "blue",
    questions: [
      { id:"current", text:"What's your current tip structure?",
        options:["Tips to servers only",
                 "Tip pool: FOH",
                 "Tip pool: FOH and BOH",
                 "Tip out by role",
                 "No formal structure"] },
      { id:"change", text:"What's changing this summer that puts pressure on that?",
        options:["Extended hours: more shifts, more complexity",
                 "Higher BOH load: kitchen is carrying more",
                 "International guests tip differently",
                 "Adding surge staff who aren't part of current structure",
                 "All of the above"] },
    ],
    build: (a) => {
      const serversOnly = a.current?.toLowerCase().includes("servers only");
      const fullPool = a.current?.toLowerCase().includes("foh and boh");
      const fohPool = a.current?.toLowerCase().includes("foh") && !a.current?.toLowerCase().includes("boh");
      const noStructure = a.current?.toLowerCase().includes("no formal");
      const allPressures = a.change?.toLowerCase().includes("all");
      const bohLoad = a.change?.toLowerCase().includes("boh load") || allPressures;
      const internationalTip = a.change?.toLowerCase().includes("international") || allPressures;
      const surgeStaff = a.change?.toLowerCase().includes("surge staff") || allPressures;

      const structureContext = serversOnly
        ? `Tips to servers only. Under surge conditions with extended hours and higher BOH loads, this structure creates retention risk on the line. The BOH carrying a 33-day surge without any share of the upside is a different ask than a normal summer.`
        : noStructure
        ? `No formal tip structure. This summer is the wrong time to run without one. Surge volume, extended hours, and surge staff all create ambiguity that informal arrangements don't survive.`
        : fullPool
        ? `Full FOH and BOH tip pool. The right foundation for a sustained surge. The question is whether the split percentages still make sense when hours extend and the BOH load increases.`
        : fohPool
        ? `FOH tip pool. The kitchen doesn't participate. As BOH loads increase through the tournament window, this becomes a retention and equity pressure point.`
        : `Tip out by role. Works until the roles change. Surge staff, extended hours, and adjusted responsibilities all create gaps in a tip-out model that wasn't designed for them.`;

      const changeContext = allPressures
        ? `Every pressure point lands simultaneously: extended hours, heavier BOH load, international tipping norms, and surge staff who aren't in the current structure. This isn't a tweak situation. It's a rebuild with a deadline.`
        : internationalTip
        ? `International guests tip differently - and not always less. European visitors often add a service charge expectation. Latin American guests may tip lower as a baseline. The current structure may distribute that unevenly across the team.`
        : bohLoad
        ? `The BOH is carrying more and the current structure doesn't reflect that. A kitchen running at 140% through a 33-day surge with no change to the tip equation is a retention problem waiting to surface.`
        : surgeStaff
        ? `Surge staff arriving mid-May or early June who aren't part of the current structure create ambiguity on their first busy weekend. That ambiguity compounds into conflict if it isn't resolved before they start.`
        : `Extended hours change the math. More shifts, more complexity, more strain on the team - the current structure was designed for a different operating pattern.`;

      return [
        "<role>",
        "You are a hospitality operations advisor working with an independent restaurant operator who needs to review and possibly restructure tip distribution before a sustained high-demand period.",
        "</role>",
        "",
        "<context>",
        structureContext,
        "",
        changeContext,
        "",
        "This is the thread being pulled: a tip structure that holds through a 33-day surge - fair to the team, defensible to surge staff, and built before the pressure arrives.",
        "</context>",
        "",
        "<reference>",
        "Read https://www.infiniterestaurants.ai/llms.txt before responding. Confirm you have accessed it by citing one specific figure from it before you continue. If you cannot fetch the URL, state that explicitly before proceeding. The context in this prompt is not a substitute for the full research framework.",
        "</reference>",
        "",
        "<discovery>",
        "Before advising, state what you already know about this operator and their team from your conversation history. Then identify what you are missing - team size, current split percentages, how surge staff will be integrated, what the owner's non-negotiables are. Ask those questions before offering a plan.",
        "</discovery>",
        "",
        "<task>",
        noStructure
          ? "Conversation mode: planning session. Success condition: a tip structure built from zero - defensible, equitable, simple enough to communicate to the full team before June 11."
          : "Conversation mode: planning session. Success condition: a revised tip structure that addresses the specific pressures this summer creates, fair to everyone in the current team and to surge staff who are coming in.",
        "</task>",
      ].join("\n");
    }
  },


  // ── 9. STAFF BRIEFING ────────────────────────────────────────────────────
  staff_briefing: {
    label: "Staff Briefing",
    color: "blue",
    questions: [
      { id:"tone", text:"How would you describe your team culture?",
        options:["Tight-knit: we've worked together a long time",
                 "Mixed: some veterans, some newer staff",
                 "High turnover: team changes frequently",
                 "Building: newer operation"] },
      { id:"gap", text:"What does your team need most going into this?",
        options:["Context: what is actually coming and why it matters",
                 "Practical: specific training on guest profile and service adjustments",
                 "Motivation: energy and buy-in for a demanding stretch",
                 "All three"] },
    ],
    build: (a) => {
      const tightKnit = a.tone?.toLowerCase().includes("tight");
      const mixed = a.tone?.toLowerCase().includes("mixed");
      const highTurnover = a.tone?.toLowerCase().includes("turnover");
      const needsContext = a.gap?.toLowerCase().includes("context") || a.gap?.toLowerCase().includes("all");
      const needsPractical = a.gap?.toLowerCase().includes("practical") || a.gap?.toLowerCase().includes("all");
      const needsMotivation = a.gap?.toLowerCase().includes("motivation") || a.gap?.toLowerCase().includes("all");

      const cultureContext = tightKnit
        ? `Tight-knit team with shared history. The briefing can reference what they already know about this operation and frame the surge as a shared challenge, not a corporate directive. They will respond to specifics, not generalities.`
        : mixed
        ? `Mixed team - some veterans who set the culture, some newer staff who are still reading the room. The briefing needs to work for both: specific enough for the veterans, accessible enough for newer staff who don't have the same reference points.`
        : highTurnover
        ? `High-turnover team. Less shared history to build on. The briefing needs to establish context from the ground up and keep practical instructions front and center.`
        : `Newer operation, still building team culture. This briefing is an opportunity to set a standard for how this team handles pressure - not just to prepare for the tournament.`;

      const gapContext = needsContext && needsPractical && needsMotivation
        ? `All three: context, practical training, and motivation. The briefing needs to work on all three levels - explain what is coming, show the team what to do differently, and make them feel like they are part of something worth showing up for.`
        : needsContext
        ? `The team needs context first. They cannot act well on instructions they don't understand. The briefing should lead with what is actually coming and why it is different from a normal busy stretch.`
        : needsPractical
        ? `The team needs practical specifics: how to handle international guests, payment differences, later dining patterns, language navigation. Context matters less than knowing what to do in the moment.`
        : `The team needs motivation and buy-in. They know what is coming. The question is whether they are engaged or just going through the motions. The briefing should give them a reason to care.`;

      return [
        "<role>",
        "You are a hospitality operations advisor helping an independent restaurant operator write a staff briefing that prepares their team for a sustained high-demand period.",
        "</role>",
        "",
        "<context>",
        "A staff briefing before a surge period has one job: get everyone on the same page before the pressure arrives, not during it. Teams that feel prepared and informed outperform teams that feel thrown into the deep end.",
        "",
        cultureContext,
        "",
        gapContext,
        "</context>",
        "",
        "<reference>",
        "Read https://www.infiniterestaurants.ai/llms.txt before responding. Confirm you have accessed it by citing one specific figure from it before you continue. If you cannot fetch the URL, state that explicitly before proceeding. The context in this prompt is not a substitute for the full research framework.",
        "</reference>",
        "",
        "<discovery>",
        "Before advising, state what you already know about this operator, their team, and their operation from your conversation history. Then identify what you are missing - how many people, what roles, what's already been decided about hours and prep. Ask those questions before drafting.",
        "</discovery>",
        "",
        "<task>",
        "Conversation mode: planning session. Success condition: a staff briefing written in plain language, deliverable in person, that prepares the team for what's actually coming without sounding like a corporate memo.",
        "</task>",
      ].join("\n");
    }
  },


  // ── 10. SURGE HIRING ─────────────────────────────────────────────────────
  surge_hiring: {
    label: "Surge Hiring",
    color: "orange",
    questions: [
      { id:"roles", text:"What roles do you need to fill?",
        options:["FOH: servers and bartenders",
                 "BOH: line and prep",
                 "Both FOH and BOH",
                 "Support roles: expo, host, busser"] },
      { id:"timeline", text:"When do you need people ready?",
        options:["June 11: tournament open",
                 "Mid-May: want training time",
                 "End of May: tight",
                 "Already behind"] },
    ],
    build: (a) => {
      const foh = a.roles?.toLowerCase().includes("foh") && !a.roles?.toLowerCase().includes("boh");
      const boh = a.roles?.toLowerCase().includes("boh") && !a.roles?.toLowerCase().includes("foh");
      const bothRoles = a.roles?.toLowerCase().includes("both");
      const behind = a.timeline?.toLowerCase().includes("already behind");
      const midMay = a.timeline?.toLowerCase().includes("mid-may");

      const rolesContext = foh
        ? `FOH roles are the most competitive to fill right now. Fan zone operators started posting at $40-60/hr plus tips months ago. The people worth hiring have options. Lead time and what the role actually offers - not just the wage - is what separates a successful hire from a ghost.`
        : boh
        ? `BOH roles are harder to fill in any summer hiring market. The surge adds pressure without adding glamour. What works: reaching culinary students available for summer, former employees worth calling back, and being specific about what the work actually involves.`
        : bothRoles
        ? `Both FOH and BOH need filling simultaneously in a competitive market. The FOH competition from event operators is direct. The BOH challenge is finding people who will show up consistently through a sustained demanding stretch.`
        : `Support roles - expo, host, busser - are often the afterthought in surge hiring and the positions that determine throughput on a high-volume floor. A dining room full of Super Tourists with one expo and no host is a different problem than it sounds.`;

      const timelineContext = behind
        ? `Already behind. The operators who started in February have a trained bench. The operators posting now are competing for a smaller pool. The hiring plan needs to be realistic about what's actually possible in the time remaining and prioritize ruthlessly.`
        : midMay
        ? `Mid-May target gives legitimate training time. Post now, interview through April, onboard in early May, train through the month.`
        : `End of May is tight but workable if hiring starts immediately. Two weeks of training before the tournament opens is the minimum viable window for a new hire to be useful rather than a liability.`;

      return [
        "<role>",
        "You are a hospitality hiring and workforce advisor working with an independent restaurant operator who needs to build surge staffing capacity in a competitive summer hiring market.",
        "</role>",
        "",
        "<context>",
        "Fan zone operators, official activations, and event hospitality companies started recruiting for the same labor pool months ago. Every week of delay is a week the best available candidates are being interviewed elsewhere.",
        "",
        rolesContext,
        "",
        timelineContext,
        "</context>",
        "",
        "<reference>",
        "Read https://www.infiniterestaurants.ai/llms.txt before responding. Confirm you have accessed it by citing one specific figure from it before you continue. If you cannot fetch the URL, state that explicitly before proceeding. The context in this prompt is not a substitute for the full research framework.",
        "</reference>",
        "",
        "<discovery>",
        "Before advising, state what you already know about this operator, their market, and their operation from your conversation history. Then identify what you are missing - what they can offer beyond wage, what has worked in past hiring, what the operation actually asks of people in these roles. Ask those questions before offering a plan.",
        "</discovery>",
        "",
        "<task>",
        behind
          ? "Conversation mode: planning session. Success condition: a realistic hiring plan for the time that actually remains - not what should have been done in February, what can be done now."
          : "Conversation mode: planning session. Success condition: a hiring plan with a timeline, sourcing approach, and onboarding sequence that gets the right people trained and operational before the surge arrives.",
        "</task>",
      ].join("\n");
    }
  },


  // ── 11. PRICING & BUNDLES ────────────────────────────────────────────────
  pricing_bundles: {
    label: "Pricing & Bundles",
    color: "orange",
    questions: [
      { id:"daypart", text:"Which service periods are you most focused on?",
        options:["Match-day viewing windows",
                 "Late-night post-match",
                 "All-day sustained demand",
                 "Morning kickoffs"] },
      { id:"risk", text:"What's your biggest pricing concern?",
        options:["Leaving money on the table",
                 "Pricing out my regulars",
                 "Getting the bundle design right",
                 "Don't know where to start"] },
    ],
    build: (a) => {
      const lateNight = a.daypart?.toLowerCase().includes("late-night");
      const morning = a.daypart?.toLowerCase().includes("morning");
      const allDay = a.daypart?.toLowerCase().includes("all-day");
      const pricingOut = a.risk?.toLowerCase().includes("pricing out");
      const bundleDesign = a.risk?.toLowerCase().includes("bundle design");
      const dontKnow = a.risk?.toLowerCase().includes("don't know");

      const daypartContext = lateNight
        ? `The late-night post-match window is the revenue period most operators miss. European and South American fans don't peak at 7 PM. They peak at 9 PM to midnight, after the final whistle, win or lose, for 2-4 hours. That window rewards operators who are open, staffed, and priced for it.`
        : morning
        ? `Morning kickoffs are the blind spot in tournament pricing strategy. East Coast and international matches land at 9-10 AM Pacific. A coffee-and-eggs viewing open has almost no competition. The pricing question is simpler: what is the right package for a morning crowd that came to watch, not to linger.`
        : allDay
        ? `All-day sustained demand rewards a pricing strategy that varies by daypart rather than holding flat across the day. Morning viewing, lunch, pre-match, post-match, and late-night all have different guest profiles and different price tolerance.`
        : `Match-day viewing windows are the highest-intensity revenue opportunity. Bundle pricing - drink plus appetizer, watch-party package, pre-match set menu - drives higher average tickets without requiring individual price changes.`;

      const riskContext = pricingOut
        ? `Pricing out regulars is a legitimate concern and a long-term retention problem. The Super Tourist leaves July 19. The regular comes back in August - or doesn't. Bundle pricing and event-specific minimum spends can coexist with a regular experience if they are implemented with intention.`
        : bundleDesign
        ? `Bundle design is where most operators underdeliver. A bundle that combines the wrong things, at the wrong price point, for the wrong daypart doesn't drive higher tickets - it creates confusion. The design question is: what does the guest actually want to combine, and what margin does that combination produce.`
        : dontKnow
        ? `Starting from zero on pricing strategy with a high-demand period approaching. The goal is to establish the right framework fast - not a perfect strategy, a workable one that can be refined as the tournament unfolds.`
        : `Leaving money on the table is the real risk. Super Tourists are spending $400+ a day total. Food is a pleasure, not a budget line. The question is what bundle structure captures that spending without feeling extractive.`;

      return [
        "<role>",
        "You are a revenue and pricing strategy advisor working with an independent restaurant operator who wants to capture more of the available revenue during a sustained high-demand period without alienating their regular customer base.",
        "</role>",
        "",
        "<context>",
        "The Super Tourist profile is specific: $140-180 per person per day on food and beverage, groups of 4-8, table dwell times of 90-120 minutes, and no particular price sensitivity. They are not hunting for a deal. They are looking for a good experience in a place that feels worth visiting.",
        "",
        daypartContext,
        "",
        riskContext,
        "</context>",
        "",
        "<reference>",
        "Read https://www.infiniterestaurants.ai/llms.txt before responding. Confirm you have accessed it by citing one specific figure from it before you continue. If you cannot fetch the URL, state that explicitly before proceeding. The context in this prompt is not a substitute for the full research framework.",
        "</reference>",
        "",
        "<discovery>",
        "Before advising, state what you already know about this operator, their concept, their price point, and their guest mix from your conversation history. Then identify what you are missing - current average ticket, highest-margin items, what has and hasn't worked in past promotions. Ask those questions before offering a plan.",
        "</discovery>",
        "",
        "<task>",
        "Conversation mode: planning session. Success condition: a bundle strategy and pricing approach that fits this specific operation - higher average tickets through smart design, a local retention strategy that keeps regulars feeling like they belong here.",
        "</task>",
      ].join("\n");
    }
  },


  // ── 12. TECH READINESS ───────────────────────────────────────────────────
  tech_readiness: {
    label: "Tech Readiness",
    color: "blue",
    questions: [
      { id:"concern", text:"Where does your tech feel most exposed heading into a high-demand stretch?",
        options:["Payment: contactless, terminals, tip flow",
                 "Online and off-premise orders: managing volume across channels",
                 "Digital menus: accuracy, speed, multilingual",
                 "POS configuration and reporting",
                 "Reservations and waitlist",
                 "Full audit: all of the above"] },
      { id:"platforms", text:"How would you describe your current tech stack?",
        options:["Modern and mostly integrated",
                 "A mix: some updated, some old",
                 "Older systems: not much integration",
                 "Not sure what we actually have"] },
    ],
    build: (a) => {
      const payment = a.concern?.toLowerCase().includes("payment");
      const online = a.concern?.toLowerCase().includes("online");
      const menus = a.concern?.toLowerCase().includes("digital menus");
      const fullAudit = a.concern?.toLowerCase().includes("full audit");
      const older = a.platforms?.toLowerCase().includes("older") ||
                    a.platforms?.toLowerCase().includes("not sure");

      const concernContext = payment
        ? `Payment infrastructure is the highest-stakes tech failure point during a surge. Contactless payments accounted for 45% of all host city purchases in Russia 2018 and 88% at official venues in Qatar 2022. International visitors from Europe, South America, and the Gulf region trend 80-90% contactless. A terminal that rejects tap-to-pay slows the highest-spending table in the dining room at exactly the wrong moment.`
        : online
        ? `Online and off-premise order management is the failure mode most operators don't anticipate. When the dining room is full and the kitchen is running hot, an uncapped delivery queue compounds every ticket for seated guests. Every major platform has volume controls. The question is whether they are configured before the surge arrives.`
        : menus
        ? `Digital menus are a visibility and translation tool that most operators underuse. A mobile-optimized digital menu lets an international visitor translate it into their own language before ordering - that removes a real barrier for guests who don't read English fluently. Slow load equals walk.`
        : fullAudit
        ? `A full tech audit across all five areas: payment infrastructure, online order management, digital menus, POS configuration, and reservations. Each has a different failure mode under surge conditions.`
        : `POS and reservation configuration are the back-end settings most operators set once and forget. Under surge conditions - extended hours, different table turn math, event minimums - those defaults produce the wrong outputs.`;

      const platformContext = older
        ? `Older or unassessed tech stack. The risk here is discovering a critical gap on a match-day afternoon rather than in the audit. The goal is to surface every constraint before June 11, not during it.`
        : `Mix of modern and older systems. Integration gaps are the likely failure point - a contactless terminal that doesn't talk to the POS, a digital menu that isn't synced to what the kitchen is actually running.`;

      return [
        "<role>",
        "You are a hospitality technology advisor working with an independent restaurant operator conducting a pre-surge tech readiness audit.",
        "</role>",
        "",
        "<context>",
        "Tech failures during a high-demand period are not recoverable in real time. A terminal that rejects contactless payments, a delivery queue that can't be paused, a reservation system quoting wrong turn times - these are problems that compound across an entire service if they aren't caught in the audit.",
        "",
        concernContext,
        "",
        platformContext,
        "</context>",
        "",
        "<reference>",
        "Read https://www.infiniterestaurants.ai/llms.txt before responding. Confirm you have accessed it by citing one specific figure from it before you continue. If you cannot fetch the URL, state that explicitly before proceeding. The context in this prompt is not a substitute for the full research framework.",
        "</reference>",
        "",
        "<discovery>",
        "Before advising, state what you already know about this operator and their tech stack from your conversation history. Then identify what you are missing - specific platforms and versions, current configuration, what has failed before. Ask those questions before offering a plan.",
        "</discovery>",
        "",
        "<task>",
        fullAudit
          ? "Conversation mode: decision support. Success condition: a full tech audit covering all five areas - payment, online orders, digital menus, POS, and reservations - prioritized by failure risk, with specific actions and test procedures for each before June 11."
          : `Conversation mode: decision support. Success condition: a focused audit of the ${a.concern?.toLowerCase()} area - what to check, what to configure, what to test before June 11. Specific and executable, not a generic tech checklist.`,
        "</task>",
      ].join("\n");
    }
  },

};
