# ZCLIP.js

A javascript implementation of ZCL over IP.

## Work in progress

Definitely a work in progress. Current tasks are:

- Generate cluster classes and commands from SiLabs application meta data
- Create examples and callable cli examples
- Implement OTA server example

## Installation

```sh
git clone ssh://git@stash.silabs.com/iot_software/zclip.js.git
cd zclip.js
npm install
```

## Usage

You can use this library for development or via cli commands for sending quick zclip commands to devices.

### CLI

CLI commands are located in `/cli`

```sh
./cli/blink <deviceIp>
```

### Development

Examples are located in `/examples`

```sh
var coap = require('coap');
var zcl = require('../.')(coap);

var onOffCluster = new zcl.clusters.OnOffCluster({
  ip: '::1',
  endpoint: 1
});

onOffCluster.toggle();
```

## Supported clusters, commands and arguments

- Basic Cluster
  * ResetToFactoryDefaults
- Power Configuration Cluster
- Device Temperature Configuration Cluster
- Identify Cluster
  * IdentifyQueryResponse
      * timeout
  * IdentifyQuery
  * EZModeInvoke
      * action
  * UpdateCommissionState
      * action
      * commissionStateMask
- Groups Cluster
  * AddGroupResponse
      * status
      * groupId
  * ViewGroupResponse
      * status
      * groupId
      * groupName
  * GetGroupMembershipResponse
      * capacity
      * groupCount
      * groupList
  * RemoveGroupResponse
      * status
      * groupId
  * RemoveAllGroups
  * AddGroupIfIdentifying
      * groupId
      * groupName
- Scenes Cluster
  * AddSceneResponse
      * status
      * groupId
      * sceneId
  * ViewSceneResponse
      * status
      * groupId
      * sceneId
      * transitionTime
      * sceneName
      * extensionFieldSets
  * RemoveSceneResponse
      * status
      * groupId
      * sceneId
  * RemoveAllScenesResponse
      * status
      * groupId
  * StoreSceneResponse
      * status
      * groupId
      * sceneId
  * RecallScene
      * groupId
      * sceneId
  * GetSceneMembershipResponse
      * status
      * capacity
      * groupId
      * sceneCount
      * sceneList
- On Off Cluster
  * Off
  * On
  * Toggle
- On Off Switch Configuration Cluster
- Level Control Cluster
  * MoveToLevel
      * level
      * transitionTime
  * Move
      * moveMode
      * rate
  * Step
      * stepMode
      * stepSize
      * transitionTime
  * Stop
  * MoveToLevelWithOnOff
      * level
      * transitionTime
  * MoveWithOnOff
      * moveMode
      * rate
  * StepWithOnOff
      * stepMode
      * stepSize
      * transitionTime
  * StopWithOnOff
- Alarms Cluster
  * Alarm
      * alarmCode
      * clusterId
  * GetAlarmResponse
      * status
      * alarmCode
      * clusterId
      * timeStamp
  * GetAlarm
  * ResetAlarmLog
- Time Cluster
- Rssi Location Cluster
  * DeviceConfigurationResponse
      * status
      * power
      * pathLossExponent
      * calculationPeriod
      * numberRssiMeasurements
      * reportingPeriod
  * LocationDataResponse
      * status
      * locationType
      * coordinate1
      * coordinate2
      * coordinate3
      * power
      * pathLossExponent
      * locationMethod
      * qualityMeasure
      * locationAge
  * LocationDataNotification
      * locationType
      * coordinate1
      * coordinate2
      * coordinate3
      * power
      * pathLossExponent
      * locationMethod
      * qualityMeasure
      * locationAge
  * CompactLocationDataNotification
      * locationType
      * coordinate1
      * coordinate2
      * coordinate3
      * qualityMeasure
      * locationAge
  * RssiPing
      * locationType
  * RssiRequest
  * ReportRssiMeasurements
      * measuringDevice
      * neighbors
      * neighborsInfo
  * RequestOwnLocation
      * blindNode
- Binary Input  Basic  Cluster
- Commissioning Cluster
  * RestartDeviceResponse
      * status
  * SaveStartupParametersResponse
      * status
  * RestoreStartupParametersResponse
      * status
  * ResetStartupParametersResponse
      * status
