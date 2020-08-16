const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (client, message, args, config) => {
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`${message.author.username}, you need the \`Ban Members\` permission to execute this command.`);

        // Mention or provide member's ID
        let bUser = message.mentions.members.first() || message.guild.member(args[0])
        if (!bUser) return message.channel.send(`${message.author.username}, please specify a valid user.`);

        // Author banning author
        if (message.author.id === bUser.id) return message.channel.send(`You cannot ban yourself, ${message.author.username}.`)

        // Bot permissions check
        if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(`${message.author.username}, I don't have permission to perform this command.`)

        // Can't kick members with ADMIN permission

        let args1 = message.content.slice(1).split(/ +/);
        let bReason = args1.slice(2).join(' ');

        if (!bReason) return message.channel.send(`${message.author.username}  you need to give a reason.`)

        // Sends Ban Message
        let banEmbed = new Discord.MessageEmbed()
            .setAuthor(`Banned`, message.author.avatarURL({ dynamic: true, format: 'png' }))
            .setColor(message.color)
            .addField('**User**:', `\`${bUser.user.tag}\``)
            .addField('**Responsible Moderator**:', `\`${message.author.username}\``)
            .addField('**Command Executed In**:', message.channel)
            .addField('**Date**:', moment.utc(message.createdAt).format('dddd, MMMM Do YYYY'))
            .addField('**ID:**', `${bUser.id}`)
            .addField('**Reason**:', bReason);

        let banEmbedDM = new Discord.MessageEmbed()
            .setAuthor(`Ban Moderation`, message.author.avatarURL({ dynamic: true, format: 'png' }))
            .setColor(message.color)
            .addField('**User**:', `\`${bUser.user.tag}\``)
            .addField('**Responsible Moderator**:', `\`${message.author.username}\``)
            .addField('**Date**:', moment.utc(message.createdAt).format('dddd, MMMM Do YYYY'))
            .addField('**Reason**:', bReason);

        bUser.send(banEmbedDM)
        message.guild.member(bUser).ban(bReason);
        message.channel.send(banEmbed).then(m => m.delete({ timeout: 10000 }));
}