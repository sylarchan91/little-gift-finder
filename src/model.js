// Editorial heuristics for concepts, not probabilities or a validated psychological scale.
export const interests = ['Coffee & food', 'Art & making', 'Home & design', 'Books & stories', 'Nature & plants', 'Music'];
export const intentLabels = {seen:'I notice the little things',care:'You deserve a little comfort',together:'Let’s make a memory',celebrate:'I’m cheering you on',thanks:'I appreciate you'};
export const initialProfile = {relationship:'friend',occasion:'birthday',intent:'seen',interests:[],evidence:'observed',budget:75,requested:'',avoid:[]};
const concept = (id,title,image,category,range,tags,intents,intensity,utility,novelty,occasions,flags,description,watch,note) => ({id,title,image,category,min:range[0],max:range[1],tags,intents,intensity,utility,novelty,occasions,flags,description,watch,note});
export const gifts = [
 concept('mug','A softer start to the day','mug','Everyday ritual',[20,45],['Coffee & food','Art & making'],['seen','care'],1,1,.6,['birthday','just'],[], 'A sculptural ceramic cup for the coffee ritual they never skip.', 'Check their favorite cup size, handle shape and dishwasher needs.', 'For the first quiet moment of your day.'),
 concept('lamp','Their own little golden hour','lamp','Home comfort',[40,75],['Home & design'],['care','seen'],2,.9,.8,['home','birthday'],[], 'A playful mushroom lamp that turns their reading corner into a place to linger.', 'Check their space, preferred light warmth and local plug requirements.', 'A little warmth for your favorite corner.'),
 concept('journal','Room for the next big idea','journal','Creative ritual',[12,25],['Books & stories','Art & making'],['celebrate','seen'],1,1,.4,['birthday','thanks'],[], 'A linen notebook for unfinished ideas, small plans and things worth keeping.', 'Paper and ruling are personal. Ask what they like using.', 'For the idea you haven’t stopped thinking about.'),
 concept('vase','One flower, a whole mood','vase','Home comfort',[20,50],['Home & design','Nature & plants'],['thanks','seen'],1,.7,.8,['home','thanks'],[], 'An unexpected little bud vase, chosen for the colors they already love.', 'Check their decor and keep flowers safe around pets.', 'Saw this color and immediately thought of you.'),
 concept('clay','An afternoon, a little messy','clay','Shared experience',[40,100],['Art & making'],['together','celebrate'],2,.7,.8,['birthday','anniversary'],['booking'], 'A beginner pottery workshop: time to try something, with no need to be good at it.', 'Ask about dates, accessibility and whether they would like company before booking.', 'Want to make something wonderfully imperfect together?'),
 concept('letters','A small archive of us','letters','Personal keepsake',[0,15],['Books & stories'],['together','seen'],3,.5,.6,['anniversary'],[], 'Three handwritten notes: a memory, something you admire, and a plan for another day.', 'Choose memories you both enjoy. Keep the intimacy comfortable for them.', 'I still think about that afternoon.'),
 concept('playlist','The soundtrack only you get','journal','Made by you',[0,0],['Music'],['seen','together'],2,.8,.7,['anniversary','just'],[], 'A short playlist with a sentence explaining why each song made the cut.', 'Use a music service they can access. Your notes matter more than the number of songs.', 'Track three is here because of that rainy drive.'),
 concept('cutting','A little thing to grow','vase','Made by you',[0,15],['Nature & plants','Home & design'],['care','celebrate'],1,.7,.5,['home','just'],[], 'A rooted plant cutting in a reused jar, with a personal care card.', 'Check plant toxicity, available light and whether they want another plant.', 'A little green company for the windowsill.'),
 concept('tea','An invitation to slow down','mug','Everyday ritual',[12,30],['Coffee & food'],['care','thanks'],1,.9,.4,['thanks','just'],['food'], 'Their preferred tea, a quiet afternoon and a note that asks nothing in return.', 'Check ingredients, allergies and caffeine preferences. Do not guess.', 'No occasion. Just a little time for yourself.'),
 concept('reading','A story with a story inside','book','Personal keepsake',[10,30],['Books & stories'],['seen','celebrate'],1,1,.5,['birthday','thanks'],[], 'A book from a genre they love, with a removable note explaining your choice.', 'Check their wishlist and whether they already own it.', 'This made me think of our conversation about…'),
 concept('walk','An afternoon with no agenda','vase','Shared experience',[0,0],['Nature & plants'],['together','care'],1,.8,.5,['just','birthday'],[], 'A gentle local walk, a favorite view and time to talk. Let them pick the day.', 'Check weather, accessibility and their comfort with the route.', 'An afternoon outside, whenever you feel like it.'),
 concept('recipe','The recipe you always ask for','journal','Made by you',[0,0],['Coffee & food'],['thanks','seen'],1,.9,.5,['thanks','just'],[], 'Write out a favorite recipe, including the small tricks that never make it into the instructions.', 'Include all ingredients so they can decide what works for them.', 'The secret is in the last five minutes. Now it’s yours.')
];
const limits = {new:1,friend:2,partner:3,family:3,colleague:1};
const evidenceWeights = {guess:.35,observed:.75,mentioned:1};
export function rankGifts(profile,feedback={saved:[],hidden:[]}) {
 const hidden=new Set(feedback.hidden);
 const saved=gifts.filter(g=>feedback.saved.includes(g.id));
 const candidates=gifts.filter(g=>g.max<=Number(profile.budget)&&!g.flags.some(f=>profile.avoid.includes(f))&&!hidden.has(g.id));
 return candidates.map(g=>{
  const matched=g.tags.filter(t=>profile.interests.includes(t));
  const exact=profile.requested===g.id;
  const preference=exact?1:(matched.length?Math.min(1,.8+.2*(matched.length-1))*evidenceWeights[profile.evidence]:0);
  const intent=g.intents.includes(profile.intent)?1:0;
  const pressure=Math.max(0,g.intensity-limits[profile.relationship]);
  const relation=1-pressure/3;
  const uncertainExperience=g.category==='Shared experience'&&(profile.evidence==='guess'||!matched.length)&&!exact;
  const learning=saved.length?Math.min(6,Math.max(...saved.map(s=>s.category===g.category?6:s.tags.some(t=>g.tags.includes(t))?3:0))):0;
  const parts={preference:40*preference,intent:25*intent,relationship:15*relation,use:10*g.utility,occasion:g.occasions.includes(profile.occasion)?7:0,novelty:3*g.novelty,feedback:learning,risk:pressure*10+(uncertainExperience?12:0)};
  const score=Object.entries(parts).reduce((sum,[key,value])=>sum+(key==='risk'?-value:value),0);
  const reasons=[];
  if(exact)reasons.push('You selected this specific idea as something they asked for.');
  else if(matched.length)reasons.push(`${matched.join(' and ')} matches the interests you selected${profile.evidence==='guess'?', although you marked this as a guess':profile.evidence==='mentioned'?', which you said they have mentioned':', based on what you have noticed'}.`);
  else reasons.push('This is an exploratory direction; we do not have a matching interest signal yet.');
  if(intent)reasons.push(`It fits what you want to express: “${intentLabels[profile.intent]}.”`);
  if(pressure)reasons.push('The personal tone may feel strong for this relationship. Keep it lighter or check first.');
  else reasons.push('Its suggested level of intimacy stays within the relationship setting you chose.');
  if(learning)reasons.push('It shares a category or interest with an idea you saved this visit.');
  const uncertainty=uncertainExperience?'We are not sure this experience matches their preferences. Ask before planning it.':profile.evidence==='guess'&&!exact?'Your interest evidence is tentative. Treat this as a conversation starter.':'Specific taste, ownership and availability still need checking.';
  return {...g,score,parts,reasons,uncertainty,exact};
 }).sort((a,b)=>Number(b.exact)-Number(a.exact)||b.score-a.score||a.id.localeCompare(b.id));
}
export function selectDiverse(ranked,count=4){
 const picked=[];const remaining=[...ranked];
 while(picked.length<count&&remaining.length){
  remaining.sort((a,b)=>Number(b.exact)-Number(a.exact)||(b.score-6*picked.filter(g=>g.category===b.category).length)-(a.score-6*picked.filter(g=>g.category===a.category).length));
  picked.push(remaining.shift());
 }
 return picked;
}
export function requestedConflict(profile){const g=gifts.find(g=>g.id===profile.requested);if(!g)return '';if(g.max>Number(profile.budget))return 'The requested idea is outside your planning budget. We kept your budget limit.';if(g.flags.some(f=>profile.avoid.includes(f)))return 'The requested idea conflicts with an exclusion you selected. We kept that exclusion.';return '';}
