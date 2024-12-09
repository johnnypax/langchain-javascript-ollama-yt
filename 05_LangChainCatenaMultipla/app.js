const { Ollama } = require("@langchain/ollama");
const { PromptTemplate } = require("@langchain/core/prompts")

const llm = new Ollama({
    baseUrl: "http://localhost:7998",
    model: "llama3.1:latest"
})

const promptTraduzione = PromptTemplate.fromTemplate(
    `Translate the following text into {lingua}. Only provide the translation: {frase}`
)

const promptKeywords = PromptTemplate.fromTemplate(
    `Extract the keywords from the following text, in CSV without explanations: {trad}`
);

async function effettuaTraduzione(fraseInput, linguaOutput) {
    try {
        //Traduzione
        const chainTraduzione = promptTraduzione.pipe(llm);
        //Estrazione Keywords
        const chainKeywords = promptKeywords.pipe(llm);

        const traduzione = await chainTraduzione.invoke({
            lingua: linguaOutput,
            frase: fraseInput
        })

        console.log("TRADUZIONE:", traduzione);

        const keywords = await chainKeywords.invoke({
            trad: traduzione.trim()
        })

        console.log("PAROLE CHIAVE: ", keywords)

    } catch (ex) {
        console.log("ERRORE", ex)
    }
}

effettuaTraduzione("Sono Giovanni Pace, insegnante di informatica", "Spagnolo")