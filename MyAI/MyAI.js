import { config } from "dotenv"
import { Configuration, OpenAIApi } from "openai"
import readline from "readline"

config()

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.MyKey
}))

const userInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log("You are now connected to ChatGPT. Type in your question and press the enter key.")
console.log("Or type in 'quit' to end.")
console.log("")

userInput.prompt()
userInput.on("line", async input => {
    if(input != "quit"){
        const reply = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: input }],
        })

        console.log(reply.data.choices[0].message.content)
        userInput.prompt()
    }
    else{
        process.exit()
    }
})

