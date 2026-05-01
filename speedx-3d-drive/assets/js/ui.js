window.SpeedXUI=(function(){
  function init(root,options){const popup=root.querySelector('#speedx-popup');
    return {showService(service){popup.hidden=false;popup.querySelector('h3').textContent=service.title;popup.querySelector('p').textContent=service.description;gsap.fromTo(popup,{y:24,opacity:0},{y:0,opacity:1,duration:.4});},hideService(){popup.hidden=true;}};
  }
  return {init};
})();
