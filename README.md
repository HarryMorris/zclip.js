# ZCLIP.js

A javascript implementation of ZCL over IP.

## Open Questions

- Which version of node should we target?

## Installation

```sh
git clone ssh://git@stash.silabs.com/iot_software/zclip.js.git
cd zclip.js
npm install --production
```

## Development

Examples are located in `/examples`

```sh
var coap = require('coap');
var zcl = require('../.')(coap);

var onOff = new zcl.clusters.OnOff({
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

## Support & Contributing

Slack @lee.byrd

