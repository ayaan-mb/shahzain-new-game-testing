window.SpeedXControls=(function(){
  function createInput(root,mobileEnabled){const input={forward:0,back:0,left:0,right:0,brake:0,reset:0};
    const key=(v,s)=>{if(["KeyW","ArrowUp"].includes(v.code))input.forward=s;if(["KeyS","ArrowDown"].includes(v.code))input.back=s;if(["KeyA","ArrowLeft"].includes(v.code))input.left=s;if(["KeyD","ArrowRight"].includes(v.code))input.right=s;if(v.code==="Space")input.brake=s;if(v.code==="KeyR")input.reset=s;};
    const kd=e=>key(e,1), ku=e=>key(e,0);window.addEventListener('keydown',kd);window.addEventListener('keyup',ku);
    const teardown=[()=>window.removeEventListener('keydown',kd),()=>window.removeEventListener('keyup',ku)];
    if(mobileEnabled&&window.matchMedia('(max-width:900px)').matches){const wrap=root.querySelector('#speedx-mobile-controls');['◀','▲','▼','▶'].forEach((t,i)=>{const b=document.createElement('button');b.textContent=t;wrap.appendChild(b);const map=['left','forward','back','right'][i];const dn=()=>input[map]=1,up=()=>input[map]=0;b.addEventListener('touchstart',dn);b.addEventListener('touchend',up);teardown.push(()=>{b.removeEventListener('touchstart',dn);b.removeEventListener('touchend',up);});});}
    return {input,destroy:()=>teardown.forEach(fn=>fn())};}
  return {createInput};
})();
