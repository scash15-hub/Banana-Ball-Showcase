document.addEventListener("DOMContentLoaded", () => {
  const createCard = (player, teamName) => {
    const col = document.createElement("div");
    // ai: added 'col-five' to support 5 cards per row at large screens
    col.className = "col-lg-3 col-md-4 col-sm-6 col-five";

    const bgClass = player.lastName;
    const firstNameClass = player.firstName.replace(/\s+/g, "-");

    col.innerHTML = `
      <div class="card player-card ${bgClass} ${firstNameClass} ${teamName}" style="background-image: url('${player.photo}')">
        <div class="card-body">
          <img src="" class="team-icon" alt="team icon" />
          <p class="card-text">#${player.number}</p>
          <h5 class="card-title">
            ${player.firstName} ${player.lastName}
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

    teamArray.forEach((player, index) => {
      const iconFile = teamFolder === "savannah" ? "banana.png" : `${teamFolder}.png`;
      const col = createCard(player, teamFolder);
      // ai: add alternating even/odd class per team member
      const cardEl = col.querySelector('.player-card');
      if (cardEl) {
        cardEl.classList.add(index % 2 === 0 ? 'even' : 'odd'); // ai
      }
      const icon = col.querySelector(".team-icon");
      icon.src = `${teamFolder}/${iconFile}`;


      icon.addEventListener("click", () => {
        console.log(player.talentName);
        icon.addEventListener("click", function () {
          console.log(player);

          // give ids in modal the values from player object

          document.getElementById("modalTalent").textContent =
            player.talentName;

          // TURN DISPLAY ON for MODAL (Bootstrap way)
          const modal = new bootstrap.Modal(
            document.getElementById("playerModal")
          );

          modal.show();
        });


      });
      container.appendChild(col);
    });
    
  };

  renderTeam(savannah, "savannah", "savannah");
  renderTeam(party, "party", "party");
  renderTeam(fire, "fire", "fire");
  renderTeam(texas, "texas", "texas");
  renderTeam(coco, "coco", "coco");
  renderTeam(clowns, "clowns", "clowns");


});

