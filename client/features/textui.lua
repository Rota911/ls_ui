local function showTextUI(data)
    assert(type(data) == 'table', 'Data parameter must be a table')

    for _, data in pairs(data) do
        Utils.SendReactNUIMessage('showTextUI', data)
    end
end

local function hideTextUI(data)
    if type(data) == 'table' then
        for _, data in pairs(data) do
            Utils.SendReactNUIMessage('hideTextUI', { id = data })
        end
    else
        Utils.SendReactNUIMessage('hideTextUI', { id = data })
    end
end

exports('TextUI', showTextUI)
exports('HideTextUI', hideTextUI)
