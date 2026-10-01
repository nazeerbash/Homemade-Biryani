const STORAGE_KEY = "jagalur-food-recipes-v1";
const STARTER_RECIPES = [
  "Green Chilli Chicken",
  "Pulav",
  "Kesari Bath",
  "Upit (Upma)",
  "Chowchow Bath",
  "Holige (Obbattu)",
  "Mirchi Bajji",
  "Jalebi",
  "Kheer",
  "Pakoda",
];
const UNITS = ["kg", "g", "gram", "grams", "litre", "litres", "ml", "piece", "pieces", "dozen", "bunch", "packet", "tbsp", "tsp", "cup", "cups", "other"];
const DEFAULT_RECIPE_IMAGES = {
  "Green Chilli Chicken": "photo-1603894584373-5ac82b2ae398",
  Pulav: "photo-1589302168068-964664d93dc0",
  "Kesari Bath": "photo-1578985545062-69928b1d9587",
  "Upit (Upma)": "photo-1547592180-85f173990554",
  "Chowchow Bath": "photo-1516684732162-798a0062be99",
  "Holige (Obbattu)": "photo-1601050690597-df0568f70950",
  "Mirchi Bajji": "photo-1601050690117-94f5f6fa8bd7",
  Jalebi: "photo-1601050690597-df0568f70950",
  Kheer: "photo-1488477181946-6428a0291777",
  Pakoda: "photo-1601050690597-df0568f70950",
};
const MAX_UPLOAD_BYTES = 250 * 1024;
const recipeList = document.querySelector("#recipe-list");
const statusRegion = document.querySelector("#dashboard-status");

function createId() {
  return globalThis.crypto?.randomUUID?.() || `recipe-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function createRecipe(name = "") {
  return { id: createId(), name, ingredients: [], batches: [] };
}

function showStatus(message, isError = false) {
  statusRegion.textContent = message;
  statusRegion.classList.toggle("is-error", isError);
}

function readRecipes() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) {
      const initialRecipes = STARTER_RECIPES.map(createRecipe);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialRecipes));
      return initialRecipes;
    }
    const data = JSON.parse(stored);
    if (!Array.isArray(data) || !data.every(isValidRecipe)) {
      throw new Error("Saved recipes have an unsupported format. Import a valid recipe backup to continue.");
    }
    return data;
  } catch (error) {
    showStatus(error.message || "Recipe data could not be loaded from this browser.", true);
    return [];
  }
}

function isValidRecipe(recipe) {
  return recipe && typeof recipe.id === "string" && typeof recipe.name === "string"
    && Array.isArray(recipe.ingredients) && recipe.ingredients.every((ingredient) =>
      ingredient && typeof ingredient.id === "string"
      && typeof ingredient.name === "string" && typeof ingredient.quantity === "string"
      && typeof ingredient.unit === "string" && typeof ingredient.pricePerUnit === "string")
    && Array.isArray(recipe.batches) && recipe.batches.every((batch) =>
      batch && typeof batch.id === "string" && typeof batch.label === "string"
      && typeof batch.servings === "string");
}

let recipes = readRecipes();

function saveRecipes(message = "Changes saved on this browser.") {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    showStatus(message);
    return true;
  } catch (error) {
    showStatus(`Could not save recipe changes: ${error.message}`, true);
    return false;
  }
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function makeInput({ value = "", placeholder = "", label, type = "text", min, step }) {
  const input = document.createElement("input");
  input.type = type;
  input.value = value;
  input.placeholder = placeholder;
  input.setAttribute("aria-label", label);
  if (min !== undefined) input.min = min;
  if (step !== undefined) input.step = step;
  return input;
}

function makeRemoveButton(className, label, action) {
  const button = makeElement("button", className, "×");
  button.type = "button";
  button.setAttribute("aria-label", label);
  button.title = label;
  button.addEventListener("click", action);
  return button;
}

function makeImagePreview(recipe) {
  const preview = makeElement("div", "recipe-image-preview");
  const image = document.createElement("img");
  image.alt = recipe.name ? `${recipe.name} menu photo preview` : "Recipe menu photo preview";
  image.loading = "lazy";
  const defaultImage = DEFAULT_RECIPE_IMAGES[recipe.name];
  const source = recipe.imageUrl || (defaultImage ? `https://images.unsplash.com/${defaultImage}?auto=format&fit=crop&w=480&q=75` : "");
  if (source) {
    image.src = source;
    preview.append(image);
  } else {
    preview.append(makeElement("span", "image-placeholder", "Choose a photo for this recipe"));
  }
  return preview;
}

function getImageCard(recipe) {
  return findRecipeCard(recipe)?.querySelector(".recipe-image-preview");
}

