/*First Embed */
document.addEventListener('DOMContentLoaded', () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const utmSource = urlParams.get('utm_source');
  const utmSourceInput = document.querySelector('#api_access');

  if (utmSource === 'key') {
    utmSourceInput.value = 'true';
  }
});

/*Second Embed */
const emailInput = document.querySelector('input[name="email"]');
const companyInput = document.querySelector('input[name="company"]');
const countryInput = document.querySelector('input[name="country"]');
// const annualRevenueInput = document.querySelector('input[name="annual_revenue"]');
// const outstandingloanAmountInput = document.querySelector('input[name="outstanding_loan_amount"]');
// const cashRunwayInput = document.querySelector('input[name="cash_runway"]');
// const successInner = document.querySelector('.success-inner');

// const emailLabel = document.querySelector('#label-email');
// const companyLabel = document.querySelector('#label-company');
// const countryLabel = document.querySelector('#label-country');
// const annualRevenueLabel = document.querySelector('#label-annual_revenue');
// const outstandingloanAmountLabel = document.querySelector('#label-outstanding_loan_amount');
// const cashRunwayLabel = document.querySelector('#label-cash_runway');

const emailInputWrapper = document.querySelector('.crisis-funding-field-wrapper.is--1');
const companyInputWrapper = document.querySelector('.crisis-funding-field-wrapper.is--2');
const countryInputWrapper = document.querySelector('.crisis-funding-field-wrapper.is--3');

// const annualRevenueWrapper = document.querySelector('.crisis-funding-field-wrapper.is--4');
// const outstandingLoanAmountWrapper = document.querySelector('.crisis-funding-field-wrapper.is--5');
// const cashRunwayWrapper = document.querySelector('.crisis-funding-field-wrapper.is--6');

const re = `^[a-zA-Z0-9._%+-]+@(?!gmail\.com|yahoo\.com|hotmail\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`;

const validateEmail = () => {
  // || emailInput.value.toLowerCase().includes('gmail')
  if (!emailInput.value.toLowerCase().match(re)) {
    emailInput.classList.add('is--error');
  } else {
    emailInput.classList.remove('is--error');
  }
};

const validatecompany = () => {
  if (companyInput.value === '') {
    companyInput.classList.add('is--error');
  } else {
    companyInput.classList.remove('is--error');
  }
};

const validatecountry = () => {
  if (countryInput.value === '') {
    countryInput.classList.add('is--error');
  } else {
    countryInput.classList.remove('is--error');
  }
};

// const validateAnnualRevenueInput = () => {
//   if (annualRevenueInput.value === '') {
//     annualRevenueInput.classList.add('is--error');
//   } else {
//     annualRevenueInput.classList.remove('is--error');
//   }
// };

// const validateOutstandingloanAmountInput = () => {
//   if (outstandingloanAmountInput.value === '') {
//     outstandingloanAmountInput.classList.add('is--error');
//   } else {
//     outstandingloanAmountInput.classList.remove('is--error');
//   }
// };

// const validateCashRunwayInput = () => {
//   if (cashRunwayInput.value === '') {
//     cashRunwayInput.classList.add('is--error');
//   } else {
//     cashRunwayInput.classList.remove('is--error');
//   }
// };

emailInput.addEventListener('focusout', validateEmail);
companyInput.addEventListener('focusout', validatecompany);
countryInput.addEventListener('focusout', validatecountry);
// annualRevenueInput.addEventListener('focusout', validateAnnualRevenueInput);
// outstandingloanAmountInput.addEventListener('focusout', validateOutstandingloanAmountInput);
// cashRunwayInput.addEventListener('focusout', validateCashRunwayInput);

