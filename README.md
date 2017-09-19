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

var onOffCluster = new zcl.OnOffCluster({
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

## Run the tests

```sh
npm test
```

## Support

Slack @lee.byrd for support.

## Contributing

Contributions are welcome. The library is currently under heavy development, so
I would check in first.

