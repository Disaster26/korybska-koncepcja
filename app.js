(function(){
  var top=document.getElementById('top'),bg=document.getElementById('burger');
  function zamknij(){top.classList.remove('open');bg.setAttribute('aria-expanded','false')}
  bg.addEventListener('click',function(){var o=top.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
  document.querySelectorAll('.menu a').forEach(function(a){a.addEventListener('click',zamknij)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')zamknij()});
  /* aktywna pozycja menu */
  var links=[].slice.call(document.querySelectorAll('.menu a[href^="#"]'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
    ['start','o-mnie','sprawy','pisma','kontakt'].forEach(function(id){io.observe(document.getElementById(id))});
  }
  /* karty: palec, mysz, strzalki, licznik */
  var k=document.getElementById('karty'),lic=document.getElementById('licznik'),karty=k.children;
  function krok(){return karty[0].getBoundingClientRect().width+14}
  function idx(){return Math.min(karty.length-1,Math.round(k.scrollLeft/krok()))}
  function odswiez(){lic.textContent=(idx()+1)+' / '+karty.length}
  k.addEventListener('scroll',function(){window.requestAnimationFrame(odswiez)},{passive:true});
  document.querySelector('.nav-k .dalej').addEventListener('click',function(){k.scrollBy({left:krok(),behavior:'smooth'})});
  document.querySelector('.nav-k .wstecz').addEventListener('click',function(){k.scrollBy({left:-krok(),behavior:'smooth'})});
  var x0=0,s0=0,ciag=false,ruch=false;
  k.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||getComputedStyle(k).display!=='flex')return;if(e.target.closest('summary'))return;ciag=true;ruch=false;x0=e.clientX;s0=k.scrollLeft});
  window.addEventListener('pointermove',function(e){if(!ciag)return;var d=e.clientX-x0;if(Math.abs(d)>4){ruch=true;k.classList.add('ciag')}k.scrollLeft=s0-d});
  window.addEventListener('pointerup',function(){if(!ciag)return;ciag=false;if(ruch){k.classList.remove('ciag');k.scrollTo({left:idx()*krok(),behavior:'smooth'})}});
  k.addEventListener('click',function(e){if(ruch){e.preventDefault();e.stopPropagation();ruch=false}},true);
  /* pasek telefonu po przewinieciu za pierwszy ekran */
  var pasek=document.getElementById('pasek'),hero=document.getElementById('start');
  if('IntersectionObserver' in window){new IntersectionObserver(function(es){pasek.classList.toggle('widac',!es[0].isIntersecting)},{threshold:0}).observe(hero)}
  /* cookies + mapa */
  var ck=document.getElementById('cookies'),mapa=document.getElementById('mapa'),zgoda=null,widoczna=false;
  try{zgoda=localStorage.getItem('pk-cookies')}catch(e){}
  function wstawMape(){if(mapa.querySelector('iframe'))return;var i=document.createElement('iframe');i.src=mapa.dataset.src;i.title='Mapa: ul. Swarożyca 15a, Szczecin';i.loading='lazy';i.referrerPolicy='no-referrer-when-downgrade';mapa.appendChild(i)}
  function moze(){if(zgoda!=='0'&&widoczna)wstawMape()}
  ck.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){zgoda=b.dataset.c;try{localStorage.setItem('pk-cookies',zgoda)}catch(e){}ck.hidden=true;moze()})});
  document.getElementById('pokaz-mape').addEventListener('click',function(){zgoda='1';try{localStorage.setItem('pk-cookies','1')}catch(e){}ck.hidden=true;wstawMape()});
  if('IntersectionObserver' in window){new IntersectionObserver(function(es){if(es[0].isIntersecting){widoczna=true;moze()}},{rootMargin:'300px'}).observe(mapa)}
  /* formularz pokazowy */
  document.getElementById('forma').addEventListener('submit',function(e){e.preventDefault();document.getElementById('komunikat').hidden=false});
  var r=document.getElementById('rok');if(r)r.textContent=new Date().getFullYear();
})();
