/*######################################################
             comeet generate jobs - march 23 - MakersTeam
             https://www.comeet.co/careers-api/2.0/company/77.00A/positions?token=77A2CDC166E3BD03BD0345634562CDC1DE8EF4&details=false"

             docs:
             https://developers.comeet.com/reference/list-all-positions-new-to-be-changed-to-page
  ########################################################*/
/*tokkens for comeet integration - March 2023 */
window.comeetInit = function () {
  COMEET.init({
    token: '77A2CDC166E3BD03BD0345634562CDC1DE8EF4',
    'company-uid': '77.00A',
    'company-name': 'LIQUiDITY Group',
  });
};

const api_path =
  'https://www.comeet.co/careers-api/2.0/company/77.00A/positions?token=77A2CDC166E3BD03BD0345634562CDC1DE8EF4&details=false';

async function myFetch() {
  try {
    let response = await fetch(api_path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let jobs = await response.json();

    $('[data-results]').text(jobs.length);

    if (jobs.length == 0) {
      //alert("no jobs");
      $('[data-jobs-wrap]').append(`<h2 class="department_title">No jobs available.</h2>`);
      return;
    }
    /* ######################################################
          Part 1 - GENERATE LIST OF CATEGORIES FROM ALL POSITIONS 
           - MakersTeam
          ######################################################### */
    // Creates an array of values by running each element in collection thru iteratee.
    //https://lodash.com/docs/4.17.15#map
    var departments_list = _.map(jobs, 'department');
    /* Creates a duplicate-free version of an array (remove duplicate values) */
    /* https://lodash.com/docs/4.17.15#uniq */
    departments_list = _.uniq(
      _.reverse(departments_list)
    ); /* return for example: ["General","Product Management","Business""] */

    let grouped_data = _.groupBy(jobs, 'department');
    //console.log("groupBy",grouped_data);

    let count = 0;
    _.map(grouped_data, function (jobs_inside_department, this_department_name) {
      // ADD Cagtgory name //
      _.forEach(jobs_inside_department, function (job, index) {
        if (index == 0) {
          $('[data-jobs-wrap]').append(
            `<h2 class="department_title">${this_department_name} </h2>`
          );
          this_department_name = this_department_name.replace('&', '');
          $('[data-jobs-wrap]').append(`<div class="job-wrap" id="wrap${count}"></div>`);
        }

        generate_Position_Item(job, count);
      });

      count++;
    });
  } catch (e) {
    //console.log(e);
  }
}

myFetch();

/* ################################################################
          Part 3 - Output the data for each category job position card 
    ################################################################## */

let counter = 1;

function generate_Position_Item(this_job, count) {
  //alert(department_key);
  /* card ref */
  let this_card = $(`[data-card]:eq(0)`);
  this_card = this_card.clone();

  //console.log(this_card[0].innerText);
  /* IMAGE URL (If user do not set image use placeholder) */
  let place_holder_url =
    'https://uploads-ssl.webflow.com/62455fb5c801f78400e3ec88/6355542863bfedf0664db0ba_liquidity-logo.svg';
  let image_url = this_job.picture_url !== null ? this_job.picture_url : place_holder_url;

  /* Location (Check if set) */
  let city, country;
  if (this_job.location !== null) {
    if (this_job.location.country !== '') {
      this_card.find('[data-country]').show();
      city = this_job.location.country;
    }
    if (this_job.location.city !== '') {
      this_card.find('[data-city]').show();
      this_card.find('[data-city-comma]').show();
      country = this_job.location.city;
    }
    this_card.find('[data-location-divider]').show();
  } else {
    city = '';
    country = '';
    this_card.find('[data-location-divider]').hide();
    this_card.find('[data-city-comma]').hide();
  }

  /* Employment_type (If type empty hide) */
  let employment_type;

  if (this_job.employment_type !== null) {
    employment_type = this_job.employment_type;
    this_card.find('[data-employment-divider]').show();
  } else {
    employment_type = '';
    this_card.find('[data-employment-divider]').hide();
  }

  name_without_spaces = this_job.name.replace(/ /g, '-');
  location_without_spaces = this_job.location.name.replace(/ /g, '-');
  department_without_spaces = this_job.department.replace(/ /g, '-');
  let card_url = `/careers/job?uid=${this_job.uid}&position=${name_without_spaces}&department=${department_without_spaces}&location=${location_without_spaces}`;

  /* ############## Edit values ########################## */
  /* change values of duplicate card */
  //alert(this_job.name + " " + count + this_job.uid);
  this_card.find('[data-name]').text(`${this_job.name}`);
  this_card.attr('id', this_job.uid);
  this_card.attr('href', card_url);
  this_card.find('[data-city]').text(`${city}`);
  this_card.find('[data-country]').text(` ${country}`);
  this_card.find('[data-department]').text(this_job.department);
  this_card.find('[data-employment_type]').text(employment_type);
  /* if image not null change placeholder */
  this_card.find('[data-image]').attr('src', image_url);
  this_card.find('[data-image]').attr('alt', `${this_job.name}`);
  this_card.find('[data-index]').text(this_job.uid);
  /* append*/
  this_card.appendTo(`#wrap${count}`);
  /* update counter */
  counter++;
}