function setRecipeImage(recipe, imageUrl, statusMessage) {
  const previousImage = recipe.imageUrl || "";
  recipe.imageUrl = imageUrl;
  if (!saveRecipes(statusMessage)) {
    recipe.imageUrl = previousImage;
    updateRecipeImagePreview(recipe);
    return false;
  }
  updateRecipeImagePreview(recipe);
  return true;
}

function updateRecipeImagePreview(recipe) {
  const preview = getImageCard(recipe);
  if (!preview) return;
  const replacement = makeImagePreview(recipe);
  preview.replaceChildren(...replacement.childNodes);
}

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      try {
        if (image.naturalWidth > 20000 || image.naturalHeight > 20000) {
          reject(new Error("This photo is too large to process. Choose a smaller image."));
          return;
        }
        const maxSide = 900;
        const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("This browser couldn't process the photo."));
          return;
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        for (const quality of [0.78, 0.68, 0.58, 0.48]) {
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          const sizeInBytes = Math.ceil((dataUrl.length - dataUrl.indexOf(",") - 1) * 0.75);
          if (sizeInBytes <= MAX_UPLOAD_BYTES) {
            resolve(dataUrl);
            return;
          }
        }
        reject(new Error("This photo is too large after compression. Choose a smaller image or paste an image URL instead."));
      } catch (error) {
        reject(new Error(`This photo couldn't be processed: ${error.message}`));
      }
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("This photo couldn't be opened. Try another image."));
    };
    image.src = objectUrl;
  });
}

function renderRecipeImageEditor(recipe) {
  const section = makeElement("section", "recipe-photo-section");
  section.append(makeElement("h2", "", "Menu photo"));
  section.append(makeImagePreview(recipe));
  const controls = makeElement("div", "photo-controls");
  const urlInput = makeInput({
    value: recipe.imageUrl && !recipe.imageUrl.startsWith("data:") ? recipe.imageUrl : "",
    placeholder: "Paste an image URL (https://…)",
    label: `${recipe.name || "Recipe"} image URL`,
    type: "url",
  });
  urlInput.className = "photo-url-input";
  urlInput.addEventListener("change", () => {
    const value = urlInput.value.trim();
    if (value) {
      let parsedUrl;
      try {
        parsedUrl = new URL(value);
      } catch {
        showStatus("Enter a complete image URL beginning with https://.", true);
        urlInput.focus();
        return;
      }
      if (!["https:", "http:"].includes(parsedUrl.protocol)) {
        showStatus("Image URLs must begin with http:// or https://.", true);
        urlInput.focus();
        return;
      }
    }
    setRecipeImage(recipe, value, value ? "Recipe photo URL saved." : "Recipe photo reset to the default.");
  });

  const fileLabel = makeElement("label", "button button-quiet upload-photo-button", "Choose photo");
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/jpeg,image/png,image/webp";
  fileInput.setAttribute("aria-label", `Choose a photo for ${recipe.name || "recipe"}`);
  fileLabel.append(fileInput);
  fileInput.addEventListener("change", async () => {
    const [file] = fileInput.files;
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      showStatus("Choose a JPEG, PNG or WebP image file.", true);
      fileInput.value = "";
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      showStatus("Choose an image smaller than 12 MB.", true);
      fileInput.value = "";
      return;
    }
    showStatus("Preparing your image…");
    try {
      const compressedImage = await compressImage(file);
      if (setRecipeImage(recipe, compressedImage, "Recipe photo saved on this browser.")) {
        urlInput.value = "";
      }
    } catch (error) {
      showStatus(error.message, true);
    } finally {
      fileInput.value = "";
    }
  });

  const resetButton = makeElement("button", "button button-quiet reset-photo-button", "Use default");
  resetButton.type = "button";
  resetButton.addEventListener("click", () => {
    urlInput.value = "";
    setRecipeImage(recipe, "", "Recipe photo reset to the default.");
  });

  controls.append(urlInput, fileLabel, resetButton);
  section.append(controls);
  section.append(makeElement("p", "photo-note", "Photos are saved in this browser and included in recipe backups. Uploaded photos are compressed before saving."));
  return section;
}

