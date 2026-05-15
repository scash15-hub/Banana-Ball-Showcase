document.addEventListener("DOMContentLoaded", () => {
  const createCard = (player, teamName) => {
    const col = document.createElement("div");
    col.className = "col-lg-3 col-md-4 col-sm-6";

    col.innerHTML = `
      <div class="card player-card ${player.lastName || ""}">
        <div class="card-body">
          <img src="${teamName}/banana.png" class="team-icon" alt="team icon" />
          <p class="card-text">#${player.number}</p>
          <h5 class="card-title">
            ${player.firstName || ""} ${player.lastName || ""}
          </h5>
        </div>
      </div>
    `;

    return col;
  };

  const renderTeam = (teamArray, containerId, teamFolder) => {
    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    teamArray.forEach((player) => {
      container.appendChild(createCard(player, teamFolder));
    });
  };

  renderTeam(savannah, "savannah", "savannah");
  renderTeam(party, "party", "party");
  renderTeam(fire, "fire", "fire");
  renderTeam(texas, "texas", "texas");
  renderTeam(coco, "coco", "coco");
  renderTeam(clowns, "clowns", "clowns");
});