- Power Profile Cluster
  * PowerProfileNotification
      * totalProfileNum
      * powerProfileId
      * numOfTransferredPhases
      * transferredPhases
  * PowerProfileResponse
      * totalProfileNum
      * powerProfileId
      * numOfTransferredPhases
      * transferredPhases
  * PowerProfileStateResponse
      * powerProfileCount
      * powerProfileRecords
  * GetPowerProfilePrice
      * powerProfileId
  * PowerProfilesStateNotification
      * powerProfileCount
      * powerProfileRecords
  * GetOverallSchedulePrice
  * EnergyPhasesScheduleRequest
      * powerProfileId
  * EnergyPhasesScheduleStateResponse
      * powerProfileId
      * numOfScheduledPhases
      * scheduledPhases
  * EnergyPhasesScheduleStateNotification
      * powerProfileId
      * numOfScheduledPhases
      * scheduledPhases
  * PowerProfileScheduleConstraintsNotification
      * powerProfileId
      * startAfter
      * stopBefore
  * PowerProfileScheduleConstraintsResponse
      * powerProfileId
      * startAfter
      * stopBefore
  * GetPowerProfilePriceExtended
      * options
      * powerProfileId
      * powerProfileStartTime
- Appliance Control Cluster
  * SignalStateResponse
      * applianceStatus
      * remoteEnableFlagsAndDeviceStatus2
      * applianceStatus2
  * SignalStateNotification
      * applianceStatus
      * remoteEnableFlagsAndDeviceStatus2
      * applianceStatus2
  * WriteFunctions
      * functionId
      * functionDataType
      * functionData
  * OverloadPauseResume
  * OverloadPause
  * OverloadWarning
      * warningEvent
- Poll Control Cluster
  * CheckInResponse
      * startFastPolling
      * fastPollTimeout
  * FastPollStop
  * SetLongPollInterval
      * newLongPollInterval
  * SetShortPollInterval
      * newShortPollInterval
- Shade Configuration Cluster
- Door Lock Cluster
  * LockDoorResponse
      * status
  * UnlockDoorResponse
      * status
  * ToggleResponse
      * status
  * UnlockWithTimeoutResponse
      * status
  * GetLogRecordResponse
      * logEntryId
      * timestamp
      * eventType
      * source
      * eventIdOrAlarmCode
      * userId
      * pin
  * SetPinResponse
      * status
  * GetPinResponse
      * userId
      * userStatus
      * userType
      * pin
  * ClearPinResponse
      * status
  * ClearAllPinsResponse
      * status
  * SetUserStatusResponse
      * status
  * GetUserStatusResponse
      * userId
      * status
  * SetWeekdayScheduleResponse
      * status
  * GetWeekdayScheduleResponse
      * scheduleId
      * userId
      * status
      * daysMask
      * startHour
      * startMinute
      * endHour
      * endMinute
  * ClearWeekdayScheduleResponse
      * status
  * SetYeardayScheduleResponse
      * status
  * GetYeardayScheduleResponse
      * scheduleId
      * userId
      * status
      * localStartTime
      * localEndTime
  * ClearYeardayScheduleResponse
      * status
  * SetHolidayScheduleResponse
      * status
  * GetHolidayScheduleResponse
      * scheduleId
      * status
      * localStartTime
      * localEndTime
      * operatingModeDuringHoliday
  * ClearHolidayScheduleResponse
      * status
  * SetUserTypeResponse
      * status
  * GetUserTypeResponse
      * userId
      * userType
  * SetRfidResponse
      * status
  * GetRfidResponse
      * userId
      * userStatus
      * userType
      * rfid
  * ClearRfidResponse
      * status
  * ClearAllRfidsResponse
      * status
  * OperationEventNotification
      * source
      * eventCode
      * userId
      * pin
      * timeStamp
      * data
  * ProgrammingEventNotification
      * source
      * eventCode
      * userId
      * pin
      * userType
      * userStatus
      * timeStamp
      * data
- Window Covering Cluster
  * WindowCoveringUpOpen
  * WindowCoveringDownClose
  * WindowCoveringStop
  * WindowCoveringGoToLiftValue
      * liftValue
  * WindowCoveringGoToLiftPercentage
      * percentageLiftValue
  * WindowCoveringGoToTiltValue
      * tiltValue
  * WindowCoveringGoToTiltPercentage
      * percentageTiltValue
