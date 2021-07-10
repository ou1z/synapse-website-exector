# synapse-website-executor

# Synapse Script: 
```lua
local client = syn.websocket.connect('ws://localhost:3000/ws')
client.OnMessage:Connect(function(msg)
    local data = game:GetService("HttpService"):JSONDecode(msg)
    if data.Action == "Execute" and data.Code then
        local code, err = loadstring(data.Code)
        if err then
            client:Send(game:GetService("HttpService"):JSONEncode({
                Action = "Compilation-Error",
                Code = data.Code,
                Error = err
            }))
        else
            code()
        end
    end
end)

while wait(1) do
    if client then
        pcall(function()
            client:Send(game:GetService("HttpService"):JSONEncode({
                Action = "Keep-Connection-Alive"
            })) 
        end) 
    end
end
```
