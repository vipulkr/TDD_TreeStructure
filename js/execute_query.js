var http   =  require("http"),
    port   =  8080,
    fs     =  require("fs"),
    xmla   =  require("../xmla4js-master/src/Xmla.js"),
    Xmla   =  xmla.Xmla;
//Method to trigger the Server connection
http.createServer(function(request,response){

  response.writeHead(200, {"Content-Type": "text/html"});

  var statement   =
                  "select NON EMPTY {[Measures].[Actual],[Measures].[Budget]} ON COLUMNS, NON EMPTY Crossjoin(Union({[Region].[All Regions]},{[Region].[All Regions].Children}), Crossjoin(Hierarchize(Union({[Department].[All Departments]}, [Department].[All Departments].Children)),Union({[Positions].[All Positions]}, {[Positions].[All Positions].Children}))) ON ROWS from [Quadrant Analysis]",
      url        = "http://172.23.238.252:8080/pentaho/Xmla?userid=admin&password=password";
      properties = {};

  properties[Xmla.PROP_DATASOURCEINFO]  = "Pentaho";
  properties[Xmla.PROP_CATALOG]         = "SampleData";
  //available formats:
        //.PROP_FORMAT_MULTIDIMENSIONAL
        //.PROP_FORMAT_TABULAR
  properties[Xmla.PROP_FORMAT]          = Xmla.PROP_FORMAT_MULTIDIMENSIONAL;
  /*available axis formats
    (applicable to .PROP_FORMAT_MULTIDIMENSIONAL):
        TupleFormat
        ClusterFormat
        ClusterFormat
    */
  properties[Xmla.PROP_AXISFORMAT]      =  "TupleFormat";

  function getTupleName(tuple) {
      var name = "", members = tuple.members,
          i, n = members.length
      ;
      for (i=0; i < n; i++) {
          if (name.length) name += ".";
          name += members[i][Xmla.Dataset.Axis.MEMBER_CAPTION];
      }
      return name;
  }

var dataSet={};

  function getDatafrmDataset(obj){
    var columnAxis=[];
    var rowAxis=[];
    var cellData=[];
      //Constructing Column-Axis or Axis0
      obj.getColumnAxis().eachTuple(function(tuple){
        columnAxis[columnAxis.length]={Member:tuple.members};
      });

      //Constructing Row-Axis or Axis1
      obj.getRowAxis().eachTuple(function(tuple){
        rowAxis[rowAxis.length]={Member:tuple.members};
      });

      //May Require something on SlicerAxis

      //Constructing the Cell Data
      var cell=obj.getCellset();
      if(cell.hasMoreCells){
            cellData[0]={
                "CellOrdinal"  : cell.readCell()["ordinal"],
                "FmtValue"      : cell.readCell()["FmtValue"]};

        while(cell.nextCell()!=-1)
        {  cellData[cellData.length]={
              "CellOrdinal"  : cell.readCell()["ordinal"],
              "FmtValue"     : cell.readCell()["FmtValue"]
            };
          }

    };
    dataSet["Axes"]={"Axis":[columnAxis,rowAxis]};
    dataSet["CellData"]={"Cell":cellData};

    console.log(JSON.stringify(dataSet,null,4));

  };




  var xmlaRequest = {
    async       : true,
    url         : decodeURIComponent("http://172.23.238.252:8080/pentaho/Xmla%3fuserid=admin%26password=password"),
    properties  : properties,
    statement   : statement,

    success:function(xmla,xmlaRequest,xmlaResponse) {

        // console.log("Response")
        // console.log(xmla.responseText);
        var obj=xmlaResponse;
        if(obj instanceof Xmla.Dataset)
          getDatafrmDataset(obj);

      },
      error: function(xmla, xmlaRequest, exception) {
          //It failed, lets write the error to the response.
          console.log("error");
          console.log(exception.message);
          console.log(xmla.responseText);
          response.write("error!!");
      },
      callback: function(){
          //callback gets always called after either success or error,
          //use it to conclude the response.
          response.write(JSON.stringify(dataSet,null,'&nbsp;'));
          fs.writeFile("Data3.json",JSON.stringify(dataSet,null,2));
          response.end();
      }
    };



      var x = new xmla.Xmla();
      var result =x.execute(xmlaRequest);
}).listen(port);
