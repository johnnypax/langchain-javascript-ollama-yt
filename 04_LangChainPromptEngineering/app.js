const { Ollama } = require("@langchain/ollama");
const { PromptTemplate } = require("@langchain/core/prompts")

const llm = new Ollama({
    baseUrl: "http://localhost:7998",
    model: "llama3.1:latest"
})

const prompt = PromptTemplate.fromTemplate(
    `Translate the following text into {lingua}. 
    Only provide translation without additional explanations: {frase}`);

async function effettuaTraduzione(fraseInput, linguaOutput){
    try {
        const chain = prompt.pipe(llm);
        const response = await chain.invoke(
            {
                frase: fraseInput,
                lingua: linguaOutput
            }
        )
        
        console.log("TRADUZIONE:", response);
    } catch (ex) {
        console.log("ERRORE", ex)
    }
}

effettuaTraduzione("Sono Giovanni Pace, insegnante di informatica", "Spagnolo")