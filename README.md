# Blacklist (notify/mute)

Adds "blacklist" functionality and can be used to get notified of a blacklisted name being in party or to mute blacklisted names in chat/whisper (useful for muting people on other servers in ims/bg)

# Commands
Note, if using the commands in the proxy channel or `/8`, ignore the `!` prefix

Command | Argument(s) | Example | Description
---|---|---|---
**!bl** | add | !bl add Snug | Adds exact name to blacklist (example, `Snug` would be added to the list, **name is case sensitive!**)
**!bl** | del | !bl del Snug | Deletes exact name to blacklist (example, `Snug` would be removed from the list, **name is case sensitive!**)
**!bl** | list | !bl list | Displays your current blacklist in both proxy chat and in console/log (proxy window)
**!bl** | mute | !bl mute | Toggles muting of blacklisted names in chat/whisper (disabled by default)
**!bl** | notify | !bl notify | Toggles getting notified of a blacklisted name joining party via proxy chat (enabled by default)
