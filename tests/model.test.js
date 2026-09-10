import test from 'node:test';
import assert from 'node:assert/strict';
import {gifts,initialProfile,rankGifts,selectDiverse,requestedConflict} from '../src/model.js';
const p=changes=>({...initialProfile,...changes});
test('budget and exclusions cannot be overruled by an explicit wish or saved items',()=>{
 const profile=p({requested:'clay',budget:25,avoid:['booking']});
 const ranked=rankGifts(profile,{saved:['clay'],hidden:[]});
 assert.ok(ranked.every(g=>g.max<=25&&!g.flags.includes('booking')));
 assert.ok(!ranked.some(g=>g.id==='clay'));
 assert.match(requestedConflict(profile),/budget/);
});
test('zero spending only returns concepts whose complete planning range is zero',()=>{
 const ranked=rankGifts(p({budget:0}));
 assert.ok(ranked.length>0);assert.ok(ranked.every(g=>g.max===0));
});
test('an allowed explicit request stays first after diversity selection',()=>{
 const ranked=rankGifts(p({budget:120,requested:'clay',interests:['Home & design'],intent:'care'}));
 assert.equal(ranked[0].id,'clay');assert.equal(selectDiverse(ranked)[0].id,'clay');
});
test('stronger evidence boosts matching interests without increasing unrelated evidence',()=>{
 const weak=rankGifts(p({interests:['Coffee & food'],evidence:'guess'}));
 const strong=rankGifts(p({interests:['Coffee & food'],evidence:'mentioned'}));
 assert.ok(strong.find(g=>g.id==='mug').parts.preference>weak.find(g=>g.id==='mug').parts.preference);
 assert.equal(strong.find(g=>g.id==='lamp').parts.preference,0);
});
test('relationship stage actually changes the risk of an intimate keepsake',()=>{
 const early=rankGifts(p({relationship:'new'})).find(g=>g.id==='letters');
 const partner=rankGifts(p({relationship:'partner'})).find(g=>g.id==='letters');
 assert.ok(early.parts.risk>partner.parts.risk);assert.ok(early.score<partner.score);
});
test('intent changes scores and produces an explanation from that selection',()=>{
 const seen=rankGifts(p({intent:'seen'})).find(g=>g.id==='journal');
 const together=rankGifts(p({intent:'together'})).find(g=>g.id==='journal');
 assert.ok(seen.score>together.score);assert.ok(seen.reasons.some(r=>r.includes('notice the little things')));
});
test('uncertain experiences are penalized; direct requests remove that uncertainty penalty',()=>{
 const uncertain=rankGifts(p({budget:120,evidence:'guess',interests:['Art & making']})).find(g=>g.id==='clay');
 const requested=rankGifts(p({budget:120,evidence:'guess',interests:['Art & making'],requested:'clay'})).find(g=>g.id==='clay');
 assert.ok(uncertain.parts.risk>requested.parts.risk);
});
test('feedback is bounded, hidden gifts excluded, and reset restores the initial ranking',()=>{
 const base=rankGifts(p({}));
 const feedback={saved:['mug','tea','lamp'],hidden:['journal']};
 const changed=rankGifts(p({}),feedback);
 assert.ok(changed.every(g=>g.parts.feedback<=6));assert.ok(!changed.some(g=>g.id==='journal'));
 assert.deepEqual(rankGifts(p({})).map(g=>g.id),base.map(g=>g.id));
});
test('diversity selector adds no invalid candidates or duplicates, including empty pools',()=>{
 assert.deepEqual(selectDiverse([]),[]);
 const ranked=rankGifts(p({budget:25}));const selected=selectDiverse(ranked);
 assert.equal(new Set(selected.map(g=>g.id)).size,selected.length);assert.ok(selected.every(g=>ranked.some(r=>r.id===g.id)));
 assert.ok(selected.length<=4);
});
test('all selectable relationship, budget and evidence combinations return finite scores',()=>{
 for(const relationship of ['new','friend','partner','family','colleague'])for(const budget of [0,25,50,75,120])for(const evidence of ['guess','observed','mentioned']){
  const ranked=rankGifts(p({relationship,budget,evidence}));
  assert.ok(ranked.every(g=>Number.isFinite(g.score)&&g.max<=budget));
 }
 assert.equal(new Set(gifts.map(g=>g.id)).size,gifts.length);
});
