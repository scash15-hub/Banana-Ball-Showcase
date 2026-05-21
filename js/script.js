document.addEventListener("DOMContentLoaded", () => {

  // ALL TEAMS
  const allTeams = {
    savannah,
    party,
    fire,
    texas,
    coco,
    clowns
  };

  // CREATE CARD
  const createCard = (player, teamName) => {
    const col = document.createElement("div");
    col.className = "col-lg-3 col-md-4 col-sm-6 col-five";

    const bgClass = player.lastName;
    const firstNameClass = player.firstName.replace(/\s+/g, "-");

    col.innerHTML = `
      <div class="card player-card ${bgClass} ${firstNameClass} ${teamName}"
        style="background-image: url('${player.photo}')">

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

  // RENDER TEAM
  const renderTeam = (teamArray, containerId, teamFolder) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    teamArray.forEach((player, index) => {

      const iconFile =
        teamFolder === "savannah"
          ? "banana.png"
          : `${teamFolder}.png`;

      const col = createCard(player, teamFolder);

      const cardEl = col.querySelector(".player-card");
      if (cardEl) {
        cardEl.classList.add(index % 2 === 0 ? "even" : "odd");
      }

      const icon = col.querySelector(".team-icon");
      icon.src = `${teamFolder}/${iconFile}`;

      // FIXED MODAL CLICK (no nested listeners)
      icon.addEventListener("click", () => {
        document.getElementById("modalTalent").textContent =
          player.talentName;

        const modal = new bootstrap.Modal(
          document.getElementById("playerModal")
        );

        modal.show();
      });

      container.appendChild(col);
    });
  };

  // STATE (filters)
  let selectedTeam = "all";
  let numberSort = "none";
  let nameSort = null;

  // MAIN RENDER CONTROLLER
  function renderAll() {

    // clear all containers
    Object.keys(allTeams).forEach(team => {
      const container = document.getElementById(team);
      if (container) container.innerHTML = "";
    });

    let teamsToRender =
      selectedTeam === "all"
        ? Object.keys(allTeams)
        : [selectedTeam];

    teamsToRender.forEach(teamName => {

      let data = [...allTeams[teamName]];

      // SORT BY NUMBER
      if (numberSort === "low") {
        data.sort((a, b) => a.number - b.number);
      }

      if (numberSort === "high") {
        data.sort((a, b) => b.number - a.number);
      }

      // SORT FIRST NAME
      if (nameSort === "first") {
        data.sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );
      }

      // SORT LAST NAME
      if (nameSort === "last") {
        data.sort((a, b) =>
          a.lastName.localeCompare(b.lastName)
        );
      }

      renderTeam(data, teamName, teamName);
    });
  }

  // FILTER EVENTS

  document.getElementById("teamFilter").addEventListener("change", (e) => {
    selectedTeam = e.target.value;
    renderAll();
  });

  document.getElementById("sortNumber").addEventListener("change", (e) => {
    numberSort = e.target.value;
    renderAll();
  });

  document.getElementById("firstAZ").addEventListener("click", () => {
    nameSort = "first";
    renderAll();
  });

  document.getElementById("lastAZ").addEventListener("click", () => {
    nameSort = "last";
    renderAll();
  });

  // RESET BUTTON
  document.getElementById("resetFilters").addEventListener("click", () => {

    selectedTeam = "all";
    numberSort = "none";
    nameSort = null;

    document.getElementById("teamFilter").value = "all";
    document.getElementById("sortNumber").value = "none";

    renderAll();
  });

  // INITIAL LOAD
  renderAll();

});