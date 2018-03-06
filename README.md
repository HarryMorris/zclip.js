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
* <a href="#api-clusters">zclip.clusters</a>
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



---

<a name="api-clusters-ApplianceStatistics"></a>

### zclip.clusters.ApplianceStatistics

```javascript
var applianceStatisticsCluster = zcl.clusters.ApplianceStatistics({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```


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



---

<a name="api-clusters-Basic"></a>

### zclip.clusters.Basic

```javascript
var basicCluster = zcl.clusters.Basic({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```


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



---

<a name="api-clusters-ColorControl"></a>

### zclip.clusters.ColorControl

```javascript
var colorControlCluster = zcl.clusters.ColorControl({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```


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



---

<a name="api-clusters-DeviceTemperatureConfiguration"></a>

### zclip.clusters.DeviceTemperatureConfiguration

```javascript
var deviceTemperatureConfigurationCluster = zcl.clusters.DeviceTemperatureConfiguration({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```



---

<a name="api-clusters-Diagnostics"></a>

### zclip.clusters.Diagnostics

```javascript
var diagnosticsCluster = zcl.clusters.Diagnostics({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```



---

<a name="api-clusters-DoorLock"></a>

### zclip.clusters.DoorLock

```javascript
var doorLockCluster = zcl.clusters.DoorLock({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```


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



---

<a name="api-clusters-FlowMeasurement"></a>

### zclip.clusters.FlowMeasurement

```javascript
var flowMeasurementCluster = zcl.clusters.FlowMeasurement({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```



---

<a name="api-clusters-Groups"></a>

### zclip.clusters.Groups

```javascript
var groupsCluster = zcl.clusters.Groups({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```


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



---

<a name="api-clusters-IlluminanceMeasurement"></a>

### zclip.clusters.IlluminanceMeasurement

```javascript
var illuminanceMeasurementCluster = zcl.clusters.IlluminanceMeasurement({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```



---

<a name="api-clusters-LevelControl"></a>

### zclip.clusters.LevelControl

```javascript
var levelControlCluster = zcl.clusters.LevelControl({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```


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



---

<a name="api-clusters-OccupancySensing"></a>

### zclip.clusters.OccupancySensing

```javascript
var occupancySensingCluster = zcl.clusters.OccupancySensing({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```



---

<a name="api-clusters-OnOff"></a>

### zclip.clusters.OnOff

```javascript
var onOffCluster = zcl.clusters.OnOff({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```


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



---

<a name="api-clusters-OverTheAirBootloading"></a>

### zclip.clusters.OverTheAirBootloading

```javascript
var overTheAirBootloadingCluster = zcl.clusters.OverTheAirBootloading({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```


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



---

<a name="api-clusters-PowerProfile"></a>

### zclip.clusters.PowerProfile

```javascript
var powerProfileCluster = zcl.clusters.PowerProfile({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```


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



---

<a name="api-clusters-PumpConfigurationAndControl"></a>

### zclip.clusters.PumpConfigurationAndControl

```javascript
var pumpConfigurationAndControlCluster = zcl.clusters.PumpConfigurationAndControl({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```



---

<a name="api-clusters-RelativeHumidityMeasurement"></a>

### zclip.clusters.RelativeHumidityMeasurement

```javascript
var relativeHumidityMeasurementCluster = zcl.clusters.RelativeHumidityMeasurement({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```



---

<a name="api-clusters-RssiLocation"></a>

### zclip.clusters.RssiLocation

```javascript
var rssiLocationCluster = zcl.clusters.RssiLocation({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```


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



---

<a name="api-clusters-TemperatureMeasurement"></a>

### zclip.clusters.TemperatureMeasurement

```javascript
var temperatureMeasurementCluster = zcl.clusters.TemperatureMeasurement({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```



---

<a name="api-clusters-Thermostat"></a>

### zclip.clusters.Thermostat

```javascript
var thermostatCluster = zcl.clusters.Thermostat({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```


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



---

<a name="api-clusters-Time"></a>

### zclip.clusters.Time

```javascript
var timeCluster = zcl.clusters.Time({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```



---

<a name="api-clusters-WindowCovering"></a>

### zclip.clusters.WindowCovering

```javascript
var windowCoveringCluster = zcl.clusters.WindowCovering({
  ip: <deviceIp>,
  endpoint: <clusterEndpoint>
});
```


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

