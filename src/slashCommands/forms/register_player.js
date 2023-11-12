const {
  ActionRowBuilder,
  ApplicationCommandType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ApplicationCommandOptionType,
  PermissionsBitField
} = require("discord.js");

const { suportRole } = require("../../config.json");

module.exports = {
  name: "register",
  description: "Registra um jogador no banco de dados",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  run: async (client, interaction) => {

    if (!interaction.member.roles.cache.get(suportRole) || !interaction.member.permissions.has(PermissionsBitField.ADMINISTRATOR)) {
      return interaction.reply({
        content: `${interaction.user}, Você não tem permissão para usar isso!`,
        ephemeral: true,
      });
    }

    const modal = new ModalBuilder()
      .setCustomId(`register_${interaction.user.id}`)
      .setTitle("Register | Player");

    const inputs = [
      {
        custom_id: "register_username",
        label: "Username",
        placeholder: "Digite aqui",
        required: true,
      },
      {
        custom_id: "register_id",
        label: "ID",
        placeholder: "Digite aqui",
        required: true,
      }
    ];

    for (const input of inputs) {
      const textInput = new TextInputBuilder({
        ...input,
        min: 1,
        max: 100,
        style: TextInputStyle.Short,
      });

      const row = new ActionRowBuilder().addComponents(textInput);
      modal.addComponents(row);
    }

    await interaction.showModal(modal);
  },
};
