const {By, Builder} = require('selenium-webdriver');
const assert = require("assert");

let Presencetime = 0; 
let url = "https://www.sycamorecanyons.com/"; 
  
(async function firstTest() {
    let driver;
  
    try {
      driver = await new Builder().forBrowser('chrome').build(); // Component 1 Start the Session
      await driver.get(url); // component 2 Take action on browser
      let count = (await driver.findElements(By.tagName("img"))).length
      
      Presencetime = count * 10 
      console.log("url: " , url)
      console.log("Presencetime: " , Presencetime)
    } catch (e) {
      console.log(e)
    } finally {
      await driver.quit(); // component 8 ending the session 
    }
  }())