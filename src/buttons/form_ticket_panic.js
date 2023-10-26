const {ActionRowBuilder, PermissionsBitField, ButtonBuilder, ChannelType, EmbedBuilder} = require('discord.js');
const path = require('path');
const { suportRole, ticket_test_category } = require('../config.json');

module.exports = {
	id: 'form_ticket_panic',
	permissions: [],
	run: async (client, interaction, playerID) => {

		const player_form = interaction.guild.members.cache.get(playerID).user;

		if (!interaction.member.roles.cache.get(suportRole)) {
			if (
			  !interaction.member.permissions.has(
				PermissionsBitField.resolve([PermissionsBitField.Flags.Administrator])
			  )
			) {
			  return interaction.reply({
				content: `${interaction.user}, Você não tem permissão para usar isso!`,
				ephemeral: true,
			  });
			}
		  }	
       
		const channel = await interaction.guild.channels.create({
			name: `ticket-${player_form.username}`,
			type: ChannelType.GuildText,
			parent: ticket_test_category,
			permissionOverwrites: [
				{
					id: interaction.guild.roles.everyone,
					deny: PermissionsBitField.resolve([PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages]),
				},
				{
					id: playerID,
					allow: PermissionsBitField.resolve([PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages]),
				},
				{
					id: suportRole,
					allow: PermissionsBitField.resolve([PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages]),
				},
			],
		});
		

		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId(`new_test_${player_form.id}`)
					.setLabel('Marcar Teste')
					.setStyle('Success'),
				new ButtonBuilder()
					.setCustomId(`close_ticket_${player_form.id}`)
					.setLabel('Fechar Ticket')
					.setStyle('Danger'),
			);

		const embed = new EmbedBuilder()	
			.setTitle(`Formulário | Panic | ${player_form.username}`)
			.setDescription(`Olá, <@${playerID}>!, mande print do seu perfil e aguarde um atendente!`)
			.setColor('#23272A')
			.setTimestamp();

		await channel.send({ embeds: [embed], components: [row] });

		await interaction.reply({ content: `Seu ticket foi criado em ${channel}`, ephemeral: true });
	}
};