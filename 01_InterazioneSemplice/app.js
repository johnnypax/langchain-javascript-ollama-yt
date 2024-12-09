const { Ollama } = require("ollama");

const llm = new Ollama(
    {
        host: "http://localhost:7998"
    }
);

async function effettuaDomanda(domanda) {
    try {

        const response = await llm.chat(
            {
                model: "llama3.1:latest",
                messages: [
                    {
                        role: "user",
                        content: domanda
                    }
                ]
            }
        )
        console.log(response.message.content)

    } catch (ex) {
        console.log("ERRORE", ex)
    }
}

effettuaDomanda("Perché il cielo è blu?")