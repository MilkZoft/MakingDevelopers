// Utils
import { pick } from './object';

export function getInputOptions(schema, field, errorClass, userInfo, flashData) {
  const inputOptions = { hash: {} };

  inputOptions.hash.id = field;
  inputOptions.hash.class = schema[field].className + errorClass;
  inputOptions.hash.name = field;

  if (field === 'author') {
    inputOptions.hash.value = userInfo.username;
  }

  if (flashData) {
    inputOptions.hash.value = flashData[field] || '';
  }

  // inputOptions.hash.required = !!schema[field].required;

  return inputOptions;
}

export function getHiddenOptions(field, hiddenElements) {
  const hiddenOptions = { hash: {} };

  hiddenOptions.hash.id = field;
  hiddenOptions.hash.name = field;
  hiddenOptions.hash.value = hiddenElements[field];

  return hiddenOptions;
}

export function getTextareaOptions(schema, field, errorClass, flashData) {
  const textareaOptions = { hash: {} };

  textareaOptions.hash.id = field;
  textareaOptions.hash.class = schema[field].className + errorClass;
  textareaOptions.hash.name = field;
  // textareaOptions.hash.required = !!schema[field].required;

  if (flashData) {
    textareaOptions.hash.value = flashData[field] || '';
  }

  return textareaOptions;
}

export function getLabelOptions(schema, field, __) {
  const labelOptions = { hash: {} };

  labelOptions.hash.for = field;

  if (schema[field].errorMessage) {
    labelOptions.hash.text = `
      ${pick(schema[field].label, __)}|${schema[field].errorMessage}
    `;
  } else {
    labelOptions.hash.text = pick(schema[field].label, __);
  }

  return labelOptions;
}

export function getSelectOptions(schema, field, errorClass, flashData, __) {
  const selectOptions = { hash: {} };

  selectOptions.hash.id = field;
  selectOptions.hash.class = schema[field].className + errorClass;
  selectOptions.hash.name = field;

  if (schema[field].options) {
    selectOptions.hash.options = pick(schema[field].options, __);

    // Flash data for selected options
    if (flashData) {
      selectOptions.hash.selectedOption = flashData[field] || '';
    }
  }

  // selectOptions.hash.required = !!schema[field].required;

  return selectOptions;
}

export function getSubmitOptions(__) {
  const submitOptions = { hash: {} };

  submitOptions.hash.id = 'publish';
  submitOptions.hash.class = 'btn dark';
  submitOptions.hash.name = 'publish';
  submitOptions.hash.value = __.Dashboard.forms.fields.save;

  return submitOptions;
}

export function getContentInsertOptionsHTML() {
  return `
    <div>
      <a id="insertAd" class="pointer" title="Insert Ad">
        <i class="fa fa-google"></i>
      </a>
      <a id="insertCode" class="pointer" title="Insert Code">
        <i class="fa fa-code"></i>
      </a>
      <a id="insertMedia" class="pointer" title="Insert Media">
        <i class="fa fa-picture-o"></i>
      </a>
    </div>
  `;
}
