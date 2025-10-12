
## CSScomb settings for Drupal (CSS formatting and sort tool)

## CSScomb settings for Drupal (CSS formatting and sort tool)
- [CSScomb](https://github.com/csscomb/csscomb.js "Make your code beautiful") formats and sorts CSS properties in **css, scss, sass or less** files. An explanation of the options can be found at [https://github.com/csscomb/csscomb.js/blob/master/doc/options.md](https://github.com/csscomb/csscomb.js/blob/master/doc/options.md).
- CSScomb is available as:
- a [command-line tool](https://github.com/csscomb/csscomb.js/blob/master/doc/usage-cli.md " command line usage")
- a [plugin](https://github.com/csscomb/sublime-csscomb "csscomb/sublime-csscomb | GitHub") for [Sublime Text](http://www.sublimetext.com/3 " The text editor you'll fall in love with")
- a [plugin](https://atom.io/packages/csscomb "Atom Editor Plugin for CSScomb | atom.io") for [Atom](https://atom.io/ " A hackable text editor for the 21st Century by GitHub")
- a [plugin](https://github.com/csscomb/grunt-csscomb "csscomb/grunt-csscomb | GitHub") for [Grunt](http://gruntjs.com/ " The JavaScript Task Runner") (post-processing)
- a [plugin](https://www.npmjs.com/package/gulp-csscomb "gulp-csscomb | npm packages") for [Gulp](http://gulpjs.com/ "gulp.js - the streaming build system") (post-processing)
- an [external tool](https://github.com/csscomb/jetbrains-csscomb "csscomb/jetbrains-csscomb | GitHub") for [PhpStorm](https://www.jetbrains.com/phpstorm/ "The Most Intelligent PHP IDE | JetBrains PhpStorm")
- a [plugin](https://github.com/csscomb/vim-csscomb "csscomb/vim-csscomb | GitHub") for [Vim](https://www.drupal.org/node/1389006 "Vimrc - Vim Plugin for Drupal | Drupal.org").
- The used values in the snippet below are in accordance with the recommendations in the [CSS formatting guidelines](https://www.drupal.org/node/1887862 "CSS formatting guidelines | Drupal.org"). The sort order of CSS properties is based on the [Yandex configuration file](https://github.com/csscomb/csscomb.js/blob/master/config/yandex.json "csscomb.js/yandex.json | GitHub") and improved for SASS/LESS by [putting variables first](https://github.com/csscomb/csscomb.js/blob/master/doc/options.md#sort-order-vs-preprocessors "csscomb.js/options.md at master · csscomb/csscomb.js · GitHub") (they have to be declared before being used).
- Copy/paste the configuration below into the CSScomb package settings file under *Preferences* in Sublime Text (after installation of the plugin). For most other use cases, put it in a file named `.csscomb.json` [in your local home folder](https://github.com/csscomb/csscomb.js/blob/master/doc/configuration.md#where-to-put-config "Where to put the config file?") (usually named *www*) to make it applicable to all your projects.

## Note
- To have ruleset groups divided by an empty line, replace the empty lines above with:

## Alternatives
- There is [csscombx](https://www.npmjs.com/package/csscombx), which is a fork of [Csscomb](https://github.com/csscomb/csscomb.js) tool specifically intended for Drupal. It has a default configuration file with exactly the same content as the example above, so you don't need to make any additional set up.
- How to use.
- First, you need to install [nodejs](https://nodejs.org/en/download/) on your system. It has the **npm** - a package manager for many popular javascript projects.
- Then, install [csscombx](https://www.npmjs.com/package/csscombx) globally:
- Depending on where you've installed **npm** the command above may require **sudo** prepended to it.
- After installing **cd** into your theme's root folder (or any folder containing style files to be formatted) and make a so-called dry run without changing anything:
- The **\-v** option on the command stands for verbose and **\-l** for lint. It scans the current directory recursively for all **css**, **scss**, **sass** and **less** files and reports their status relative to the settings in the [drupal.json](https://github.com/drugan/csscombx/blob/master/config/drupal.json) configuration file of the tool. If you want to change default settings just copy the content of the file and paste into **.csscombx.json** file in the root of your theme, a particular style folder, webroot folder or any other folder where you require your customized formatting settings to be applied. Note that any of a project's child folders may have its own **.csscombx.json** file with different settings.
- When you are ready for actual changes, run this command passing desirable folder and/or particular file paths as arguments:
- Sometimes you may want to automate the formatting task above and run it whenever the style file(s) are saved after being edited. For that case, you can use the [gulp-csscombx](https://www.npmjs.com/package/gulp-csscombx) plugin.
- How to use.
- Install [gulp-cli](https://www.npmjs.com/package/gulp-cli) globally:
- Create **package.json** file in the root of your theme, module or any other project and put this into it:
- Then run  this command:
- If you already have a **package.json** file then just run this command without touching the file:
- Then create a **gulpfile.js** file in the root of your theme, module or any other project and put this into it:
- Adjust **mySrcStyles** variable's value for the content you want to be formatted and run this command:
- You'll see that execution of the command is halted and waits while any of the **mySrcStyles** will be changed. Do it and look in the console again. It should report that some files are automatically formatted. When you are done with developing your styles just go to the console and press **Ctrl+C** keyboard shortcut to terminate the gulp watcher's task.
- If you think that some of the [drupal.json](https://github.com/drugan/csscombx/blob/master/config/drupal.json) default configuration file's settings do not comply with Drupal CSS coding standards then please do the following:
- Create a [new issue](https://www.drupal.org/node/add/project-issue/drupal) for the **CSS** component of the Drupal core.
- Post a [comment on this page](https://www.drupal.org/node/2399303/discuss) to notify all the participants involved.
- [Create the issue](https://github.com/drugan/csscombx/issues/new) or just make a pull request on the [csscombx](https://github.com/drugan/csscombx).
- Also, if you have some difficulties with the **gulp-csscombx** plugin then post the issue on [its GitHub repository](https://github.com/drugan/gulp-csscombx/issues).