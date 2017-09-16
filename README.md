# ZCLIP.js

A javascript implementation of ZCL over IP.

## Work in progress

Definitely a work in progress. Current tasks are:

- Generate cluster classes and commands from SiLabs application meta data
- Create examples and callable cli examples
- Implement OTA server example

## Supported Clusters

- OnOffCluster

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

## Supported clusters and commands

- Basic
  * ResetToFactoryDefaults
- Power Configuration
- Device Temperature Configuration
- Identify
  * IdentifyQueryResponse
  * IdentifyQuery
  * EZModeInvoke
  * UpdateCommissionState
- Groups
  * AddGroupResponse
  * ViewGroupResponse
  * GetGroupMembershipResponse
  * RemoveGroupResponse
  * RemoveAllGroups
  * AddGroupIfIdentifying
- Scenes
  * AddSceneResponse
  * ViewSceneResponse
  * RemoveSceneResponse
  * RemoveAllScenesResponse
  * StoreSceneResponse
  * RecallScene
  * GetSceneMembershipResponse
- On Off
  * Off
  * On
  * Toggle
- On Off Switch Configuration
- Level Control
  * MoveToLevel
  * Move
  * Step
  * Stop
  * MoveToLevelWithOnOff
  * MoveWithOnOff
  * StepWithOnOff
  * StopWithOnOff
- Alarms
  * Alarm
  * GetAlarmResponse
  * GetAlarm
  * ResetAlarmLog
- Time
- Rssi Location
  * DeviceConfigurationResponse
  * LocationDataResponse
  * LocationDataNotification
  * CompactLocationDataNotification
  * RssiPing
  * RssiRequest
  * ReportRssiMeasurements
  * RequestOwnLocation
- Binary Input  Basic 
- Commissioning
  * RestartDeviceResponse
  * SaveStartupParametersResponse
  * RestoreStartupParametersResponse
  * ResetStartupParametersResponse

## Run the tests

```sh
npm test
```

## Support

Slack @lee.byrd for support.

## Contributing

Contributions are welcome. The library is currently under heavy development, so
I would check in first.

