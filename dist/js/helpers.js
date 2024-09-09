"use strict";
const ID = {
    TEXT_INPUT: 'text-input',
    TEXT_STORAGE: 'text-storage',
    TEXT_GRP_BUTTON_1: 'text-grp-button-1',
    TEXT_GRP_BUTTON_2: 'text-grp-button-2',
    TEXT_GRP_BUTTON_3: 'text-grp-button-3',
    TEXT_GRP_BUTTON_4: 'text-grp-button-4',
    TEXT_GRP_BUTTON_5: 'text-grp-button-5',
    TEXT_GRP_BUTTON_6: 'text-grp-button-6',
    TEXT_GRP_BUTTON_7: 'text-grp-button-7',
    TEXT_GRP_BUTTON_8: 'text-grp-button-8',
    XPATH_1_INPUT: 'xpath-1-input',
    XPATH_1_STORAGE: 'xpath-1-storage',
    XPATH_1_GRP_BUTTON_1: 'xpath-1-grp-button-1',
    XPATH_1_GRP_BUTTON_2: 'xpath-1-grp-button-2',
    XPATH_1_GRP_BUTTON_3: 'xpath-1-grp-button-3',
    XPATH_1_GRP_BUTTON_4: 'xpath-1-grp-button-4',
    XPATH_1_GRP_BUTTON_5: 'xpath-1-grp-button-5',
    XPATH_2_INPUT: 'xpath-2-input',
    XPATH_2_STORAGE: 'xpath-2-storage',
    XPATH_2_GRP_BUTTON_1: 'xpath-2-grp-button-1',
    XPATH_2_GRP_BUTTON_2: 'xpath-2-grp-button-2',
    XPATH_2_GRP_BUTTON_3: 'xpath-2-grp-button-3',
    XPATH_2_GRP_BUTTON_4: 'xpath-2-grp-button-4',
    XPATH_2_GRP_BUTTON_5: 'xpath-2-grp-button-5',
    RESULT_INPUT: 'result-input',
    RESULT_STORAGE: 'result-storage',
    RESULT_GRP_BUTTON_1: 'result-grp-button-1',
    RESULT_GRP_BUTTON_2: 'result-grp-button-2',
    RESULT_GRP_BUTTON_3: 'result-grp-button-3',
    RESULT_GRP_BUTTON_4: 'result-grp-button-4',
    RESULT_GRP_BUTTON_5: 'result-grp-button-5',
    RESULT_GRP_BUTTON_6: 'result-grp-button-6',
    COPY_TEXT: 'copy-text',
    COPY_XPATH_1: 'copy-xpath-1',
    COPY_XPATH_2: 'copy-xpath-2',
    COPY_RESULT: 'copy-result',
    CLEAR_TEXT: 'clear-text',
    CLEAR_XPATH_1: 'clear-xpath-1',
    CLEAR_XPATH_2: 'clear-xpath-2',
    CLEAR_RESULT: 'clear-result',
};
class StringHelper {
    static extractXPathParts(xpath) {
        const attributeNameMatch = xpath.match(/\[([^=]+)=/);
        const attributeValueMatch = xpath.match(/=\s*["']([^"']+)["']\]/);
        const beforeBracketMatch = xpath.match(/^(.*?)\[/);
        const afterBracketMatch = xpath.match(/\](.*)$/);
        const insideBracketsMatch = xpath.match(/\[(.*?)\]/);
        return {
            attributeName: attributeNameMatch ? attributeNameMatch[1] : '',
            attributeValue: attributeValueMatch ? attributeValueMatch[1] : '',
            beforeBracket: beforeBracketMatch ? beforeBracketMatch[1] : '',
            afterBracket: afterBracketMatch ? afterBracketMatch[1] : '',
            insideBrackets: insideBracketsMatch ? insideBracketsMatch[1] : ''
        };
    }
}
class HtmlHelper {
    static getInputValue(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            return element.value;
        }
        else {
            return '';
        }
    }
    //   static getPlaceholderValue(elementId: string): string {
    //     let convert = (v: any) => v === null ? '' : v
    //     const element = <HTMLInputElement>document.getElementById(elementId);
    //     if (element) {
    //       return convert(element.getAttribute('placeholder'));
    //     } else {
    //       return '';
    //     }
    //   }
    static setInputValue(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.value = value;
        }
    }
}
// class ApiHelper {
//   static async fetchTokens(id: string) {
//     try {
//       const response = await fetch(
//         'http://qa-api-latest.stg.a.o3.ru:80/token/loginbyid',
//         {
//           method: 'POST',
//           mode: 'no-cors',
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             ClientID: id,
//             ID: id,
//           }),
//         }
//       );
//       if (response.ok) {
//         let data = await response.json();
//         return data;
//       } else {
//         return 'Не удалось получить token';
//       }
//     } catch (err) {
//       return 'loginbyid has failed';
//     }
//   }
//   static async checkVerificationStatus(userId: string, email: string) {
//     const url = `http://credentials-api.bx.stg.s.o3.ru:80/IsEmailVerifiedV1?userId=${userId}&email=${email}`;
//     const response = await fetch(url, { mode: 'no-cors' });
//     const data = await response.json();
//     return Boolean(data.isVerified);
//   }
//   static async fetchEmail(userId: string | boolean): Promise<string> {
//     if (String(userId) == '0' || userId === false) {
//       return 'Unauthorised';
//     }
//     const url = `http://credentials-api.bx.stg.s.o3.ru:80/GetUserV1?userId=${userId}&options.email=true`;
//     try {
//       const response = await fetch(url, { mode: 'no-cors' });
//       if (response.ok) {
//         let data = await response.json();
//         if (data.user.credentials.email == '') {
//           return 'Не указана';
//         } else {
//           return data.user.credentials.email;
//         }
//       } else {
//         return 'Не удалось получить';
//       }
//     } catch (err) {
//       return 'GetUserV1 has failed';
//     }
//   }
//   static async fetchUnsetEmail(userId: string) {
//     const url = `http://user-facade-latest.stg.a.o3.ru:80/UnsetEmailV1`;
//     const response = await fetch(url, {
//       method: 'POST',
//       mode: 'no-cors',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         operatorId: 'qatest@ozon.ru',
//         userId: userId,
//       }),
//     });
//     return await response.json();
//   }
//   static async fetchBindEmail(userId: string, email: string) {
//     const url = `http://credentials-api.bx.stg.s.o3.ru:80/BindUserEmailV1`;
//     const response = await fetch(url, {
//       method: 'POST',
//       mode: 'no-cors',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         advertisement: 'EMAIL_BIND_ADVERTISEMENT_UNSPECIFIED',
//         email: email,
//         operatorId: 'qatest@ozon.ru',
//         reason: 'EMAIL_BIND_REASON_CHANGE_EMAIL',
//         userId: parseInt(userId),
//       }),
//     });
//     return await response.json();
//   }
//   static async fetchVerifyEmail(userId: string, email: string) {
//     const url = `http://credentials-api.bx.stg.s.o3.ru:80/VerifyEmailV2`;
//     const response = await fetch(url, {
//       method: 'POST',
//       mode: 'no-cors',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email: email,
//         userId: userId,
//       }),
//     });
//     return await response.json();
//   }
// }
// class CookieHelper {
//   static async failsChromeAPI() {
//     try {
//       await chrome.cookies.getAll({
//         domain: COOKIE_DOMAIN,
//       });
//       return false;
//     } catch (err) {
//       return true;
//     }
//   }
//   static async deleteCookie(name: string) {
//     chrome.cookies.remove(
//       {
//         name: name,
//         url: COOKIE_URL,
//       },
//       () => {
//         console.log(chrome.extension.lastError);
//       }
//     );
//   }
//   static async deleteCookies() {
//     for (const cookie_name of [
//       '__Secure-user-id',
//       '__Secure-access-token',
//       '__Secure-refresh-token',
//     ]) {
//       await CookieHelper.deleteCookie(cookie_name);
//     }
//   }
//   static async getCookie(cookieName: string) {
//     const cookies = await chrome.cookies.getAll({
//       domain: COOKIE_DOMAIN,
//     });
//     for (let cookie of cookies) {
//       if (cookie.name == cookieName) return cookie;
//     }
//   }
//   static async setCookies(
//     accessToken: string,
//     refreshToken: string,
//     userId: string
//   ) {
//     await CookieHelper.deleteCookies();
//     chrome.cookies.set(
//       {
//         name: '__Secure-refresh-token',
//         url: COOKIE_URL,
//         path: '/',
//         domain: COOKIE_DOMAIN,
//         value: refreshToken,
//         secure: true,
//       },
//       (cookie) => {
//         console.log(chrome.extension.lastError);
//       }
//     );
//     chrome.cookies.set(
//       {
//         name: '__Secure-access-token',
//         url: COOKIE_URL,
//         path: '/',
//         domain: COOKIE_DOMAIN,
//         value: accessToken,
//         secure: true,
//       },
//       (cookie) => {
//         console.log(chrome.extension.lastError);
//       }
//     );
//     chrome.cookies.set(
//       {
//         name: '__Secure-user-id',
//         url: COOKIE_URL,
//         path: '/',
//         domain: COOKIE_DOMAIN,
//         value: userId,
//         secure: true,
//       },
//       (cookie) => {
//         console.log(chrome.extension.lastError);
//       }
//     );
//   }
//   static async fetchUserId() {
//     const id = HtmlHelper.parseId();
//     if (id) {
//       return id;
//     }
//     const cookie = await CookieHelper.getCookie('__Secure-user-id');
//     if (cookie === undefined) {
//       return false;
//     } else {
//       return cookie.value;
//     }
//   }
// }
class PopupStateHelper {
    // static async isGreenEmail(userId: string | boolean, email: string) {
    //   if (typeof userId === 'boolean' || userId == '0') {
    //     return false;
    //   }
    //   if (HtmlHelper.isValidEmail(email)) {
    //     return await ApiHelper.checkVerificationStatus(userId, email);
    //   }
    //   return false;
    // }
    static async setStoredInput(inputId, text) {
        if (inputId == 'input') {
            HtmlHelper.setInputValue(ID.TEXT_INPUT, text);
            await this.saveToStorage(ID.TEXT_STORAGE, text);
        }
        else if (inputId == 'xp1') {
            HtmlHelper.setInputValue(ID.XPATH_1_INPUT, text);
            await this.saveToStorage(ID.XPATH_1_STORAGE, text);
        }
        else if (inputId == 'xp2') {
            HtmlHelper.setInputValue(ID.XPATH_2_INPUT, text);
            await this.saveToStorage(ID.XPATH_2_STORAGE, text);
        }
        else if (inputId == 'result') {
            HtmlHelper.setInputValue(ID.RESULT_INPUT, text);
            await this.saveToStorage(ID.RESULT_STORAGE, text);
        }
    }
    static getStoredInput(inputId) {
        if (inputId == 'input') {
            return HtmlHelper.getInputValue(ID.TEXT_INPUT);
        }
        else if (inputId == 'xp1') {
            return HtmlHelper.getInputValue(ID.XPATH_1_INPUT);
        }
        else if (inputId == 'xp2') {
            return HtmlHelper.getInputValue(ID.XPATH_2_INPUT);
        }
        else if (inputId == 'result') {
            return HtmlHelper.getInputValue(ID.RESULT_INPUT);
        }
        return 'invalid! use: input,xp1,xp2,result';
    }
    static async copyStoredInput(from, to) {
        await this.setStoredInput(to, this.getStoredInput(from));
    }
    static async swapStoredInput(from, to) {
        const buffer = this.getStoredInput(to);
        await this.copyStoredInput(from, to);
        await this.setStoredInput(from, buffer);
    }
    static async setEmptyState() {
        this.setStoredInput('input', '');
        this.setStoredInput('xp1', '');
        this.setStoredInput('xp2', '');
        this.setStoredInput('result', '');
    }
    static async refreshInputState() {
        let textInputValue = await this.getFromStorage(ID.TEXT_STORAGE);
        let xpath1InputValue = await this.getFromStorage(ID.XPATH_1_STORAGE);
        let xpath2InputValue = await this.getFromStorage(ID.XPATH_2_STORAGE);
        let resultInputValue = await this.getFromStorage(ID.RESULT_STORAGE);
        HtmlHelper.setInputValue(ID.TEXT_INPUT, textInputValue);
        HtmlHelper.setInputValue(ID.XPATH_1_INPUT, xpath1InputValue);
        HtmlHelper.setInputValue(ID.XPATH_2_INPUT, xpath2InputValue);
        HtmlHelper.setInputValue(ID.RESULT_INPUT, resultInputValue);
    }
    // static async refreshEmailState() {
    //   HtmlHelper.setInputValue('xpathIpt', '');
    //   HtmlHelper.setSpanColor('emailSpan', '');
    //   const userId = await CookieHelper.fetchUserId();
    //   if (userId === false || userId == '0') {
    //     HtmlHelper.setSpanColor('emailSpan', '');
    //     return;
    //   }
    //   const email = await ApiHelper.fetchEmail(userId);
    //   const isValidEmail = HtmlHelper.isValidEmail(email);
    //   const isGreenResult = await PopupStateHelper.isGreenEmail(userId, email);
    //   if (isGreenResult) {
    //     HtmlHelper.setSpanColor('emailSpan', 'green');
    //   } else if (isValidEmail) {
    //     HtmlHelper.setSpanColor('emailSpan', 'red');
    //   } else {
    //     HtmlHelper.setSpanColor('emailSpan', '');
    //   }
    //   HtmlHelper.setInputlaceholder('email', email);
    // }
    static async refreshState() {
        // await PopupStateHelper.setEmptyState();
        await PopupStateHelper.refreshInputState();
    }
    static async saveToStorage(key, value) {
        const obj = {};
        obj[key] = value;
        await chrome.storage.local.set(obj);
    }
    static async getFromStorage(key) {
        let result = await chrome.storage.local.get(key);
        if (result[key]) {
            return String(result[key]);
        }
        else {
            return '';
        }
    }
}
