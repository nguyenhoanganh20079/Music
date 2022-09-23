const { Database } = require("st.db");
const { green, white } = require('chalk');

module.exports = async (client) => {
    console.log(white('[') + green('INFO') + white('] ') + green(`Database `) + white('Events') + green(' Loaded!'));

    client.createExSetup = async function (interaction) {
        const db = new Database("./settings/models/setup.json", { databaseInObject: true });
        const database = await db.has(interaction.guild.id);
        if (!database) {
            await db.set(interaction.guild.id, {
                setup_enable: false,
                setup_msg: "",
                setup_ch: "" 
            });
        }
    };

    client.createAlreadySetup = async function (interaction) {
        const db = new Database("./settings/models/setup.json", { databaseInObject: true });
        await db.set(interaction.guild.id, {
            setup_enable: false,
            setup_msg: "",
            setup_ch: "" 
        });
    };

    client.createSetup = async function (interaction, channel, message) {
        const db = new Database("./settings/models/setup.json", { databaseInObject: true });
        await db.set(interaction.guild.id, {
            setup_enable: true,
            setup_msg: message,
            setup_ch: channel 
        });
    }

    client.createLang = async function (guildId) {
        const db = new Database("./settings/models/language.json", { databaseInObject: true });

        const database = await db.has(guildId);
        if (!database) {
            await db.set(guildId, {
                language: "en"
            });
        }
    };

    client.createPlay = async function (interaction, message) {
        const db = new Database("./settings/models/message.json", { databaseInObject: true });
        
        await db.set(interaction.guild.id, {
            channel_id: interaction.channel.id,
            message_id: message
        });
    };

    client.interval = null;

    client.clearInterval = async function (interval) {
        clearInterval(interval);
    }

};