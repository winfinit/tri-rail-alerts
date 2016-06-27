# tri-rail-alerts

Wrapper to get alerts from tri-rail system


```javascript
var alerts = require("tri-rail-alerts");

alerts.getAlerts(function(data) {
    console.log(data);
    /*
[ { text: 'SB Train P628 is 10\' late to HIM',
    time: '2:32:11 PM' },
  { text: 'NB Train P622 is 10\' late to DEL',
    time: '12:54:25 PM' },
  { text: 'Bike car today on trains P608, P633,and P642. Call 1-800-TRI-RAIL to confirm',
    time: '3:59:33 AM' } ]
    */
});
```
