const $=s=>document.querySelector(s),pgs=[...document.querySelectorAll('.pg')];
let cur=0,name=CONFIG.name,got=0,bt;
document.querySelectorAll('.nm').forEach(e=>e.textContent=name);
document.querySelectorAll('.bl').forEach(h=>{const t=h.textContent;h.innerHTML=[...t].map((c,i)=>c==' '?' ':`<span style="animation-delay:${i*.09}s">${c}</span>`).join('')});
const fl=$('#fl');['🎈','⭐','🎀','🍭','🧁','💖','🎁','✨'].forEach((e,i)=>{for(let k=0;k<2;k++){const s=document.createElement('i');s.textContent=e;s.style.cssText=`left:${(i*13+k*47)%96}%;font-size:${18+Math.random()*26}px;animation-duration:${9+Math.random()*10}s;animation-delay:${-Math.random()*14}s`;fl.append(s)}});
/* ---------- fireworks & confetti ---------- */
const cv=$('#cv'),x=cv.getContext('2d');let W,H,D=Math.min(devicePixelRatio||1,2);
function rs(){W=innerWidth;H=innerHeight;cv.width=W*D;cv.height=H*D;x.setTransform(D,0,0,D,0,0)}rs();addEventListener('resize',rs);
const rk=[],pt=[],cols=[[255,226,122],[255,156,205],[159,240,208],[201,182,255],[255,255,255],[255,170,100]];
function launch(tx,ty){rk.push({x:W/2+(Math.random()-.5)*W*.6,y:H,tx:tx??Math.random()*W,ty:ty??H*(.12+Math.random()*.35)})}
function boom(px,py,n=100){const c1=cols[Math.floor(Math.random()*6)],c2=cols[Math.floor(Math.random()*6)];
 for(let i=0;i<n;i++){const a=Math.PI*2*i/n,s=1+Math.random()*(n>50?4.5:3);pt.push({x:px,y:py,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:1,d:.01+Math.random()*.012,c:i%2?c1:c2})}}
function volley(n=10){for(let i=0;i<n;i++)setTimeout(()=>launch(),i*160)}
(function loop(){x.globalCompositeOperation='destination-out';x.fillStyle='rgba(0,0,0,.2)';x.fillRect(0,0,W,H);x.globalCompositeOperation='lighter';
 for(let i=rk.length-1;i>=0;i--){const r=rk[i],dy=r.ty-r.y;r.x+=(r.tx-r.x)*.05;r.y+=dy*.05-(r.y>r.ty+20?3:0);
  x.fillStyle='#fff';x.beginPath();x.arc(r.x,r.y,2.2,0,7);x.fill();if(Math.abs(dy)<14){boom(r.x,r.y);rk.splice(i,1)}}
 for(let i=pt.length-1;i>=0;i--){const p=pt[i];p.x+=p.vx;p.y+=p.vy;p.vx*=.97;p.vy=p.vy*.97+.05;p.l-=p.d;if(p.l<=0){pt.splice(i,1);continue}
  x.fillStyle=`rgba(${p.c},${p.l})`;x.beginPath();x.arc(p.x,p.y,1.4+p.l*1.6,0,7);x.fill()}
 requestAnimationFrame(loop)})();
