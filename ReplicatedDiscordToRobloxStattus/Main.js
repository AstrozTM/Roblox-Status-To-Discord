const Urls = require('./JSON/Urls.json');
const Fetch = require('node-fetch')
const Settings = require('./JSON/Settings.json')
const colors = require('colors');
let Status = ''
console.log(`
R O B L O X  S T A T U S  T O  D I S C O R D
         M A D E  B Y  A S T R O Z
               Astroz#0001                                                          
\n\n `.rainbow)
function UpdateToDiscord() {
    if(Status !== '') {
       Fetch(Urls.DiscordApiUrl,{
           method: "PATCH",
           headers: {'authorization': Settings.Token,'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.308 Chrome/78.0.3904.130 Electron/7.3.2 Safari/537.36',
           'content-type': 'application/json',},
           body: JSON.stringify({
            custom_status: {
            expires_at: null,
            text: Status + '᲼'
            }
           })

       }).then(ResponseApi => {
        if (ResponseApi.status !== 200) {
            console.log('Failed at setting discord\'s stattus. Code: ' + toString(ResponseApi.status).red)
        }})
    }
    }

function UpdateStattus() {
    Fetch(Urls.robloxApiUrl + Settings.UserId + '/status', {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(ResponseApi => {
        if (ResponseApi.status !== 200) {
            console.log('Failed at getting roblox\'s stattus. Code: ' + toString(ResponseApi.status).red)
        }
        return ResponseApi.text()
    }).then(Txt => {
        let Res = JSON.parse(Txt)
        if (Status !== Res.status){
        Status = Res.status
        UpdateToDiscord()
        console.log(`Updated Discord Status to:`.blue,` ${Status}`.yellow)
        }
    })
}

setInterval(function(){UpdateStattus()},3000)
