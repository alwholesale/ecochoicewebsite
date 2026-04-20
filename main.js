/* ============================================
   ECO CHOICE GROUP — main.js v2
============================================ */

// ── LOADER ──
window.addEventListener('load',()=>{
  setTimeout(()=>{ const l=document.querySelector('.loader'); if(l) l.classList.add('hidden'); },1700);
});

// ── NAVBAR SCROLL ──
const navbar=document.querySelector('.navbar');
if(navbar) window.addEventListener('scroll',()=>{ navbar.classList.toggle('scrolled',window.scrollY>50); });

// ── MOBILE MENU ──
const ham=document.querySelector('.hamburger');
const mob=document.querySelector('.mobile-menu');
const cls=document.querySelector('.mobile-close');
if(ham&&mob){ ham.addEventListener('click',()=>mob.classList.add('open')); }
if(cls)     { cls.addEventListener('click', ()=>mob.classList.remove('open')); }
if(mob)     { mob.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mob.classList.remove('open'))); }

// ── SCROLL ANIMATIONS ──
const obsOpts={threshold:0.12,rootMargin:'0px 0px -40px 0px'};
const io=new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); }); },obsOpts);
document.querySelectorAll('.fade-in,.fade-in-left,.fade-in-right').forEach(el=>io.observe(el));

// ── COUNTER ANIMATION ──
function animateCounter(el){
  const target=parseInt(el.dataset.target); const suffix=el.dataset.suffix||'';
  const dur=2200; const step=target/(dur/16); let cur=0;
  const iv=setInterval(()=>{
    cur+=step; if(cur>=target){cur=target;clearInterval(iv);}
    el.textContent=Math.floor(cur)+suffix;
  },16);
}
const cio=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting&&!e.target.dataset.animated){ e.target.dataset.animated='1'; animateCounter(e.target); } });
},{threshold:.5});
document.querySelectorAll('.counter').forEach(el=>cio.observe(el));

// ── ACTIVE NAV ──
const page=window.location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('.nav-links a').forEach(a=>{
  if(a.getAttribute('href')===page||(page===''&&a.getAttribute('href')==='index.html')) a.classList.add('active');
});

// ── SMOOTH ANCHOR SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    const t=document.querySelector(a.getAttribute('href'));
    if(t) t.scrollIntoView({behavior:'smooth',block:'start'});
  });
});

// ── CURSOR GLOW ──
if(window.innerWidth>1024){
  const g=document.createElement('div');
  g.id='cursor-glow';
  g.style.cssText='position:fixed;width:480px;height:480px;border-radius:50%;background:radial-gradient(circle,rgba(46,97,173,.07) 0%,transparent 70%);pointer-events:none;z-index:0;transform:translate(-50%,-50%);transition:left .55s ease,top .55s ease;';
  document.body.appendChild(g);
  window.addEventListener('mousemove',e=>{ g.style.left=e.clientX+'px'; g.style.top=e.clientY+'px'; });
}

// ── TILT CARDS ──
document.querySelectorAll('.tilt-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(1000px) rotateY(${x*5}deg) rotateX(${-y*5}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave',()=>{ card.style.transform=''; });
});

// ── HERO PARALLAX ──
const heroParallax=document.querySelector('.hero-parallax-el');
if(heroParallax){
  window.addEventListener('scroll',()=>{ heroParallax.style.transform=`translateY(${window.scrollY*.25}px)`; });
}