(function(){
  $.getJSON("../json7.json", function(data1){
      var data = data1[0];
      console.log(data);
      var axes = data.Axes;
      var axis = axes.Axis;
      var axis0 = axis[0],
          axis1 = axis[1];
      var axis0Tuples = axis0.Tuples,
          axis1Tuples = axis1.Tuples;
      var axis0Tuple = axis0Tuples.Tuple,
          axis1Tuple = axis1Tuples.Tuple;
      var axis0Names = [],
          axis1Names = [];
        //  console.log(axis0Tuple.length);
          axis0Names.push({name: ""});

       for (var index0 in axis0Tuple){
      //   console.log(axis0Tuple[index0]);
         var axis0Member = axis0Tuple[index0].Member;
         var axis0Name = '';
         for(var memIndex0 in axis0Member){
           axis0Name = axis0Name+axis0Member[memIndex0].Caption+".";
         }
         var axis0NameObj = {};
         axis0NameObj.name = axis0Name.substring(0,axis0Name.length-1);
         //console.log(axis0Name);
         axis0Names.push(axis0NameObj);
       }

       var cellData = data.CellData,
            cells = cellData.Cell,
            val = [];
      for (var cellIndex in cells) {
        var valObj = {};
        valObj.value = cells[cellIndex].FmtValue;
        val.push(valObj);
      }

       var template0 = $.trim($("#axis0_insersion").html()),
         frag0='';
         $.each(axis0Names, function(index,obj){
           frag0 += template0.replace(/{{axis0Name}}/ig, obj.name);
         });
         $('body').append(frag0);

         var count  = 0;

        for (var j = 0, len1 = axis1Tuple.length; j < len1; j++) {
          td='';
          var axis1Member = axis1Tuple[j].Member;
          var axis1Name = '';
          for(var memIndex1 in axis1Member){
            axis1Name = axis1Name+axis1Member[memIndex1].Caption+".";
          }
         for (var i = 0, len = axis0Tuple.length; i < len; i++) {
            console.log(val[count].value);
            td += "<td>"+val[count].value+"</td>";
            count++;
          }
          var axis1NameObj = {};
          axis1NameObj.name = axis1Name.substring(0,axis1Name.length-1);
          axis1NameObj.td = td;
          axis1Names.push(axis1NameObj);
        }

      var template1 = $.trim($("#data_insersion").html()),
         frag1='';
         $.each(axis1Names, function(index,obj){
           frag1 += template1.replace(/{{axis1Name}}/ig, obj.name)
                              .replace(/{{value}}/ig, obj.td);
         });
         $('body').append(frag1);
  });
})();
