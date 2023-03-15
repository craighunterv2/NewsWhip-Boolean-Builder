document.getElementById("search-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const companyName = document.getElementById("companyName").value;
  const alternativeNames = document.getElementById("alternativeNames").value;
  const keywordTopic = document.getElementById("keywordTopic").value;
  const sentiment = document.getElementById("sentiment").value;

  const sentimentMap = {
    positive: '("love*" OR "amazing" OR "great*" OR "excellent" OR "best")',
    negative: '("hate*" OR "terrible" OR "awful" OR "poor" OR "worst")',
    neutral: '("neutral" OR "average" OR "ordinary" OR "typical")',
    "": ""
  };

  const keywordTopicMap = {
    "PR crisis": '("scandal" OR "controversy" OR "crisis" OR "negative press" OR "damage control")',
    "Product launch": '("new product" OR "launch*" OR "release*" OR "unveil*" OR "announc*")',
    "Industry trends": '("trend*" OR "insight*" OR "market research" OR "forecast*" OR "analysis")',
    "": ""
  };

  const allCompanyNames = [companyName, ...alternativeNames.split(",").map(name => name.trim())].filter(name => name.length > 0).join('" OR "');

  const rawBooleanSearch = `("${allCompanyNames}"${keywordTopicMap[keywordTopic] ? ` AND ${keywordTopicMap[keywordTopic]}` : ''}${sentimentMap[sentiment] ? ` AND ${sentimentMap[sentiment]}` : ''})`;

  document.getElementById("boolean-search").textContent = rawBooleanSearch;
});

// Copy Boolean search to clipboard
document.getElementById("copy-boolean").addEventListener("click", function () {
  const el = document.createElement("textarea");
  el.value = document.getElementById("boolean-search").textContent;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  alert("Boolean search copied to clipboard.");
});
