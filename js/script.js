document.addEventListener("DOMContentLoaded", () => {
  //get elements from HTML
  const grid = document.getElementById("rosterGrid");

  //if grid does not exist, exit
  if (!grid) return;

  //build cards
  const render = (list) => {
    grid.innerHTML = "";
    //loop through list and create cards
    list.forEach((p, index) => {
      //creat column for bootstrap grid
      const col = document.createElement("div");
      col.className = "col-lg-3 col-md-4 col-sm-6";
      //create card element
      col.innerHTML = `
            <div class="card player-card ${p.lastName}">
                <div class="card-body">
                    <img src="${p.photo}" class="team-icon" />
                         <p class="card-text">${p.number}</p>
                            <h5 class="card-title">${p.firstName} ${p.lastName}</h5>
                </div>
            </div>
`;
    });
  };
});
