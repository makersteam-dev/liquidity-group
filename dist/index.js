"use strict";(()=>{document.addEventListener("DOMContentLoaded",()=>{let d=window.location.search,m=new URLSearchParams(d).get("utm_source"),s=document.querySelector("#api_access");m==="key"&&(s.value="true")});var o=document.querySelector('input[name="email"]'),a=document.querySelector('input[name="company"]'),i=document.querySelector('input[name="country"]'),r=document.querySelector('input[name="annual_revenue"]'),c=document.querySelector('input[name="outstanding_loan_amount"]'),u=document.querySelector('input[name="cash_runway"]'),T=document.querySelector(".success-inner"),k=document.querySelector("#label-email"),R=document.querySelector("#label-company"),N=document.querySelector("#label-country"),x=document.querySelector("#label-annual_revenue"),O=document.querySelector("#label-outstanding_loan_amount"),D=document.querySelector("#label-cash_runway"),P=document.querySelector(".crisis-funding-field-wrapper.is--1"),U=document.querySelector(".crisis-funding-field-wrapper.is--2"),K=document.querySelector(".crisis-funding-field-wrapper.is--3"),z=document.querySelector(".crisis-funding-field-wrapper.is--4"),F=document.querySelector(".crisis-funding-field-wrapper.is--5"),G=document.querySelector(".crisis-funding-field-wrapper.is--6"),q="^[a-zA-Z0-9._%+-]+@(?!gmail.com|yahoo.com|hotmail.com)[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",I=()=>{o.value.toLowerCase().match(q)?o.classList.remove("is--error"):o.classList.add("is--error")},_=()=>{a.value===""?a.classList.add("is--error"):a.classList.remove("is--error")},C=()=>{i.value===""?i.classList.add("is--error"):i.classList.remove("is--error")},E=()=>{r.value===""?r.classList.add("is--error"):r.classList.remove("is--error")},W=()=>{c.value===""?c.classList.add("is--error"):c.classList.remove("is--error")},A=()=>{u.value===""?u.classList.add("is--error"):u.classList.remove("is--error")};o.addEventListener("focusout",I);a.addEventListener("focusout",_);i.addEventListener("focusout",C);r.addEventListener("focusout",E);c.addEventListener("focusout",W);u.addEventListener("focusout",A);$('form[action^="https://api.hsforms.com"]').each(function(d){$(this).find("input[type=checkbox]").val("true"),$(this).submit(function(t){var y,g;t.preventDefault();let s=[...new FormData(t.target).entries()].map(e=>({name:e[0],value:e[1]})),v=(y=s.find(e=>e.name==="goToWebinarWebinarKey"))==null?void 0:y.value,b=(g=s.find(e=>e.name==="sfdcCampaignId"))==null?void 0:g.value,p=document.cookie.replace(/(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/,"$1")||void 0;console.log(p);let l=$(this).find("[id*='gdpr-processing-prompt']"),f=s.filter(e=>e.name.includes("LEGAL_CONSENT")).map(e=>{let n=$(`#${e.name.replace(/(:|\.|\[|\]|,|=|@)/g,"\\$1")}`)[0],w=$("span[for='"+$(n).attr("id").replace(/(:|\.|\[|\]|,|=|@)/g,"\\$1")+"']");return{value:n.checked,text:w.text(),subscriptionTypeId:parseInt(e.name.split("LEGAL_CONSENT.subscription_type_")[1])}}),L=["cc-num","cc-number","gdpr","LEGAL_CONSENT","goToWebinarWebinarKey","sfdcCampaignId"],h={fields:s.filter(e=>!L.find(n=>e.name.includes(n))),context:{pageUri:window.location.href,pageName:document.title,sfdcCampaignId:b,goToWebinarKey:v,hutk:p},...l?{legalConsentOptions:{consent:{...l?{consentToProcess:!0,text:l.text()}:{},...f?{communications:f}:{}}}}:{}},S=JSON.stringify(h);$.ajax({url:t.target.action,method:"POST",data:S,contentType:"application/json",success:function(e){if(e)if(e.inlineMessage){let n=$(t.target).parent();n.children("form").css("display","none"),n.children(".w-form-done").css("display","block")}else e.redirectUri&&(window.location.href=e.redirectUri);else console.log("response but no inlineMessage or redirectUri")},error:function(){console.log("error on the form submitting"),$(t.target).css("display","none").siblings(".w-form-fail").css("display","block")}})})});$(".crisis-funding-label.is--in-focus").removeClass("is--in-focus");$(".mt-input").on("focusin",function(){$(this).siblings(".crisis-funding-label").addClass("is--in-focus")});$(".mt-input").on("focusout",function(){$(this).val()===""&&$(this).siblings(".crisis-funding-label").removeClass("is--in-focus"),$(this).val()!==""&&$(this).siblings(".crisis-funding-label").addClass("is--in-focus")});})();