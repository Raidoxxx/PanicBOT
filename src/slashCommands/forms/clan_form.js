const { ActionRowBuilder, ApplicationCommandType, ModalBuilder, TextInputBuilder, TextInputStyle, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "form",
    description: "fazer um pedido de clã",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
          const modal = new ModalBuilder()
			.setCustomId(`form_panic_${interaction.user.id}`)
			.setTitle('Formulário | Panic')
          

          const inputs = [
            { custom_id: 'rank_panic_form', label: 'Qual é o seu rank?', placeholder: 'Digite aqui', required: true },
            { custom_id: 'idade_panic_form', label: 'Qual é a sua idade?', placeholder: 'Digite aqui', required: true },
            { custom_id: 'id_panic_form', label: 'Qual é o seu ID?', placeholder: 'Digite aqui', required: true },
            { custom_id: 'posicao_panic_form', label: 'Qual é a sua posição?', placeholder: 'Digite aqui', required: true },
            { custom_id: 'dispositivo_panic_form', label: 'Qual é o seu dispositivo?', placeholder: 'Digite aqui', required: true },
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
    }

}