/*Third Embed */
$('form[action^="https://api.hsforms.com"]').each(function (i) {
  // intercept forms whos action goes to hubspot
  $(this).find('input[type=checkbox]').val('true');
  $(this).submit(function (e) {
    // when the form submits
    e.preventDefault(); //stop the form from submitting to webflow
    const formData = new FormData(e.target); // get the form data
    const parsedFormData = [...formData.entries()].map((dataObject) => ({
      // convert data to array
      name: dataObject[0], // make sure the name of the input is the same as the hubspot input name
      value: dataObject[1], // the value of the input
    }));
    const goToWebinarWebinarKey = parsedFormData.find(
      (input) => input.name === 'goToWebinarWebinarKey'
    )?.value; // looks for an input with the name goToWebinarWebinarKey
    const sfdcCampaignId = parsedFormData.find((input) => input.name === 'sfdcCampaignId')?.value; // looks for an input with the name sfdcCampaignId
    const hutk =
      document.cookie.replace(/(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/, '$1') ||
      undefined; // looks for an input with the name hutk, the hubspot user token
    console.log(hutk);
    const processingPrompt = $(this).find("[id*='gdpr-processing-prompt']"); // looks for an element with the id gdpr-processing-prompt
    const communicationConsent = parsedFormData
      .filter((item) => item.name.includes('LEGAL_CONSENT'))
      .map((item) => {
        // finds LEGAL_CONSENT options and stores them
        const element = $(`#${item.name.replace(/(:|\.|\[|\]|,|=|@)/g, '\\$1')}`)[0]; // checks if they've checked the checkbox to consent
        const label = $(
          "span[for='" +
            $(element)
              .attr('id')
              .replace(/(:|\.|\[|\]|,|=|@)/g, '\\$1') +
            "']"
        ); // gets the label of the checkbox
        return {
          value: element.checked,
          text: label.text(),
          subscriptionTypeId: parseInt(item.name.split('LEGAL_CONSENT.subscription_type_')[1]), // the subscription the user is consenting to
        };
      });
    const ignoredFields = [
      'cc-num',
      'cc-number',
      'gdpr',
      'LEGAL_CONSENT',
      'goToWebinarWebinarKey',
      'sfdcCampaignId',
    ];
    const data = {
      // the data we send to hubspot
      fields: parsedFormData.filter(
        (item) => !ignoredFields.find((ignoredField) => item.name.includes(ignoredField))
      ), // set the form data but ignore certain fields
      context: {
        pageUri: window.location.href, // log the current url
        pageName: document.title, // log the pages title
        sfdcCampaignId: sfdcCampaignId, // salesforce campaign id
        goToWebinarKey: goToWebinarWebinarKey, // go to meeting key
        hutk: hutk, // hubspot user token
      },
      ...(!processingPrompt
        ? {}
        : {
            legalConsentOptions: {
              consent: {
                ...(!processingPrompt
                  ? {}
                  : {
                      consentToProcess: true,
                      text: processingPrompt.text(),
                    }),
                ...(!communicationConsent
                  ? {}
                  : {
                      communications: communicationConsent,
                    }),
              },
            },
          }),
    };
    const final_data = JSON.stringify(data); // turn that javascript object into a json string
    $.ajax({
      url: e.target.action,
      method: 'POST',
      data: final_data,
      contentType: 'application/json',
      success: function (response) {
        if (response) {
          if (response.inlineMessage) {
            const parent = $(e.target).parent();
            parent.children('form').css('display', 'none'); // hide form
            parent.children('.w-form-done').css('display', 'block'); // replace .w-form-done with your own form done section
          } else if (response.redirectUri) {
            window.location.href = response.redirectUri;
          }
        } else {
          console.log('response but no inlineMessage or redirectUri');
        }
      },
      error: function () {
        console.log('error on the form submitting');
        $(e.target).css('display', 'none').siblings('.w-form-fail').css('display', 'block'); // replace .w-form-fail with your own form done section
      },
    });
  });
});

/*Fourth Embed */
$('.crisis-funding-label.is--in-focus').removeClass('is--in-focus');
//when form input is in focus state
$('.mt-input').on('focusin', function () {
  $(this).siblings('.crisis-funding-label').addClass('is--in-focus');
});
$('.mt-input').on('focusout', function () {
  //	when form input is out of focus state without value
  if ($(this).val() === '') {
    $(this).siblings('.crisis-funding-label').removeClass('is--in-focus');
  }
  //when form input is out of focus state with value
  if ($(this).val() !== '') {
    $(this).siblings('.crisis-funding-label').addClass('is--in-focus');
  }
});
