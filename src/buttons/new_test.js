const { suportRole } = require("../config.json");
const {
  PermissionsBitField,
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle
} = require("discord.js");
const { testerRole } = require("../config.json");

module.exports = {
  id: "new_test",
  permissions: [],
  run: async (client, interaction, playerID) => {
    const player_form = interaction.guild.members.cache.get(playerID).user;

    if (!interaction.member.roles.cache.get(testerRole)) {
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

    const modal = new ModalBuilder()
      .setCustomId(`test_${player_form.id}`)
      .setTitle("Marcar Teste");

    const inputs = [
      {
        custom_id: "test_hr",
        label: "Horário",
        placeholder: "Digite aqui",
        required: true,
      },
      {
        custom_id: "test_data",
        label: "Data",
        placeholder: "Digite aqui",
        required: true,
      },
      {
        custom_id: "test_id",
        label: "ID do jogador",
        placeholder: "Digite aqui",
      },
      {
        custom_id: "test_posicao",
        label: "Posição",
        placeholder: "Digite aqui",
        required: true,
      },
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
