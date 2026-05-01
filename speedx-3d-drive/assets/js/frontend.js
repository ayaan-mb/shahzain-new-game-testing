(function(){
  function webglOk(){try{const c=document.createElement('canvas');return !!window.WebGLRenderingContext&&(c.getContext('webgl')||c.getContext('experimental-webgl'));}catch(e){return false;}}
  document.addEventListener('DOMContentLoaded',async()=>{const root=document.getElementById('speedx-3d-drive');if(!root||!window.SpeedX3DData)return;
    if(!webglOk()){root.querySelector('#speedx-fallback').hidden=false;return;}
    const options=SpeedX3DData.options||{};const load=root.querySelector('.speedx-loading');const bar=root.querySelector('#speedx-progress-bar');const txt=root.querySelector('#speedx-progress-text');
    for(let i=0;i<=100;i+=10){bar.style.width=i+'%';txt.textContent=i+'%';await new Promise(r=>setTimeout(r,30));}
    const controls=SpeedXControls.createInput(root,!!+options.enable_mobile_controls);const ui=SpeedXUI.init(root,options);
    let world=null;const start=async()=>{load.style.opacity='0';setTimeout(()=>load.style.display='none',400);world=await SpeedXWorld.init(root,options,ui,controls.input);};
    root.querySelector('#speedx-start-btn').addEventListener('click',start,{once:true});
    const muteBtn=root.querySelector('#speedx-mute');let muted=false;muteBtn.addEventListener('click',()=>{muted=!muted;muteBtn.textContent=muted?'🔈':'🔊';});
    window.addEventListener('beforeunload',()=>{controls.destroy();world?.destroy();});
  });
})();