function renderIngredientRow(recipe, ingredient, index, isHeader = false, totalElement) {
  const row = makeElement("div", `ingredient-row${isHeader ? " ingredient-header" : ""}`);
  if (isHeader) {
    ["Ingredient", "Quantity", "Unit", "Price per unit", ""].forEach((label) => row.append(makeElement("span", "", label)));
    return row;
  }

  const name = makeInput({ value: ingredient.name, placeholder: "e.g. ingredient name", label: `${recipe.name || "Recipe"} ingredient ${index + 1} name` });
  const quantity = makeInput({ value: ingredient.quantity, placeholder: "Quantity", label: `${recipe.name || "Recipe"} ingredient ${index + 1} quantity`, type: "number", min: "0", step: "any" });
  const unit = document.createElement("select");
  unit.setAttribute("aria-label", `${recipe.name || "Recipe"} ingredient ${index + 1} unit`);
  const unitPlaceholder = makeElement("option", "", "Select unit");
  unitPlaceholder.value = "";
  unit.append(unitPlaceholder);
  UNITS.forEach((unitName) => {
    const option = makeElement("option", "", unitName);
    option.value = unitName;
    unit.append(option);
  });
  if (ingredient.unit && !UNITS.includes(ingredient.unit)) {
    const customUnit = makeElement("option", "", ingredient.unit);
    customUnit.value = ingredient.unit;
    unit.append(customUnit);
  }
  unit.value = ingredient.unit;
  const price = makeInput({ value: ingredient.pricePerUnit, placeholder: "₹ per unit", label: `${recipe.name || "Recipe"} ingredient ${index + 1} price per unit`, type: "number", min: "0", step: "any" });

  [[name, "name"], [quantity, "quantity"], [unit, "unit"], [price, "pricePerUnit"]].forEach(([field, key]) => {
    field.addEventListener("input", () => {
      ingredient[key] = field.value;
      saveRecipes();
      updateTotal(recipe, totalElement);
    });
    field.addEventListener("change", () => {
      ingredient[key] = field.value;
      saveRecipes();
      updateTotal(recipe, totalElement);
    });
  });

  const remove = makeRemoveButton("remove-ingredient", `Remove ingredient ${ingredient.name || index + 1} from ${recipe.name || "recipe"}`, () => {
    recipe.ingredients = recipe.ingredients.filter((item) => item.id !== ingredient.id);
    saveRecipes("Ingredient removed.");
    renderRecipes();
  });
  row.append(name, quantity, unit, price, remove);
  return row;
}

function updateTotal(recipe, totalElement) {
  const total = recipe.ingredients.reduce((sum, ingredient) => {
    const quantity = Number(ingredient.quantity);
    const price = Number(ingredient.pricePerUnit);
    if (!ingredient.quantity || !ingredient.pricePerUnit || !Number.isFinite(quantity) || !Number.isFinite(price)) return sum;
    return sum + quantity * price;
  }, 0);
  const hasPricedIngredients = recipe.ingredients.some((ingredient) => ingredient.quantity !== "" && ingredient.pricePerUnit !== "");
  totalElement.replaceChildren();
  totalElement.append(document.createTextNode("Entered ingredient total: "));
  const value = makeElement("strong", "", hasPricedIngredients ? `₹${total.toLocaleString("en-IN", { maximumFractionDigits: 2 })}` : "—");
  totalElement.append(value);
}

function renderBatchRow(recipe, batch, index) {
  const row = makeElement("div", "batch-row");
  const label = makeInput({ value: batch.label, placeholder: "Batch name (e.g. small)", label: `${recipe.name || "Recipe"} batch ${index + 1} name` });
  const servings = makeInput({ value: batch.servings, placeholder: "Servings", label: `${recipe.name || "Recipe"} batch ${index + 1} servings`, type: "number", min: "1", step: "1" });
  const servingsLabel = makeElement("span", "", "servings");
  [[label, "label"], [servings, "servings"]].forEach(([field, key]) => {
    field.addEventListener("input", () => {
      batch[key] = field.value;
      saveRecipes();
    });
  });
  const remove = makeRemoveButton("remove-batch", `Remove batch ${batch.label || index + 1} from ${recipe.name || "recipe"}`, () => {
    recipe.batches = recipe.batches.filter((item) => item.id !== batch.id);
    saveRecipes("Batch size removed.");
    renderRecipes();
  });
  row.append(label, servings, servingsLabel, remove);
  return row;
}

