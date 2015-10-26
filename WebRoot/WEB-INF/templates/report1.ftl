<!DOCTYPE html>
<html>
  <head>
    <title>report1.html</title>
	
    <meta name="keywords" content="keyword1,keyword2,keyword3">
    <meta name="description" content="this is my page">
    <meta name="content-type" content="text/html; charset=UTF-8">
    
    <!--<link rel="stylesheet" type="text/css" href="./styles.css">-->

  </head>
  
  <body>


    <div style="margin:0 auto;background-color:rbg(250,241,231);width:70%;height:500px;min-width:1700px">
   <h1 style = "text-align:center">${name2}</h1>
 <div style="float:left;width:50%">
 <span style="float:left;border:1px solid gray;text-align:right;line-height:30px;background-color:rgb(229,237,245);height:30px;width:49%">��:</span>
 <span style="float:left;border:1px solid gray;line-height:30px;height:30px;width:50.4%;color:red">${yearandmonth}</span>
 </div>
 <div style="float:left;;width:50%">
 <span style="float:left;border:1px solid gray;line-height:30px;height:30px;width:49.5%;background-color:rgb(229,237,245);text-align:right">考核对像:</span>
 <span style="float:left;border:1px solid gray;line-height:30px;height:30px;width:49.8%;color:red;">${dtsj_examname_type}</span>
   </div>

 <div style="clear:both;margin-top:60px"></div>
    ${table}
   </div>
  </body>
</html>
