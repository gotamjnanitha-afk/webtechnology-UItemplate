(() => {
    const ingredients = [
        {
            id: "tomato",
            name: "Tomato",
            emoji: "🍅"
        },
        {
            id: "lettuce",
            name: "Lettuce",
            emoji: "🥬"
        },
        {
            id: "cheese",
            name: "Cheese",
            emoji: "🧀"
        },
        {
            id: "bread",
            name: "Bread",
            emoji: "🍞"
        },
        {
            id: "egg",
            name: "Egg",
            emoji: "🥚"
        },
        {
            id: "mushroom",
            name: "Mushroom",
            emoji: "🍄"
        },
        {
            id: "carrot",
            name: "Carrot",
            emoji: "🥕"
        },
        {
            id: "noodles",
            name: "Noodles",
            emoji: "🍜"
        }
    ];

    const recipes = [
        {
            name: "Garden Salad",
            emoji: "🥗",
            desc: "Fresh greens with a little color.",
            items: ["tomato", "lettuce", "carrot"]
        },
        {
            name: "Cheese Toast",
            emoji: "🧀",
            desc: "A warm, cheesy snack.",
            items: ["bread", "cheese"]
        },
        {
            name: "Veggie Noodles",
            emoji: "🍜",
            desc: "A quick bowl of veggie noodles.",
            items: ["noodles", "carrot", "mushroom"]
        },
        {
            name: "Breakfast Plate",
            emoji: "🍳",
            desc: "A simple breakfast favorite.",
            items: ["egg", "bread", "tomato"]
        }
    ];

    const getElement = id => document.getElementById(id);

    let score = 0;
    let served = 0;
    let time = 45;
    let chosen = new Set();
    let current = 0;
    let active = false;
    let timer = null;

    function showIngredients() {
        const ingredientList = getElement("ingredientList");

        ingredientList.innerHTML = "";

        ingredients.forEach(item => {
            const button = document.createElement("button");

            button.type = "button";

            button.className =
                "ingredient-btn" +
                (chosen.has(item.id) ? " selected" : "");

            button.disabled = !active;

            button.setAttribute(
                "aria-pressed",
                String(chosen.has(item.id))
            );

            button.innerHTML = `
                <span aria-hidden="true">${item.emoji}</span>
                ${item.name}
            `;

            button.addEventListener("click", () => {
                if (!active) {
                    return;
                }

                if (chosen.has(item.id)) {
                    chosen.delete(item.id);
                } else {
                    chosen.add(item.id);
                }

                showIngredients();
                showPicked();
            });

            ingredientList.appendChild(button);
        });
    }

    function showPicked() {
        const pickedList = getElement("pickedList");

        if (chosen.size === 0) {
            pickedList.innerHTML = `
                <span style="font-size:11px;color:#8e96b1">
                    No ingredients selected yet.
                </span>
            `;

            return;
        }

        pickedList.innerHTML = [...chosen]
            .map(id => {
                const ingredient = ingredients.find(
                    item => item.id === id
                );

                return `
                    <span class="ingredient-chip">
                        ${ingredient.emoji} ${ingredient.name}
                    </span>
                `;
            })
            .join("");
    }

    function loadRecipe() {
        const recipe = recipes[current];

        getElement("dishEmoji").textContent = recipe.emoji;

        getElement("dishName").textContent = recipe.name;

        getElement("dishDescription").textContent = recipe.desc;

        getElement("recipeSteps").innerHTML = `
            <li>
                <span>1</span>
                Choose ${recipe.items.length} ingredients
            </li>

            <li>
                <span>2</span>
                Match the recipe exactly
            </li>

            <li>
                <span>3</span>
                Serve for +${recipe.items.length * 10} points
            </li>
        `;
    }

    function updateStats() {
        getElement("kitchenScore").textContent = score;

        getElement("servedCount").textContent = served;

        getElement("kitchenTime").textContent = time;
    }

    function startShift() {
        clearInterval(timer);

        score = 0;
        served = 0;
        time = 45;

        chosen.clear();

        active = true;

        current = Math.floor(
            Math.random() * recipes.length
        );

        getElement("kitchenStatus").textContent =
            "Shift started! Choose your ingredients.";

        getElement("startShift").textContent =
            "Restart shift";

        loadRecipe();

        showIngredients();

        showPicked();

        updateStats();

        timer = setInterval(() => {
            time--;

            updateStats();

            if (time <= 0) {
                finishShift();
            }
        }, 1000);
    }

    function finishShift() {
        clearInterval(timer);

        timer = null;

        active = false;

        showIngredients();

        getElement("kitchenStatus").textContent =
            `Shift over! You served ${served} dishes and scored ${score} points.`;

        getElement("startShift").textContent =
            "Play another shift";

        updateStats();
    }

    function serveDish() {
        if (!active) {
            getElement("kitchenStatus").textContent =
                "Start your shift first!";

            return;
        }

        const recipe = recipes[current];

        const correct =
            recipe.items.length === chosen.size &&
            recipe.items.every(item => chosen.has(item));

        if (correct) {
            const points =
                recipe.items.length * 10 + 10;

            score += points;

            served++;

            time = Math.min(45, time + 2);

            getElement("kitchenStatus").textContent =
                `Perfect! ${recipe.name} served. +${points} points!`;

            current = Math.floor(
                Math.random() * recipes.length
            );

            chosen.clear();

            loadRecipe();

            showIngredients();

            showPicked();
        } else {
            time = Math.max(0, time - 5);

            getElement("kitchenStatus").textContent =
                "Not quite! Check the ingredients and try again. -5 seconds.";

            chosen.clear();

            showIngredients();

            showPicked();

            if (time === 0) {
                finishShift();

                return;
            }
        }

        updateStats();
    }

    function clearIngredients() {
        chosen.clear();

        showIngredients();

        showPicked();

        if (active) {
            getElement("kitchenStatus").textContent =
                "Ingredients cleared. Choose again!";
        }
    }

    getElement("serveDish").addEventListener(
        "click",
        serveDish
    );

    getElement("clearIngredients").addEventListener(
        "click",
        clearIngredients
    );

    getElement("startShift").addEventListener(
        "click",
        startShift
    );

    getElement("kitchenRestart").addEventListener(
        "click",
        startShift
    );

    loadRecipe();

    showIngredients();

    showPicked();

    updateStats();
})();