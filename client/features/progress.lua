local progressData
local props = {}

local function handleProgress(data)
    progressData = data
    if data.anim then
        if data.anim.dict then
            Utils.RequestAnimDict(data.anim.dict)
            TaskPlayAnim(PlayerPedId(), data.anim.dict, data.anim.clip, data.anim.blendIn or 3.0,
                data.anim.blendOut or 1.0,
                data.anim.duration or -1,
                data.anim.flag or 49, data.anim.playbackRate or 0, data.anim.lockX, data.anim.lockY, data.anim.lockZ)
            RemoveAnimDict(data.anim.dict)
        elseif data.anim.scenario then
            TaskStartScenarioInPlace(PlayerPedId(), data.anim.scenario, 0,
                data.anim.playEnter ~= nil and data.anim.playEnter or true)
        end
    end

    if data.prop then
        LocalPlayer.state:set('progressProp', data.prop, true)
    end

    while progressData do
        if data.disable then
            if data.disable.mouse then
                DisableControlAction(0, 1, true)
                DisableControlAction(0, 2, true)
                DisableControlAction(0, 106, true)
            end
            if data.disable.move then
                DisableControlAction(0, 21, true)
                DisableControlAction(0, 30, true)
                DisableControlAction(0, 31, true)
                DisableControlAction(0, 36, true)
            end
            if data.disable.sprint and not data.disable.move then
                DisableControlAction(0, 21, true)
            end
            if data.disable.car then
                DisableControlAction(0, 63, true)
                DisableControlAction(0, 64, true)
                DisableControlAction(0, 71, true)
                DisableControlAction(0, 72, true)
                DisableControlAction(0, 75, true)
            end
            if data.disable.combat then
                DisableControlAction(0, 25, true)
                DisablePlayerFiring(PlayerId(), true)
            end
        end
        Wait(0)
    end
    if data.prop then
        LocalPlayer.state:set('progressProp', nil, true)
    end
    if data.anim then
        if data.anim.dict then
            StopAnimTask(PlayerPedId(), data.anim.dict, data.anim.clip, 1.0)
            Wait(0)
        else
            ClearPedTasks(PlayerPedId())
        end
    end
    if progressData == false then
        Utils.SendReactNUIMessage('cancelProgress')
        return false
    end

    return true
end

RegisterNUICallback('progressEnded', function()
    progressData = nil
end)

local function cancelProgress()
    if not progressData then
        return
    end
    progressData = false
end

local function startProgress(data)
    assert(type(data) == 'table', 'Data parameter must be a table')
    while progressData ~= nil do
        Wait(0)
    end
    Utils.SendReactNUIMessage('startProgress', data)

    return handleProgress(data)
end

local function isProgressActive()
    return progressData and true
end

local function createProp(ped, prop)
    Utils.RequestModel(prop.model)
    local coords = GetEntityCoords(ped)
    local object = CreateObject(prop.model, coords.x, coords.y, coords.z, false, false, false)

    AttachEntityToEntity(object, ped, GetPedBoneIndex(ped, prop.bone or 60309), prop.pos.x, prop.pos.y, prop.pos.z,
        prop.rot.x, prop.rot.y, prop.rot.z, true, true, false, true, prop.rotOrder or 0, true)
    SetModelAsNoLongerNeeded(prop.model)

    return object
end

local function deleteProp(serverId)
    local playerProps = props[serverId]
    if not playerProps then return end
    for i = 1, #playerProps do
        local prop = playerProps[i]
        if DoesEntityExist(prop) then
            DeleteEntity(prop)
        end
    end
    props[serverId] = nil
end

AddStateBagChangeHandler('progressProp', nil, function(bagName, _, value, _, replicated)
    if replicated then return end

    local player = GetPlayerFromStateBagName(bagName)
    if player == 0 then return end

    local ped = GetPlayerPed(player)
    local serverId = GetPlayerServerId(player)

    if not value then
        return deleteProp(serverId)
    end

    props[serverId] = {}
    local playerProps = props[serverId]

    if value.model then
        playerProps[#playerProps + 1] = createProp(ped, value)
    else
        for i = 1, #value do
            local prop = value[i]

            if prop then
                playerProps[#playerProps + 1] = createProp(ped, prop)
            end
        end
    end
end)

RegisterNetEvent('onPlayerDropped', function(serverId)
    deleteProp(serverId)
end)

RegisterCommand('cancelprogressbar', function()
    if progressData?.canCancel then progressData = false end
end, false)

RegisterKeyMapping('cancelprogressbar', 'Cancel current progress bar', 'keyboard', 'x')

exports('Progressbar', startProgress)
exports('CancelProgressbar', cancelProgress)
exports('IsProgressbarActive', isProgressActive)
