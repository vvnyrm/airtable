var Airtable = require("airtable");

var base = new Airtable({ apiKey: "keycXpVFM910eHGG8" }).base(
  "appP6H8VMRFfL4XAf"
);

let contextContainer = document.createElement("div");
contextContainer.classList.add("context-container");

base("Table 1")
  .select({
    maxRecords: 50,
    // view: "Grid view",
  })
  .eachPage(function page(records, fetchNextPage) {
    console.log("records:", records);
    records.forEach(function (record) {

      let airtableItem = document.createElement("div");
      airtableItem.classList.add("airtable-item");
      airtableItem.setAttribute("data-Genre", record.fields.Genre);

      let cover = document.createElement("img");
      cover.src = record.fields.Cover[0].url;

      let title = document.createElement("span");
      title.innerHTML = record.fields.title;

      airtableItem.append(cover);
      airtableItem.append(title);

      //document.body.append(airtableItem);
      contextContainer.append(airtableItem);
    });
    document.body.append(contextContainer);
  });

let filterBtns = document.querySelectorAll(".btn-filter").forEach((btn) => {
  btn.addEventListener("click", function (event) {
    console.log("this is filter being pressed:", event.target.id);

    let listofAirtableItems = document.querySelectorAll("div.airtable-item");

    listofAirtableItems.forEach(function searchNovelFilter(item) {
      if (item.dataset.genre.includes(event.target.dataset.genre)) {
        // item.classList.add("novel-filter-show");
        // item.classList.remove('novel-filter-hide')
        
        item.classList.remove('hidden')
        console.log(item);
      } else {
        // item.classList.add("novel-filter-hide");
       
        item.classList.add('hidden')
        
      }
    });
  });
});

// let novelFilterBtn = document.getElementById("Novel");
// novelFilterBtn.addEventListener("click", function (event) {
//   console.log("this is filter being pressed:", event.target.id);

//   let listofAirtableItems = document.querySelectorAll("div.airtable-item");

//   listofAirtableItems.forEach(function searchNovelFilter(item) {
//     if (item.dataset.genre.includes("Novel")) {
//       item.classList.add("novel-filter-show");
//       console.log(item);
//     } else {
//       item.classList.add("novel-filter-hide");
//     }
//   });
// });
