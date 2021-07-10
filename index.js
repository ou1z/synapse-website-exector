const express = require('express')
const app = express()
const expressws = require('express-ws')(app)

const clients = []

app.use(express.static('./public'))
app.ws('/ws', (ws, req) => {
    clients.push(ws)
    ws.on('message', msg => {
        let json = JSON.parse(msg)
        if (!json) return
        
        if (json.Action === "Execute" && json.Code) {
            let code = json.Code.toString()

            for (let client of clients) {
                client.send(JSON.stringify({
                    "Action":"Execute",
                    "Code":code
                }))
            }
        } else if(json.Action === "Compilation-Error" && json.Error) {
            console.log(json.Error)
        }
    })
})
app.listen(process.env.PORT || 3000, () => {
    console.log('listening')
})