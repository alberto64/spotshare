import { browser, by, element, promise } from 'protractor';

export class AppController {
  navigateTo() {
    return browser.get('mainpage') as Promise<any>;
  }

  gotToLogIn() {
    return browser.get('login');
  }

  getTitleText() {
    return element(by.css('spotshare app-menu-bar a')).getText() as Promise<string>;
  }

  getMainPageTitles() {
    return element.all(by.css('h1')).getText();
  }

  getLogIn() {
    return element.all(by.css('spotshare app-login input'));
  }

  getSignUp() {
    return element.all(by.css('spotshare app-signup input'));
  }

  getSettings() {
    return element.all(by.css('spotshare app-user-settings input'));
  }

  getSubmit() {
    return element(by.buttonText('Submit'));
  }

  getSearch() {
    return element(by.buttonText('Search'));
  }

  getPost() {
    return element(by.buttonText('Post'));
  }

  getLogOut() {
    return element(by.name('logout'));
  }

  getButtonTexts() {
    return element.all(by.css('spotshare app-menu-bar a')).filter(function(elem) {
      return elem.isDisplayed();
    }).getText() as Promise<string>;
  }

  getButtons() {
    return element.all(by.css('spotshare app-menu-bar a')).filter(function(elem) {
      return elem.isDisplayed();
    });
  }

  getBack() {
    return element(by.buttonText('Back'));
  }

  getLocations() {
    return element.all(by.name('postcard'));
  }

  getAlbumTitle() {
    return element(by.css('h1')).getText();
  }

  getPostcardTitle() {
    return element(by.css('h2')).getText();
  }

  getPostcardMessage() {
    return element.all(by.css('p')).getText();
  }

  getPostcardNav() {
    return element.all(by.css('a'));
  }

  getEditFields() {
    return element.all(by.css('input'));
  }

  getTextField() {
    return element.all(by.css('textarea'));
  }

  getPostcards() {
    return element.all(by.name('postcard'));
  }

  getTags() {
    return element.all(by.name('tag'));
  }

  getPostcardButton(name: string) {
    return element(by.buttonText(name));
  }
}