setInterval(()=>launch(),900);setTimeout(()=>volley(4),300);
document.addEventListener('pointerdown',e=>{if(!e.target.closest('button,.gf,.b2'))launch(e.clientX,e.clientY)});
addEventListener('pointermove',e=>{if(Math.random()<.5)pt.push({x:e.clientX,y:e.clientY,vx:(Math.random()-.5)*1.5,vy:Math.random()*-1,l:.8,d:.03,c:cols[Math.floor(Math.random()*6)]})});
/* ---------- navigasi dengan transisi 3D beragam ---------- */
const V=[['translateX(-85%) rotateY(85deg) scale(.5)','translateX(85%) rotateY(-85deg) scale(.5)'],
['translateY(-95%) rotateX(75deg) scale(.4)','translateY(95%) rotateX(-75deg) scale(.4)'],
['rotateZ(-40deg) scale(0) translateX(-50%)','rotateZ(40deg) scale(0) translateX(50%)'],
['rotateY(180deg) scale(.3)','rotateY(-180deg) scale(.3)'],
['translateZ(-1300px) rotateZ(200deg)','translateZ(900px) rotateZ(-200deg)'],
['translateX(-60%) rotateX(360deg) scale(.3)','translateX(60%) rotateX(-360deg) scale(.3)']];
pgs.forEach((p,i)=>{p.style.setProperty('--l',V[i%6][0]);p.style.setProperty('--r',V[i%6][1])});
const dots=$('#dots');pgs.forEach(()=>dots.append(document.createElement('i')));
function go(n){if(n<0||n>=pgs.length)return;cur=n;pgs.forEach((p,i)=>p.className='pg '+(i==n?'act':i<n?'l':'r'));
 [...dots.children].forEach((d,i)=>d.className=i==n?'on':'');$('#nav').classList.toggle('hide',n==0);
 clearInterval(bt);if(n==1)type();if(n==2)game();if(n==3)gifts();if(n==4){document.querySelectorAll('.cd').forEach(c=>c.classList.remove('off'));$('#wish').classList.remove('on')}if(n==5)volley(16)}
$('#bp').onclick=()=>go(cur-1);$('#bn').onclick=()=>go(cur+1);$('#re').onclick=()=>go(0);
addEventListener('keydown',e=>{if(cur>0){if(e.key=='ArrowRight')go(cur+1);if(e.key=='ArrowLeft')go(cur-1)}});
let sx=null;addEventListener('touchstart',e=>sx=e.target.closest('.b2,.arena')?null:e.touches[0].clientX,{passive:true});
addEventListener('touchend',e=>{if(sx===null||cur==0)return;const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>60)go(cur+(d<0?1:-1))});
$('#go').onclick=()=>{volley(18);setTimeout(()=>volley(12),900);setTimeout(()=>go(1),2000)};
/* ---------- halaman ---------- */
let tm;function type(){const t=CONFIG.message,m=$('#msg');m.textContent='';clearInterval(tm);let i=0;tm=setInterval(()=>{m.textContent=t.slice(0,++i);if(i>=t.length)clearInterval(tm)},35)}
function game(){got=0;$('#sc').textContent=0;const a=$('#ar');a.innerHTML='';
 bt=setInterval(()=>{const b=document.createElement('div'),h=Math.floor(Math.random()*360);b.className='b2';b.innerHTML='<em>🎈</em>';b.firstChild.style.filter=`hue-rotate(${h}deg)`;
  b.style.left=Math.random()*(a.clientWidth-60)+'px';b.style.animationDuration=(4+Math.random()*3)+'s';
  b.onpointerdown=e=>{e.stopPropagation();boom(e.clientX,e.clientY,40);b.remove();$('#sc').textContent=++got;if(got==10){volley(14);$('#sc').parentNode.innerHTML='Hebat! Kamu menang 🏆🎉'}};
  b.onanimationend=()=>b.remove();a.append(b)},600)}
function gifts(){const g=$('#gr');g.innerHTML='';CONFIG.gifts.forEach(([e,t,m])=>{const d=document.createElement('div');d.className='gf';d.innerHTML=`<b>🎁</b><small>Buka aku!</small>`;
 d.onclick=()=>{if(d.classList.contains('on'))return;d.classList.add('on');d.innerHTML=`<b>${e}</b><small><b style="font-size:1rem">${t}</b><br>${m}</small>`;boom(d.getBoundingClientRect().x+60,d.getBoundingClientRect().y+40,60)};g.append(d)})}
$('#blow').onclick=()=>{document.querySelectorAll('.cd').forEach((c,i)=>setTimeout(()=>c.classList.add('off'),i*250));setTimeout(()=>{$('#wish').classList.add('on');volley(18)},900)};
go(0);
