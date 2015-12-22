fs = require 'fs'
members = JSON.parse(fs.readFileSync('Data.json', 'utf8'))['Axes']['Axis'][1]

addElement = (members, tree, level) ->
  if members[0]?
    child = members[0]
    tree[child.UName] = {count: 0, children: {}} unless tree[child.UName]
    tree[child.UName].count += 1
    tree[child.UName].level = level
    addElement(members[1..], tree[child.UName].children, level+1)
  tree

ans = members.reduce ((acc, member) -> addElement(member["Member"], acc, 1)), {}

tdChild = (element) ->
  if Object.keys(element).length == 0
    "</tr>"
  else
    a = for name, ele of element
      "<tr><td rowspan='#{ele.count}' class='level#{ele.level}'>#{name}</td>" + tdChild(ele.children)
    (a.reduce ((acc, line) -> acc + line), "")[4..]

console.log "<table>" + tdChild(ans) + "</table>"
