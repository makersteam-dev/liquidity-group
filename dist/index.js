"use strict";(()=>{document.addEventListener("DOMContentLoaded",()=>{let d=window.location.search,m=new URLSearchParams(d).get("utm_source"),t=document.querySelector("#api_access");m==="key"&&(t.value="true")});var o=document.querySelector('input[name="email"]'),i=document.querySelector('input[name="company"]'),a=document.querySelector('input[name="country"]'),r=document.querySelector('input[name="annual_revenue"]'),c=document.querySelector('input[name="outstanding_loan_amount"]'),u=document.querySelector('input[name="cash_runway"]'),A=document.querySelector(".success-inner"),k=document.querySelector(".crisis-funding-field-wrapper.is--1"),N=document.querySelector(".crisis-funding-field-wrapper.is--2"),x=document.querySelector(".crisis-funding-field-wrapper.is--3"),O=document.querySelector(".crisis-funding-field-wrapper.is--4"),R=document.querySelector(".crisis-funding-field-wrapper.is--5"),D=document.querySelector(".crisis-funding-field-wrapper.is--6"),I="^[a-zA-Z0-9._%+-]+@(?!gmail.com|yahoo.com|hotmail.com)[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",C=()=>{o.value.toLowerCase().match(I)?o.classList.remove("is--error"):o.classList.add("is--error")},q=()=>{i.value===""?i.classList.add("is--error"):i.classList.remove("is--error")},E=()=>{a.value===""?a.classList.add("is--error"):a.classList.remove("is--error")},W=()=>{r.value===""?r.classList.add("is--error"):r.classList.remove("is--error")},_=()=>{c.value===""?c.classList.add("is--error"):c.classList.remove("is--error")},T=()=>{u.value===""?u.classList.add("is--error"):u.classList.remove("is--error")};o.addEventListener("focusout",C);i.addEventListener("focusout",q);a.addEventListener("focusout",E);r.addEventListener("focusout",W);c.addEventListener("focusout",_);u.addEventListener("focusout",T);$('form[action^="https://api.hsforms.com"]').each(function(d){$(this).find("input[type=checkbox]").val("true"),$(this).submit(function(s){var g,y;s.preventDefault();let t=[...new FormData(s.target).entries()].map(e=>({name:e[0],value:e[1]})),v=(g=t.find(e=>e.name==="goToWebinarWebinarKey"))==null?void 0:g.value,h=(y=t.find(e=>e.name==="sfdcCampaignId"))==null?void 0:y.value,p=document.cookie.replace(/(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/,"$1")||void 0;console.log(p);let l=$(this).find("[id*='gdpr-processing-prompt']"),f=t.filter(e=>e.name.includes("LEGAL_CONSENT")).map(e=>{let n=$(`#${e.name.replace(/(:|\.|\[|\]|,|=|@)/g,"\\$1")}`)[0],w=$("span[for='"+$(n).attr("id").replace(/(:|\.|\[|\]|,|=|@)/g,"\\$1")+"']");return{value:n.checked,text:w.text(),subscriptionTypeId:parseInt(e.name.split("LEGAL_CONSENT.subscription_type_")[1])}}),L=["cc-num","cc-number","gdpr","LEGAL_CONSENT","goToWebinarWebinarKey","sfdcCampaignId"],b={fields:t.filter(e=>!L.find(n=>e.name.includes(n))),context:{pageUri:window.location.href,pageName:document.title,sfdcCampaignId:h,goToWebinarKey:v,hutk:p},...l?{legalConsentOptions:{consent:{...l?{consentToProcess:!0,text:l.text()}:{},...f?{communications:f}:{}}}}:{}},S=JSON.stringify(b);$.ajax({url:s.target.action,method:"POST",data:S,contentType:"application/json",success:function(e){if(e)if(e.inlineMessage){let n=$(s.target).parent();n.children("form").css("display","none"),n.children(".w-form-done").css("display","block")}else e.redirectUri&&(window.location.href=e.redirectUri);else console.log("response but no inlineMessage or redirectUri")},error:function(){console.log("error on the form submitting"),$(s.target).css("display","none").siblings(".w-form-fail").css("display","block")}})})});$(".crisis-funding-label.is--in-focus").removeClass("is--in-focus");$(".mt-input").on("focusin",function(){$(this).siblings(".crisis-funding-label").addClass("is--in-focus")});$(".mt-input").on("focusout",function(){$(this).val()===""&&$(this).siblings(".crisis-funding-label").removeClass("is--in-focus"),$(this).val()!==""&&$(this).siblings(".crisis-funding-label").addClass("is--in-focus")});})();
