
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="https://www.facebook.com/2008/fbml">
<head>
  <title>BuyMe!</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js" type="text/javascript" charset="utf-8"></script>
  <script src="scripts/raphael-min.js" type="text/javascript" charset="utf-8"></script>
<!--   <script src="scripts/prototype.js" type="text/javascript" charset="utf-8"></script>-->
   <script src="scripts/app2.js" type="text/javascript" charset="utf-8"></script>
   <script src="scripts/graph-ix.js" type="text/javascript" charset="utf-8"></script>

  <link rel="stylesheet" src="stylesheets/style.css" type="text/css" media="screen" title="no title" charset="utf-8" />
   <style type="text/css">
   #canvas_container {
 width: 500px;  
 border: 1px;
 solid #aaa; 
 }
   </style>
</head>
<body>

  <div id="fb-root"></div>
  
   <div id="login"><fb:login-button id="boutonlogin" value = "Connect with Facebook" autologoutlink="true" size="medium" background="white" length="short"></fb:login-button></div>

  <pre id="friends"></pre>
  <div id="canvas_container"></div>
</body>
</html>

