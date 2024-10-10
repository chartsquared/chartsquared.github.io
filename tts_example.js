fetch("static/ttsData.json")
  .then((response) => response.json())
  .then((data) => {
    // Reference to the container where examples will be inserted
    const container = document.getElementById("tts-examples-container");

    // Loop through each example in the data
    data.examples.forEach((example) => {
      // Create a new section for each example
      const exampleSection = document.createElement("div");
      exampleSection.className = "example-section";

      // Create HTML structure for the example
      const exampleHTML = `
        <div id="tts-example-${example.exampleNumber}" class="columns is-centered hero is-light" style="margin-bottom: 2rem; padding: 10px; border-radius: 10px">
            <div class="column is-full-width" style="padding: 15px 0px;">
                <h3 class="title is-3">Example ${example.exampleNumber}</h3>
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
                        <h3 class="title is-5 has-text-weight-bold">Pre-TTS</h3>
                        <img src="${example.pre_src}" alt="Pre-Feedback Image" />
                    </div>
                </div>
                <div class="column is-half">
                    <div class="box equal-height-box">
                        <h3 class="title is-5 has-text-weight-bold">Post-TTS</h3>
                        <img src="${example.post_src}" alt="Post-Feedback Image" />
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

      // Ensure Q&A content is populated correctly
      example.qa.forEach((item, index) => {
        const qaItem = document.createElement("div");
        qaItem.className = "qa-item";

        const question = document.createElement("p");
        question.className = "qa-question";
        question.innerHTML = `<strong>Q${index + 1}:</strong> ${item.question}`;

        const answer = document.createElement("p");
        answer.className = "qa-answer";
        answer.innerHTML = `<strong>A${index + 1}:</strong> ${item.answer}`;

        // Append question and answer to the qaItem
        qaItem.appendChild(question);
        qaItem.appendChild(answer);

        // Append qaItem to qaContent
        qaContent.appendChild(qaItem);
      });
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
