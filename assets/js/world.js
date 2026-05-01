window.SpeedXWorld=(function(){
  function label(text){const c=document.createElement('canvas');c.width=512;c.height=128;const x=c.getContext('2d');x.fillStyle='#ffcd0e';x.font='700 54px sans-serif';x.fillText(text,20,80);const t=new THREE.CanvasTexture(c);const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true}));s.scale.set(8,2,1);return s;}
  function createDistrict(scene,title,pos){const g=new THREE.Group();const base=new THREE.Mesh(new THREE.CylinderGeometry(4,4,1,24),new THREE.MeshStandardMaterial({color:0x111111,emissive:0x221a00}));base.position.copy(pos);g.add(base);const tower=new THREE.Mesh(new THREE.BoxGeometry(2,6,2),new THREE.MeshStandardMaterial({color:0x222,emissive:0x302500}));tower.position.set(pos.x,3,pos.z);g.add(tower);const l=label(title);l.position.set(pos.x,7,pos.z);g.add(l);scene.add(g);return {title,position:pos.clone()};}
  async function init(root,options,ui,input){const canvas=root.querySelector('#speedx-canvas');const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setSize(canvas.clientWidth,canvas.clientHeight,false);renderer.setPixelRatio(Math.min(window.devicePixelRatio,options.world_quality==='high'?2:1.25));
    const scene=new THREE.Scene();scene.fog=new THREE.Fog(options.world_bg_color,50,180);scene.background=new THREE.Color(options.world_bg_color);
    const camera=new THREE.PerspectiveCamera(62,canvas.clientWidth/canvas.clientHeight,.1,300);camera.position.set(0,8,16);
    scene.add(new THREE.HemisphereLight(0xffffff,0x111122,.5));const dl=new THREE.DirectionalLight(0xffdd88,1.2);dl.position.set(30,40,20);scene.add(dl);
    const road=new THREE.Mesh(new THREE.PlaneGeometry(260,260),new THREE.MeshStandardMaterial({color:0x0a0a0f,roughness:.85,metalness:.15}));road.rotation.x=-Math.PI/2;scene.add(road);
    const car=new THREE.Group();const body=new THREE.Mesh(new THREE.BoxGeometry(1.8,.7,3.2),new THREE.MeshStandardMaterial({color:options.car_color,metalness:.8,roughness:.2}));body.position.y=1.1;car.add(body);const cabin=new THREE.Mesh(new THREE.BoxGeometry(1.3,.5,1.6),new THREE.MeshStandardMaterial({color:0x11161f,metalness:.9,roughness:.08}));cabin.position.set(0,1.55,.1);car.add(cabin);scene.add(car);
    const districts=[0,1,2,3,4].map(i=>createDistrict(scene,options.service_titles[i],new THREE.Vector3((i-2)*22,.5,(i%2?18:-18))));
    const boxes=[];for(let i=0;i<40;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(2,2,2),new THREE.MeshStandardMaterial({color:0x191919,emissive:0x131313}));m.position.set((Math.random()-.5)*180,1,(Math.random()-.5)*180);scene.add(m);boxes.push(m);}
    const vel=new THREE.Vector3();let angle=0,active=-1,last=performance.now(),running=true;
    function resize(){renderer.setSize(canvas.clientWidth,canvas.clientHeight,false);camera.aspect=canvas.clientWidth/canvas.clientHeight;camera.updateProjectionMatrix();}
    window.addEventListener('resize',resize);
    function tick(now){if(!running)return;const dt=Math.min((now-last)/1000,.032);last=now;const turn=(input.left-input.right)*2.4*dt;angle+=turn;const thrust=(input.forward-input.back)*18*dt;vel.x+=Math.sin(angle)*thrust;vel.z+=Math.cos(angle)*thrust;vel.multiplyScalar(input.brake?.92:.98);car.position.addScaledVector(vel,dt*9);if(input.reset){car.position.set(0,0,0);vel.set(0,0,0);}car.rotation.y=angle;
      const target=new THREE.Vector3(car.position.x-Math.sin(angle)*9,5.5,car.position.z-Math.cos(angle)*9);camera.position.lerp(target,.08);camera.lookAt(car.position.x,1.5,car.position.z);camera.fov=62+Math.min(vel.length()*3,10);camera.updateProjectionMatrix();
      boxes.forEach((b,i)=>{b.rotation.y+=0.01+ i*0.0001;b.position.y=1+Math.sin(now*0.001+i)*0.2;});
      let nearest=-1,nearDist=7;districts.forEach((d,i)=>{const dist=d.position.distanceTo(car.position);if(dist<nearDist){nearDist=dist;nearest=i;}});
      if(nearest!==active){active=nearest;if(active>=0){ui.showService({title:options.service_titles[active],description:options.service_descriptions[active]});}else{ui.hideService();}}
      renderer.render(scene,camera);requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    document.addEventListener('visibilitychange',()=>{running=!document.hidden;if(running){last=performance.now();requestAnimationFrame(tick);}});
    return {destroy(){running=false;window.removeEventListener('resize',resize);renderer.dispose();scene.traverse(o=>{if(o.geometry)o.geometry.dispose?.();if(o.material)o.material.dispose?.();});}};
  }
  return {init};
})();
