var data,addElement, ans, fs, members, tdChild;
(function(){
  //$.getJSON("../Data2_2_ordered.json", function(data){
  fs = require('fs');
    data = JSON.parse(fs.readFileSync('Data2_3.json', 'utf8'));
    var axes = data.Axes,
        axis = axes.Axis,
        axis0 = axis[0],
        axis1 = axis[1];

    /* ********************************** Axis0 Hierarchical Structure **************************************** */

    addElement = function(members, tree, level) {
      // console.log(members);
    var child;
    if (members[0] != null) {
      child = members[0];
      // console.log(child);
      if (!tree[child.UName]) {
        tree[child.UName] = {
          count: 0,
          children: {}
        };
      }
      tree[child.UName].count += 1;
      tree[child.UName].level = child.index;
      addElement(members.slice(1), tree[child.UName].children, child.index + 1);
    }
    return tree;
    };

    ans = axis0.reduce((function(acc, member) {
    return addElement(member["Member"], acc, 1);
    }), {});

    // console.log(ans);
    tdChild = function(element) {
      // console.log(element);
      var a, ele, name;
      var frag0 = "<tr>"
      for(var axis1MemberIndex=0, axis1MemberLen = axis1[0].Member.length; axis1MemberIndex < axis1MemberLen; axis1MemberIndex++){
        frag0 += '<th></th>';
      }
      // if (Object.keys(element).length === 0) {
      //   return "</tr>";
      // }       else {

        a = (function() {
          var results;
          results = [];
          var ele1 = [];
          var prevEle1 = [];
          ele1.push(element);
          while(ele1.length != 0){
            console.log(ele1.length);
            results.push(frag0);
          for(var index in ele1){
            element = ele1[index];
            prevEle1[index] = ele1[index];
          for (name in element) {
            // console.log(name);
            ele = element[name];
            results.push(("<td colspan='" + ele.count + "' class='level" + ele.level + "'>" + name + "</td>"));
          }
        }
        results.push("</tr>");
        ele1 = [];
        for(index in prevEle1){
            element = prevEle1[index];
        for (name in element) {
          // console.log(name);
          ele = element[name];
          if(Object.keys(ele.children).length != 0){
          console.log(ele.children);
          ele1.push(ele.children);
        }
        }
      }
        // console.log(ele1.length);
          // element = ele1.children;
        }

          return results;

        })();
        return (a.reduce((function(acc, line) {
          return acc + line;
        }), ""));
      // }
    };

    console.log(tdChild(ans));
})();
