document.addEventListener('DOMContentLoaded',()=>{const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});$$('.reveal').forEach(e=>io.observe(e));
$$('[data-scroll]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.scroll)?.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'})));
const progress=$('#progress');addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max?scrollY/max*100:0)+'%'});
const lines=['Dear you,','I don’t know exactly when it happened.','Somewhere between the ordinary conversations,','the little laughs, and the moments I wanted to last longer,','you became incredibly important to me.','I like you. More than I know how to explain.','I just wanted you to know the truth. ♡'];
let n=0,typing=false,p=$('#typed-letter'),btn=$('#write-next');
let audioCtx=null,enabled=false;const sound=$('#sound');
function initSound(){if(audioCtx)return;audioCtx=new (window.AudioContext||window.webkitAudioContext)()}
function tick(){if(!enabled||!audioCtx||audioCtx.state==='suspended')return;const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='sine';o.frequency.value=1150+Math.random()*420;g.gain.setValueAtTime(.0001,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.014,audioCtx.currentTime+.006);g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+.045);o.connect(g).connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+.05)}
sound?.addEventListener('click',()=>{initSound();enabled=!enabled;if(audioCtx.state==='suspended')audioCtx.resume();sound.textContent=enabled?'sound on':'sound off'});
function wait(ms){return new Promise(r=>setTimeout(r,ms))}
async function write(){if(typing||n>=lines.length)return;typing=true;btn.disabled=true;btn.textContent='writing…';p.classList.add('writing');const existing=lines.slice(0,n).join('\n')+(n?'\n':'');const text=lines[n];p.textContent=existing;for(let i=0;i<text.length;i++){const ch=text[i];p.textContent=existing+text.slice(0,i+1);if(!/\s/.test(ch))tick();if(!reduce){await wait(/[.!?,;:…]/.test(ch)?210:ch===' '?32:38)}}n++;typing=false;p.classList.remove('writing');btn.disabled=n>=lines.length;btn.textContent=n>=lines.length?'The truth is out ♡':'Write the next line →';if(n===lines.length)p.animate([{filter:'blur(1px)'},{filter:'blur(0)'}],{duration:500,easing:'ease-out'})}
btn?.addEventListener('click',write);setTimeout(write,850);
$('#yes')?.addEventListener('click',e=>{const a=$('#answer');a.textContent='Okay… then I guess this is my favorite answer ever. ♡';a.classList.add('answer-pop');e.currentTarget.disabled=true;document.querySelectorAll('.question-glow').forEach(x=>x.animate([{opacity:.5,transform:'scale(.8)'},{opacity:1,transform:'scale(1.25)'},{opacity:.5,transform:'scale(1)'}],{duration:1200,easing:'ease-in-out'}));});
$('#time')?.addEventListener('click',()=>{$('#answer').textContent='Take all the time you need. I just wanted you to know. ♡'});
$$('.photo-slot').forEach(x=>x.addEventListener('click',()=>x.classList.toggle('focused')));

// Sender buddy: keep one character, and make every tap produce a visible floating reply.
const buddy=$('#senderBuddy');
const buddyLines=['hey… you tapped me. ♡','okay, I’m blushing now…','I really mean this.','stay a little longer?','you make this part less scary.','I’m rooting for us. ♡'];
let buddyTap=0;
function showBuddyReply(){if(!buddy)return;const text=buddyLines[buddyTap++%buddyLines.length];buddy.classList.remove('tapped');void buddy.offsetWidth;buddy.classList.add('tapped');const old=document.querySelector('.buddy-pop.active');if(old)old.remove();const pop=document.createElement('div');pop.className='buddy-pop active';pop.textContent=text;const r=buddy.getBoundingClientRect();pop.style.left=Math.max(12,Math.min(innerWidth-12,r.left+r.width/2))+'px';pop.style.top=Math.max(12,r.top-8)+'px';document.body.appendChild(pop);if(!reduce){pop.animate([{opacity:0,transform:'translate(-50%,12px) scale(.78)'},{opacity:1,transform:'translate(-50%,0) scale(1.04)',offset:.16},{opacity:1,transform:'translate(-50%,-20px) scale(1)',offset:.7},{opacity:0,transform:'translate(-50%,-58px) scale(.95)'}],{duration:3000,easing:'cubic-bezier(.2,.8,.2,1)'}).finished.then(()=>pop.remove()).catch(()=>pop.remove())}else{pop.style.opacity='1';setTimeout(()=>pop.remove(),2200)}setTimeout(()=>buddy.classList.remove('tapped'),650)}
buddy?.addEventListener('click',showBuddyReply);
buddy?.addEventListener('pointerdown',e=>e.stopPropagation());
});