function renderRecipe(recipe, index) {
  const card = makeElement("article", "recipe-card");
  card.dataset.recipeId = recipe.id;
  const heading = makeElement("header", "recipe-heading");
  heading.append(makeElement("span", "recipe-number", String(index + 1).padStart(2, "0")));

  const nameWrap = makeElement("div", "recipe-name-wrap");
  const nameLabel = makeElement("label", "", "Recipe name");
  nameLabel.htmlFor = `recipe-name-${recipe.id}`;
  const name = makeInput({ value: recipe.name, placeholder: "Enter recipe name", label: "Recipe name" });
  name.id = `recipe-name-${recipe.id}`;
  name.className = "recipe-name";
  name.addEventListener("input", () => {
    recipe.name = name.value;
    saveRecipes();
  });
  nameWrap.append(nameLabel, name);
  const removeRecipe = makeElement("button", "remove-recipe", "Remove recipe");
  removeRecipe.type = "button";
  removeRecipe.addEventListener("click", () => {
    if (!window.confirm(`Remove ${recipe.name || "this recipe"}? This cannot be undone unless you have a backup.`)) return;
    recipes = recipes.filter((item) => item.id !== recipe.id);
    saveRecipes("Recipe removed.");
    renderRecipes();
  });
  heading.append(nameWrap, removeRecipe);

  const content = makeElement("div", "recipe-content");
  content.append(renderRecipeImageEditor(recipe));
  content.append(makeElement("h2", "", "Ingredients & costing"));
  const total = makeElement("div", "ingredient-total");
  const table = makeElement("div", "ingredients-table");
  table.append(renderIngredientRow(recipe, null, 0, true, total));
  if (recipe.ingredients.length) {
    recipe.ingredients.forEach((ingredient, ingredientIndex) => {
      table.append(renderIngredientRow(recipe, ingredient, ingredientIndex, false, total));
    });
  } else {
    table.append(makeElement("p", "empty-ingredients", "No ingredients yet. Add the ingredients and actual amounts for this recipe."));
  }
  const sectionActions = makeElement("div", "section-actions");
  const addIngredient = makeElement("button", "add-line", "＋ Add ingredient");
  addIngredient.type = "button";
  addIngredient.addEventListener("click", () => {
    recipe.ingredients.push({ id: createId(), name: "", quantity: "", unit: "", pricePerUnit: "" });
    saveRecipes("Ingredient row added. Enter your actual ingredient details.");
    renderRecipes();
    findRecipeCard(recipe)?.querySelector(".ingredient-row:not(.ingredient-header) input")?.focus();
  });
  sectionActions.append(addIngredient, total);
  content.append(table, sectionActions);
  updateTotal(recipe, total);

  const batchSection = makeElement("section", "batch-section");
  batchSection.append(makeElement("h2", "", "Batch sizes & servings"));
  const batchList = makeElement("div", "batch-list");
  if (recipe.batches.length) {
    recipe.batches.forEach((batch, batchIndex) => batchList.append(renderBatchRow(recipe, batch, batchIndex)));
  } else {
    batchList.append(makeElement("p", "empty-ingredients", "No batch sizes set. Add the serving quantities you use."));
  }
  const addBatch = makeElement("button", "add-line", "＋ Add batch size");
  addBatch.type = "button";
  addBatch.style.marginTop = "11px";
  addBatch.addEventListener("click", () => {
    recipe.batches.push({ id: createId(), label: "", servings: "" });
    saveRecipes("Batch size added. Enter your batch name and serving quantity.");
    renderRecipes();
    findRecipeCard(recipe)?.querySelector(".batch-row input")?.focus();
  });
  batchSection.append(batchList, addBatch);
  content.append(batchSection);
  card.append(heading, content);
  return card;
}

function findRecipeCard(recipe) {
  return Array.from(recipeList.children).find((card) => card.dataset.recipeId === recipe.id);
}

function renderRecipes() {
  recipeList.replaceChildren();
  recipes.forEach((recipe, index) => recipeList.append(renderRecipe(recipe, index)));
  document.querySelector("#recipe-count").textContent = String(recipes.length);
}

function downloadBackup() {
  const backup = {
    format: "jagalur-recipe-management",
    version: 1,
    exportedAt: new Date().toISOString(),
    recipes,
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `jagalur-recipes-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
  showStatus("Recipe backup downloaded.");
}

function importBackup(file) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const backup = JSON.parse(String(reader.result));
      const incoming = Array.isArray(backup) ? backup : backup.recipes;
      if (!Array.isArray(incoming) || !incoming.every(isValidRecipe)) {
        throw new Error("This file isn't a valid recipe backup. Nothing was changed.");
      }
      if (!window.confirm(`Replace the current ${recipes.length} recipes with ${incoming.length} recipes from this backup?`)) return;
      recipes = incoming;
      if (saveRecipes("Backup imported successfully.")) renderRecipes();
    } catch (error) {
      showStatus(error.message || "The backup file could not be read.", true);
    } finally {
      document.querySelector("#import-file").value = "";
    }
  });
  reader.addEventListener("error", () => {
    showStatus("The selected backup file could not be read.", true);
    document.querySelector("#import-file").value = "";
  });
  reader.readAsText(file);
}

document.querySelector("#add-recipe-button").addEventListener("click", () => {
  const recipe = createRecipe();
  recipes.push(recipe);
  if (saveRecipes("Recipe added. Enter its name and details.")) {
    renderRecipes();
    findRecipeCard(recipe)?.querySelector(".recipe-name")?.focus();
  }
});

document.querySelector("#export-button").addEventListener("click", downloadBackup);
document.querySelector("#import-button").addEventListener("click", () => document.querySelector("#import-file").click());
document.querySelector("#import-file").addEventListener("change", (event) => {
  const [file] = event.currentTarget.files;
  if (file) importBackup(file);
});

renderRecipes();
