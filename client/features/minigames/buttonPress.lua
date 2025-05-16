-- RegisterCommand('testbuttons', function()
--     local data = {
--         action = 'startButtonPresser',
--         data = {
--             keys = { 'A', 'S', 'D', 'F' },
--             failAmount = 2,
--             color = 'blue',
--             duration = 5000 -- 5 seconds to complete the sequence
--         }
--     }

--     SendNUIMessage(data)
-- end, false)


-- RegisterNUICallback('buttonPresserComplete', function(data, cb)
--     print('Button presser completed:', data.success)
--     cb({})
-- end)
