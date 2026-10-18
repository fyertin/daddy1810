(function(){
  var $=function(s){return document.querySelector(s)};
  var store={get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
  var FULL="Папа, с Днём отца! Я хочу сказать тебе спасибо за то, что ты всегда рядом — и в трудную минуту, и в моменты радости. Ты мой пример, моя опора и самый близкий друг. Спасибо за твоё терпение, мудрость и бесконечную любовь. Я тебя очень люблю и горжусь тобой!";
  var tt;function toast(m){var t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){t.classList.remove('on')},2000)}

  $('#theme').onclick=function(){var r=document.documentElement,c=r.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'),n=c==='dark'?'light':'dark';r.setAttribute('data-theme',n);store.set('theme',n)};
  var th=store.get('theme');if(th)document.documentElement.setAttribute('data-theme',th);
  var d=new Date();if(d.getMonth()===9&&d.getDay()===0&&d.getDate()>=15&&d.getDate()<=21)$('#tag').textContent='Сегодня День отца';

  /* confetti */
  var cv=$('#fx'),cx=cv.getContext('2d'),P=[],run=false,cols=['#f2b134','#e5484d','#3fb68b','#4c8dff','#f3ecd9'];
  function size(){var r=devicePixelRatio||1;cv.width=innerWidth*r;cv.height=innerHeight*r;cx.setTransform(r,0,0,r,0,0)}size();addEventListener('resize',size);
  function burst(x,y,n){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    for(var i=0;i<n;i++){var a=Math.random()*6.283,s=4+Math.random()*10;P.push({x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-6,w:6+Math.random()*6,h:4+Math.random()*5,r:0,vr:Math.random()*.4-.2,c:cols[i%5],l:100+Math.random()*60})}
    if(!run){run=true;requestAnimationFrame(tick)}}
  function tick(){cx.clearRect(0,0,innerWidth,innerHeight);
    P=P.filter(function(p){p.vy+=.28;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;p.l--;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.globalAlpha=Math.min(1,p.l/30);cx.fillStyle=p.c;cx.fillRect(-p.w/2,-p.h/2,p.w,p.h);cx.restore();return p.l>0&&p.y<innerHeight+40});
    if(P.length)requestAnimationFrame(tick);else{run=false;cx.clearRect(0,0,innerWidth,innerHeight)}}

  /* hearts */
  var hi;function hearts(on){clearInterval(hi);if(!on||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    hi=setInterval(function(){var h=document.createElement('span');h.className='heart';h.textContent=['❤','💛','✨','⭐'][Math.floor(Math.random()*4)];
      h.style.left=Math.random()*100+'vw';h.style.fontSize=(16+Math.random()*26)+'px';h.style.animationDuration=(5+Math.random()*4)+'s';
      $('#ov').appendChild(h);setTimeout(function(){h.remove()},9500)},350)}

  /* open */
  var timers=[],g=$('#gift');
  function open(){
    if($('#ov').classList.contains('on'))return;
    g.classList.add('shake');
    var r=g.getBoundingClientRect();
    setTimeout(function(){g.classList.remove('shake');g.classList.add('open');burst(r.left+r.width/2,r.top+r.height/2,160);if(navigator.vibrate)try{navigator.vibrate([40,40,80])}catch(e){}},500);
    setTimeout(function(){
      var ov=$('#ov');ov.classList.add('on');ov.scrollTop=0;document.body.style.overflow='hidden';hearts(true);burst(innerWidth/2,innerHeight/3,120);
      var sp=ov.querySelectorAll('.txt span');
      sp.forEach(function(s,i){timers.push(setTimeout(function(){s.classList.add('show')},700+i*1700))});
      timers.push(setTimeout(function(){$('#acts').classList.add('show')},700+sp.length*1700));
    },1600);
  }
  function reset(){
    timers.forEach(clearTimeout);timers=[];hearts(false);
    document.querySelectorAll('.heart').forEach(function(h){h.remove()});
    var ov=$('#ov');ov.classList.remove('on');document.body.style.overflow='';
    ov.querySelectorAll('.txt span').forEach(function(s){s.classList.remove('show')});$('#acts').classList.remove('show');g.classList.remove('open');
  }
  $('#go').onclick=open;g.onclick=open;$('#again').onclick=reset;
  document.addEventListener('keydown',function(e){if(e.key==='Escape')reset()});

  function copy(t){
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){toast('Скопировано')},fb)}else fb();
    function fb(){var a=document.createElement('textarea');a.value=t;a.style.cssText='position:fixed;opacity:0';document.body.appendChild(a);a.select();try{document.execCommand('copy');toast('Скопировано')}catch(e){toast('Не удалось скопировать')}a.remove()}}
  $('#copy').onclick=function(){copy(FULL)};
  $('#share').onclick=function(){if(navigator.share){navigator.share({title:'С Днём отца!',text:FULL}).catch(function(){})}else copy(FULL)};
})();
