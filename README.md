# ZCLIP.js

A javascript implementation of ZCL over IP.

## Installation

```sh
git clone https://github.com/SiliconLabs/zclip.js.git
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

Email: lee.byrd@silabs.com

