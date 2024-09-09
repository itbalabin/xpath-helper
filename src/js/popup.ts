const COOKIE_DOMAIN = '.ozonru.me';
const COOKIE_URL = 'https://ozon-stg.ozonru.me/';

async function createTextXpath() {
  let text = HtmlHelper.getInputValue(ID.TEXT_INPUT);
  let result = `//*[text()="${text}"]`;
  PopupStateHelper.setStoredInput('result', result);
}

async function createAttributeXpath() {
  let text = HtmlHelper.getInputValue(ID.TEXT_INPUT);
  let result = `//*[@${text}]`;
  PopupStateHelper.setStoredInput('result', result);
}

async function createContainsXpath() {
  let text = HtmlHelper.getInputValue(ID.TEXT_INPUT);
  const xpath = StringHelper.extractXPathParts(text)
  let result = `${xpath.beforeBracket}[contains(${xpath.attributeName}, "${xpath.attributeValue}")]${xpath.afterBracket}`;
  PopupStateHelper.setStoredInput('result', result);
}

async function clearAll() {
  await PopupStateHelper.setStoredInput('input', '');
  await PopupStateHelper.setStoredInput('xp1', '');
  await PopupStateHelper.setStoredInput('xp2', '');
  await PopupStateHelper.setStoredInput('result', '');
}

async function createAncestorXpath() {
  let text = HtmlHelper.getInputValue(ID.TEXT_INPUT);
  const xpath = StringHelper.extractXPathParts(text)
  let result = `/ancestor::*[${xpath.insideBrackets}]`;
  PopupStateHelper.setStoredInput('result', result);
}

async function createDescendantXpath() {
  let text = HtmlHelper.getInputValue(ID.TEXT_INPUT);
  const xpath = StringHelper.extractXPathParts(text)
  const result = `/descendant::*[${xpath.insideBrackets}]`
  PopupStateHelper.setStoredInput('result', result);
}

async function createFollowingXpath() {
  let text = HtmlHelper.getInputValue(ID.TEXT_INPUT);
  const xpath = StringHelper.extractXPathParts(text)
  const result = `/following-sibling::*[${xpath.insideBrackets}]`
  PopupStateHelper.setStoredInput('result', result);
}

async function createPrecedingXpath() {
  let text = HtmlHelper.getInputValue(ID.TEXT_INPUT);
  const xpath = StringHelper.extractXPathParts(text)
  const result = `/preceding-sibling::*[${xpath.insideBrackets}]`
  PopupStateHelper.setStoredInput('result', result);
}

async function createX1SlashX2Xpath() {
  let xp1 = HtmlHelper.getInputValue(ID.XPATH_1_INPUT);
  let xp2 = HtmlHelper.getInputValue(ID.XPATH_2_INPUT);
  const result = `${xp1}${xp2}`;
  PopupStateHelper.setStoredInput('result', result);
}

async function createX1SquareX2Xpath() {
  let xp1 = HtmlHelper.getInputValue(ID.XPATH_1_INPUT);
  let xp2 = HtmlHelper.getInputValue(ID.XPATH_2_INPUT);
  const result = `${xp1}[.${xp2}]`;
  PopupStateHelper.setStoredInput('result', result);
}

async function createX1PlusX2Xpath() {
  let xp1 = HtmlHelper.getInputValue(ID.XPATH_1_INPUT);
  const xpath1 = StringHelper.extractXPathParts(xp1)
  let xp2 = HtmlHelper.getInputValue(ID.XPATH_2_INPUT);
  const xpath2 = StringHelper.extractXPathParts(xp2)
  const result = `//*[${xpath1.insideBrackets}][${xpath2.insideBrackets}]`;
  PopupStateHelper.setStoredInput('result', result);
}

async function changeSlashes(inputId: string) {
  let input = PopupStateHelper.getStoredInput(inputId);
  let result = '';
    
  for (let i = 0; i < input.length; i++) {
      if (input[i] === '/') {
          if (i + 1 < input.length) {
              if (input[i + 1] === '/') {
                  result += '/';
                  i++;
              } else {
                  result += '//';
              }
          } else {
              result += '/';
          }
      } else {
          result += input[i];
      }
  }
  await PopupStateHelper.setStoredInput(inputId, result)
}

async function copyText(inputId: string) {
  const textInput = <HTMLInputElement>document.getElementById(inputId);
  const placeholder = textInput.getAttribute('placeholder');
  if (textInput.value) {
    await navigator.clipboard.writeText(textInput.value);
    return;
  } else if (placeholder) {
    await navigator.clipboard.writeText(placeholder);
  }
}

