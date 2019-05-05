import { AppController } from './app.po';
import { browser, logging, by, element, protractor } from 'protractor';

describe('Application Tests', () => {
  let page: AppController;

  beforeEach(() => {
    page = new AppController();
  });

  it('Home Page (Acceptance): Home button should display Spot-Share', () => {
    browser.ignoreSynchronization = true;
    page.navigateTo();
    expect(browser.getCurrentUrl()).toContain('/mainpage');
    let titles = page.getMainPageTitles().then(function(items) {
      expect(items.length).toBe(3);
      expect(items).toEqual(['Greetings From Spotshare!','About Us', 'Features']);
    });
    browser.ignoreSynchronization = false;
  });


  it('MenuBar: Home button should display Spot-Share', () => {
    browser.ignoreSynchronization = true;
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Spot-Share');
    browser.ignoreSynchronization = false;
  });

  it('MenuBar (Acceptance): Menu bar should only contain Home button, about us, contact, help, login and sign up when logged out.', () => {
    browser.ignoreSynchronization = true;
    page.navigateTo();
    page.getButtonTexts().then(function(items) {
      expect(items.length).toBe(5);
      expect(items).toEqual(['Spot-Share', 'Contact Us', 'Help', 'Log In', 'Sign Up']);
    });
    browser.ignoreSynchronization = false;
  })

  it('MenuBar: Menu bar should contain all options except log in and sign up when signed.', () => {
    page.gotToLogIn();
    page.getLogIn().then(function(items) {
      expect(items.length).toBe(2);
      items[0].sendKeys('alberto');
      items[1].sendKeys('alberto');
    });
    page.getSubmit().click();
    expect(browser.getCurrentUrl()).toContain('/collection-hub');
    page.getButtonTexts().then(function(items) {
      expect(items.length).toBe(9);
      expect(items).toEqual(['Spot-Share', 'My Postcards', 'Shared Postcards', 'Public Postcards', 'Collection Journal', 'Contact Us', 'Help','alberto\'s Settings', 'Log Out']);
    });
    page.getLogOut().click();
  })

  it('Login (Acceptance): Should be able to log in with correct credentials.', () => {
    page.gotToLogIn();
    page.getLogIn().then(function(items) {
      expect(items.length).toBe(2);
      items[0].sendKeys('alberto');
      items[1].sendKeys('alberto');
    });
    page.getSubmit().click();
    expect(browser.getCurrentUrl()).toContain('/collection-hub');
    page.getLogOut().click();
  })

  it('Login: Should be able to go back to mainpage.', () => {
    page.gotToLogIn();
    browser.sleep(1000);
    page.getBack().click();
    browser.ignoreSynchronization = true;
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('/mainpage');
    browser.ignoreSynchronization = false;
  })


  it('Signup: Should be able to log in with new correct credentials.', () => {
    page.gotToLogIn();
    browser.get('signup');
    browser.sleep(1000);
    page.getSignUp().then(function(items) {
      expect(items.length).toBe(3);
      items[0].sendKeys('tester2');
      items[1].sendKeys('tester2.test@test.com');
      items[2].sendKeys('tester2');
    });
    page.getSubmit().click();
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('/collection-hub');
    page.getLogOut().click();
  })

  it('Collecion-Hub: Create a Postcard', () => {
    page.gotToLogIn();
    page.getLogIn().then(function(items) {
      expect(items.length).toBe(2);
      items[0].sendKeys('alberto');
      items[1].sendKeys('alberto');
    });
    page.getSubmit().click();

    browser.sleep(3000);

    page.getLocations().then(function(loc) {
      loc[0].click();
    });
    let EC = protractor.ExpectedConditions;
    browser.wait(EC.alertIsPresent(), 5000, "Postcard was not created.");
    browser.switchTo().alert().accept();
    page.getLogOut().click();
  })

  it('Album: Navigate to collected album page and check elements', () => {
    page.gotToLogIn();
    page.getLogIn().then(function(items) {
      expect(items.length).toBe(2);
      items[0].sendKeys('alberto');
      items[1].sendKeys('alberto');
    });
    page.getSubmit().click();

    page.getButtons().then(function(items) {
      expect(items.length).toBe(9);
      items[1].click()
    });
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('/album/collected');
    expect(page.getAlbumTitle()).toEqual('collected Collection');
    page.getLogOut().click();

  })

  it('Album (Acceptance): Navigate to collected album page and filter for new postcards.', () => {
    page.gotToLogIn();
    page.getLogIn().then(function(items) {
      expect(items.length).toBe(2);
      items[0].sendKeys('alberto');
      items[1].sendKeys('alberto');
    });
    page.getSubmit().click();

    page.getButtons().then(function(items) {
      expect(items.length).toBe(9);
      items[1].click()
    });
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toContain('/album/collected');
    expect(page.getAlbumTitle()).toEqual('collected Collection');
    let size = 0;
    page.getPostcards().then(function(items) {
      expect(items.length).toBeGreaterThan(size);
      size = items.length;
    });

    browser.sleep(1000);


    page.getEditFields().then(function(items) {
      items[0].sendKeys('29th');
    });

    page.getSearch().click();

    browser.sleep(1000);

    page.getPostcards().then(function(items) {
      expect(items.length).toBeLessThan(size);
      size = items.length;
    });

    page.getEditFields().then(function(items) {
      items[0].clear();
      items[0].sendKeys(' ');
    });

    page.getSearch().click();

    browser.sleep(2000);

    page.getPostcards().then(function(items) {
      expect(items.length).toBeGreaterThan(size);
    });

    page.getLogOut().click();


  })

  it('Album (Acceptance): Navigate to shared album page and check elements', () => {
    page.gotToLogIn();
    page.getLogIn().then(function(items) {
      expect(items.length).toBe(2);
      items[0].sendKeys('alberto');
      items[1].sendKeys('alberto');
    });
    page.getSubmit().click();

    page.getButtons().then(function(items) {
      expect(items.length).toBe(9);
      items[2].click()
    });
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('/album/shared');
    expect(page.getAlbumTitle()).toEqual('shared Collection');
    page.getLogOut().click();

  })

  it('Album: Navigate to public album page and check elements', () => {
    page.gotToLogIn();
    page.getLogIn().then(function(items) {
      expect(items.length).toBe(2);
      items[0].sendKeys('alberto');
      items[1].sendKeys('alberto');
    });
    page.getSubmit().click();

    page.getButtons().then(function(items) {
      expect(items.length).toBe(9);
      items[3].click()
    });
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('/album/public');
    expect(page.getAlbumTitle()).toEqual('public Collection');
    page.getLogOut().click();

  })

  it('Postcard (Acceptance): Navigate to postcard page and check elements and navigate in between.', () => {
    page.gotToLogIn();
    page.getLogIn().then(function(items) {
      expect(items.length).toBe(2);
      items[0].sendKeys('alberto');
      items[1].sendKeys('alberto');
    });
    page.getSubmit().click();

    page.getButtons().then(function(items) {
      expect(items.length).toBe(9);
      items[1].click()
    });
    browser.sleep(1000);

    page.getPostcards().then(function(items) {
      items[0].click()
    });

    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toContain('/postcard/collected/0');
    let firstTitle = page.getPostcardTitle();
    page.getPostcardNav().then(function(items) {
      expect(items.length).toBe(11);
      expect(items[9].getText()).toEqual("Go To Right");
      items[9].click();
    });

    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toContain('/postcard/collected/1');
    let secondTitle = page.getPostcardTitle();
    expect(firstTitle).not.toEqual(secondTitle);
    page.getPostcardNav().then(function(items) {
      expect(items.length).toBe(12);
      expect(items[9].getText()).toEqual("Go To Left");
      items[9].click();
    });
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toContain('/postcard/collected/0');
    let thirdTitle = page.getPostcardTitle();
    expect(firstTitle).toEqual(thirdTitle);
    page.getPostcardButton('Back').click();
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('/album/collected');

    page.getLogOut().click();

  })

  it('Postcard (Acceptance): Navigate to postcard page and edit its content.', () => {
    page.gotToLogIn();
    page.getLogIn().then(function(items) {
      expect(items.length).toBe(2);
      items[0].sendKeys('alberto');
      items[1].sendKeys('alberto');
    });
    page.getSubmit().click();

    page.getButtons().then(function(items) {
      expect(items.length).toBe(9);
      items[1].click()
    });
    browser.sleep(1000);

    page.getPostcards().then(function(items) {
      items[0].click();
    });
    browser.sleep(1000);

    expect(browser.getCurrentUrl()).toContain('/postcard/collected/0');
    let title = page.getPostcardTitle();
    let messages = page.getPostcardMessage();
    page.getPostcardButton('Turn On Edit Mode').click();
    browser.sleep(1000);

    page.getEditFields().then(function(items) {
      expect(items.length).toBe(2);
      items[0].clear();
      items[0].sendKeys('Title');
    });
    page.getTextField().then(function(items) {
      expect(items.length).toBe(1);
      items[0].clear();
      items[0].sendKeys('Message');
    });
    page.getPostcardButton('Submit').click();
    browser.sleep(1000);

    page.getPostcardNav().then(function(items) {
      expect(items.length).toBe(11);
      expect(items[9].getText()).toEqual("Go To Right");
      items[9].click();
    });
    browser.sleep(1000);
    page.getPostcardNav().then(function(items) {
      expect(items.length).toBe(12);
      expect(items[9].getText()).toEqual("Go To Left");
      items[9].click();
    });
    browser.sleep(1000);

    let newTitle = page.getPostcardTitle();
    page.getPostcardMessage().then(function(items) {
      expect(items.length).toBe(4);
      expect(items[1]).toEqual('Message');
    });;
    expect(newTitle).toEqual('Title');
    page.getPostcardButton('Turn On Edit Mode').click();
    browser.sleep(1000);

    page.getEditFields().then(function(items) {
      expect(items.length).toBe(2);
      items[0].clear();
      title.then(function(str) {
        items[0].sendKeys(str);
      });
    });
    page.getTextField().then(function(items) {
      expect(items.length).toBe(1);
      items[0].clear();
      messages.then(function(str) {
        items[0].sendKeys(str[1]);
      });
    });
    page.getPostcardButton('Submit').click();

    browser.sleep(1000);
    page.getLogOut().click();
  })

  it('Postcard (Acceptance): Navigate to postcard page and share it with others.', () => {
    page.gotToLogIn();
    page.getLogIn().then(function(items) {
      expect(items.length).toBe(2);
      items[0].sendKeys('alberto');
      items[1].sendKeys('alberto');
    });
    page.getSubmit().click();

    page.getButtons().then(function(items) {
      expect(items.length).toBe(9);
      items[1].click()
    });

    browser.sleep(1000);
    page.getPostcards().then(function(items) {
      items[0].click();
    });

    browser.sleep(2000);

    let size = 0;
    page.getTags().then(function(items) {
      size = items.length;
    });

    page.getEditFields().then(function(items) {
      items[0].sendKeys('sharing:alberto');
    });
    page.getPost().click();

    browser.sleep(1000);

    page.getTags().then(function(items) {
      expect(items.length).toBeGreaterThan(size);
    });

    browser.sleep(1000);
    page.getLogOut().click();
  })

  it('Journal: Navigate to Collection Journal page and check elements', () => {
    page.gotToLogIn();
    page.getLogIn().then(function(items) {
      expect(items.length).toBe(2);
      items[0].sendKeys('alberto');
      items[1].sendKeys('alberto');
    });
    page.getSubmit().click();

    page.getButtons().then(function(items) {
      expect(items.length).toBe(9);
      items[4].click()
    });
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('/journal');
    expect(page.getAlbumTitle()).toEqual('Collection Journal:');
    page.getLogOut().click();

  })

  it('Settings: Navigate to settings page and check elements', () => {
    page.gotToLogIn();
    page.getLogIn().then(function(items) {
      expect(items.length).toBe(2);
      items[0].sendKeys('alberto');
      items[1].sendKeys('alberto');
    });
    page.getSubmit().click();

    page.getButtons().then(function(items) {
      expect(items.length).toBe(9);
      items[7].click()
    });
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('/settings');
    expect(page.getAlbumTitle()).toEqual('Settings:');
    page.getSettings().then(function(items) {
      expect(items.length).toBe(6);
    });
    page.getLogOut().click();

  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
