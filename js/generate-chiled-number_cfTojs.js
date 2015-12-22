var addElement, ans, fs, members, tdChild;

fs = require('fs');

members = JSON.parse(fs.readFileSync('Data2_2_ordered.json', 'utf8'))['Axes']['Axis'][1];
addElement = function(members, tree, level) {
  var child;
  if (members[0] != null) {
    child = members[0];
    if (!tree[child.UName]) {
      tree[child.UName] = {
        count: 0,
        children: {}
      };
    }
    tree[child.UName].count += 1;
    tree[child.UName].level = level;
    addElement(members.slice(1), tree[child.UName].children, level + 1);
  }
  return tree;
};

ans = members.reduce((function(acc, member) {
  return addElement(member["Member"], acc, 1);
}), {});

console.log(ans);
tdChild = function(element) {
  // console.log(element);
  var a, ele, name;
  if (Object.keys(element).length === 0) {
    return "</tr>";
  } else {
    a = (function() {
      var results;
      results = [];
      for (name in element) {
        console.log(name);
        ele = element[name];
        results.push(("<tr><td rowspan='" + ele.count + "' class='level" + ele.level + "'>" + name + "</td>") + tdChild(ele.children));
      }
      return results;
    })();
    return (a.reduce((function(acc, line) {
      return acc + line;
    }), "")).slice(4);
  }
};

console.log("<table><tr>" + tdChild(ans) + "</table>");