const textInput = document.getElementById(ID.TEXT_INPUT);
if (textInput) {
  textInput.addEventListener('input', (event) => {
      const currentValue = HtmlHelper.getInputValue(ID.TEXT_INPUT);
      PopupStateHelper.saveToStorage(ID.TEXT_STORAGE, currentValue);
  });
}
const xpath1Input = document.getElementById(ID.XPATH_1_INPUT);
if (xpath1Input) {
  xpath1Input.addEventListener('input', (event) => {
      const currentValue = HtmlHelper.getInputValue(ID.XPATH_1_INPUT);
      PopupStateHelper.saveToStorage(ID.XPATH_1_STORAGE, currentValue);
  });
}
const xpath2Input = document.getElementById(ID.XPATH_2_INPUT);
if (xpath2Input) {
  xpath2Input.addEventListener('input', (event) => {
      const currentValue = HtmlHelper.getInputValue(ID.XPATH_2_INPUT);
      PopupStateHelper.saveToStorage(ID.XPATH_2_STORAGE, currentValue);
  });
}
const resultInput = document.getElementById(ID.RESULT_INPUT);
if (resultInput) {
  resultInput.addEventListener('input', (event) => {
      const currentValue = HtmlHelper.getInputValue(ID.RESULT_INPUT);
      PopupStateHelper.saveToStorage(ID.RESULT_STORAGE, currentValue);
  });
}

const textButton = document.getElementById(ID.TEXT_GRP_BUTTON_1);
if (textButton) {
  textButton.addEventListener('click', createTextXpath, false);
}
const attrButton = document.getElementById(ID.TEXT_GRP_BUTTON_2);
if (attrButton) {
  attrButton.addEventListener('click', createAttributeXpath, false);
}
const containsButton = document.getElementById(ID.TEXT_GRP_BUTTON_3);
if (containsButton) {
  containsButton.addEventListener('click', createContainsXpath, false);
}
const clearAllButton = document.getElementById(ID.TEXT_GRP_BUTTON_4);
if (clearAllButton) {
  clearAllButton.addEventListener('click', clearAll, false);
}
const textGrp5Button = document.getElementById(ID.TEXT_GRP_BUTTON_5);
if (textGrp5Button) {
  textGrp5Button.addEventListener('click', createAncestorXpath, false);
}
const textGrp6Button = document.getElementById(ID.TEXT_GRP_BUTTON_6);
if (textGrp6Button) {
  textGrp6Button.addEventListener('click', createDescendantXpath, false);
}
const textGrp7Button = document.getElementById(ID.TEXT_GRP_BUTTON_7);
if (textGrp7Button) {
  textGrp7Button.addEventListener('click', createFollowingXpath, false);
}
const textGrp8Button = document.getElementById(ID.TEXT_GRP_BUTTON_8);
if (textGrp8Button) {
  textGrp8Button.addEventListener('click', createPrecedingXpath, false);
}
const resGrpBtn4 = document.getElementById(ID.RESULT_GRP_BUTTON_4);
if (resGrpBtn4) {
  resGrpBtn4.addEventListener('click', createX1SlashX2Xpath, false);
}
const resGrpBtn5 = document.getElementById(ID.RESULT_GRP_BUTTON_5);
if (resGrpBtn5) {
  resGrpBtn5.addEventListener('click', createX1SquareX2Xpath, false);
}
const resGrpBtn6 = document.getElementById(ID.RESULT_GRP_BUTTON_6);
if (resGrpBtn6) {
  resGrpBtn6.addEventListener('click', createX1PlusX2Xpath, false);
}

const xp1GrpBtn1 = document.getElementById(ID.XPATH_1_GRP_BUTTON_1);
if (xp1GrpBtn1) {
  xp1GrpBtn1.addEventListener(
    'click',
    () => {
      PopupStateHelper.swapStoredInput('xp1', 'xp2');
    },
    false
  );
}

const xp1GrpBtn2 = document.getElementById(ID.XPATH_1_GRP_BUTTON_2);
if (xp1GrpBtn2) {
  xp1GrpBtn2.addEventListener(
    'click',
    () => {
      PopupStateHelper.copyStoredInput('xp1', 'input');
    },
    false
  );
}

const xp1GrpBtn3 = document.getElementById(ID.XPATH_1_GRP_BUTTON_3);
if (xp1GrpBtn3) {
  xp1GrpBtn3.addEventListener(
    'click',
    () => {
      PopupStateHelper.copyStoredInput('xp1', 'x2');
    },
    false
  );
}

const xp1GrpBtn4 = document.getElementById(ID.XPATH_1_GRP_BUTTON_4);
if (xp1GrpBtn4) {
  xp1GrpBtn4.addEventListener(
    'click',
    () => {
      PopupStateHelper.copyStoredInput('xp1', 'result');
    },
    false
  );
}

