(function(){
  function hasWebGLSupport(){
    try{
      const c=document.createElement('canvas');
      const names=['webgl2','webgl','experimental-webgl'];
      for(const n of names){
        const gl=c.getContext(n,{alpha:false,antialias:true,powerPreference:'high-performance'});
        if(gl && typeof gl.getParameter==='function'){ return true; }
      }
      return false;
    }catch(e){ return false; }
  }

  function showFallback(root,message){
    const el=root.querySelector('#speedx-fallback');
    if(el){ el.textContent=message; el.hidden=false; }
  }

  document.addEventListener('DOMContentLoaded',async()=>{
    const root=document.getElementById('speedx-3d-drive');
    if(!root || !window.SpeedX3DData){ return; }

    if(typeof window.THREE==='undefined' || typeof window.gsap==='undefined'){
      showFallback(root,'3D libraries failed to load. Please disable script optimization/caching and try again.');
      return;
    }

    const options=SpeedX3DData.options||{};
    const load=root.querySelector('.speedx-loading');
    const bar=root.querySelector('#speedx-progress-bar');
    const txt=root.querySelector('#speedx-progress-text');

    for(let i=0;i<=100;i+=10){
      bar.style.width=i+'%';
      txt.textContent=i+'%';
      await new Promise(r=>setTimeout(r,30));
    }

    const controls=SpeedXControls.createInput(root,!!+options.enable_mobile_controls);
    const ui=SpeedXUI.init(root,options);
    let world=null;

    const start=async()=>{
      try{
        if(!hasWebGLSupport()){
          showFallback(root,'WebGL appears disabled in this browser. Enable hardware acceleration and try again.');
          return;
        }
        load.style.opacity='0';
        setTimeout(()=>load.style.display='none',400);
        world=await SpeedXWorld.init(root,options,ui,controls.input);
      }catch(err){
        console.error('SpeedX init error',err);
        showFallback(root,'Could not initialize 3D renderer. Please try another browser or disable cache/minify plugins.');
      }
    };

    root.querySelector('#speedx-start-btn').addEventListener('click',start,{once:true});
    const muteBtn=root.querySelector('#speedx-mute');
    let muted=false;
    muteBtn.addEventListener('click',()=>{ muted=!muted; muteBtn.textContent=muted?'🔈':'🔊'; });
    window.addEventListener('beforeunload',()=>{ controls.destroy(); world?.destroy(); });
  });
})();
