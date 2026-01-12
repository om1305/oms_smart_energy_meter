// routes/recommendationsRoutes.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { powerConsumption = [], electricalParameters = {}, environmentalData = {} } = req.body;
  const recommendations = [];

  // Power Consumption Logic
  const avgPower = powerConsumption.length
    ? powerConsumption.reduce((a, b) => a + b, 0) / powerConsumption.length
    : 0;
  if (avgPower > 500) {
    recommendations.push({
      title: "High Power Consumption",
      description: "Your average power usage is high. Check for heavy-use appliances, or unplug devices when not in use."
    });
  } else {
    recommendations.push({
      title: "Optimal Power Use",
      description: "Your power use is within a healthy range. Maintain current habits!"
    });
  }

  // Voltage Logic
  if (electricalParameters.voltage && electricalParameters.voltage > 250) {
    recommendations.push({
      title: "Voltage is High",
      description: "Unusually high voltage detected. Turn off sensitive devices or consider a stabilizer."
    });
  } else if (electricalParameters.voltage && electricalParameters.voltage < 190) {
    recommendations.push({
      title: "Low Voltage",
      description: "Voltage is lower than recommended. Heavy appliances may not work efficiently."
    });
  }

  // Current Logic
  if (electricalParameters.current && electricalParameters.current > 20) {
    recommendations.push({
      title: "High Current Detected",
      description: "Current spike detected. Check for faulty appliances or short circuits."
    });
  }

  // Temperature Logic
  if (environmentalData.temperature && environmentalData.temperature > 40) {
    recommendations.push({
      title: "High Ambient Temperature",
      description: "Temperature is high. Minimize use of heat-producing devices during peak hours."
    });
  } else if (environmentalData.temperature && environmentalData.temperature < 10) {
    recommendations.push({
      title: "Low Ambient Temperature",
      description: "Temperature is low. Appliances may consume more power to maintain comfort."
    });
  }

  // General tip
  recommendations.push({
    title: "Save More",
    description: "Unplug idle devices and consider using LED lighting to further reduce energy use."
  });

  res.json({ recommendations });
});

module.exports = router;