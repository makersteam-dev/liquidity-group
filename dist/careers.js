"use strict";(()=>{window.comeetInit=function(){COMEET.init({token:"77A2CDC166E3BD03BD0345634562CDC1DE8EF4","company-uid":"77.00A","company-name":"LIQUiDITY Group"})};var l="https://www.comeet.co/careers-api/2.0/company/77.00A/positions?token=77A2CDC166E3BD03BD0345634562CDC1DE8EF4&details=false";async function p(){try{let n=await fetch(l);if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);let t=await n.json();if($("[data-results]").text(t.length),t.length==0){$("[data-jobs-wrap]").append('<h2 class="department_title">No jobs available.</h2>');return}var a=_.map(t,"department");a=_.uniq(_.reverse(a));let c=_.groupBy(t,"department"),i=0;_.map(c,function(d,e){_.forEach(d,function(o,r){r==0&&($("[data-jobs-wrap]").append(`<h2 class="department_title">${e} </h2>`),e=e.replace("&",""),$("[data-jobs-wrap]").append(`<div class="job-wrap" id="wrap${i}"></div>`)),m(o,i)}),i++})}catch{}}p();var u=1;function m(a,n){let t=$("[data-card]:eq(0)");t=t.clone();let c="https://uploads-ssl.webflow.com/62455fb5c801f78400e3ec88/6355542863bfedf0664db0ba_liquidity-logo.svg",i=a.picture_url!==null?a.picture_url:c,d,e;a.location!==null?(a.location.country!==""&&(t.find("[data-country]").show(),d=a.location.country),a.location.city!==""&&(t.find("[data-city]").show(),t.find("[data-city-comma]").show(),e=a.location.city),t.find("[data-location-divider]").show()):(d="",e="",t.find("[data-location-divider]").hide(),t.find("[data-city-comma]").hide());let o;a.employment_type!==null?(o=a.employment_type,t.find("[data-employment-divider]").show()):(o="",t.find("[data-employment-divider]").hide()),name_without_spaces=a.name.replace(/ /g,"-"),location_without_spaces=a.location.name.replace(/ /g,"-"),department_without_spaces=a.department.replace(/ /g,"-");let r=`/careers/job?uid=${a.uid}&position=${name_without_spaces}&department=${department_without_spaces}&location=${location_without_spaces}`;t.find("[data-name]").text(`${a.name}`),t.attr("id",a.uid),t.attr("href",r),t.find("[data-city]").text(`${d}`),t.find("[data-country]").text(` ${e}`),t.find("[data-department]").text(a.department),t.find("[data-employment_type]").text(o),t.find("[data-image]").attr("src",i),t.find("[data-image]").attr("alt",`${a.name}`),t.find("[data-index]").text(a.uid),t.appendTo(`#wrap${n}`),u++}})();