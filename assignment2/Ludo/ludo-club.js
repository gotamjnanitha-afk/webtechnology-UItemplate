(() => {
    const players = [
        {
            name: "Red",
            color: "#ff8293",
            cls: "red-token",
            home: "redHome",
            progress: [-1, -1, -1, -1],
            score: 0
        },
        {
            name: "Blue",
            color: "#70b8ff",
            cls: "blue-token",
            home: "blueHome",
            progress: [-1, -1, -1, -1],
            score: 0
        },
        {
            name: "Green",
            color: "#7de0a8",
            cls: "green-token",
            home: "greenHome",
            progress: [-1, -1, -1, -1],
            score: 0
        },
        {
            name: "Yellow",
            color: "#ffd46d",
            cls: "yellow-token",
            home: "yellowHome",
            progress: [-1, -1, -1, -1],
            score: 0
        }
    ];

    const $ = id => document.getElementById(id);

    let turn = 0;
    let roll = null;
    let moves = 0;
    let round = 1;
    let finished = false;

    function render() {
        $("turnName").textContent = finished
            ? "Game complete!"
            : `${players[turn].name} player's turn`;

        $("turnDot").style.background = players[turn].color;

        $("ludoMoves").textContent = moves;

        $("ludoRound").textContent = round;

        $("playerList").innerHTML = players
            .map((p, i) => {
                const active =
                    i === turn && !finished
                        ? "active"
                        : "";

                const outCount = p.progress.filter(
                    value => value >= 0
                ).length;

                return `
                    <div class="player-row ${active}">
                        <span class="player-name">
                            <span
                                class="player-color"
                                style="background:${p.color}"
                            ></span>
                            ${p.name} player
                        </span>

                        <strong>
                            ${outCount}/4 out
                        </strong>
                    </div>
                `;
            })
            .join("");

        document
            .querySelectorAll(".ludo-token")
            .forEach(button => {

                const player =
                    players[Number(button.dataset.player)];

                const tokenIndex =
                    Number(button.dataset.token);

                const progress =
                    player.progress[tokenIndex];

                button.style.opacity =
                    progress === -1 ? "0.8" : "1";

                button.title =
                    progress === -1
                        ? "At home"
                        : `On track: ${progress}/20`;

                button.setAttribute(
                    "aria-label",
                    `${player.name} token ${tokenIndex + 1}, ${
                        progress === -1
                            ? "at home"
                            : `step ${progress}`
                    }`
                );

                if (
                    Number(button.dataset.player) !== turn ||
                    roll === null ||
                    finished
                ) {
                    button.style.outline = "none";
                } else {
                    button.style.outline = "2px solid #fff";
                }
            });
    }

    function nextTurn() {
        turn = (turn + 1) % players.length;

        if (turn === 0) {
            round++;
        }

        roll = null;

        $("diceFace").textContent = "⚄";

        render();
    }

    $("rollDice").addEventListener("click", () => {

        if (finished) {
            return;
        }

        if (roll !== null) {
            $("ludoStatus").textContent =
                "Select one of the current player's tokens to move.";

            return;
        }

        roll = Math.floor(Math.random() * 6) + 1;

        const diceFaces = [
            "",
            "⚀",
            "⚁",
            "⚂",
            "⚃",
            "⚄",
            "⚅"
        ];

        $("diceFace").textContent = diceFaces[roll];

        if (roll === 6) {
            $("ludoStatus").textContent =
                "A six! Select a token to bring out or move.";
        } else {
            $("ludoStatus").textContent =
                `You rolled ${roll}. Select a token already on the track.`;
        }

        render();
    });

    document
        .querySelectorAll(".ludo-token")
        .forEach(button => {

            button.addEventListener("click", () => {

                if (finished) {
                    return;
                }

                const playerIndex =
                    Number(button.dataset.player);

                const tokenIndex =
                    Number(button.dataset.token);

                if (playerIndex !== turn) {
                    $("ludoStatus").textContent =
                        `It's ${players[turn].name}'s turn. Please select their token.`;

                    return;
                }

                if (roll === null) {
                    $("ludoStatus").textContent =
                        "Roll the dice first.";

                    return;
                }

                const player = players[playerIndex];

                if (player.progress[tokenIndex] === -1) {

                    if (roll !== 6) {
                        $("ludoStatus").textContent =
                            "You need a 6 to bring this token out.";

                        return;
                    }

                    player.progress[tokenIndex] = 0;

                } else {

                    player.progress[tokenIndex] += roll;

                    if (player.progress[tokenIndex] > 20) {
                        player.progress[tokenIndex] = 20;
                    }
                }

                moves++;

                const won =
                    player.progress[tokenIndex] === 20;

                if (won) {

                    finished = true;

                    $("ludoStatus").textContent =
                        `${player.name} wins this demo round! Press Reset board to play again.`;

                } else if (roll === 6) {

                    roll = null;

                    $("diceFace").textContent = "⚄";

                    $("ludoStatus").textContent =
                        `${player.name} rolled a six and gets another turn. Roll again!`;

                } else {

                    $("ludoStatus").textContent =
                        `${player.name} moved token ${tokenIndex + 1}. Next player's turn.`;

                    nextTurn();
                }

                render();
            });
        });

    $("ludoReset").addEventListener("click", () => {

        players.forEach(player => {
            player.progress = [-1, -1, -1, -1];
            player.score = 0;
        });

        turn = 0;
        roll = null;
        moves = 0;
        round = 1;
        finished = false;

        $("diceFace").textContent = "⚄";

        $("ludoStatus").textContent =
            "Board reset. Red starts! Roll a 6 to bring a token out.";

        render();
    });

    render();
})();