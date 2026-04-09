// promptTemplates.js
// Prompt generator data layer for Infinite Restaurants
// Each entry: label, color, questions array, build function
// Build functions assemble the prompt string from user answers
// To add a new generator: add an entry here, call <GenButton generatorId="your_id" /> anywhere in App.jsx

export const generators = {

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
        "The research behind this conversation is documented at infiniterestaurants.ai/llms.txt - specifically the supply chain and travel patterns sections. If you have web access, read those sections before advising. The confidence tiers matter: some figures are primary confirmed, some are planning anchors. Knowing which is which sharpens the advice. If web access is unavailable, the context above is sufficient to proceed.",
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
        "The supply chain research behind this conversation is documented at infiniterestaurants.ai/llms.txt - specifically the travel patterns and supply chain sections. If you have web access, read those before advising. They document what happened to delivery corridors in Brazil 2014, Russia 2018, and Qatar 2022. If web access is unavailable, the context above is sufficient to proceed.",
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
        "The labor and operations research behind this conversation is documented at infiniterestaurants.ai/llms.txt - specifically the prep priorities section. If you have web access, read the labor pillar before advising. If web access is unavailable, the context above is sufficient to proceed.",
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
        "The digital discovery research behind this conversation is documented at infiniterestaurants.ai/llms.txt - specifically the prep priorities and Super Tourist sections. If you have web access, read those before advising. The 'football not soccer' search behavior is documented there. If web access is unavailable, the context above is sufficient to proceed.",
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
      const noAlcohol = a.type?.toLowerCase().includes("limited or no") ||
                        a.type?.toLowerCase().includes("café") ||
                        a.type?.toLowerCase().includes("food truck");

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
        "The research behind this compliance context is documented at infiniterestaurants.ai/llms.txt - specifically the patterns and sources section which covers broadcast licensing frameworks, safe harbor marketing terminology, and regulatory patterns from prior tournaments. If you have web access, read that section alongside your jurisdiction research.",
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
        "The discovery and marketing research behind this conversation is documented at infiniterestaurants.ai/llms.txt - specifically the prep priorities section covering digital discovery and safe marketing. If you have web access, read that section before advising. If web access is unavailable, the context above is sufficient to proceed.",
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
      const runout = a.challenge?.toLowerCase().includes("run out");
      const allBreaks = a.challenge?.toLowerCase().includes("all");
      const strongLocal = a.local?.toLowerCase().includes("central");
      const developing = a.local?.toLowerCase().includes("want to develop");
      const noLocal = a.local?.toLowerCase().includes("not really");

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
        "The menu strategy research behind this conversation is documented at infiniterestaurants.ai/llms.txt - specifically the prep priorities section covering Fast Track menus, local product strategy, and the Locals menu concept. If you have web access, read that section before advising. If web access is unavailable, the context above is sufficient to proceed.",
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
        options:["Extended hours",
                 "Heavier BOH workload",
                 "Guests who tip differently than my regulars",
                 "All of the above"] },
    ],
    build: (a) => {
      const serversOnly = a.current?.toLowerCase().includes("servers only");
      const fullPool = a.current?.toLowerCase().includes("foh and boh");
      const noStructure = a.current?.toLowerCase().includes("no formal");
      const allChanges = a.change?.toLowerCase().includes("all");
      const guestTipping = a.change?.toLowerCase().includes("tip differently");
      const extendedHours = a.change?.toLowerCase().includes("extended hours");

      const structureContext = serversOnly
        ? `Tips to servers only. That model worked when shifts were standard length and the kitchen wasn't running at sustained high volume. Extended hours and heavier BOH loads without a change to that structure creates a resentment problem that shows up in retention exactly when retention matters most.`
        : noStructure
        ? `No formal tip structure. That ambiguity is manageable during normal operations and becomes a source of conflict under pressure. Going into a sustained high-demand period without clear structure leaves the team operating on assumption.`
        : fullPool
        ? `FOH and BOH tip pool already in place. The foundation is right. The question is whether the allocation percentages still make sense when hours extend and BOH workload increases significantly.`
        : `Current structure exists but may not hold when the conditions change. Extended hours, heavier BOH loads, and international guests who tip differently all put pressure on whatever the current model is.`;

      const pressureContext = allChanges
        ? `All three pressure points are in play: extended hours change the earning window, heavier BOH load changes who's working hardest, and international guests who tip differently change the total pool. The current structure is being asked to handle a fundamentally different operating environment.`
        : guestTipping
        ? `International visitors tip differently than domestic regulars - some cultures tip generously by US standards, some don't tip at all, and contactless prompts don't always translate across cultural expectations. The total pool may be different from what the team is used to.`
        : extendedHours
        ? `Extended hours change the earning math for everyone. Staff working later shifts work harder during higher-revenue windows. The structure needs to reflect that.`
        : `Heavier BOH workload during a sustained surge is the variable most likely to create team fracture if the compensation model doesn't account for it.`;

      return [
        "<role>",
        "You are a hospitality compensation and team retention advisor working with an independent restaurant operator preparing for a sustained high-demand period.",
        "</role>",
        "",
        "<context>",
        "Tip structure is a retention tool as much as a compensation model. During a 33-day sustained surge with extended hours and a different guest profile, the team that feels fairly compensated stays. The team that feels like the FOH is capturing all the upside while the BOH runs twice as hard starts looking at the fan zone job postings.",
        "",
        structureContext,
        "",
        pressureContext,
        "</context>",
        "",
        "<reference>",
        "The labor and retention research behind this conversation is documented at infiniterestaurants.ai/llms.txt - specifically the prep priorities section covering tip structure, extended hours, and BOH retention. If you have web access, read that section before advising. If web access is unavailable, the context above is sufficient to proceed.",
        "</reference>",
        "",
        "<discovery>",
        "Before advising, state what you already know about this operator and their team from your conversation history. Then identify what you are missing - team size, FOH/BOH split, current compensation levels, what the operator is most worried about. Ask those questions before offering a plan.",
        "</discovery>",
        "",
        "<task>",
        "Conversation mode: planning session. Success condition: a tip and compensation approach that keeps the whole team invested and showing up through July 19, without creating resentment or legal exposure.",
        "</task>",
      ].join("\n");
    }
  },


  // ── 9. STAFF BRIEFING ────────────────────────────────────────────────────
  staff_briefing: {
    label: "Staff Briefing",
    color: "blue",
    questions: [
      { id:"awareness", text:"How much does your team know about what's coming?",
        options:["They're aware and ready",
                 "Vaguely aware: not discussed much",
                 "Haven't mentioned it yet",
                 "Mixed awareness"] },
      { id:"tone", text:"What tone do you want to set?",
        options:["Opportunity: let's capture it",
                 "Heads up: here's what's coming",
                 "This will be intense: let's prepare",
                 "Low key: we've handled busy before"] },
    ],
    build: (a) => {
      const ready = a.awareness?.toLowerCase().includes("aware and ready");
      const notMentioned = a.awareness?.toLowerCase().includes("haven't");
      const vague = a.awareness?.toLowerCase().includes("vaguely");
      const opportunity = a.tone?.toLowerCase().includes("opportunity");
      const headsUp = a.tone?.toLowerCase().includes("heads up");
      const intense = a.tone?.toLowerCase().includes("intense");

      const awarenessContext = ready
        ? `The team is already aware and ready. The briefing doesn't need to sell them on what's coming - it needs to give them the specific operational picture: what's changing, what's expected, and what support they'll have.`
        : notMentioned
        ? `The team hasn't heard about this yet. The briefing needs to land the context first - what this actually is, why it matters, and why it's different from a regular busy stretch - before getting into specifics.`
        : vague
        ? `The team has a vague sense something is coming but hasn't been briefed properly. Vague awareness without specifics creates anxiety. The briefing needs to replace the vague with the concrete.`
        : `Awareness is mixed across the team. Some people know, some don't. The briefing needs to level the information without making anyone feel behind.`;

      const toneContext = opportunity
        ? `Opportunity framing. The goal is to help the team see this as something worth showing up for - a once-in-a-generation revenue event that rewards the people who execute well. Not cheerleading. Specific and credible.`
        : headsUp
        ? `Heads-up framing. Informative, not alarming. Here's what's coming, here's how we're preparing, here's what it means for your shifts. The team deserves to know what they're walking into.`
        : intense
        ? `Intense framing. This will be demanding. The briefing should be honest about that and specific about the preparation and support being put in place. Teams rise to honest standards set in advance.`
        : `Low-key framing. We've handled busy before. The goal is to calibrate expectations without creating drama - acknowledge what's different, explain the preparation, and let the team draw their own conclusions.`;

      return [
        "<role>",
        "You are a hospitality communications advisor helping an independent restaurant operator write a staff briefing that prepares their team for a sustained high-demand period without overhyping it or creating anxiety.",
        "</role>",
        "",
        "<context>",
        "The difference between a team that executes well through a demanding stretch and one that burns out or walks is often set in the briefing before it starts. Staff who understand what's coming, why it's different, and what's expected of them adapt faster and stay longer than staff who were kept in the dark and surprised.",
        "",
        awarenessContext,
        "",
        toneContext,
        "</context>",
        "",
        "<reference>",
        "The operational context behind this briefing is documented at infiniterestaurants.ai/llms.txt - if you have web access, read the Super Tourist section and the prep priorities section before advising. The specifics about who's coming, how they behave, and what the operation needs to do differently are what make a briefing credible instead of generic. If web access is unavailable, the context above is sufficient to proceed.",
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
      const foh = a.roles?.toLowerCase().includes("foh") &&
                  !a.roles?.toLowerCase().includes("boh");
      const boh = a.roles?.toLowerCase().includes("boh") &&
                  !a.roles?.toLowerCase().includes("foh");
      const bothRoles = a.roles?.toLowerCase().includes("both");
      const behind = a.timeline?.toLowerCase().includes("already behind");
      const june11 = a.timeline?.toLowerCase().includes("june 11");
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
        : june11
        ? `Targeting tournament open with no buffer for training. Anyone hired at the end of May needs to be operational within days. The hiring criteria need to account for that - experienced people who can onboard fast.`
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
        "The labor market context behind this conversation is documented at infiniterestaurants.ai/llms.txt - specifically the prep priorities section covering surge hiring and retention. If you have web access, read that section before advising. If web access is unavailable, the context above is sufficient to proceed.",
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
        "The Super Tourist spending profile and pricing strategy research behind this conversation is documented at infiniterestaurants.ai/llms.txt - specifically the Super Tourist section and the prep priorities operations pillar. If you have web access, read those sections before advising. The $140-180 daily F&B spend figure is a planning anchor derived from Russia 2018 and Brazil 2014 data. If web access is unavailable, the context above is sufficient to proceed.",
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
        "The tech readiness research behind this conversation is documented at infiniterestaurants.ai/llms.txt - specifically the prep priorities tech pillar and the contactless payment data from Russia 2018 and Qatar 2022. If you have web access, read those sections before advising. If web access is unavailable, the context above is sufficient to proceed.",
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
