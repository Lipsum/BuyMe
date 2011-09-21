# Creating the app on Facebook

  * go to [Facebook Developers](https://www.facebook.com/developers/)
  * click *Create New App*
    * enter your app name
    * add **Cloud Service** with environment **PHP** (you wont be writing any PHP)
    * follow the steps: clone your app and get a heroku account


# Cloning the template

After cloning the heroku app, `cd` into your directory and override the app
with this template.

    git remote rename origin heroku
    git remote add template git://github.com/afriggeri/algores-template.git
    git fetch template
    git checkout template/master
    git checkout -b template/master
    git merge -s ours master
    git checkout master
    git merge template/master
    git branch -d template/master
    git remote rm template

# Using Github

  * register on Github and create a repo
  * follow the steps for *existing repo*

# Fiddle !

Edit your APP id in `scripts/app.js`, fiddle, play around.