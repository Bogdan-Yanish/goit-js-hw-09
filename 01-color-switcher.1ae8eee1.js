!function(){var t={startColorBtn:document.querySelector("[data-start]"),stopColorBtn:document.querySelector("[data-stop]")},o=null;function n(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))}t.startColorBtn.addEventListener("click",(function(){document.body.style.backgroundColor=n(),t.startColorBtn.disabled=!0,t.stopColorBtn.disabled=!1,o=setInterval((function(){document.body.style.backgroundColor=n()}),1e3)})),t.stopColorBtn.addEventListener("click",(function(){clearInterval(o),t.startColorBtn.disabled=!1,t.stopColorBtn.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.1ae8eee1.js.map