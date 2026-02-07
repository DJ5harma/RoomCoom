There are 4 concepts for which your plugin will automatically work: 

- `Personal`: user's everything personal, nobody else has access : the only member is user itself only.
- `Direct`: user and a single other user have access (1 to 1): the 2 members are [user, otherUser] only.
- `Room`: room has many members (think of like a big company) (1 room -> many member users)
- `Club`: a club comes under a room (think of clubs like different departments in the company), so a room can have multiple clubs, and each club has members that are a subset of its room's members.


Don't worry! your plugin does not even have to think about them, it will automatically work with all of them when it uses my simple helper abstraction.
Things like internal routing, auth etc. are handeled automatically for any kind of Concept (`Personal, Direct, Room, Club`)


## Start making your plugin:

- lets say your plugin is named `pname`

- you have to do these things:

Backend:
1. Create a directory `pname` in `business-server/src/plugins`
2. Create a file named `routes.ts` and export your `express router` (name it like: `pnameRouter`)
3. And then use it inside : `business-server/src/plugin.routes.ts` just like others are there

Frontend:
1. Create a directory `pname` in `web/plugins` (name it like: `pnamePlugin`)
2. Create a file named `PnamePlugin.tsx` there.
3. Create and export your plugin's `react component` and then put inside `web/plugins/PLUGIN_MAP.ts`

Anddddd that's it! the setup is DONEEE.

## To use helpers in your plugin's code:

I've made helpers to make your life better.

### Backend: 
- `business-server\src\helper.ts` gives you a helper to send realtime signals.
- Like: `helper.sendSignal(req, stream, payload)` which you will be calling from your code.

(the req object is that of express, and is needed by my helper to deduce the exact instance of the place the plugin is running)
so don't worry about it, just pass it

### Frontend: `web\plugins\useHelper.ts` gives you things like: 
`{
	members,
	easyApi,
	subscribeSignal: (stream, listener) => Socket;
	unsubscribeSignal: (stream: string) => Socket;
	sourceId
}`

(i) `members`: are the members of the place where your plugin is running (`Personal / Direct / Room / Club`) but your plugin doesn't even need to know where its running... just members of any place it may be, are available to you.

(ii): `easyApi`: to send requests to your `pnameRouter`, so `pnameRouter.get('/{sample}')` can be called like: `easyApi.get('/pname/sample')`
- So YES, this means that your plugin `pname` can also call any other plugin's routes like: `easyApi.get('/othername/sample)` will be sent to `othernameRouter.get('/sample')`
- So this makes plugins interactable with any other plugin.


(iii) `subscribeSignal`: to listen to what you send from your plugin's backend code using `helper.sendSignal(req, stream, payload)`
- so use it like: `subscribeSignal(stream, (payload) => {//do anything here});`

(iv) `unsubscribeSignal`: to stop listening to the stream what you have subscribed to, use like `unsubscribeSignal(stream);`

(v) `sourceId`: Don't worry about it for now, its the exact instance's (place's) id where your plugin runs and is used internally by my helper. It may be used in the future to make plugins interactive from instance to instance (like "Room1" to "Direct4") but this use-case seems unnecessary to me currently.