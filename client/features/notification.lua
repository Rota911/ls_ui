local function showNotification(data)
    assert(type(data) == 'table', 'Data parameter must be a table')
    Utils.SendReactNUIMessage('showNotification', data)
end

RegisterNetEvent('ls_ui:client:notification', function(data)
    showNotification(data)
end)

exports('Notification', showNotification)
