// Load JSON file
fetch("static/data.json")
  .then((response) => response.json())
  .then((data) => {
    // Reference to the container where examples will be inserted
    const container = document.getElementById("context-examples-container");

    // Loop through each example in the data
    data.examples.forEach((example) => {
      // Create a new section for each example
      const exampleSection = document.createElement("div");
      exampleSection.className = "example-section";

      // Create HTML structure for the example
      const exampleHTML = `
        <div class="columns is-centered hero is-light" style="margin-bottom: 2rem; padding: 10px; border-radius: 10px">
            <div class="column is-full-width">
                <h3 class="title is-3" style="font-weight: 900;">Example ${example.exampleNumber}</h3>
                <div id="instruction-box-${example.exampleNumber}" class="box instruction-box">
                    <h2 class="title is-5">Initial User Instruction</h2>
                    <p id="instruction-text-${example.exampleNumber}">${example.instruction}</p>
                    <hr/>
                    <h2 class="title is-5">Single Cycle QA with User</h2>
                    <div id="qa-content-${example.exampleNumber}" class="qa-content"></div>
                </div>
            </div>
            <div class="columns is-centered">
                <div class="column is-half">
                    <div class="box equal-height-box">
                        <h3 class="title is-5 has-text-weight-bold">Pre-feedback</h3>
                        <img src="${example.pre_src}" alt="Pre-Feedback Image" />
                    </div>
                </div>

                <div class="column is-half">
                    <div class="box equal-height-box">
                        <div class="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item">
                                  <h4 class="image-title title is-5">Post-feedback with ChartAJ</h4>
                                  <img src="${example.AJ_src}" alt="AJ Feedback Image" />
                                </div>
                                <div class="carousel-item">
                                  <h4 class="image-title title is-5">ChartX+A-CoT+SC</h4>
                                  <img src="${example.chartX_src}" alt="ChartX Feedback Image" />
                                </div>
                                <div class="carousel-item">
                                  <h4 class="image-title title is-5">MatPlotBench+A-CoT+SC </h4>
                                  <img src="${example.matplot_src}" alt="Matplot Feedback Image" />
                                </div>
                                <div class="carousel-item">
                                  <h4 class="image-title title is-5">Plot2Code+A-CoT+SC</h4>
                                  <img src="${example.plot2code_src}" alt="plot2code Feedback Image" />
                                </div>
                                <div class="carousel-item">
                                  <h4 class="image-title title is-5">ChatEval</h4>
                                  <img src="${example.ChatEval_src}" alt="ChatEval Feedback Image" />
                                </div>
                            </div>
                            <button class="carousel-control-prev">‹</button>
                            <button class="carousel-control-next">›</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `;

      // Insert the example HTML into the section
      exampleSection.innerHTML = exampleHTML;
      container.appendChild(exampleSection);

      // Populate Q&A for the example
      const qaContent = document.getElementById(
        `qa-content-${example.exampleNumber}`
      );
      example.qa.forEach((item, index) => {
        const qaItem = document.createElement("div");
        qaItem.className = "qa-item";

        const question = document.createElement("p");
        question.className = "qa-question";
        question.textContent = `Q${index + 1}: ${item.question}`;

        const answer = document.createElement("p");
        answer.className = "qa-answer";
        answer.textContent = `A${index + 1}: ${item.answer}`;

        qaItem.appendChild(question);
        qaItem.appendChild(answer);
        qaContent.appendChild(qaItem);
      });

      // Carousel functionality (inside the loop)
      const carouselInner = exampleSection.querySelector(".carousel-inner");
      let currentIndex = 0;
      const imagesCount = carouselInner.children.length;

      exampleSection
        .querySelector(".carousel-control-prev")
        .addEventListener("click", () => {
          currentIndex =
            currentIndex === 0 ? imagesCount - 1 : currentIndex - 1;
          carouselInner.style.transform = `translateX(-${
            (currentIndex * 100) / imagesCount
          }%)`;
        });

      exampleSection
        .querySelector(".carousel-control-next")
        .addEventListener("click", () => {
          currentIndex =
            currentIndex === imagesCount - 1 ? 0 : currentIndex + 1;
          carouselInner.style.transform = `translateX(-${
            (currentIndex * 100) / imagesCount
          }%)`;
        });
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
