const {By, Builder} = require('selenium-webdriver');
const assert = require("assert");
const mongoose = require("mongoose") ;
require("dotenv").config()

const Schema= mongoose.Schema
const ObjectId= Schema.ObjectId 
const Metric= new Schema ({
  id : ObjectId, 
  BackendPerformance : String, 
  FrontendPerformance : String

});
console.log(process.env.mongopass); 
(async function firstTest() {
    let driver;
    await mongoose.connect(`mongodb+srv://dmesones3399:${process.env.mongopass}@cse4500.hd0nlzu.mongodb.net/?retryWrites=true&w=majority&appName=cse4500`)
    const MetricModel = mongoose.model ("Metric", Metric)
    try {
      driver = await new Builder().forBrowser('chrome').build(); // Component 1 Start the Session
      await driver.get('http://localhost:3000'); // component 2 Take action on browser
      let navigationstart = await driver.executeScript("return window.performance.timing.navigationStart")
      let responsestart = await driver.executeScript("return window.performance.timing.responseStart")
      let domComplete = await driver.executeScript("return window.performance.timing.domComplete")
      const newMetric = new MetricModel ()
      newMetric.BackendPerformance = `${responsestart-navigationstart} ms` 
      newMetric.FrontendPerformance = `${domComplete-responsestart} ms`
      console.log("back end performance: " , newMetric.BackendPerformance)
      console.log("front end performance: " , newMetric.FrontendPerformance)
      
      await newMetric.save()
      let goalstext = await driver.findElement(By.id("goalstext"))
      console.log("Goals: " + await goalstext.getText())

    } catch (e) {
      console.log(e)
    } finally {
      await driver.quit(); // component 8 ending the session 
      mongoose.disconnect()
    }
  })()
  