const xp1GrpBtn5 = document.getElementById(ID.XPATH_1_GRP_BUTTON_5);
if (xp1GrpBtn5) {
  xp1GrpBtn5.addEventListener(
    'click',
    () => {
      changeSlashes('xp1');
    },
    false
  );
}

const xp2GrpBtn1 = document.getElementById(ID.XPATH_2_GRP_BUTTON_1);
if (xp2GrpBtn1) {
  xp2GrpBtn1.addEventListener(
    'click',
    () => {
      PopupStateHelper.swapStoredInput('xp1', 'xp2');
    },
    false
  );
}

const xp2GrpBtn2 = document.getElementById(ID.XPATH_2_GRP_BUTTON_2);
if (xp2GrpBtn2) {
  xp2GrpBtn2.addEventListener(
    'click',
    () => {
      PopupStateHelper.copyStoredInput('xp2', 'input');
    },
    false
  );
}

const xp2GrpBtn3 = document.getElementById(ID.XPATH_2_GRP_BUTTON_3);
if (xp2GrpBtn3) {
  xp2GrpBtn3.addEventListener(
    'click',
    () => {
      PopupStateHelper.copyStoredInput('xp2', 'x1');
    },
    false
  );
}

const xp2GrpBtn4 = document.getElementById(ID.XPATH_2_GRP_BUTTON_4);
if (xp2GrpBtn4) {
  xp2GrpBtn4.addEventListener(
    'click',
    () => {
      PopupStateHelper.copyStoredInput('xp2', 'result');
    },
    false
  );
}

const xp2GrpBtn5 = document.getElementById(ID.XPATH_2_GRP_BUTTON_5);
if (xp2GrpBtn5) {
  xp2GrpBtn5.addEventListener(
    'click',
    () => {
      changeSlashes('xp2');
    },
    false
  );
}

const resGrpBtn1 = document.getElementById(ID.RESULT_GRP_BUTTON_1);
if (resGrpBtn1) {
  resGrpBtn1.addEventListener(
    'click',
    () => {
      PopupStateHelper.copyStoredInput('result', 'input');
    },
    false
  );
}

const resGrpBtn2 = document.getElementById(ID.RESULT_GRP_BUTTON_2);
if (resGrpBtn2) {
  resGrpBtn2.addEventListener(
    'click',
    () => {
      PopupStateHelper.copyStoredInput('result', 'xp1');
    },
    false
  );
}

const resGrpBtn3 = document.getElementById(ID.RESULT_GRP_BUTTON_3);
if (resGrpBtn3) {
  resGrpBtn3.addEventListener(
    'click',
    () => {
      PopupStateHelper.copyStoredInput('result', 'xp2');
    },
    false
  );
}

const copyText1 = document.getElementById(ID.COPY_TEXT);
if (copyText1) {
  copyText1.addEventListener(
    'click',
    () => {
      copyText(ID.TEXT_INPUT);
    },
    false
  );
}

const copyXpath1 = document.getElementById(ID.COPY_XPATH_1);
if (copyXpath1) {
  copyXpath1.addEventListener(
    'click',
    () => {
      copyText(ID.XPATH_1_INPUT);
    },
    false
  );
}

const copyXpath2 = document.getElementById(ID.COPY_XPATH_2);
if (copyXpath2) {
  copyXpath2.addEventListener(
    'click',
    () => {
      copyText(ID.XPATH_2_INPUT);
    },
    false
  );
}

const copyResult = document.getElementById(ID.COPY_RESULT);
if (copyResult) {
  copyResult.addEventListener(
    'click',
    () => {
      copyText(ID.RESULT_INPUT);
    },
    false
  );
}

const clearText1 = document.getElementById(ID.CLEAR_TEXT);
if (clearText1) {
  clearText1.addEventListener(
    'click',
    () => {
      PopupStateHelper.setStoredInput('input', '');
    },
    false
  );
}

const clearXpath1 = document.getElementById(ID.CLEAR_XPATH_1);
if (clearXpath1) {
  clearXpath1.addEventListener(
    'click',
    () => {
      PopupStateHelper.setStoredInput('xp1', '');
    },
    false
  );
}

const clearXpath2 = document.getElementById(ID.CLEAR_XPATH_2);
if (clearXpath2) {
  clearXpath2.addEventListener(
    'click',
    () => {
      PopupStateHelper.setStoredInput('xp2', '');
    },
    false
  );
}

const clearResult = document.getElementById(ID.CLEAR_RESULT);
if (clearResult) {
  clearResult.addEventListener(
    'click',
    () => {
      PopupStateHelper.setStoredInput('result', '');
    },
    false
  );
}

PopupStateHelper.refreshInputState();
//*[@class="react-container"][./descendant::*[text()="Войти"]]
