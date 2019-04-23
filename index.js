const path = require('path'),
	  fs = require('fs')
module.exports = function reee(d) {
const muteHook = (e) => {if(blacklist.includes(e.name) && mute){return false}}
let members = null

/*=====CONFIG=====*/
let list = []
try {list = require('./list.json')}
catch (e) {
list = []
fs.writeFile(path.join(__dirname, 'list.json'), JSON.stringify(list), err =>{})
}
let blacklist = list
let config = {},
	settingTimeout = null,
	settingLock = false
try {config = require('./config.json')}
catch (e) {
config = {}
settingUpdate()
}
function settingUpdate() {
clearTimeout(settingTimeout)
settingTimeout = setTimeout(settingSave, 1000)
}
function settingSave() {
if (settingLock) {
settingUpdate()
return
}
settingLock = false
fs.writeFile(path.join(__dirname, 'config.json'), JSON.stringify(config, undefined, '\t'), err => {
settingLock = false
})
}
let mute = false
if(("mute" in config)) {
mute = config.mute
}
if(!("mute" in config)) {
config.mute = false
settingUpdate()
}
let notify = true
if(("notify" in config)) {
notify = config.notify
}
if(!("logging" in config)) {
config.logging = true;
settingUpdate()
}
/*=====CONFIG=====*/


d.hook('S_PARTY_MEMBER_LIST', 7, (e) => {
members = e.members
for (let name of members) {
if(blacklist.includes(name.name) && notify) {
d.command.message('Black listed member found: ' + name.name)
}
}
})

d.hook('S_CHAT', 3, muteHook)	
d.hook('S_WHISPER', 3, muteHook)

d.command.add("bl", {
add(v) {
blacklist.push(v.toString())
fs.writeFileSync(path.join(__dirname, 'list.json'), JSON.stringify(blacklist))
d.command.message('added ' + v.toString() + ' to list')
},
del(v) {
for (let i = 0; i < blacklist.length; i++) {
if(blacklist[i] == v.toString()) {
blacklist.splice(i, 1)
fs.writeFileSync(path.join(__dirname, 'list.json'), JSON.stringify(blacklist))
d.command.message('deleted ' + v.toString() + ' from list')
}
}
},
list() {
d.command.message(blacklist)
d.log(blacklist)
},
mute() {
mute = !mute
d.command.message(`Mute mode is now ${mute ? 'enabled' : 'disabled'}`)
config.mute = mute
settingUpdate()
},
notify() {
notify = !notify
d.command.message(`Notify mode is now ${notify ? 'enabled' : 'disabled'}`)
config.notify = notify
settingUpdate()
}
})

}