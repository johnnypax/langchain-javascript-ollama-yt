const { Ollama } = require("@langchain/ollama");
const { PromptTemplate } = require("@langchain/core/prompts")
const { BufferMemory } = require("langchain/memory")
const { ConversationChain } = require("langchain/chains")

const llm = new Ollama({
    baseUrl: "http://localhost:7998",
    model: "llama3.1:latest"
})
const memory = new BufferMemory({
    memoryKey: "storico"
})

const promptSet = PromptTemplate.fromTemplate(`
    History: {storico}
    From now you can call me {nominativo}
`);
const promptGet = PromptTemplate.fromTemplate(`
    History: {storico}
    {input}
`);

async function impostaNome(nome) {
    try {
        // console.log("Memoria: ", await memory.loadMemoryVariables({}))

        const chainSet = new ConversationChain({
            llm,
            prompt: promptSet,
            memory
        });
        const response = await chainSet.invoke({
            nominativo: nome
        })
        console.log("SET:", response)

        // console.log("Memoria dopo aggiornamento: ", await memory.loadMemoryVariables({}))
    } catch (ex) {
        console.log("ERRORE", ex)
    }
}

async function restituisciNome() {
    try {
        const chainGet = new ConversationChain({
            llm,
            prompt: promptGet,
            memory
        })
        const response = await chainGet.invoke({
            input: "What is my name?"
        });

        console.log("GET:", response)
    } catch (ex) {
        console.log("ERRORE", ex)
    }
}

async function sequenzializzaPrompt() {
    await impostaNome("Giovanni Pace");
    await restituisciNome();
}

sequenzializzaPrompt();