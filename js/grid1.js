(function(){
//   var content=[];
  $.getJSON("../json1.json", function(data){

      console.log(data);
      for (var index in data){
        var singleData = data[index];
        console.log(singleData);
        for(var i in singleData){
          console.log(i);
          console.log(singleData[i]);
        }
      }
      //console.log(Object.getOwnPropertyNames(data));


    var template = $.trim($("#data_insertion").html()),
      frag='';
      $.each(data, function(index,obj){
        frag += template.replace(/{{ageGroup}}/ig, obj.ageGroup)
                        .replace(/{{literatePopulation}}/ig, obj.literatePopulation);
      });
      $('body').append(frag);
  });
})();
