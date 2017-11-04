# ZCLIP.js

A javascript implementation of ZCL over IP.

## Installation

```sh
npm install zclip
```

## Development

Examples are located in `/examples`

```sh
var coap = require('coap');
var zclip = require('zclip')(coap);

var onOff = new zclip.clusters.OnOff({
  ip: '::1',
  endpoint: 1
});

onOff.toggle();
```

## Supported clusters

- alarms
- applianceControl
- applianceEventsAndAlert
- applianceIdentification
- applianceStatistics
- ballastConfiguration
- basic
- binaryInputBasic
- colorControl
- commissioning
- dehumidificationControl
- deviceTemperatureConfiguration
- diagnostics
- doorLock
- electricalMeasurement
- fanControl
- flowMeasurement
- groups
- iasAce
- iasWd
- iasZone
- identify
- illuminanceLevelSensing
- illuminanceMeasurement
- levelControl
- meterIdentification
- occupancySensing
- onOff
- onOffSwitchConfiguration
- overTheAirBootloading
- pollControl
- powerConfiguration
- powerProfile
- pressureMeasurement
- pumpConfigurationAndControl
- relativeHumidityMeasurement
- rssiLocation
- scenes
- shadeConfiguration
- temperatureMeasurement
- thermostat
- thermostatUserInterfaceConfiguration
- time
- windowCovering

## Run the tests

```sh
npm test
```

## Support

[community.silabs.com](https://www.silabs.com/community) or [silabs.com/support](https://www.silabs.com/support)

