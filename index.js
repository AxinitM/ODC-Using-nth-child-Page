document.addEventListener("DOMContentLoaded", function () {
    const radioButtons = document.querySelectorAll(
      "input[name='image-type']"
    );
    const tdElements = document.querySelectorAll(".child-item");

    function updateTableContent(value) {
      tdElements.forEach((td, index) => {
        if (value === "hippo") {
          td.innerHTML = '<i class="fa-solid fa-hippo"></i>';
        } else if (value === "fish") {
          td.innerHTML = '<i class="fa-solid fa-fish-fins"></i>';
        } else {
          td.textContent = (index % 8) + 1;
        }
      });
    }

    updateTableContent("digits");

    radioButtons.forEach((radio) => {
      radio.addEventListener("change", function () {
        updateTableContent(this.value);
      });
    });

    // eventListener for tds with the .selector class
    document.querySelectorAll(".selector").forEach((mergedCell) => {
      mergedCell.addEventListener("click", () => {
        const row = mergedCell.parentElement;
        const childItems = row.querySelectorAll(".child-item");
        const selector = mergedCell.textContent.trim();

        mergedCell.style.color =
          mergedCell.style.color === "var(--accentColor)"
            ? ""
            : "var(--accentColor)";

        // checking highlighting and remove it if already highlighted
        const hasHighlight = [...childItems].some((item) =>
          item.classList.contains("highlight")
        );
        if (hasHighlight) {
          childItems.forEach((item) => {
            item.classList.remove("highlight");
            const tooltip = item.querySelector(".tooltip-text");
            if (tooltip) tooltip.remove();
          });
          return;
        }

        // adding highlights and tooltips for chosen selectors
        childItems.forEach((item, index) => {
          let shouldHighlight = false;
          let tooltipText = "";

          switch (selector) {
            case ":first-child":
              shouldHighlight = index === 0;
              tooltipText = "Selects the first child";
              break;
            case ":last-child":
              shouldHighlight = index === childItems.length - 1;
              tooltipText = "Selects the last child";
              break;
            case ":nth-child(even)":
              shouldHighlight = (index + 1) % 2 === 0;
              tooltipText = "Selects even children";
              break;
            case ":nth-child(odd)":
              shouldHighlight = (index + 1) % 2 !== 0;
              tooltipText = "Selects odd children";
              break;
            case ":nth-child(2)":
              shouldHighlight = index === 1;
              tooltipText = "Selects the second child";
              break;
            case ":nth-child(4n)":
              shouldHighlight = (index + 1) % 4 === 0;
              tooltipText = "Selects every fourth child";
              break;
            case ":nth-child(n+3)":
              shouldHighlight = index >= 2;
              tooltipText = "Selects all children starting from the third";
              break;
            case ":nth-child(-n+3)":
              shouldHighlight = index <= 2;
              tooltipText = "Selects the first three children";
              break;
            case ":nth-child(3n+1)":
              shouldHighlight = index % 3 === 0;
              tooltipText =
                "Selects every third child starting from the first";
              break;
            case ":nth-child(3n-1)":
              shouldHighlight = (index + 1) % 3 === 2;
              tooltipText =
                "Selects every third child starting from the second";
              break;
            case ":nth-last-child(3)":
              shouldHighlight = index === childItems.length - 3;
              tooltipText = "Selects the third last child";
              break;
          }

          if (shouldHighlight) {
            item.classList.add("highlight");
            const tooltip = document.createElement("span");
            tooltip.classList.add("tooltip-text");
            tooltip.textContent = tooltipText;
            item.appendChild(tooltip);
          }
        });
      });
    });

    // Resetting highlights and tooltips by Reset button
    document
      .getElementById("reset-button")
      .addEventListener("click", () => {
        updateTableContent("digits");
        document.getElementById("digits").checked = true;

        document.querySelectorAll(".selector").forEach((mergedCell) => {
          mergedCell.style.color = "";
        });

        document.querySelectorAll(".highlight").forEach((item) => {
          item.classList.remove("highlight");
          const tooltip = item.querySelector(".tooltip-text");
          if (tooltip) tooltip.remove();
        });
      });
  });