window.SpeedXPhysics=(function(){
  async function createWorld(){await RAPIER.init();const world=new RAPIER.World({x:0,y:-9.81,z:0});return world;}
  return {createWorld};
})();
