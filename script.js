function showInputForm() {
    const inputFields = document.getElementById("inputFields");
    inputFields.innerHTML = "";

    // 予算計算に必要なフィールドのみ表示
    const fields = {
        costPerGacha: "ガチャ1回の料金 (円)",
        probability: "1回でほしいキャラが出る確率 (%)",
        targetCount: "ほしいキャラの数",
        targetProbability: "目標とする確率 (%)"
    };

    for (const [key, label] of Object.entries(fields)) {
        const fieldLabel = document.createElement("label");
        fieldLabel.setAttribute("for", key);
        fieldLabel.innerText = label;

        const inputField = document.createElement("input");
        inputField.type = "number";
        inputField.id = key;
        inputField.name = key;
        inputField.required = true;

        inputFields.appendChild(fieldLabel);
        inputFields.appendChild(inputField);
    }
    document.getElementById("inputForm").style.display = "block";
}

function simulate() {
    const data = {
        costPerGacha: document.getElementById("costPerGacha") ? parseInt(document.getElementById("costPerGacha").value, 10) : undefined,
        probability: document.getElementById("probability") ? parseFloat(document.getElementById("probability").value) : undefined,
        target_count: document.getElementById("targetCount") ? parseInt(document.getElementById("targetCount").value, 10) : undefined,
        target_probability: document.getElementById("targetProbability") ? parseFloat(document.getElementById("targetProbability").value) : undefined,
    };

    fetch('/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerText = `計算結果: ${data.result}`;
        document.getElementById("result").style.display = "block";
    })
    .catch(error => console.error("エラー:", error));
}

