const express = require("express");
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
const prompt = PromptTemplate.fromTemplate(`
    History: {storico}
    {input}
`)

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const host = "127.0.0.1";
const port = 4001;

app.listen(port, host, () => {
    console.log(`Server in ascolto su: http://${host}:${port}`)
});

app.post("/jarvis", async (req, res) => {
    try{
        const richiesta = req.body.richiesta;
        if(!richiesta)
            throw new Error("Empty Body");            

        console.log("Memoria: ", await memory.loadMemoryVariables({}))

        const chain = new ConversationChain({
            llm,
            prompt,
            memory
        });
        const response = await chain.invoke({
            input: richiesta
        })
    
        res.status(200).json(
            {
                status: "SUCCESS",
                data: response
            }
        )
    } catch (ex){
        res.status(400).json(
            {
                status: "ERROR",
                data: ex.message
            }
        )
    }
})