- Pump Configuration And Control Cluster
- Thermostat Cluster
  * CurrentWeeklySchedule
      * numberOfTransitionsForSequence
      * dayOfWeekForSequence
      * modeForSequence
      * payload
  * RelayStatusLog
      * timeOfDay
      * relayStatus
      * localTemperature
      * humidityInPercentage
      * setpoint
      * unreadEntries
  * GetWeeklySchedule
      * daysToReturn
      * modeToReturn
  * ClearWeeklySchedule
  * GetRelayStatusLog
- Fan Control Cluster
- Dehumidification Control Cluster
- Thermostat User Interface Configuration Cluster
- Color Control Cluster
  * MoveToHue
      * hue
      * direction
      * transitionTime
  * MoveHue
      * moveMode
      * rate
  * StepHue
      * stepMode
      * stepSize
      * transitionTime
  * MoveToSaturation
      * saturation
      * transitionTime
  * MoveSaturation
      * moveMode
      * rate
  * StepSaturation
      * stepMode
      * stepSize
      * transitionTime
  * MoveToHueAndSaturation
      * hue
      * saturation
      * transitionTime
  * MoveToColor
      * colorX
      * colorY
      * transitionTime
  * MoveColor
      * rateX
      * rateY
  * StepColor
      * stepX
      * stepY
      * transitionTime
  * MoveToColorTemperature
      * colorTemperature
      * transitionTime
- Ballast Configuration Cluster
- Illuminance Measurement Cluster
- Illuminance Level Sensing Cluster
- Temperature Measurement Cluster
- Pressure Measurement Cluster
- Flow Measurement Cluster
- Relative Humidity Measurement Cluster
- Occupancy Sensing Cluster
- Ias Zone Cluster
  * ZoneStatusChangeNotification
      * zoneStatus
      * extendedStatus
      * zoneId
      * delay
  * ZoneEnrollRequest
      * zoneType
      * manufacturerCode
  * InitiateNormalOperationModeResponse
  * InitiateTestModeResponse
- Ias Ace Cluster
  * ArmResponse
      * armNotification
  * GetZoneIdMapResponse
      * section0
      * section1
      * section2
      * section3
      * section4
      * section5
      * section6
      * section7
      * section8
      * section9
      * section10
      * section11
      * section12
      * section13
      * section14
      * section15
  * GetZoneInformationResponse
      * zoneId
      * zoneType
      * ieeeAddress
      * zoneLabel
  * ZoneStatusChanged
      * zoneId
      * zoneStatus
      * audibleNotification
      * zoneLabel
  * PanelStatusChanged
      * panelStatus
      * secondsRemaining
      * audibleNotification
      * alarmStatus
  * GetPanelStatusResponse
      * panelStatus
      * secondsRemaining
      * audibleNotification
      * alarmStatus
  * SetBypassedZoneList
      * numberOfZones
      * zoneIds
  * BypassResponse
      * numberOfZones
      * bypassResult
  * GetZoneStatusResponse
      * zoneStatusComplete
      * numberOfZones
      * zoneStatusResult
  * GetZoneStatus
      * startingZoneId
      * maxNumberOfZoneIds
      * zoneStatusMaskFlag
      * zoneStatusMask
- Ias Wd Cluster
  * StartWarning
      * warningInfo
      * warningDuration
      * strobeDutyCycle
      * strobeLevel
  * Squawk
      * squawkInfo
- Appliance Identification Cluster
- Meter Identification Cluster
- Appliance Events And Alert Cluster
  * GetAlertsResponse
      * alertsCount
      * alertStructures
  * AlertsNotification
      * alertsCount
      * alertStructures
  * EventsNotification
      * eventHeader
      * eventId
- Appliance Statistics Cluster
  * LogRequest
      * logId
  * LogQueueRequest
  * LogQueueResponse
      * logQueueSize
      * logIds
  * StatisticsAvailable
      * logQueueSize
      * logIds
- Electrical Measurement Cluster
  * GetProfileInfoCommand
  * GetMeasurementProfileCommand
      * attributeId
      * startTime
      * numberOfIntervals
- Diagnostics Cluster

## Run the tests

```sh
npm test
```

## Support

Slack @lee.byrd for support.

## Contributing

Contributions are welcome. The library is currently under heavy development, so
I would check in first.

