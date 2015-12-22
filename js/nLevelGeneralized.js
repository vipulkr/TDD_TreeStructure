(function(){
  $.getJSON("../json3.json", function(data1){
    var data = data1[0];  // data can itself be an object
    var axes = data.Axes;
    var axis = axes.Axis;
    var axis0 = axis[0],
    axis1 = axis[1];
    var axis0Tuples = axis0.Tuples,   // tuples may not be present in final object
        axis1Tuples = axis1.Tuples;
    var axis0Tuple = axis0Tuples.Tuple,
        axis1Tuple = axis1Tuples.Tuple;

/* ********************************** Axis0 Hierarchical Structure **************************************** */

    for (var axis0HierLevel = 0, axis0HierLen = axis0Tuple[0].Member.length ; axis0HierLevel < axis0HierLen; axis0HierLevel++) {
      captions = [];
      obj={};
      flag = false;
      count = 0;
    for (var axis0TupleIndex in axis0Tuple){
        if(!flag){
          flag = true;
      //    console.log("hi");
          obj.caption = axis0Tuple[0].Member[axis0HierLevel].Caption;
          obj.span = count;
          captions.push(obj);
        }

        // Member may be member ********

        if(obj.caption !== axis0Tuple[axis0TupleIndex].Member[axis0HierLevel].Caption){
          if (obj.caption){obj = {};}
          obj.caption = axis0Tuple[axis0TupleIndex].Member[axis0HierLevel].Caption;
          count= 1;
          obj.span = count;
          captions.push(obj);
        //  obj={};
        }
        else {
            count++;
            for (var captionIndex in captions){
              if (captions[captionIndex].caption == axis0Tuple[axis0TupleIndex].Member[axis0HierLevel].Caption){
                captions[captionIndex].span = count;
              }
            }
        }
      //  console.log(count);
      }
    //  console.log(count);
    //  console.log(captions);
      var template0 = $.trim($("#axis0_insersion").html()),
      frag0='<tr>';
        for(var axis1MemberIndex=0, axis1MemberLen = axis1Tuple[0].Member.length; axis1MemberIndex < axis1MemberLen; axis1MemberIndex++){
          frag0 += '<th></th>';
        }
      $.each(captions, function(index,obj){
        if (index < captions.length-1){
       frag0 += template0.replace(/{{axis0}}/ig, "<th colspan="+parseInt(obj.span)+">"+obj.caption+"</th>");
      }
      else {
       frag0 += template0.replace(/{{axis0}}/ig, "<th colspan="+parseInt(obj.span)+">"+obj.caption+"</th></tr>");
      }
      });
      $('#dataTableBody').append(frag0);
    }

/* ********************************** Axis1 Hierarchical Structure **************************************** */


      var cellData = data.CellData,
           cells = cellData.Cell,
           val = [];
      for (var cellIndex in cells) {
       var valObj = {};
       valObj.value = cells[cellIndex].FmtValue;
       val.push(valObj);
      }

      count  = 0;
      var dataArray = [];
      for (var j = 0, len1 = axis1Tuple.length; j < len1; j++) {
      td='';
      var axis1Member = axis1Tuple[j].Member;
      var axis1Name = '';
      for(var memIndex1 in axis1Member){
        axis1Name = axis1Name+axis1Member[memIndex1].Caption+".";
      }
      var tempDataObj = {};
      for (var i = 0, len = axis0Tuple.length; i < len; i++) {
        // console.log(val[count].value);
        td += "<td>"+val[count].value+"</td>";
        count++;
      }
      tempDataObj.td = td;
      dataArray.push(tempDataObj);
      }
      // console.log(dataArray);


      var captionsArray = [];
    for (var axis1HierLevel = 0, axis1HierLen = axis1Tuple[0].Member.length ; axis1HierLevel < axis1HierLen; axis1HierLevel++) {
      captions = [];
      obj={};
      flag = false;
      count = 0;
    for (var axis1TupleIndex in axis1Tuple){
        if(!flag){
          flag = true;
      //    console.log("hi");
          obj.caption = axis1Tuple[0].Member[axis1HierLevel].Caption;
          obj.span = count;
          captions.push(obj);
        }
        if(obj.caption !== axis1Tuple[axis1TupleIndex].Member[axis1HierLevel].Caption){
          if (obj.caption){obj = {};}
          obj.caption = axis1Tuple[axis1TupleIndex].Member[axis1HierLevel].Caption;
          count= 1;
          obj.span = count;
          captions.push(obj);
          //obj={};
        }
        else {
            count++;
            for (var caption1Index in captions){
              if (captions[caption1Index].caption == axis1Tuple[axis1TupleIndex].Member[axis1HierLevel].Caption){
                captions[caption1Index].span = count;
              }
            }
        }
      }
      // console.log(captions);
      captionsArray.push(captions);
    }
    console.log(captionsArray);
    captionsArray = shortCaptionsArray(captionsArray);
    console.log(captionsArray);
    appendRowData(captionsArray, dataArray);

    //  var captionsArrayIndex = 0;

  function shortCaptionsArray(captionsArray){
    //console.log(captions);
    for(var captionArrayIndex in captionsArray){
      if (parseInt(captionArrayIndex) < captionsArray.length-1){
      if (captionsArray[captionArrayIndex].length > captionsArray[parseInt(captionArrayIndex)+1].length){
        var temp = captionsArray[captionArrayIndex];
            captionsArray[captionArrayIndex] = captionsArray[parseInt(captionArrayIndex)+1];
            captionsArray[parseInt(captionArrayIndex)+1] = temp;
      }
    }
    }
    return captionsArray;
  }

  function appendRowData(captionsArray, dataArray){
    var index = 0;
    var initialElement = [];
    var elementLeft= [];
    var rowspanApplied = [];
    var rowspanAppliedPrev = [];
    for(var captionsArrayIndex in captionsArray){
      // console.log(captionsArray[captionsArrayIndex]);
      initialElement.push(captionsArray[captionsArrayIndex].length);
      elementLeft.push(captionsArray[captionsArrayIndex].length);
      rowspanApplied.push(0);
      rowspanAppliedPrev.push(0);
    }
//  console.log(captionsArray);
  var rowspanAppliedIndex;
  while(elementLeft[(elementLeft.length)-1] > 0){
    // console.log(elementLeft);
    for(captionsArrayIndex in captionsArray){
      // console.log(captionsArrayIndex);
      var obj = captionsArray[captionsArrayIndex][parseInt(initialElement[captionsArrayIndex])-parseInt(elementLeft[captionsArrayIndex])];
        //if ($.find("#tobeAppendend").length === 0){
        if (parseInt(captionsArrayIndex) === 0){
          if(rowspanApplied[parseInt(captionsArrayIndex)] <= rowspanApplied[parseInt(captionsArrayIndex)+1]){
          alert("hi first time");
          $('#dataTableBody').append("<tr id='tobeAppendend'><th rowspan="+obj.span+">"+obj.caption+"</th></tr>");
          elementLeft[captionsArrayIndex] = parseInt(elementLeft[captionsArrayIndex]) - 1;
          for(rowspanAppliedIndex in rowspanApplied){
          rowspanAppliedPrev[rowspanAppliedIndex] = rowspanApplied[rowspanAppliedIndex];
          }
        //  console.log(rowspanAppliedPrev);
        //  console.log(rowspanApplied);
          rowspanApplied[captionsArrayIndex] += obj.span;
        //  console.log(elementLeft);
        //  console.log(rowspanApplied);
        }
      }
        else{
          alert("hi not first time");
          // console.log(rowspanApplied[parseInt(captionsArrayIndex)-1]+" "+rowspanApplied[parseInt(captionsArrayIndex)]);
          if(rowspanApplied[parseInt(captionsArrayIndex)-1] > rowspanApplied[parseInt(captionsArrayIndex)]){
            alert("hi to be rendered");
          //  console.log(parseInt(initialElement[captionsArrayIndex])-parseInt(elementLeft[captionsArrayIndex]));
            prevObj = captionsArray[parseInt(captionsArrayIndex)-1][parseInt(parseInt(initialElement[parseInt(captionsArrayIndex)-1])-parseInt(elementLeft[parseInt(captionsArrayIndex)-1]))-1];
            obj = captionsArray[parseInt(captionsArrayIndex)][parseInt(initialElement[captionsArrayIndex])-parseInt(elementLeft[captionsArrayIndex])];
          //  console.log(prevObj);
          //  console.log(obj);
        //    console.log(captionsArrayIndex);
        //    console.log(captionsArray.length-1);
// console.log(dataArray);
            if(parseInt(captionsArrayIndex) === captionsArray.length-1){
              alert("hi last element");
                for(var rowIndex1=0; rowIndex1 < prevObj.span; rowIndex1++){
                  // console.log(rowspanApplied[rowspanApplied.length-1]);
                    if (parseInt(rowIndex1) === 0){
                     $("#tobeAppendend:last-child").append("<th rowspan="+obj.span+">"+obj.caption+"</th>"+dataArray[rowspanApplied[rowspanApplied.length-1]].td);
                     console.log(rowspanApplied[rowspanApplied.length-1]);
                     console.log(dataArray[rowspanApplied[rowspanApplied.length-1]]);
                   }
                   else{
                       $("#dataTableBody").append("<tr><th rowspan="+obj.span+">"+obj.caption+"</th>"+dataArray[rowspanApplied[rowspanApplied.length-1]].td+"</tr>");
                     console.log(rowspanApplied[rowspanApplied.length-1]);
                     console.log(dataArray[rowspanApplied[rowspanApplied.length-1]]);
                   }
                   elementLeft[parseInt(captionsArrayIndex)] = parseInt(elementLeft[parseInt(captionsArrayIndex)]) - 1;
                   for(rowspanAppliedIndex in rowspanApplied){
                   rowspanAppliedPrev[rowspanAppliedIndex] = rowspanApplied[rowspanAppliedIndex];
                   }
        //           console.log(obj.span);
                   rowspanApplied[parseInt(captionsArrayIndex)] += obj.span;
      //             console.log(initialElement[captionsArrayIndex]);
            //       console.log(elementLeft[captionsArrayIndex]);
              //     console.log(parseInt(initialElement[captionsArrayIndex])-parseInt(elementLeft[captionsArrayIndex]));
                   obj = captionsArray[parseInt(captionsArrayIndex)][parseInt(initialElement[captionsArrayIndex])-parseInt(elementLeft[captionsArrayIndex])];
                 }
                 rowspanAppliedPrev[captionsArrayIndex] = rowspanApplied[captionsArrayIndex];
                //  console.log(elementLeft);
                //   console.log(rowspanApplied);
                //   console.log(rowspanAppliedPrev);
            //   captionsArrayIndex = 0;
            //   elementLeft[parseInt(captionsArrayIndex)] = parseInt(elementLeft[parseInt(captionsArrayIndex)]) - 1;
            }
            else{
              alert("hi intermediate element");
          //    console.log(rowspanApplied[parseInt(captionsArrayIndex)]);
          //    console.log(rowspanAppliedPrev[parseInt(captionsArrayIndex)-1]);
          //    console.log(rowspanApplied);
              // console.log(rowspanAppliedPrev);
            if (rowspanApplied[parseInt(captionsArrayIndex)] === 0 || rowspanApplied[parseInt(captionsArrayIndex)] == rowspanAppliedPrev[parseInt(captionsArrayIndex)-1]){
             $("#tobeAppendend:last-child").append("<th rowspan="+obj.span+">"+obj.caption+"</th>");
           }
           else{
               $("#dataTableBody").append("<tr id='tobeAppendend'><th rowspan="+obj.span+">"+obj.caption+"</th></tr>");
           }
           elementLeft[parseInt(captionsArrayIndex)] = parseInt(elementLeft[parseInt(captionsArrayIndex)]) - 1;
           for(rowspanAppliedIndex in rowspanApplied){
           rowspanAppliedPrev[rowspanAppliedIndex] = rowspanApplied[rowspanAppliedIndex];
           }
          //  console.log(obj.span);
           rowspanApplied[parseInt(captionsArrayIndex)] += obj.span;
          //  console.log(elementLeft);
          //  console.log(rowspanApplied);
          //  console.log(rowspanAppliedPrev);
          }
        }
        }
    }
    // console.log(rowspanApplied);
  // elementLeft[(elementLeft.length)-1] = -1;
  // elementLeft[(elementLeft.length)-1] = elementLeft[(elementLeft.length)-1] -1;
  }
  }
  $("tr th").css('background-color','white');
  $("tr:nth-child(even) td").css('background-color','lightblue');
  $("tr:nth-child(even) td").prev().css('background-color','lightblue');
});
})();
