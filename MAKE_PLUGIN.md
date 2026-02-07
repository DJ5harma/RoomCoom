Hi Dev! to start making your plugin,

lets say your plugin is named `xname`

you have to do these things:

1. Create a directory `xname` in `business-server/src/plugins`
2. Create and export your plugin's `express router` (preferrably name it like: `xnameRouter`) and then use inside : `business-server/src/plugin.routes.ts`

3. Create a directory `xname` in `web/plugins`  (preferrably name it like: `xnamePlugin`) 
4. Create and export your plugin's `react component` and then put inside `web/plugins/PLUGIN_MAP.ts`



Anddddd that's it! the setup is DONEEE.


### How to use what: