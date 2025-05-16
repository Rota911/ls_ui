exports('Notification', function(source, data)
    TriggerClientEvent('ls_ui:client:notification', source, data)
end)
