<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="https://www.facebook.com/2008/fbml">
   <head>
     <meta http-equiv="content-type" content="text/html; charset=utf-8" />
     <title>BuyMe!</title>
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js" type="text/javascript" charset="utf-8"></script>
     <script src="scripts/raphael-min.js" type="text/javascript" charset="utf-8"></script>
     <script src="scripts/repulsion_fun.js" type="text/javascript" charset="utf-8"></script>
     <script src="scripts/graph-ix.js" type="text/javascript" charset="utf-8"></script>
     <script src="scripts/app1.js" type="text/javascript" charset="utf-8"></script>
     <link rel="stylesheet" href="stylesheets/style.css" type="text/css" media="screen" title="no title" charset="utf-8" />
     <link rel="icon" type="image/png" href="favicon.png" />
   </head>
   <body>

     <header>
     <center>
     <h1>Projet Algorithmique des réseaux</h1>
     </center>
     </header>

     <section>
     <aside>     
     <div id="fb-root"></div>
     <div id="login"><fb:login-button id="boutonlogin" value = "Connect with Facebook" autologoutlink="true" size="medium" background="white" length="short"></fb:login-button></div>
     </aside>

     <aside>
     <div class="floatright">
     <img id = "img_ami" src="img/personne.png">
     <p id="infos_ami">Aucune information</p>
     </div>
     </aside>
    

     <p id = "infos">Bienvenue sur BuyMe, un site innofensif. Connectez-vous sur Facebook.</p>
     <div id="can"></div>
     </section>
     
   </body>
   </html>

