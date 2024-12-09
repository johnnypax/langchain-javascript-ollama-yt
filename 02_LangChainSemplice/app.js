const { Ollama } = require("@langchain/ollama");

const llm = new Ollama({
    baseUrl: "http://localhost:7998",
    model: "llama3.1:latest"
})

async function effettuaDomanda(domanda){
    try {
        const response = await llm.invoke(domanda);
        console.log(response);
    } catch (ex) {
        console.log("ERRORE", ex);
    }
}

effettuaDomanda("Perché il cielo è blu?");