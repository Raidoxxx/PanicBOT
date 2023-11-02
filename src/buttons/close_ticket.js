const { suportRole } = require("../config.json");
const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const { log_channel } = require("../config.json");

module.exports = {
  id: "close_ticket",
  permissions: [],
  run: async (client, interaction, playerID) => {
    const player_form = interaction.guild.members.cache.get(playerID).user;

    if (!interaction.member.roles.cache.get(suportRole)) {
      if (
        !interaction.member.permissions.has(
          PermissionsBitField.resolve([PermissionsBitField.Flags.Administrator])
        )
      ){
        return interaction.reply({
          content: `${interaction.user}, Você não tem permissão para usar isso!`,
          ephemeral: true,
        });
      }
    }

    const channel = interaction.guild.channels.cache.find(
      (channel) => channel.name === `ticket-${player_form.id}`
    );

    async function fetchAllMessages() {
      let messages = [];
      let attachments = [];

      const fetchedMessages = await channel.messages.fetch({ limit: 100 });

      fetchedMessages.forEach((msg) => {
        messages.unshift(`<@${msg.author.id}>: ${msg.content}`);
        attachments.push(
          ...msg.attachments.map((attachment) => attachment.url)
        );
      });

      return [...messages, ...attachments];
    }

    const logs = interaction.guild.channels.cache.find(
      (channel) => channel.id === log_channel
    );

    const messages = await fetchAllMessages();
    // check if message is text ou image
    const message_text = messages.filter(
      (message) => !message.includes("https://")
    );

    if (!messages)
      return logs.send({
        embeds: [
          new EmbedBuilder().setDescription(
            `🚫 ${interaction.user},Ticket fechado com sucesso! \n\n **Usuário:** ${player_form} \n **Atendente:** ${interaction.user}`
          ),
        ],
      });

    const embeds = [
      new EmbedBuilder()
        .setDescription(
          `🚫 ${
            interaction.user
          }, Ticket fechado com sucesso! \n\n **Usuário:** ${player_form} \n **Atendente:** ${
            interaction.user
          } \n\n **Mensagens:** \n\n ${message_text.join("\n\n")}}`
        )
        .setColor("Red"),
    ];

    await logs.send({ embeds: embeds });
    channel.delete();
  },
};
