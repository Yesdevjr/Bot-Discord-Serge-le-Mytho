const Discord = require('discord.js');
const bot = new Discord.Client({ intents: 3276799 });
const config = require("./config");

const BlaguesAPI = require('blagues-api');
const blagues = new BlaguesAPI(''); // Remplacez 'VOTRE_CLE_API' par votre clé API

bot.login(config.token);

bot.on("messageCreate", async (message) => {
    if (message.content === 'Serge') {
        try {
            const blague = await blagues.random({
                disallow: [
                    blagues.categories.DARK
                ]
            });

            // Vérifiez si le message provient d'un des canaux spécifiques
            const canalSpecifiqueId1 = 'ID canaux Discord';
            const canalSpecifiqueId2 = 'ID canaux Discord';

            if (message.channel.id === canalSpecifiqueId1 || 
                message.channel.id === canalSpecifiqueId2) {
                // Récupérez la blague et la réponse
                const texteBlague = blague.joke;
                const reponseBlague = blague.answer;

                // Envoyez la blague suivie de la réponse dans un seul message
                message.channel.send(`${texteBlague}\nRéponse : ${reponseBlague}`);
            } else {
                // Si le message provient d'un autre canal, vous pouvez ignorer la commande ou répondre en conséquence.
                message.reply("Cette commande n'est pas autorisée dans ce canal.");
            }

        } catch (error) {
            console.error(error);
            message.channel.send("Je sais pas frère.");
        }
    }
});
