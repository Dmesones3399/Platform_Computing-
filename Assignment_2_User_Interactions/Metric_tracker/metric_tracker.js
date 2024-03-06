const {By, Builder} = require('selenium-webdriver');
const assert = require("assert");

  
(async function firstTest() {
    let driver;
  
    try {
      driver = await new Builder().forBrowser('chrome').build(); // Component 1 Start the Session
      await driver.get('http://localhost:3000'); // component 2 Take action on browser
      let navigationstart = await driver.executeScript("return window.performance.timing.navigationStart")
      let responsestart = await driver.executeScript("return window.performance.timing.responseStart")
      let domComplete = await driver.executeScript("return window.performance.timing.domComplete")
      console.log("back end performance: " , responsestart-navigationstart, "ms")
      console.log("front end performance: " , domComplete-responsestart, "ms")
      

      let goalstext = await driver.findElement(By.id("goalstext"))
      console.log("Goals: " + await goalstext.getText())

    } catch (e) {
      console.log(e)
    } finally {
      await driver.quit(); // component 8 ending the session 
    }
  }())
  