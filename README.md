# ZCLIP.js

A javascript implementation of [ZCL over IP](https://www.silabs.com/documents/public/user-guides/ug278-zcl-over-ip.pdf).

  * <a href="#install">Installation</a>
  * <a href="#examples">Examples</a>
  * <a href="#api">API</a>
  * <a href="#clusters">Supported Clusters</a>
  * <a href="#tests">Run the tests</a>
  * <a href="#support">Support</a>

<a name="install"></a>
## Installation

```sh
npm install zclip
```

<a name="examples"></a>
## Examples

Examples are located in `/examples`

```sh
var coap = require('coap');
var zcl = require('../.')(coap);

var deviceIp = '::1';
var clusterEndpoint = 1;

var onOff = zcl.clusters.OnOff({
  ip: deviceIp,
  endpoint: clusterEndpoint
});

onOff.on({}, (err, response) => {
  if (err) {
    console.error(err);
  }

  console.log(response.code);
});
```

<a name="api"></a>
## API
  * <a href="#api-clusters-Alarms">zclip.clusters.Alarms</a>
  * <a href="#api-clusters-ApplianceControl">zclip.clusters.ApplianceControl</a>
  * <a href="#api-clusters-ApplianceEventsAndAlert">zclip.clusters.ApplianceEventsAndAlert</a>
  * <a href="#api-clusters-ApplianceIdentification">zclip.clusters.ApplianceIdentification</a>
  * <a href="#api-clusters-ApplianceStatistics">zclip.clusters.ApplianceStatistics</a>
  * <a href="#api-clusters-BallastConfiguration">zclip.clusters.BallastConfiguration</a>
  * <a href="#api-clusters-Basic">zclip.clusters.Basic</a>
  * <a href="#api-clusters-BinaryInputBasic">zclip.clusters.BinaryInputBasic</a>
  * <a href="#api-clusters-ColorControl">zclip.clusters.ColorControl</a>
  * <a href="#api-clusters-Commissioning">zclip.clusters.Commissioning</a>
  * <a href="#api-clusters-DehumidificationControl">zclip.clusters.DehumidificationControl</a>
  * <a href="#api-clusters-DeviceTemperatureConfiguration">zclip.clusters.DeviceTemperatureConfiguration</a>
  * <a href="#api-clusters-Diagnostics">zclip.clusters.Diagnostics</a>
  * <a href="#api-clusters-DoorLock">zclip.clusters.DoorLock</a>
  * <a href="#api-clusters-ElectricalMeasurement">zclip.clusters.ElectricalMeasurement</a>
  * <a href="#api-clusters-FanControl">zclip.clusters.FanControl</a>
  * <a href="#api-clusters-FlowMeasurement">zclip.clusters.FlowMeasurement</a>
  * <a href="#api-clusters-Groups">zclip.clusters.Groups</a>
  * <a href="#api-clusters-IasAce">zclip.clusters.IasAce</a>
  * <a href="#api-clusters-IasWd">zclip.clusters.IasWd</a>
  * <a href="#api-clusters-IasZone">zclip.clusters.IasZone</a>
  * <a href="#api-clusters-Identify">zclip.clusters.Identify</a>
  * <a href="#api-clusters-IlluminanceLevelSensing">zclip.clusters.IlluminanceLevelSensing</a>
  * <a href="#api-clusters-IlluminanceMeasurement">zclip.clusters.IlluminanceMeasurement</a>
  * <a href="#api-clusters-LevelControl">zclip.clusters.LevelControl</a>
  * <a href="#api-clusters-MeterIdentification">zclip.clusters.MeterIdentification</a>
  * <a href="#api-clusters-OccupancySensing">zclip.clusters.OccupancySensing</a>
  * <a href="#api-clusters-OnOff">zclip.clusters.OnOff</a>
  * <a href="#api-clusters-OnOffSwitchConfiguration">zclip.clusters.OnOffSwitchConfiguration</a>
  * <a href="#api-clusters-OverTheAirBootloading">zclip.clusters.OverTheAirBootloading</a>
  * <a href="#api-clusters-PollControl">zclip.clusters.PollControl</a>
  * <a href="#api-clusters-PowerConfiguration">zclip.clusters.PowerConfiguration</a>
  * <a href="#api-clusters-PowerProfile">zclip.clusters.PowerProfile</a>
  * <a href="#api-clusters-PressureMeasurement">zclip.clusters.PressureMeasurement</a>
  * <a href="#api-clusters-PumpConfigurationAndControl">zclip.clusters.PumpConfigurationAndControl</a>
  * <a href="#api-clusters-RelativeHumidityMeasurement">zclip.clusters.RelativeHumidityMeasurement</a>
  * <a href="#api-clusters-RssiLocation">zclip.clusters.RssiLocation</a>
  * <a href="#api-clusters-Scenes">zclip.clusters.Scenes</a>
  * <a href="#api-clusters-ShadeConfiguration">zclip.clusters.ShadeConfiguration</a>
  * <a href="#api-clusters-TemperatureMeasurement">zclip.clusters.TemperatureMeasurement</a>
  * <a href="#api-clusters-Thermostat">zclip.clusters.Thermostat</a>
  * <a href="#api-clusters-ThermostatUserInterfaceConfiguration">zclip.clusters.ThermostatUserInterfaceConfiguration</a>
  * <a href="#api-clusters-Time">zclip.clusters.Time</a>
  * <a href="#api-clusters-WindowCovering">zclip.clusters.WindowCovering</a>
* <a href="#api-discover">zclip.discover</a>
* <a href="#api-rd">zclip.RD</a>


---

<a name="api-clusters-Alarms"></a>

### zclip.clusters.Alarms

```javascript
var alarmsCluster = zcl.clusters.Alarms({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### alarms.bind

```javascript
alarmsCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### alarms.read

```javascript
alarmsCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * alarmCount \<int16u> \(server)
  * responseCode


#### alarms.alarm

```javascript
alarms.alarm(args, callback);
```
* args 
  * alarmCode \<enum8>
  * clusterId \<cluster_id>
* callback
  * err
  * response
  * responseCode


#### alarms.getAlarmResponse

```javascript
alarms.getAlarmResponse(args, callback);
```
* args 
  * status \<status>
  * alarmCode \<enum8>
  * clusterId \<cluster_id>
  * timeStamp \<int32u>
* callback
  * err
  * response
  * responseCode


#### alarms.getAlarm

```javascript
alarms.getAlarm(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode


#### alarms.resetAlarmLog

```javascript
alarms.resetAlarmLog(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode



---

<a name="api-clusters-ApplianceControl"></a>

### zclip.clusters.ApplianceControl

```javascript
var applianceControlCluster = zcl.clusters.ApplianceControl({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### applianceControl.bind

```javascript
applianceControlCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### applianceControl.read

```javascript
applianceControlCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * startTime \<int16u> \(server)
      * finishTime \<int16u> \(server)
      * remainingTime \<int16u> \(server)
  * responseCode


#### applianceControl.signalStateResponse

```javascript
applianceControl.signalStateResponse(args, callback);
```
* args 
  * applianceStatus \<appliancestatus>
  * remoteEnableFlagsAndDeviceStatus2 \<remoteenableflagsanddevicestatus2>
  * applianceStatus2 \<int24u>
* callback
  * err
  * response
  * responseCode


#### applianceControl.signalStateNotification

```javascript
applianceControl.signalStateNotification(args, callback);
```
* args 
  * applianceStatus \<appliancestatus>
  * remoteEnableFlagsAndDeviceStatus2 \<remoteenableflagsanddevicestatus2>
  * applianceStatus2 \<int24u>
* callback
  * err
  * response
  * responseCode


#### applianceControl.writeFunctions

```javascript
applianceControl.writeFunctions(args, callback);
```
* args 
  * functionId \<int16u>
  * functionDataType \<enum8>
  * functionData \<int8u>
* callback
  * err
  * response
  * responseCode


#### applianceControl.overloadPauseResume

```javascript
applianceControl.overloadPauseResume(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode


#### applianceControl.overloadPause

```javascript
applianceControl.overloadPause(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode


#### applianceControl.overloadWarning

```javascript
applianceControl.overloadWarning(args, callback);
```
* args 
  * warningEvent \<warningevent>
* callback
  * err
  * response
  * responseCode



---

<a name="api-clusters-ApplianceEventsAndAlert"></a>

### zclip.clusters.ApplianceEventsAndAlert

```javascript
var applianceEventsAndAlertCluster = zcl.clusters.ApplianceEventsAndAlert({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### applianceEventsAndAlert.bind

```javascript
applianceEventsAndAlertCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### applianceEventsAndAlert.read

```javascript
applianceEventsAndAlertCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
  * responseCode


#### applianceEventsAndAlert.getAlertsResponse

```javascript
applianceEventsAndAlert.getAlertsResponse(args, callback);
```
* args 
  * alertsCount \<alertcount>
  * alertStructures \<alertstructure>
* callback
  * err
  * response
  * responseCode


#### applianceEventsAndAlert.alertsNotification

```javascript
applianceEventsAndAlert.alertsNotification(args, callback);
```
* args 
  * alertsCount \<alertcount>
  * alertStructures \<alertstructure>
* callback
  * err
  * response
  * responseCode


#### applianceEventsAndAlert.eventsNotification

```javascript
applianceEventsAndAlert.eventsNotification(args, callback);
```
* args 
  * eventHeader \<int8u>
  * eventId \<eventidentification>
* callback
  * err
  * response
  * responseCode



---

<a name="api-clusters-ApplianceIdentification"></a>

### zclip.clusters.ApplianceIdentification

```javascript
var applianceIdentificationCluster = zcl.clusters.ApplianceIdentification({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### applianceIdentification.bind

```javascript
applianceIdentificationCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### applianceIdentification.read

```javascript
applianceIdentificationCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * basicIdentification \<int56u> \(server)
      * companyName \<char_string> \(server)
      * companyId \<int16u> \(server)
      * brandName \<char_string> \(server)
      * brandId \<int16u> \(server)
      * model \<octet_string> \(server)
      * partNumber \<octet_string> \(server)
      * productRevision \<octet_string> \(server)
      * softwareRevision \<octet_string> \(server)
      * productTypeName \<octet_string> \(server)
      * productTypeId \<int16u> \(server)
      * cecedSpecificationVersion \<int8u> \(server)
  * responseCode



---

<a name="api-clusters-ApplianceStatistics"></a>

### zclip.clusters.ApplianceStatistics

```javascript
var applianceStatisticsCluster = zcl.clusters.ApplianceStatistics({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### applianceStatistics.bind

```javascript
applianceStatisticsCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### applianceStatistics.read

```javascript
applianceStatisticsCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * logMaxSize \<int32u> \(server)
      * logQueueMaxSize \<int8u> \(server)
  * responseCode


#### applianceStatistics.logRequest

```javascript
applianceStatistics.logRequest(args, callback);
```
* args 
  * logId \<int32u>
* callback
  * err
  * response
  * responseCode


#### applianceStatistics.logQueueRequest

```javascript
applianceStatistics.logQueueRequest(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode


#### applianceStatistics.logQueueResponse

```javascript
applianceStatistics.logQueueResponse(args, callback);
```
* args 
  * logQueueSize \<int8u>
  * logIds \<int32u>
* callback
  * err
  * response
  * responseCode


#### applianceStatistics.statisticsAvailable

```javascript
applianceStatistics.statisticsAvailable(args, callback);
```
* args 
  * logQueueSize \<int8u>
  * logIds \<int32u>
* callback
  * err
  * response
  * responseCode



---

<a name="api-clusters-BallastConfiguration"></a>

### zclip.clusters.BallastConfiguration

```javascript
var ballastConfigurationCluster = zcl.clusters.BallastConfiguration({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### ballastConfiguration.bind

```javascript
ballastConfigurationCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### ballastConfiguration.read

```javascript
ballastConfigurationCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * physicalMinLevel \<int8u> \(server)
      * physicalMaxLevel \<int8u> \(server)
      * ballastStatus \<bitmap8> \(server)
      * minLevel \<int8u> \(server)
      * maxLevel \<int8u> \(server)
      * powerOnLevel \<int8u> \(server)
      * powerOnFadeTime \<int16u> \(server)
      * intrinsicBallastFactor \<int8u> \(server)
      * ballastFactorAdjustment \<int8u> \(server)
      * lampQuality \<int8u> \(server)
      * lampType \<char_string> \(server)
      * lampManufacturer \<char_string> \(server)
      * lampRatedHours \<int24u> \(server)
      * lampBurnHours \<int24u> \(server)
      * lampAlarmMode \<bitmap8> \(server)
      * lampBurnHoursTripPoint \<int24u> \(server)
  * responseCode



---

<a name="api-clusters-Basic"></a>

### zclip.clusters.Basic

```javascript
var basicCluster = zcl.clusters.Basic({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### basic.bind

```javascript
basicCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### basic.read

```javascript
basicCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * zclVersion \<int8u> \(server)
      * applicationVersion \<int8u> \(server)
      * stackVersion \<int8u> \(server)
      * hardwareVersion \<int8u> \(server)
      * manufacturerName \<char_string> \(server)
      * modelIdentifier \<char_string> \(server)
      * dateCode \<char_string> \(server)
      * powerSource \<enum8> \(server)
      * genericDeviceClass \<enum8> \(server)
      * genericDeviceType \<enum8> \(server)
      * productCode \<octet_string> \(server)
      * productUrl \<char_string> \(server)
      * locationDescription \<char_string> \(server)
      * physicalEnvironment \<enum8> \(server)
      * deviceEnabled \<boolean> \(server)
      * alarmMask \<bitmap8> \(server)
      * disableLocalConfig \<bitmap8> \(server)
  * responseCode


#### basic.resetToFactoryDefaults

```javascript
basic.resetToFactoryDefaults(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode



---

<a name="api-clusters-BinaryInputBasic"></a>

### zclip.clusters.BinaryInputBasic

```javascript
var binaryInputBasicCluster = zcl.clusters.BinaryInputBasic({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### binaryInputBasic.bind

```javascript
binaryInputBasicCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### binaryInputBasic.read

```javascript
binaryInputBasicCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * activeText \<char_string> \(server)
      * description \<char_string> \(server)
      * inactiveText \<char_string> \(server)
      * outOfService \<boolean> \(server)
      * polarity \<enum8> \(server)
      * presentValue \<boolean> \(server)
      * reliability \<enum8> \(server)
      * statusFlags \<bitmap8> \(server)
      * applicationType \<int32u> \(server)
  * responseCode



---

<a name="api-clusters-ColorControl"></a>

### zclip.clusters.ColorControl

```javascript
var colorControlCluster = zcl.clusters.ColorControl({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### colorControl.bind

```javascript
colorControlCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### colorControl.read

```javascript
colorControlCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * currentHue \<int8u> \(server)
      * currentSaturation \<int8u> \(server)
      * remainingTime \<int16u> \(server)
      * currentX \<int16u> \(server)
      * currentY \<int16u> \(server)
      * driftCompensation \<enum8> \(server)
      * compensationText \<char_string> \(server)
      * colorTemperature \<int16u> \(server)
      * colorMode \<enum8> \(server)
      * colorControlOptions \<bitmap8> \(server)
      * numberOfPrimaries \<int8u> \(server)
      * primary1X \<int16u> \(server)
      * primary1Y \<int16u> \(server)
      * primary1Intensity \<int8u> \(server)
      * primary2X \<int16u> \(server)
      * primary2Y \<int16u> \(server)
      * primary2Intensity \<int8u> \(server)
      * primary3X \<int16u> \(server)
      * primary3Y \<int16u> \(server)
      * primary3Intensity \<int8u> \(server)
      * primary4X \<int16u> \(server)
      * primary4Y \<int16u> \(server)
      * primary4Intensity \<int8u> \(server)
      * primary5X \<int16u> \(server)
      * primary5Y \<int16u> \(server)
      * primary5Intensity \<int8u> \(server)
      * primary6X \<int16u> \(server)
      * primary6Y \<int16u> \(server)
      * primary6Intensity \<int8u> \(server)
      * whitePointX \<int16u> \(server)
      * whitePointY \<int16u> \(server)
      * colorPointRX \<int16u> \(server)
      * colorPointRY \<int16u> \(server)
      * colorPointRIntensity \<int8u> \(server)
      * colorPointGX \<int16u> \(server)
      * colorPointGY \<int16u> \(server)
      * colorPointGIntensity \<int8u> \(server)
      * colorPointBX \<int16u> \(server)
      * colorPointBY \<int16u> \(server)
      * colorPointBIntensity \<int8u> \(server)
      * coupleColorTempToLevelMinMireds \<int16u> \(server)
      * startUpColorTemperatureMireds \<int16u> \(server)
  * responseCode


#### colorControl.moveToColorTemperature

```javascript
colorControl.moveToColorTemperature(args, callback);
```
* args 
  * colorTemperature \<int16u>
  * transitionTime \<int16u>
* callback
  * err
  * response
  * responseCode


#### colorControl.moveHue

```javascript
colorControl.moveHue(args, callback);
```
* args 
  * moveMode \<huemovemode>
  * rate \<int8u>
* callback
  * err
  * response
  * responseCode


#### colorControl.stepHue

```javascript
colorControl.stepHue(args, callback);
```
* args 
  * stepMode \<huestepmode>
  * stepSize \<int8u>
  * transitionTime \<int8u>
* callback
  * err
  * response
  * responseCode


#### colorControl.moveToSaturation

```javascript
colorControl.moveToSaturation(args, callback);
```
* args 
  * saturation \<int8u>
  * transitionTime \<int16u>
* callback
  * err
  * response
  * responseCode


#### colorControl.moveSaturation

```javascript
colorControl.moveSaturation(args, callback);
```
* args 
  * moveMode \<saturationmovemode>
  * rate \<int8u>
* callback
  * err
  * response
  * responseCode


#### colorControl.stepSaturation

```javascript
colorControl.stepSaturation(args, callback);
```
* args 
  * stepMode \<saturationstepmode>
  * stepSize \<int8u>
  * transitionTime \<int8u>
* callback
  * err
  * response
  * responseCode


#### colorControl.moveToHueAndSaturation

```javascript
colorControl.moveToHueAndSaturation(args, callback);
```
* args 
  * hue \<int8u>
  * saturation \<int8u>
  * transitionTime \<int16u>
* callback
  * err
  * response
  * responseCode


#### colorControl.moveToColor

```javascript
colorControl.moveToColor(args, callback);
```
* args 
  * colorx \<int16u>
  * colory \<int16u>
  * transitionTime \<int16u>
* callback
  * err
  * response
  * responseCode


#### colorControl.moveColor

```javascript
colorControl.moveColor(args, callback);
```
* args 
  * ratex \<int16s>
  * ratey \<int16s>
* callback
  * err
  * response
  * responseCode


#### colorControl.stepColor

```javascript
colorControl.stepColor(args, callback);
```
* args 
  * stepx \<int16s>
  * stepy \<int16s>
  * transitionTime \<int16u>
* callback
  * err
  * response
  * responseCode



---

<a name="api-clusters-Commissioning"></a>

### zclip.clusters.Commissioning

```javascript
var commissioningCluster = zcl.clusters.Commissioning({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### commissioning.bind

```javascript
commissioningCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### commissioning.read

```javascript
commissioningCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * shortAddress \<int16u> \(server)
      * extendedPanId \<ieee_address> \(server)
      * panId \<int16u> \(server)
      * channelMask \<bitmap32> \(server)
      * protocolVersion \<int8u> \(server)
      * stackProfile \<int8u> \(server)
      * startupControl \<enum8> \(server)
      * trustCenterAddress \<ieee_address> \(server)
      * trustCenterMasterKey \<security_key> \(server)
      * networkKey \<security_key> \(server)
      * useInsecureJoin \<boolean> \(server)
      * preconfiguredLinkKey \<security_key> \(server)
      * networkKeySequenceNumber \<int8u> \(server)
      * networkKeyType \<enum8> \(server)
      * networkManagerAddress \<int16u> \(server)
      * scanAttempts \<int8u> \(server)
      * timeBetweenScans \<int16u> \(server)
      * rejoinInterval \<int16u> \(server)
      * maxRejoinInterval \<int16u> \(server)
      * indirectPollRate \<int16u> \(server)
      * parentRetryThreshold \<int8u> \(server)
      * concentratorFlag \<boolean> \(server)
      * concentratorRadius \<int8u> \(server)
      * concentratorDiscoveryTime \<int8u> \(server)
  * responseCode


#### commissioning.restartDeviceResponse

```javascript
commissioning.restartDeviceResponse(args, callback);
```
* args 
  * status \<enum8>
* callback
  * err
  * response
  * responseCode


#### commissioning.saveStartupParametersResponse

```javascript
commissioning.saveStartupParametersResponse(args, callback);
```
* args 
  * status \<enum8>
* callback
  * err
  * response
  * responseCode


#### commissioning.restoreStartupParametersResponse

```javascript
commissioning.restoreStartupParametersResponse(args, callback);
```
* args 
  * status \<enum8>
* callback
  * err
  * response
  * responseCode


#### commissioning.resetStartupParametersResponse

```javascript
commissioning.resetStartupParametersResponse(args, callback);
```
* args 
  * status \<enum8>
* callback
  * err
  * response
  * responseCode



---

<a name="api-clusters-DehumidificationControl"></a>

### zclip.clusters.DehumidificationControl

```javascript
var dehumidificationControlCluster = zcl.clusters.DehumidificationControl({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### dehumidificationControl.bind

```javascript
dehumidificationControlCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### dehumidificationControl.read

```javascript
dehumidificationControlCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * relativeHumidity \<int8u> \(server)
      * dehumidificationCooling \<int8u> \(server)
      * rhDehumidificationSetpoint \<int8u> \(server)
      * relativeHumidityMode \<enum8> \(server)
      * dehumidificationLockout \<enum8> \(server)
      * dehumidificationHysteresis \<int8u> \(server)
      * dehumidificationMaxCool \<int8u> \(server)
      * relativeHumidityDisplay \<enum8> \(server)
  * responseCode



---

<a name="api-clusters-DeviceTemperatureConfiguration"></a>

### zclip.clusters.DeviceTemperatureConfiguration

```javascript
var deviceTemperatureConfigurationCluster = zcl.clusters.DeviceTemperatureConfiguration({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### deviceTemperatureConfiguration.bind

```javascript
deviceTemperatureConfigurationCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### deviceTemperatureConfiguration.read

```javascript
deviceTemperatureConfigurationCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * currentTemperature \<int16s> \(server)
      * minTempExperienced \<int16s> \(server)
      * maxTempExperienced \<int16s> \(server)
      * overTempTotalDwell \<int16u> \(server)
      * deviceTempAlarmMask \<bitmap8> \(server)
      * lowTempThreshold \<int16s> \(server)
      * highTempThreshold \<int16s> \(server)
      * lowTempDwellTripPoint \<int24u> \(server)
      * highTempDwellTripPoint \<int24u> \(server)
  * responseCode



---

<a name="api-clusters-Diagnostics"></a>

### zclip.clusters.Diagnostics

```javascript
var diagnosticsCluster = zcl.clusters.Diagnostics({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### diagnostics.bind

```javascript
diagnosticsCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### diagnostics.read

```javascript
diagnosticsCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * numberOfResets \<int16u> \(server)
      * persistentMemoryWrites \<int16u> \(server)
      * macRxBroadcast \<int32u> \(server)
      * macTxBroadcast \<int32u> \(server)
      * macRxUnicast \<int32u> \(server)
      * macTxUnicast \<int32u> \(server)
      * macTxUnicastRetry \<int16u> \(server)
      * macTxUnicastFail \<int16u> \(server)
      * apsRxBroadcast \<int16u> \(server)
      * apsTxBroadcast \<int16u> \(server)
      * apsRxUnicast \<int16u> \(server)
      * apsUnicastSuccess \<int16u> \(server)
      * apsTxUnicastRetries \<int16u> \(server)
      * apsTxUnicastFailures \<int16u> \(server)
      * routeDiscoveryInitiated \<int16u> \(server)
      * neighborAdded \<int16u> \(server)
      * neighborMoved \<int16u> \(server)
      * neighborStale \<int16u> \(server)
      * joinIndication \<int16u> \(server)
      * childMoved \<int16u> \(server)
      * networkFrameControlFailure \<int16u> \(server)
      * apsFrameControlFailure \<int16u> \(server)
      * apsUnauthorizedKey \<int16u> \(server)
      * networkDecryptionFailure \<int16u> \(server)
      * apsDecryptionFailure \<int16u> \(server)
      * packetBufferAllocationFailures \<int16u> \(server)
      * relayedUnicasts \<int16u> \(server)
      * phyToMacQueueLimitReached \<int16u> \(server)
      * packetValidateDropCount \<int16u> \(server)
      * averageMacRetryPerApsMessageSent \<int16u> \(server)
      * lastMessageLqi \<int8u> \(server)
      * lastMessageRssi \<int8s> \(server)
  * responseCode



---

<a name="api-clusters-DoorLock"></a>

### zclip.clusters.DoorLock

```javascript
var doorLockCluster = zcl.clusters.DoorLock({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### doorLock.bind

```javascript
doorLockCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### doorLock.read

```javascript
doorLockCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * lockState \<enum8> \(server)
      * lockType \<enum8> \(server)
      * actuatorEnabled \<boolean> \(server)
      * doorState \<enum8> \(server)
      * doorOpenEvents \<int32u> \(server)
      * doorClosedEvents \<int32u> \(server)
      * openPeriod \<int16u> \(server)
      * numLockRecordsSupported \<int16u> \(server)
      * numTotalUsersSupported \<int16u> \(server)
      * numPinUsersSupported \<int16u> \(server)
      * numRfidUsersSupported \<int16u> \(server)
      * numWeekdaySchedulesSupportedPerUser \<int8u> \(server)
      * numYeardaySchedulesSupportedPerUser \<int8u> \(server)
      * numHolidaySchedulesSupportedPerUser \<int8u> \(server)
      * maxPinLength \<int8u> \(server)
      * minPinLength \<int8u> \(server)
      * maxRfidCodeLength \<int8u> \(server)
      * minRfidCodeLength \<int8u> \(server)
      * enableLogging \<boolean> \(server)
      * language \<char_string> \(server)
      * ledSettings \<int8u> \(server)
      * autoRelockTime \<int32u> \(server)
      * soundVolume \<int8u> \(server)
      * operatingMode \<enum8> \(server)
      * supportedOperatingModes \<bitmap16> \(server)
      * defaultConfigurationRegister \<bitmap16> \(server)
      * enableLocalProgramming \<boolean> \(server)
      * enableOneTouchLocking \<boolean> \(server)
      * enableInsideStatusLed \<boolean> \(server)
      * enablePrivacyModeButton \<boolean> \(server)
      * wrongCodeEntryLimit \<int8u> \(server)
      * userCodeTemporaryDisableTime \<int8u> \(server)
      * sendPinOverTheAir \<boolean> \(server)
      * requirePinForRfOperation \<boolean> \(server)
      * zigbeeSecurityLevel \<enum8> \(server)
      * alarmMask \<bitmap16> \(server)
      * keypadOperationEventMask \<bitmap16> \(server)
      * rfOperationEventMask \<bitmap16> \(server)
      * manualOperationEventMask \<bitmap16> \(server)
      * rfidOperationEventMask \<bitmap16> \(server)
      * keypadProgrammingEventMask \<bitmap16> \(server)
      * rfProgrammingEventMask \<bitmap16> \(server)
      * rfidProgrammingEventMask \<bitmap16> \(server)
  * responseCode


#### doorLock.getYeardayScheduleResponse

```javascript
doorLock.getYeardayScheduleResponse(args, callback);
```
* args 
  * scheduleId \<int8u>
  * userId \<int16u>
  * status \<int8u>
  * localStartTime \<int32u>
  * localEndTime \<int32u>
* callback
  * err
  * response
  * responseCode


#### doorLock.unlockDoorResponse

```javascript
doorLock.unlockDoorResponse(args, callback);
```
* args 
  * status \<int8u>
* callback
  * err
  * response
  * responseCode


#### doorLock.toggleResponse

```javascript
doorLock.toggleResponse(args, callback);
```
* args 
  * status \<int8u>
* callback
  * err
  * response
  * responseCode


#### doorLock.unlockWithTimeoutResponse

```javascript
doorLock.unlockWithTimeoutResponse(args, callback);
```
* args 
  * status \<int8u>
* callback
  * err
  * response
  * responseCode


#### doorLock.getLogRecordResponse

```javascript
doorLock.getLogRecordResponse(args, callback);
```
* args 
  * logEntryId \<int16u>
  * timestamp \<int32u>
  * eventType \<enum8>
  * source \<int8u>
  * eventIdOrAlarmCode \<int8u>
  * userId \<int16u>
  * pin \<char_string>
* callback
  * err
  * response
  * responseCode


#### doorLock.setPinResponse

```javascript
doorLock.setPinResponse(args, callback);
```
* args 
  * status \<doorlocksetpinoridstatus>
* callback
  * err
  * response
  * responseCode


#### doorLock.getPinResponse

```javascript
doorLock.getPinResponse(args, callback);
```
* args 
  * userId \<int16u>
  * userStatus \<doorlockuserstatus>
  * userType \<doorlockusertype>
  * pin \<char_string>
* callback
  * err
  * response
  * responseCode


#### doorLock.clearPinResponse

```javascript
doorLock.clearPinResponse(args, callback);
```
* args 
  * status \<int8u>
* callback
  * err
  * response
  * responseCode


#### doorLock.clearAllPinsResponse

```javascript
doorLock.clearAllPinsResponse(args, callback);
```
* args 
  * status \<int8u>
* callback
  * err
  * response
  * responseCode


#### doorLock.setUserStatusResponse

```javascript
doorLock.setUserStatusResponse(args, callback);
```
* args 
  * status \<int8u>
* callback
  * err
  * response
  * responseCode


#### doorLock.clearYeardayScheduleResponse

```javascript
doorLock.clearYeardayScheduleResponse(args, callback);
```
* args 
  * status \<int8u>
* callback
  * err
  * response
  * responseCode


#### doorLock.setHolidayScheduleResponse

```javascript
doorLock.setHolidayScheduleResponse(args, callback);
```
* args 
  * status \<int8u>
* callback
  * err
  * response
  * responseCode


#### doorLock.getHolidayScheduleResponse

```javascript
doorLock.getHolidayScheduleResponse(args, callback);
```
* args 
  * scheduleId \<int8u>
  * status \<int8u>
  * localStartTime \<int32u>
  * localEndTime \<int32u>
  * operatingModeDuringHoliday \<enum8>
* callback
  * err
  * response
  * responseCode


#### doorLock.clearHolidayScheduleResponse

```javascript
doorLock.clearHolidayScheduleResponse(args, callback);
```
* args 
  * status \<int8u>
* callback
  * err
  * response
  * responseCode


#### doorLock.setUserTypeResponse

```javascript
doorLock.setUserTypeResponse(args, callback);
```
* args 
  * status \<int8u>
* callback
  * err
  * response
  * responseCode


#### doorLock.getUserTypeResponse

```javascript
doorLock.getUserTypeResponse(args, callback);
```
* args 
  * userId \<int16u>
  * userType \<doorlockusertype>
* callback
  * err
  * response
  * responseCode


#### doorLock.setRfidResponse

```javascript
doorLock.setRfidResponse(args, callback);
```
* args 
  * status \<doorlocksetpinoridstatus>
* callback
  * err
  * response
  * responseCode


#### doorLock.getRfidResponse

```javascript
doorLock.getRfidResponse(args, callback);
```
* args 
  * userId \<int16u>
  * userStatus \<doorlockuserstatus>
  * userType \<doorlockusertype>
  * rfid \<char_string>
* callback
  * err
  * response
  * responseCode


#### doorLock.clearRfidResponse

```javascript
doorLock.clearRfidResponse(args, callback);
```
* args 
  * status \<int8u>
* callback
  * err
  * response
  * responseCode


#### doorLock.clearAllRfidsResponse

```javascript
doorLock.clearAllRfidsResponse(args, callback);
```
* args 
  * status \<int8u>
* callback
  * err
  * response
  * responseCode


#### doorLock.operationEventNotification

```javascript
doorLock.operationEventNotification(args, callback);
```
* args 
  * source \<int8u>
  * eventCode \<doorlockoperationeventcode>
  * userId \<int16u>
  * pin \<char_string>
  * timeStamp \<int32u>
  * data \<char_string>
* callback
  * err
  * response
  * responseCode


#### doorLock.programmingEventNotification

```javascript
doorLock.programmingEventNotification(args, callback);
```
* args 
  * source \<int8u>
  * eventCode \<doorlockprogrammingeventcode>
  * userId \<int16u>
  * pin \<char_string>
  * userType \<doorlockusertype>
  * userStatus \<doorlockuserstatus>
  * timeStamp \<int32u>
  * data \<char_string>
* callback
  * err
  * response
  * responseCode



---

<a name="api-clusters-ElectricalMeasurement"></a>

### zclip.clusters.ElectricalMeasurement

```javascript
var electricalMeasurementCluster = zcl.clusters.ElectricalMeasurement({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### electricalMeasurement.bind

```javascript
electricalMeasurementCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### electricalMeasurement.read

```javascript
electricalMeasurementCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * measurementType \<bitmap32> \(server)
      * dcVoltage \<int16s> \(server)
      * dcVoltageMin \<int16s> \(server)
      * dcVoltageMax \<int16s> \(server)
      * dcCurrent \<int16s> \(server)
      * dcCurrentMin \<int16s> \(server)
      * dcCurrentMax \<int16s> \(server)
      * dcPower \<int16s> \(server)
      * dcPowerMin \<int16s> \(server)
      * dcPowerMax \<int16s> \(server)
      * dcVoltageMultiplier \<int16u> \(server)
      * dcVoltageDivisor \<int16u> \(server)
      * dcCurrentMultiplier \<int16u> \(server)
      * dcCurrentDivisor \<int16u> \(server)
      * dcPowerMultiplier \<int16u> \(server)
      * dcPowerDivisor \<int16u> \(server)
      * acFrequency \<int16u> \(server)
      * acFrequencyMin \<int16u> \(server)
      * acFrequencyMax \<int16u> \(server)
      * neutralCurrent \<int16u> \(server)
      * totalActivePower \<int32s> \(server)
      * totalReactivePower \<int32s> \(server)
      * totalApparentPower \<int32u> \(server)
      * measured1stHarmonicCurrent \<int16s> \(server)
      * measured3rdHarmonicCurrent \<int16s> \(server)
      * measured5thHarmonicCurrent \<int16s> \(server)
      * measured7thHarmonicCurrent \<int16s> \(server)
      * measured9thHarmonicCurrent \<int16s> \(server)
      * measured11thHarmonicCurrent \<int16s> \(server)
      * measuredPhase1stHarmonicCurrent \<int16s> \(server)
      * measuredPhase3rdHarmonicCurrent \<int16s> \(server)
      * measuredPhase5thHarmonicCurrent \<int16s> \(server)
      * measuredPhase7thHarmonicCurrent \<int16s> \(server)
      * measuredPhase9thHarmonicCurrent \<int16s> \(server)
      * measuredPhase11thHarmonicCurrent \<int16s> \(server)
      * acFrequencyMultiplier \<int16u> \(server)
      * acFrequencyDivisor \<int16u> \(server)
      * powerMultiplier \<int32u> \(server)
      * powerDivisor \<int32u> \(server)
      * harmonicCurrentMultiplier \<int8s> \(server)
      * phaseHarmonicCurrentMultiplier \<int8s> \(server)
      * instantaneousVoltage \<int16s> \(server)
      * instantaneousLineCurrent \<int16u> \(server)
      * instantaneousActiveCurrent \<int16s> \(server)
      * instantaneousReactiveCurrent \<int16s> \(server)
      * instantaneousPower \<int16s> \(server)
      * rmsVoltage \<int16u> \(server)
      * rmsVoltageMin \<int16u> \(server)
      * rmsVoltageMax \<int16u> \(server)
      * rmsCurrent \<int16u> \(server)
      * rmsCurrentMin \<int16u> \(server)
      * rmsCurrentMax \<int16u> \(server)
      * activePower \<int16s> \(server)
      * activePowerMin \<int16s> \(server)
      * activePowerMax \<int16s> \(server)
      * reactivePower \<int16s> \(server)
      * apparentPower \<int16u> \(server)
      * powerFactor \<int8s> \(server)
      * averageRmsVoltageMeasurementPeriod \<int16u> \(server)
      * averageRmsUnderVoltageCounter \<int16u> \(server)
      * rmsExtremeOverVoltagePeriod \<int16u> \(server)
      * rmsExtremeUnderVoltagePeriod \<int16u> \(server)
      * rmsVoltageSagPeriod \<int16u> \(server)
      * rmsVoltageSwellPeriod \<int16u> \(server)
      * acVoltageMultiplier \<int16u> \(server)
      * acVoltageDivisor \<int16u> \(server)
      * acCurrentMultiplier \<int16u> \(server)
      * acCurrentDivisor \<int16u> \(server)
      * acPowerMultiplier \<int16u> \(server)
      * acPowerDivisor \<int16u> \(server)
      * overloadAlarmsMask \<bitmap8> \(server)
      * voltageOverload \<int16s> \(server)
      * currentOverload \<int16s> \(server)
      * acOverloadAlarmsMask \<bitmap16> \(server)
      * acVoltageOverload \<int16s> \(server)
      * acCurrentOverload \<int16s> \(server)
      * acActivePowerOverload \<int16s> \(server)
      * acReactivePowerOverload \<int16s> \(server)
      * averageRmsOverVoltage \<int16s> \(server)
      * averageRmsUnderVoltage \<int16s> \(server)
      * rmsExtremeOverVoltage \<int16s> \(server)
      * rmsExtremeUnderVoltage \<int16s> \(server)
      * rmsVoltageSag \<int16s> \(server)
      * rmsVoltageSwell \<int16s> \(server)
      * lineCurrentPhaseB \<int16u> \(server)
      * activeCurrentPhaseB \<int16s> \(server)
      * reactiveCurrentPhaseB \<int16s> \(server)
      * rmsVoltagePhaseB \<int16u> \(server)
      * rmsVoltageMinPhaseB \<int16u> \(server)
      * rmsVoltageMaxPhaseB \<int16u> \(server)
      * rmsCurrentPhaseB \<int16u> \(server)
      * rmsCurrentMinPhaseB \<int16u> \(server)
      * rmsCurrentMaxPhaseB \<int16u> \(server)
      * activePowerPhaseB \<int16s> \(server)
      * activePowerMinPhaseB \<int16s> \(server)
      * activePowerMaxPhaseB \<int16s> \(server)
      * reactivePowerPhaseB \<int16s> \(server)
      * apparentPowerPhaseB \<int16u> \(server)
      * powerFactorPhaseB \<int8s> \(server)
      * averageRmsVoltageMeasurementPeriodPhaseB \<int16u> \(server)
      * averageRmsOverVoltageCounterPhaseB \<int16u> \(server)
      * averageRmsUnderVoltageCounterPhaseB \<int16u> \(server)
      * rmsExtremeOverVoltagePeriodPhaseB \<int16u> \(server)
      * rmsExtremeUnderVoltagePeriodPhaseB \<int16u> \(server)
      * rmsVoltageSagPeriodPhaseB \<int16u> \(server)
      * rmsVoltageSwellPeriodPhaseB \<int16u> \(server)
      * lineCurrentPhaseC \<int16u> \(server)
      * activeCurrentPhaseC \<int16s> \(server)
      * reactiveCurrentPhaseC \<int16s> \(server)
      * rmsVoltagePhaseC \<int16u> \(server)
      * rmsVoltageMinPhaseC \<int16u> \(server)
      * rmsVoltageMaxPhaseC \<int16u> \(server)
      * rmsCurrentPhaseB \<int16u> \(server)
      * rmsCurrentMinPhaseC \<int16u> \(server)
      * rmsCurrentMaxPhaseC \<int16u> \(server)
      * activePowerPhaseC \<int16s> \(server)
      * activePowerMinPhaseC \<int16s> \(server)
      * activePowerMaxPhaseC \<int16s> \(server)
      * reactivePowerPhaseC \<int16s> \(server)
      * apparentPowerPhaseC \<int16u> \(server)
      * powerFactorPhaseC \<int8s> \(server)
      * averageRmsVoltageMeasurementPeriodPhaseC \<int16u> \(server)
      * averageRmsOverVoltageCounterPhaseC \<int16u> \(server)
      * averageRmsUnderVoltageCounterPhaseC \<int16u> \(server)
      * rmsExtremeOverVoltagePeriodPhaseC \<int16u> \(server)
      * rmsExtremeUnderVoltagePeriodPhaseC \<int16u> \(server)
      * rmsVoltageSagPeriodPhaseC \<int16u> \(server)
      * rmsVoltageSwellPeriodPhaseC \<int16u> \(server)
  * responseCode


#### electricalMeasurement.getProfileInfoCommand

```javascript
electricalMeasurement.getProfileInfoCommand(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode


#### electricalMeasurement.getMeasurementProfileCommand

```javascript
electricalMeasurement.getMeasurementProfileCommand(args, callback);
```
* args 
  * attributeId \<int16u>
  * startTime \<int32u>
  * numberOfIntervals \<enum8>
* callback
  * err
  * response
  * responseCode



---

<a name="api-clusters-FanControl"></a>

### zclip.clusters.FanControl

```javascript
var fanControlCluster = zcl.clusters.FanControl({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### fanControl.bind

```javascript
fanControlCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### fanControl.read

```javascript
fanControlCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * fanMode \<enum8> \(server)
      * fanModeSequence \<enum8> \(server)
  * responseCode



---

<a name="api-clusters-FlowMeasurement"></a>

### zclip.clusters.FlowMeasurement

```javascript
var flowMeasurementCluster = zcl.clusters.FlowMeasurement({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### flowMeasurement.bind

```javascript
flowMeasurementCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### flowMeasurement.read

```javascript
flowMeasurementCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * measuredValue \<int16u> \(server)
      * minMeasuredValue \<int16u> \(server)
      * maxMeasuredValue \<int16u> \(server)
      * tolerance \<int16u> \(server)
  * responseCode



---

<a name="api-clusters-Groups"></a>

### zclip.clusters.Groups

```javascript
var groupsCluster = zcl.clusters.Groups({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### groups.bind

```javascript
groupsCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### groups.read

```javascript
groupsCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * nameSupport \<bitmap8> \(server)
  * responseCode


#### groups.addGroupResponse

```javascript
groups.addGroupResponse(args, callback);
```
* args 
  * status \<status>
  * groupId \<int16u>
* callback
  * err
  * response
  * responseCode


#### groups.viewGroupResponse

```javascript
groups.viewGroupResponse(args, callback);
```
* args 
  * status \<status>
  * groupId \<int16u>
  * groupName \<char_string>
* callback
  * err
  * response
  * responseCode


#### groups.getGroupMembershipResponse

```javascript
groups.getGroupMembershipResponse(args, callback);
```
* args 
  * capacity \<int8u>
  * groupCount \<int8u>
  * groupList \<int16u>
* callback
  * err
  * response
  * responseCode


#### groups.removeGroupResponse

```javascript
groups.removeGroupResponse(args, callback);
```
* args 
  * status \<status>
  * groupId \<int16u>
* callback
  * err
  * response
  * responseCode


#### groups.removeAllGroups

```javascript
groups.removeAllGroups(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode


#### groups.addGroupIfIdentifying

```javascript
groups.addGroupIfIdentifying(args, callback);
```
* args 
  * groupId \<int16u>
  * groupName \<char_string>
* callback
  * err
  * response
  * responseCode



---

<a name="api-clusters-IasAce"></a>

### zclip.clusters.IasAce

```javascript
var iasAceCluster = zcl.clusters.IasAce({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### iasAce.bind

```javascript
iasAceCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### iasAce.read

```javascript
iasAceCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
  * responseCode


#### iasAce.armResponse

```javascript
iasAce.armResponse(args, callback);
```
* args 
  * armNotification \<iasacearmnotification>
* callback
  * err
  * response
  * responseCode


#### iasAce.getZoneIdMapResponse

```javascript
iasAce.getZoneIdMapResponse(args, callback);
```
* args 
  * section0 \<bitmap16>
  * section1 \<bitmap16>
  * section2 \<bitmap16>
  * section3 \<bitmap16>
  * section4 \<bitmap16>
  * section5 \<bitmap16>
  * section6 \<bitmap16>
  * section7 \<bitmap16>
  * section8 \<bitmap16>
  * section9 \<bitmap16>
  * section10 \<bitmap16>
  * section11 \<bitmap16>
  * section12 \<bitmap16>
  * section13 \<bitmap16>
  * section14 \<bitmap16>
  * section15 \<bitmap16>
* callback
  * err
  * response
  * responseCode


#### iasAce.getZoneInformationResponse

```javascript
iasAce.getZoneInformationResponse(args, callback);
```
* args 
  * zoneId \<int8u>
  * zoneType \<iaszonetype>
  * ieeeAddress \<ieee_address>
  * zoneLabel \<char_string>
* callback
  * err
  * response
  * responseCode


#### iasAce.zoneStatusChanged

```javascript
iasAce.zoneStatusChanged(args, callback);
```
* args 
  * zoneId \<int8u>
  * zoneStatus \<enum16>
  * audibleNotification \<iasaceaudiblenotification>
  * zoneLabel \<char_string>
* callback
  * err
  * response
  * responseCode


#### iasAce.panelStatusChanged

```javascript
iasAce.panelStatusChanged(args, callback);
```
* args 
  * panelStatus \<iasacepanelstatus>
  * secondsRemaining \<int8u>
  * audibleNotification \<iasaceaudiblenotification>
  * alarmStatus \<iasacealarmstatus>
* callback
  * err
  * response
  * responseCode


#### iasAce.getPanelStatusResponse

```javascript
iasAce.getPanelStatusResponse(args, callback);
```
* args 
  * panelStatus \<iasacepanelstatus>
  * secondsRemaining \<int8u>
  * audibleNotification \<iasaceaudiblenotification>
  * alarmStatus \<iasacealarmstatus>
* callback
  * err
  * response
  * responseCode


#### iasAce.setBypassedZoneList

```javascript
iasAce.setBypassedZoneList(args, callback);
```
* args 
  * numberOfZones \<int8u>
  * zoneIds \<int8u>
* callback
  * err
  * response
  * responseCode


#### iasAce.bypassResponse

```javascript
iasAce.bypassResponse(args, callback);
```
* args 
  * numberOfZones \<int8u>
  * bypassResult \<iasacebypassresult>
* callback
  * err
  * response
  * responseCode


#### iasAce.getZoneStatusResponse

```javascript
iasAce.getZoneStatusResponse(args, callback);
```
* args 
  * zoneStatusComplete \<boolean>
  * numberOfZones \<int8u>
  * zoneStatusResult \<iasacezonestatusresult>
* callback
  * err
  * response
  * responseCode


#### iasAce.getZoneStatus

```javascript
iasAce.getZoneStatus(args, callback);
```
* args 
  * startingZoneId \<int8u>
  * maxNumberOfZoneIds \<int8u>
  * zoneStatusMaskFlag \<boolean>
  * zoneStatusMask \<bitmap16>
* callback
  * err
  * response
  * responseCode



---

<a name="api-clusters-IasWd"></a>

### zclip.clusters.IasWd

```javascript
var iasWdCluster = zcl.clusters.IasWd({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### iasWd.bind

```javascript
iasWdCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### iasWd.read

```javascript
iasWdCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * maxDuration \<int16u> \(server)
  * responseCode


#### iasWd.startWarning

```javascript
iasWd.startWarning(args, callback);
```
* args 
  * warningInfo \<warninginfo>
  * warningDuration \<int16u>
  * strobeDutyCycle \<int8u>
  * strobeLevel \<enum8>
* callback
  * err
  * response
  * responseCode


#### iasWd.squawk

```javascript
iasWd.squawk(args, callback);
```
* args 
  * squawkInfo \<squawkinfo>
* callback
  * err
  * response
  * responseCode



---

<a name="api-clusters-IasZone"></a>

### zclip.clusters.IasZone

```javascript
var iasZoneCluster = zcl.clusters.IasZone({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### iasZone.bind

```javascript
iasZoneCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### iasZone.read

```javascript
iasZoneCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * zoneState \<enum8> \(server)
      * zoneType \<enum16> \(server)
      * zoneStatus \<bitmap16> \(server)
      * iasCieAddress \<ieee_address> \(server)
      * zoneId \<int8u> \(server)
      * numberOfZoneSensitivityLevelsSupported \<int8u> \(server)
      * currentZoneSensitivityLevel \<int8u> \(server)
  * responseCode


#### iasZone.zoneStatusChangeNotification

```javascript
iasZone.zoneStatusChangeNotification(args, callback);
```
* args 
  * zoneStatus \<iaszonestatus>
  * extendedStatus \<bitmap8>
  * zoneId \<int8u>
  * delay \<int16u>
* callback
  * err
  * response
  * responseCode


#### iasZone.zoneEnrollRequest

```javascript
iasZone.zoneEnrollRequest(args, callback);
```
* args 
  * zoneType \<iaszonetype>
  * manufacturerCode \<int16u>
* callback
  * err
  * response
  * responseCode


#### iasZone.initiateNormalOperationModeResponse

```javascript
iasZone.initiateNormalOperationModeResponse(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode


#### iasZone.initiateTestModeResponse

```javascript
iasZone.initiateTestModeResponse(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode



---

<a name="api-clusters-Identify"></a>

### zclip.clusters.Identify

```javascript
var identifyCluster = zcl.clusters.Identify({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### identify.bind

```javascript
identifyCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### identify.read

```javascript
identifyCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * identifyTime \<int16u> \(server)
      * commissionState \<bitmap8> \(server)
  * responseCode


#### identify.identifyQueryResponse

```javascript
identify.identifyQueryResponse(args, callback);
```
* args 
  * timeout \<int16u>
* callback
  * err
  * response
  * responseCode


#### identify.identifyQuery

```javascript
identify.identifyQuery(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode


#### identify.ezModeInvoke

```javascript
identify.ezModeInvoke(args, callback);
```
* args 
  * action \<bitmap8>
* callback
  * err
  * response
  * responseCode


#### identify.updateCommissionState

```javascript
identify.updateCommissionState(args, callback);
```
* args 
  * action \<enum8>
  * commissionStateMask \<bitmap8>
* callback
  * err
  * response
  * responseCode



---

<a name="api-clusters-IlluminanceLevelSensing"></a>

### zclip.clusters.IlluminanceLevelSensing

```javascript
var illuminanceLevelSensingCluster = zcl.clusters.IlluminanceLevelSensing({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### illuminanceLevelSensing.bind

```javascript
illuminanceLevelSensingCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### illuminanceLevelSensing.read

```javascript
illuminanceLevelSensingCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * levelStatus \<enum8> \(server)
      * lightSensorType \<enum8> \(server)
      * illuminanceLevelTarget \<int16u> \(server)
  * responseCode



---

<a name="api-clusters-IlluminanceMeasurement"></a>

### zclip.clusters.IlluminanceMeasurement

```javascript
var illuminanceMeasurementCluster = zcl.clusters.IlluminanceMeasurement({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### illuminanceMeasurement.bind

```javascript
illuminanceMeasurementCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### illuminanceMeasurement.read

```javascript
illuminanceMeasurementCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * measuredValue \<int16u> \(server)
      * minMeasuredValue \<int16u> \(server)
      * maxMeasuredValue \<int16u> \(server)
      * tolerance \<int16u> \(server)
      * lightSensorType \<enum8> \(server)
  * responseCode



---

<a name="api-clusters-LevelControl"></a>

### zclip.clusters.LevelControl

```javascript
var levelControlCluster = zcl.clusters.LevelControl({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### levelControl.bind

```javascript
levelControlCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### levelControl.read

```javascript
levelControlCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * currentLevel \<int8u> \(server)
      * remainingTime \<int16u> \(server)
      * options \<bitmap8> \(server)
      * onOffTransitionTime \<int16u> \(server)
      * onLevel \<int8u> \(server)
      * onTransitionTime \<int16u> \(server)
      * offTransitionTime \<int16u> \(server)
      * defaultMoveRate \<int8u> \(server)
      * startUpCurrentLevel \<int8u> \(server)
  * responseCode


#### levelControl.moveToLevel

```javascript
levelControl.moveToLevel(args, callback);
```
* args 
  * level \<int8u>
  * transitionTime \<int16u>
* callback
  * err
  * response
  * responseCode


#### levelControl.move

```javascript
levelControl.move(args, callback);
```
* args 
  * moveMode \<movemode>
  * rate \<int8u>
* callback
  * err
  * response
  * responseCode


#### levelControl.step

```javascript
levelControl.step(args, callback);
```
* args 
  * stepMode \<stepmode>
  * stepSize \<int8u>
  * transitionTime \<int16u>
* callback
  * err
  * response
  * responseCode


#### levelControl.stop

```javascript
levelControl.stop(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode


#### levelControl.moveToLevelWithOnOff

```javascript
levelControl.moveToLevelWithOnOff(args, callback);
```
* args 
  * level \<int8u>
  * transitionTime \<int16u>
* callback
  * err
  * response
  * responseCode


#### levelControl.moveWithOnOff

```javascript
levelControl.moveWithOnOff(args, callback);
```
* args 
  * moveMode \<movemode>
  * rate \<int8u>
* callback
  * err
  * response
  * responseCode


#### levelControl.stepWithOnOff

```javascript
levelControl.stepWithOnOff(args, callback);
```
* args 
  * stepMode \<stepmode>
  * stepSize \<int8u>
  * transitionTime \<int16u>
* callback
  * err
  * response
  * responseCode


#### levelControl.stopWithOnOff

```javascript
levelControl.stopWithOnOff(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode



---

<a name="api-clusters-MeterIdentification"></a>

### zclip.clusters.MeterIdentification

```javascript
var meterIdentificationCluster = zcl.clusters.MeterIdentification({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### meterIdentification.bind

```javascript
meterIdentificationCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### meterIdentification.read

```javascript
meterIdentificationCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * companyName \<char_string> \(server)
      * meterTypeId \<int16u> \(server)
      * dataQualityId \<int16u> \(server)
      * customerName \<char_string> \(server)
      * model \<octet_string> \(server)
      * partNumber \<octet_string> \(server)
      * productRevision \<octet_string> \(server)
      * softwareRevision \<octet_string> \(server)
      * utilityName \<char_string> \(server)
      * pod \<char_string> \(server)
      * availablePower \<int24s> \(server)
      * powerThreshold \<int24s> \(server)
  * responseCode



---

<a name="api-clusters-OccupancySensing"></a>

### zclip.clusters.OccupancySensing

```javascript
var occupancySensingCluster = zcl.clusters.OccupancySensing({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### occupancySensing.bind

```javascript
occupancySensingCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### occupancySensing.read

```javascript
occupancySensingCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * occupancy \<bitmap8> \(server)
      * occupancySensorType \<enum8> \(server)
      * pirOccupiedToUnoccupiedDelay \<int16u> \(server)
      * pirUnoccupiedToOccupiedDelay \<int16u> \(server)
      * pirUnoccupiedToOccupiedThreshold \<int8u> \(server)
      * ultrasonicOccupiedToUnoccupiedDelay \<int16u> \(server)
      * ultrasonicUnoccupiedToOccupiedDelay \<int16u> \(server)
      * ultrasonicUnoccupiedToOccupiedThreshold \<int8u> \(server)
  * responseCode



---

<a name="api-clusters-OnOff"></a>

### zclip.clusters.OnOff

```javascript
var onOffCluster = zcl.clusters.OnOff({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### onOff.bind

```javascript
onOffCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### onOff.read

```javascript
onOffCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * onOff \<boolean> \(server)
      * startUpOnOff \<enum8> \(server)
  * responseCode


#### onOff.off

```javascript
onOff.off(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode


#### onOff.on

```javascript
onOff.on(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode


#### onOff.toggle

```javascript
onOff.toggle(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode



---

<a name="api-clusters-OnOffSwitchConfiguration"></a>

### zclip.clusters.OnOffSwitchConfiguration

```javascript
var onOffSwitchConfigurationCluster = zcl.clusters.OnOffSwitchConfiguration({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### onOffSwitchConfiguration.bind

```javascript
onOffSwitchConfigurationCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### onOffSwitchConfiguration.read

```javascript
onOffSwitchConfigurationCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * switchType \<enum8> \(server)
      * switchActions \<enum8> \(server)
  * responseCode



---

<a name="api-clusters-OverTheAirBootloading"></a>

### zclip.clusters.OverTheAirBootloading

```javascript
var overTheAirBootloadingCluster = zcl.clusters.OverTheAirBootloading({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### overTheAirBootloading.bind

```javascript
overTheAirBootloadingCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### overTheAirBootloading.read

```javascript
overTheAirBootloadingCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * otaUpgradeServerId \<ieee_address> \(client)
      * offsetAddressIntoTheFile \<int32u> \(client)
      * otaCurrentFileVersion \<int32u> \(client)
      * otaCurrentZigBeeStackVersion \<int16u> \(client)
      * otaDownloadedFileVersion \<int32u> \(client)
      * otaDownloadedZigBeeStackVersion \<int16u> \(client)
      * otaUpgradeStatus \<enum8> \(client)
      * manufacturerId \<int16u> \(client)
      * imageTypeId \<int16u> \(client)
      * minimumBlockRequestPeriod \<int16u> \(client)
      * imageStamp \<int32u> \(client)
      * upgradeActivationPolicy \<enum8> \(client)
      * upgradeTimeoutPolicy \<enum8> \(client)
  * responseCode


#### overTheAirBootloading.imageNotify

```javascript
overTheAirBootloading.imageNotify(args, callback);
```
* args 
  * payloadType \<enum8>
  * queryJitter \<int8u>
  * manufacturerId \<int16u>
  * imageType \<int16u>
  * newFileVersion \<int32u>
* callback
  * err
  * response
  * responseCode


#### overTheAirBootloading.queryNextImageRequest

```javascript
overTheAirBootloading.queryNextImageRequest(args, callback);
```
* args 
  * fieldControl \<int8u>
  * manufacturerId \<int16u>
  * imageType \<int16u>
  * currentFileVersion \<int32u>
  * hardwareVersion \<int16u>
* callback
  * err
  * response
  * responseCode


#### overTheAirBootloading.queryNextImageResponse

```javascript
overTheAirBootloading.queryNextImageResponse(args, callback);
```
* args 
  * status \<status>
  * manufacturerId \<int16u>
  * imageType \<int16u>
  * fileVersion \<int32u>
  * imageSize \<int32u>
* callback
  * err
  * response
  * responseCode


#### overTheAirBootloading.imageBlockRequest

```javascript
overTheAirBootloading.imageBlockRequest(args, callback);
```
* args 
  * fieldControl \<int8u>
  * manufacturerId \<int16u>
  * imageType \<int16u>
  * fileVersion \<int32u>
  * fileOffset \<int32u>
  * maxDataSize \<int8u>
  * requestNodeAddress \<ieee_address>
* callback
  * err
  * response
  * responseCode


#### overTheAirBootloading.imagePageRequest

```javascript
overTheAirBootloading.imagePageRequest(args, callback);
```
* args 
  * fieldControl \<int8u>
  * manufacturerId \<int16u>
  * imageType \<int16u>
  * fileVersion \<int32u>
  * fileOffset \<int32u>
  * maxDataSize \<int8u>
  * pageSize \<int16u>
  * responseSpacing \<int16u>
  * requestNodeAddress \<ieee_address>
* callback
  * err
  * response
  * responseCode


#### overTheAirBootloading.imageBlockResponse

```javascript
overTheAirBootloading.imageBlockResponse(args, callback);
```
* args 
  * status \<status>
  * manufacturerId \<int16u>
  * imageType \<int16u>
  * fileVersion \<int32u>
  * fileOffset \<int32u>
  * dataSize \<int8u>
  * imageData \<int8u>
* callback
  * err
  * response
  * responseCode


#### overTheAirBootloading.upgradeEndRequest

```javascript
overTheAirBootloading.upgradeEndRequest(args, callback);
```
* args 
  * status \<status>
  * manufacturerId \<int16u>
  * imageType \<int16u>
  * fileVersion \<int32u>
* callback
  * err
  * response
  * responseCode


#### overTheAirBootloading.upgradeEndResponse

```javascript
overTheAirBootloading.upgradeEndResponse(args, callback);
```
* args 
  * manufacturerId \<int16u>
  * imageType \<int16u>
  * fileVersion \<int32u>
  * currentTime \<utc_time>
  * upgradeTime \<utc_time>
* callback
  * err
  * response
  * responseCode


#### overTheAirBootloading.querySpecificFileRequest

```javascript
overTheAirBootloading.querySpecificFileRequest(args, callback);
```
* args 
  * requestNodeAddress \<ieee_address>
  * manufacturerId \<int16u>
  * imageType \<int16u>
  * fileVersion \<int32u>
  * currentZigbeeStackVersion \<int16u>
* callback
  * err
  * response
  * responseCode


#### overTheAirBootloading.querySpecificFileResponse

```javascript
overTheAirBootloading.querySpecificFileResponse(args, callback);
```
* args 
  * status \<status>
  * manufacturerId \<int16u>
  * imageType \<int16u>
  * fileVersion \<int32u>
  * imageSize \<int32u>
* callback
  * err
  * response
  * responseCode



---

<a name="api-clusters-PollControl"></a>

### zclip.clusters.PollControl

```javascript
var pollControlCluster = zcl.clusters.PollControl({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### pollControl.bind

```javascript
pollControlCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### pollControl.read

```javascript
pollControlCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * checkInInterval \<int32u> \(server)
      * longPollInterval \<int32u> \(server)
      * shortPollInterval \<int16u> \(server)
      * fastPollTimeout \<int16u> \(server)
      * checkInIntervalMin \<int32u> \(server)
      * longPollIntervalMin \<int32u> \(server)
      * fastPollTimeoutMax \<int16u> \(server)
  * responseCode


#### pollControl.checkInResponse

```javascript
pollControl.checkInResponse(args, callback);
```
* args 
  * startFastPolling \<boolean>
  * fastPollTimeout \<int16u>
* callback
  * err
  * response
  * responseCode


#### pollControl.fastPollStop

```javascript
pollControl.fastPollStop(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode


#### pollControl.setLongPollInterval

```javascript
pollControl.setLongPollInterval(args, callback);
```
* args 
  * newLongPollInterval \<int32u>
* callback
  * err
  * response
  * responseCode


#### pollControl.setShortPollInterval

```javascript
pollControl.setShortPollInterval(args, callback);
```
* args 
  * newShortPollInterval \<int16u>
* callback
  * err
  * response
  * responseCode



---

<a name="api-clusters-PowerConfiguration"></a>

### zclip.clusters.PowerConfiguration

```javascript
var powerConfigurationCluster = zcl.clusters.PowerConfiguration({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### powerConfiguration.bind

```javascript
powerConfigurationCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### powerConfiguration.read

```javascript
powerConfigurationCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * mainsVoltage \<int16u> \(server)
      * mainsFrequency \<int8u> \(server)
      * mainsAlarmMask \<bitmap8> \(server)
      * mainsVoltageMinThreshold \<int16u> \(server)
      * mainsVoltageMaxThreshold \<int16u> \(server)
      * mainsVoltageDwellTrip \<int16u> \(server)
      * batteryVoltage \<int8u> \(server)
      * batteryPercentageRemaining \<int8u> \(server)
      * batteryManufacturer \<char_string> \(server)
      * batterySize \<enum8> \(server)
      * batteryAhrRating \<int16u> \(server)
      * batteryQuantity \<int8u> \(server)
      * batteryRatedVoltage \<int8u> \(server)
      * batteryAlarmMask \<bitmap8> \(server)
      * batteryVoltageMinThreshold \<int8u> \(server)
      * batteryVoltageThreshold1 \<int8u> \(server)
      * batteryVoltageThreshold2 \<int8u> \(server)
      * batteryVoltageThreshold3 \<int8u> \(server)
      * batteryPercentageMinThreshold \<int8u> \(server)
      * batteryPercentageThreshold1 \<int8u> \(server)
      * batteryPercentageThreshold2 \<int8u> \(server)
      * batteryPercentageThreshold3 \<int8u> \(server)
      * batteryAlarmState \<bitmap32> \(server)
      * battery2Voltage \<int8u> \(server)
      * battery2PercentageRemaining \<int8u> \(server)
      * battery2Manufacturer \<char_string> \(server)
      * battery2Size \<enum8> \(server)
      * battery2AhrRating \<int16u> \(server)
      * battery2Quantity \<int8u> \(server)
      * battery2RatedVoltage \<int8u> \(server)
      * battery2AlarmMask \<bitmap8> \(server)
      * battery2VoltageMinThreshold \<int8u> \(server)
      * battery2VoltageThreshold1 \<int8u> \(server)
      * battery2VoltageThreshold2 \<int8u> \(server)
      * battery2VoltageThreshold3 \<int8u> \(server)
      * battery2PercentageMinThreshold \<int8u> \(server)
      * battery2PercentageThreshold1 \<int8u> \(server)
      * battery2PercentageThreshold2 \<int8u> \(server)
      * battery2PercentageThreshold3 \<int8u> \(server)
      * battery2AlarmState \<bitmap32> \(server)
      * battery3Voltage \<int8u> \(server)
      * battery3PercentageRemaining \<int8u> \(server)
      * battery3Manufacturer \<char_string> \(server)
      * battery3Size \<enum8> \(server)
      * battery3AhrRating \<int16u> \(server)
      * battery3Quantity \<int8u> \(server)
      * battery3RatedVoltage \<int8u> \(server)
      * battery3AlarmMask \<bitmap8> \(server)
      * battery3VoltageMinThreshold \<int8u> \(server)
      * battery3VoltageThreshold1 \<int8u> \(server)
      * battery3VoltageThreshold2 \<int8u> \(server)
      * battery3VoltageThreshold3 \<int8u> \(server)
      * battery3PercentageMinThreshold \<int8u> \(server)
      * battery3PercentageThreshold1 \<int8u> \(server)
      * battery3PercentageThreshold2 \<int8u> \(server)
      * battery3PercentageThreshold3 \<int8u> \(server)
      * battery3AlarmState \<bitmap32> \(server)
  * responseCode



---

<a name="api-clusters-PowerProfile"></a>

### zclip.clusters.PowerProfile

```javascript
var powerProfileCluster = zcl.clusters.PowerProfile({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### powerProfile.bind

```javascript
powerProfileCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### powerProfile.read

```javascript
powerProfileCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * totalProfileNum \<int8u> \(server)
      * multipleScheduling \<boolean> \(server)
      * energyFormatting \<bitmap8> \(server)
      * energyRemote \<boolean> \(server)
      * scheduleMode \<bitmap8> \(server)
  * responseCode


#### powerProfile.getPowerProfilePriceExtended

```javascript
powerProfile.getPowerProfilePriceExtended(args, callback);
```
* args 
  * options \<bitmap8>
  * powerProfileId \<int8u>
  * powerProfileStartTime \<int16u>
* callback
  * err
  * response
  * responseCode


#### powerProfile.powerProfileResponse

```javascript
powerProfile.powerProfileResponse(args, callback);
```
* args 
  * totalProfileNum \<int8u>
  * powerProfileId \<int8u>
  * numOfTransferredPhases \<int8u>
  * transferredPhases \<transferredphase>
* callback
  * err
  * response
  * responseCode


#### powerProfile.powerProfileStateResponse

```javascript
powerProfile.powerProfileStateResponse(args, callback);
```
* args 
  * powerProfileCount \<int8u>
  * powerProfileRecords \<powerprofilerecord>
* callback
  * err
  * response
  * responseCode


#### powerProfile.getPowerProfilePrice

```javascript
powerProfile.getPowerProfilePrice(args, callback);
```
* args 
  * powerProfileId \<int8u>
* callback
  * err
  * response
  * responseCode


#### powerProfile.powerProfilesStateNotification

```javascript
powerProfile.powerProfilesStateNotification(args, callback);
```
* args 
  * powerProfileCount \<int8u>
  * powerProfileRecords \<powerprofilerecord>
* callback
  * err
  * response
  * responseCode


#### powerProfile.getOverallSchedulePrice

```javascript
powerProfile.getOverallSchedulePrice(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode


#### powerProfile.energyPhasesScheduleRequest

```javascript
powerProfile.energyPhasesScheduleRequest(args, callback);
```
* args 
  * powerProfileId \<int8u>
* callback
  * err
  * response
  * responseCode


#### powerProfile.energyPhasesScheduleStateResponse

```javascript
powerProfile.energyPhasesScheduleStateResponse(args, callback);
```
* args 
  * powerProfileId \<int8u>
  * numOfScheduledPhases \<int8u>
  * scheduledPhases \<scheduledphase>
* callback
  * err
  * response
  * responseCode


#### powerProfile.energyPhasesScheduleStateNotification

```javascript
powerProfile.energyPhasesScheduleStateNotification(args, callback);
```
* args 
  * powerProfileId \<int8u>
  * numOfScheduledPhases \<int8u>
  * scheduledPhases \<scheduledphase>
* callback
  * err
  * response
  * responseCode


#### powerProfile.powerProfileScheduleConstraintsNotification

```javascript
powerProfile.powerProfileScheduleConstraintsNotification(args, callback);
```
* args 
  * powerProfileId \<int8u>
  * startAfter \<int16u>
  * stopBefore \<int16u>
* callback
  * err
  * response
  * responseCode



---

<a name="api-clusters-PressureMeasurement"></a>

### zclip.clusters.PressureMeasurement

```javascript
var pressureMeasurementCluster = zcl.clusters.PressureMeasurement({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### pressureMeasurement.bind

```javascript
pressureMeasurementCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### pressureMeasurement.read

```javascript
pressureMeasurementCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * measuredValue \<int16s> \(server)
      * minMeasuredValue \<int16s> \(server)
      * maxMeasuredValue \<int16s> \(server)
      * tolerance \<int16u> \(server)
      * scaledValue \<int16s> \(server)
      * minScaledValue \<int16s> \(server)
      * maxScaledValue \<int16s> \(server)
      * scaledTolerance \<int16s> \(server)
      * scale \<int8s> \(server)
  * responseCode



---

<a name="api-clusters-PumpConfigurationAndControl"></a>

### zclip.clusters.PumpConfigurationAndControl

```javascript
var pumpConfigurationAndControlCluster = zcl.clusters.PumpConfigurationAndControl({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### pumpConfigurationAndControl.bind

```javascript
pumpConfigurationAndControlCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### pumpConfigurationAndControl.read

```javascript
pumpConfigurationAndControlCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * maxPressure \<int16s> \(server)
      * maxSpeed \<int16u> \(server)
      * maxFlow \<int16u> \(server)
      * minConstPressure \<int16s> \(server)
      * maxConstPressure \<int16s> \(server)
      * minCompPressure \<int16s> \(server)
      * maxCompPressure \<int16s> \(server)
      * minConstSpeed \<int16u> \(server)
      * maxConstSpeed \<int16u> \(server)
      * minConstFlow \<int16u> \(server)
      * maxConstFlow \<int16u> \(server)
      * minConstTemp \<int16s> \(server)
      * maxConstTemp \<int16s> \(server)
      * pumpStatus \<bitmap16> \(server)
      * effectiveOperationMode \<enum8> \(server)
      * effectiveControlMode \<enum8> \(server)
      * capacity \<int16s> \(server)
      * speed \<int16u> \(server)
      * lifetimeRunningHours \<int24u> \(server)
      * power \<int24u> \(server)
      * lifetimeEnergyConsumed \<int32u> \(server)
      * operationMode \<enum8> \(server)
      * controlMode \<enum8> \(server)
      * alarmMask \<bitmap16> \(server)
  * responseCode



---

<a name="api-clusters-RelativeHumidityMeasurement"></a>

### zclip.clusters.RelativeHumidityMeasurement

```javascript
var relativeHumidityMeasurementCluster = zcl.clusters.RelativeHumidityMeasurement({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### relativeHumidityMeasurement.bind

```javascript
relativeHumidityMeasurementCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### relativeHumidityMeasurement.read

```javascript
relativeHumidityMeasurementCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * measuredValue \<int16u> \(server)
      * minMeasuredValue \<int16u> \(server)
      * maxMeasuredValue \<int16u> \(server)
      * tolerance \<int16u> \(server)
  * responseCode



---

<a name="api-clusters-RssiLocation"></a>

### zclip.clusters.RssiLocation

```javascript
var rssiLocationCluster = zcl.clusters.RssiLocation({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### rssiLocation.bind

```javascript
rssiLocationCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### rssiLocation.read

```javascript
rssiLocationCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * locationType \<data8> \(server)
      * locationMethod \<enum8> \(server)
      * locationAge \<int16u> \(server)
      * qualityMeasure \<int8u> \(server)
      * numberOfDevices \<int8u> \(server)
      * coordinate1 \<int16s> \(server)
      * coordinate2 \<int16s> \(server)
      * coordinate3 \<int16s> \(server)
      * power \<int16s> \(server)
      * pathLossExponent \<int16u> \(server)
      * reportingPeriod \<int16u> \(server)
      * calculationPeriod \<int16u> \(server)
      * numberRssiMeasurements \<int8u> \(server)
  * responseCode


#### rssiLocation.deviceConfigurationResponse

```javascript
rssiLocation.deviceConfigurationResponse(args, callback);
```
* args 
  * status \<status>
  * power \<int16s>
  * pathLossExponent \<int16u>
  * calculationPeriod \<int16u>
  * numberRssiMeasurements \<int8u>
  * reportingPeriod \<int16u>
* callback
  * err
  * response
  * responseCode


#### rssiLocation.locationDataResponse

```javascript
rssiLocation.locationDataResponse(args, callback);
```
* args 
  * status \<status>
  * locationType \<locationtype>
  * coordinate1 \<int16s>
  * coordinate2 \<int16s>
  * coordinate3 \<int16s>
  * power \<int16s>
  * pathLossExponent \<int16u>
  * locationMethod \<locationmethod>
  * qualityMeasure \<int8u>
  * locationAge \<int16u>
* callback
  * err
  * response
  * responseCode


#### rssiLocation.locationDataNotification

```javascript
rssiLocation.locationDataNotification(args, callback);
```
* args 
  * locationType \<locationtype>
  * coordinate1 \<int16s>
  * coordinate2 \<int16s>
  * coordinate3 \<int16s>
  * power \<int16s>
  * pathLossExponent \<int16u>
  * locationMethod \<locationmethod>
  * qualityMeasure \<int8u>
  * locationAge \<int16u>
* callback
  * err
  * response
  * responseCode


#### rssiLocation.compactLocationDataNotification

```javascript
rssiLocation.compactLocationDataNotification(args, callback);
```
* args 
  * locationType \<locationtype>
  * coordinate1 \<int16s>
  * coordinate2 \<int16s>
  * coordinate3 \<int16s>
  * qualityMeasure \<int8u>
  * locationAge \<int16u>
* callback
  * err
  * response
  * responseCode


#### rssiLocation.rssiPing

```javascript
rssiLocation.rssiPing(args, callback);
```
* args 
  * locationType \<locationtype>
* callback
  * err
  * response
  * responseCode


#### rssiLocation.rssiRequest

```javascript
rssiLocation.rssiRequest(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode


#### rssiLocation.reportRssiMeasurements

```javascript
rssiLocation.reportRssiMeasurements(args, callback);
```
* args 
  * measuringDevice \<ieee_address>
  * neighbors \<int8u>
  * neighborsInfo \<neighborinfo>
* callback
  * err
  * response
  * responseCode


#### rssiLocation.requestOwnLocation

```javascript
rssiLocation.requestOwnLocation(args, callback);
```
* args 
  * blindNode \<ieee_address>
* callback
  * err
  * response
  * responseCode



---

<a name="api-clusters-Scenes"></a>

### zclip.clusters.Scenes

```javascript
var scenesCluster = zcl.clusters.Scenes({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### scenes.bind

```javascript
scenesCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### scenes.read

```javascript
scenesCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * sceneCount \<int8u> \(server)
      * currentScene \<int8u> \(server)
      * currentGroup \<int16u> \(server)
      * sceneValid \<boolean> \(server)
      * nameSupport \<bitmap8> \(server)
      * lastConfiguredBy \<ieee_address> \(server)
  * responseCode


#### scenes.addSceneResponse

```javascript
scenes.addSceneResponse(args, callback);
```
* args 
  * status \<status>
  * groupId \<int16u>
  * sceneId \<int8u>
* callback
  * err
  * response
  * responseCode


#### scenes.viewSceneResponse

```javascript
scenes.viewSceneResponse(args, callback);
```
* args 
  * status \<status>
  * groupId \<int16u>
  * sceneId \<int8u>
  * transitionTime \<int16u>
  * sceneName \<char_string>
  * extensionFieldSets \<sceneextensionfieldset>
* callback
  * err
  * response
  * responseCode


#### scenes.removeSceneResponse

```javascript
scenes.removeSceneResponse(args, callback);
```
* args 
  * status \<status>
  * groupId \<int16u>
  * sceneId \<int8u>
* callback
  * err
  * response
  * responseCode


#### scenes.removeAllScenesResponse

```javascript
scenes.removeAllScenesResponse(args, callback);
```
* args 
  * status \<status>
  * groupId \<int16u>
* callback
  * err
  * response
  * responseCode


#### scenes.storeSceneResponse

```javascript
scenes.storeSceneResponse(args, callback);
```
* args 
  * status \<status>
  * groupId \<int16u>
  * sceneId \<int8u>
* callback
  * err
  * response
  * responseCode


#### scenes.recallScene

```javascript
scenes.recallScene(args, callback);
```
* args 
  * groupId \<int16u>
  * sceneId \<int8u>
* callback
  * err
  * response
  * responseCode


#### scenes.getSceneMembershipResponse

```javascript
scenes.getSceneMembershipResponse(args, callback);
```
* args 
  * status \<status>
  * capacity \<int8u>
  * groupId \<int16u>
  * sceneCount \<int8u>
  * sceneList \<int8u>
* callback
  * err
  * response
  * responseCode



---

<a name="api-clusters-ShadeConfiguration"></a>

### zclip.clusters.ShadeConfiguration

```javascript
var shadeConfigurationCluster = zcl.clusters.ShadeConfiguration({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### shadeConfiguration.bind

```javascript
shadeConfigurationCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### shadeConfiguration.read

```javascript
shadeConfigurationCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * physicalClosedLimit \<int16u> \(server)
      * motorStepSize \<int8u> \(server)
      * status \<bitmap8> \(server)
      * closedLimit \<int16u> \(server)
      * mode \<enum8> \(server)
  * responseCode



---

<a name="api-clusters-TemperatureMeasurement"></a>

### zclip.clusters.TemperatureMeasurement

```javascript
var temperatureMeasurementCluster = zcl.clusters.TemperatureMeasurement({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### temperatureMeasurement.bind

```javascript
temperatureMeasurementCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### temperatureMeasurement.read

```javascript
temperatureMeasurementCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * measuredValue \<int16s> \(server)
      * minMeasuredValue \<int16s> \(server)
      * maxMeasuredValue \<int16s> \(server)
      * tolerance \<int16u> \(server)
  * responseCode



---

<a name="api-clusters-Thermostat"></a>

### zclip.clusters.Thermostat

```javascript
var thermostatCluster = zcl.clusters.Thermostat({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### thermostat.bind

```javascript
thermostatCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### thermostat.read

```javascript
thermostatCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * localTemperature \<int16s> \(server)
      * outdoorTemperature \<int16s> \(server)
      * occupancy \<bitmap8> \(server)
      * absMinHeatSetpointLimit \<int16s> \(server)
      * absMaxHeatSetpointLimit \<int16s> \(server)
      * absMinCoolSetpointLimit \<int16s> \(server)
      * absMaxCoolSetpointLimit \<int16s> \(server)
      * piCoolingDemand \<int8u> \(server)
      * piHeatingDemand \<int8u> \(server)
      * hvacSystemTypeConfiguration \<bitmap8> \(server)
      * localTemperatureCalibration \<int8s> \(server)
      * occupiedCoolingSetpoint \<int16s> \(server)
      * occupiedHeatingSetpoint \<int16s> \(server)
      * unoccupiedCoolingSetpoint \<int16s> \(server)
      * unoccupiedHeatingSetpoint \<int16s> \(server)
      * minHeatSetpointLimit \<int16s> \(server)
      * maxHeatSetpointLimit \<int16s> \(server)
      * minCoolSetpointLimit \<int16s> \(server)
      * maxCoolSetpointLimit \<int16s> \(server)
      * minSetpointDeadBand \<int8s> \(server)
      * remoteSensing \<bitmap8> \(server)
      * controlSequenceOfOperation \<enum8> \(server)
      * systemMode \<enum8> \(server)
      * alarmMask \<bitmap8> \(server)
      * thermostatRunningMode \<enum8> \(server)
      * startOfWeek \<enum8> \(server)
      * numberOfWeeklyTransitions \<int8u> \(server)
      * numberOfDailyTransitions \<int8u> \(server)
      * temperatureSetpointHold \<enum8> \(server)
      * temperatureSetpointHoldDuration \<int16u> \(server)
      * thermostatProgrammingOperationMode \<bitmap8> \(server)
      * hvacRelayState \<bitmap16> \(server)
      * setpointChangeSource \<enum8> \(server)
      * setpointChangeAmount \<int16s> \(server)
      * setpointChangeSourceTimestamp \<utc_time> \(server)
      * acType \<enum8> \(server)
      * acCapacity \<int16u> \(server)
      * acRefrigerantType \<enum8> \(server)
      * acCompressor \<enum8> \(server)
      * acErrorCode \<bitmap32> \(server)
      * acLouverPosition \<enum8> \(server)
      * acCoilTemperature \<int16s> \(server)
      * acCapacityFormat \<enum8> \(server)
  * responseCode


#### thermostat.currentWeeklySchedule

```javascript
thermostat.currentWeeklySchedule(args, callback);
```
* args 
  * numberOfTransitionsForSequence \<enum8>
  * dayOfWeekForSequence \<dayofweek>
  * modeForSequence \<modeforsequence>
  * payload \<int8u>
* callback
  * err
  * response
  * responseCode


#### thermostat.relayStatusLog

```javascript
thermostat.relayStatusLog(args, callback);
```
* args 
  * timeOfDay \<int16u>
  * relayStatus \<bitmap16>
  * localTemperature \<int16s>
  * humidityInPercentage \<int8u>
  * setpoint \<int16s>
  * unreadEntries \<int16u>
* callback
  * err
  * response
  * responseCode


#### thermostat.getWeeklySchedule

```javascript
thermostat.getWeeklySchedule(args, callback);
```
* args 
  * daysToReturn \<dayofweek>
  * modeToReturn \<modeforsequence>
* callback
  * err
  * response
  * responseCode


#### thermostat.clearWeeklySchedule

```javascript
thermostat.clearWeeklySchedule(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode


#### thermostat.getRelayStatusLog

```javascript
thermostat.getRelayStatusLog(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode



---

<a name="api-clusters-ThermostatUserInterfaceConfiguration"></a>

### zclip.clusters.ThermostatUserInterfaceConfiguration

```javascript
var thermostatUserInterfaceConfigurationCluster = zcl.clusters.ThermostatUserInterfaceConfiguration({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### thermostatUserInterfaceConfiguration.bind

```javascript
thermostatUserInterfaceConfigurationCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### thermostatUserInterfaceConfiguration.read

```javascript
thermostatUserInterfaceConfigurationCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * temperatureDisplayMode \<enum8> \(server)
      * keypadLockout \<enum8> \(server)
      * scheduleProgrammingVisibility \<enum8> \(server)
  * responseCode



---

<a name="api-clusters-Time"></a>

### zclip.clusters.Time

```javascript
var timeCluster = zcl.clusters.Time({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### time.bind

```javascript
timeCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### time.read

```javascript
timeCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * time \<utc_time> \(server)
      * timeStatus \<bitmap8> \(server)
      * timeZone \<int32s> \(server)
      * dstStart \<int32u> \(server)
      * dstEnd \<int32u> \(server)
      * dstShift \<int32s> \(server)
      * standardTime \<int32u> \(server)
      * localTime \<int32u> \(server)
      * lastSetTime \<utc_time> \(server)
      * validUntilTime \<utc_time> \(server)
  * responseCode



---

<a name="api-clusters-WindowCovering"></a>

### zclip.clusters.WindowCovering

```javascript
var windowCoveringCluster = zcl.clusters.WindowCovering({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```
#### windowCovering.bind

```javascript
windowCoveringCluster.bind(args, callback);
```
* args
  * uid
  * ip
  * port
  * endpoint
* callback
  * err
  * response
  * responseCode

#### windowCovering.read

```javascript
windowCoveringCluster.read(args, callback);
```
* args - None
* callback
  * err
  * response
      * windowCoveringType \<enum8> \(server)
      * physicalClosedLimitLift \<int16u> \(server)
      * physicalClosedLimitTilt \<int16u> \(server)
      * currentPositionLift \<int16u> \(server)
      * currentPositionTilt \<int16u> \(server)
      * numberOfActuationsLift \<int16u> \(server)
      * numberOfActuationsTilt \<int16u> \(server)
      * configStatus \<bitmap8> \(server)
      * currentPositionLiftPercentage \<int8u> \(server)
      * currentPositionTiltPercentage \<int8u> \(server)
      * installedOpenLimitLift \<int16u> \(server)
      * installedClosedLimitLift \<int16u> \(server)
      * installedOpenLimitTilt \<int16u> \(server)
      * installedClosedLimitTilt \<int16u> \(server)
      * velocityLift \<int16u> \(server)
      * accelerationTimeLift \<int16u> \(server)
      * decelerationTimeLift \<int16u> \(server)
      * mode \<bitmap8> \(server)
      * intermediateSetpointsLift \<octet_string> \(server)
      * intermediateSetpointsTilt \<octet_string> \(server)
  * responseCode


#### windowCovering.windowCoveringUpOpen

```javascript
windowCovering.windowCoveringUpOpen(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode


#### windowCovering.windowCoveringDownClose

```javascript
windowCovering.windowCoveringDownClose(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode


#### windowCovering.windowCoveringStop

```javascript
windowCovering.windowCoveringStop(args, callback);
```
* args  - None 
* callback
  * err
  * response
  * responseCode


#### windowCovering.windowCoveringGoToLiftValue

```javascript
windowCovering.windowCoveringGoToLiftValue(args, callback);
```
* args 
  * liftValue \<int16u>
* callback
  * err
  * response
  * responseCode


#### windowCovering.windowCoveringGoToLiftPercentage

```javascript
windowCovering.windowCoveringGoToLiftPercentage(args, callback);
```
* args 
  * percentageLiftValue \<int8u>
* callback
  * err
  * response
  * responseCode


#### windowCovering.windowCoveringGoToTiltValue

```javascript
windowCovering.windowCoveringGoToTiltValue(args, callback);
```
* args 
  * tiltValue \<int16u>
* callback
  * err
  * response
  * responseCode


#### windowCovering.windowCoveringGoToTiltPercentage

```javascript
windowCovering.windowCoveringGoToTiltPercentage(args, callback);
```
* args 
  * percentageTiltValue \<int8u>
* callback
  * err
  * response
  * responseCode



<a name="api-discover"></a>

### zclip.discover

```javascript
zclip.discover(args, callback);
```

* args
  * uid
  * clusterId
  * clusterSide
* callback
  * err
  * response - Array
     * uid
     * ip
     * name
     * cluster
     * clusterSide
  * responseCode

<a name="api-rd"></a>

### zclip.RD

```javascript
var rd = zcl.RD({
  ip: rdIp,
  port: rdPort
});
```

#### rd.lookup

```javascript
rd.lookup(args, callback);
```
* args
  * uid
  * clusterId
  * clusterSide
* callback
  * err
  * response - Array
     * uid
     * ip
     * name
     * cluster
     * clusterSide
  * responseCode

<a name="clusters"></a>
## Supported clusters

- Alarms
- ApplianceControl
- ApplianceEventsAndAlert
- ApplianceIdentification
- ApplianceStatistics
- BallastConfiguration
- Basic
- BinaryInputBasic
- ColorControl
- Commissioning
- DehumidificationControl
- DeviceTemperatureConfiguration
- Diagnostics
- DoorLock
- ElectricalMeasurement
- FanControl
- FlowMeasurement
- Groups
- IasAce
- IasWd
- IasZone
- Identify
- IlluminanceLevelSensing
- IlluminanceMeasurement
- LevelControl
- MeterIdentification
- OccupancySensing
- OnOff
- OnOffSwitchConfiguration
- OverTheAirBootloading
- PollControl
- PowerConfiguration
- PowerProfile
- PressureMeasurement
- PumpConfigurationAndControl
- RelativeHumidityMeasurement
- RssiLocation
- Scenes
- ShadeConfiguration
- TemperatureMeasurement
- Thermostat
- ThermostatUserInterfaceConfiguration
- Time
- WindowCovering

<a name="tests"></a>
## Run the tests

```sh
npm test
```

<a name="support"></a>
## Support

[community.silabs.com](https://www.silabs.com/community) or [silabs.com/support](https://www.silabs.com/support)

