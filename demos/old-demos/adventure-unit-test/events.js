let eventList = new Array();

eventList.push(function(){
  logWrite('event fired');
  console.log('event fired');
})

eventList.push(function() {
  if(resources.iron.qty >= 2) {
    logWrite("Inspiration strikes and you use 1 iron to improve the device's power by 1.")
    removeResource("iron",1);
    modifyAttributes("power",1);
  }
});