const {By, Builder} = require('selenium-webdriver');
const assert = require("assert");

  
(async function firstTest() {
    let driver;
  
    try {
      driver = await new Builder().forBrowser('chrome').build(); // Component 1 Start the Session
      await driver.get('http://localhost:3000'); // component 2 Take action on browser
  
      let title = await driver.getTitle(); //Component 3 request browser information
      console.log(title)
      assert.equal("ABOUT ME", title);
  
      await driver.manage().setTimeouts({implicit: 500}); // component 4 Estab;ishing waiting strategy
  
      let githubLink = await driver.findElement(By.id("githubLink")); //Component 5 find an element
      console.log(await githubLink.getAttribute("href")) // component 7 Requesting element information
      await githubLink.click() //component 6 Take action on element 

    } catch (e) {
      console.log(e)
    } finally {
      await driver.quit(); // component 8 ending the session 
    }
  }())
  