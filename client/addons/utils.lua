Utils = {}

function Utils.SendReactNUIMessage(type, data)
    SendNUIMessage({
        action = type,
        data = data or {}
    })
end

function Utils.RequestAnimDict(animDict)
    assert(type(animDict) == 'string', 'AnimDict must be a string')

    if HasAnimDictLoaded(animDict) then
        return animDict
    end

    RequestAnimDict(animDict)

    while not HasAnimDictLoaded(animDict) do
        Wait(0)
    end

    return animDict
end

function Utils.RequestModel(model)
    if HasModelLoaded(model) then
        return model
    end

    assert(IsModelValid(model), 'Model is not valid')

    while not HasModelLoaded(model) do
        Wait(0)
    end

    return model
end
