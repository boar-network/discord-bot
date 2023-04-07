### Architecture

Add scripts or event hooks to the `/scripts/` folder. These should export an
object with two keys:
+ `trigger`, which is the
  [Event](https://discord.js.org/#/docs/discord.js/main/typedef/Events) that
  triggers the script.
+ `execute`, which is a function that takes in a `client` and returns a event
  handler function. For a barebones example of this, check out
  [logged-in.js](./scripts/logged-in.js).

Add cron jobs to the `/cron/` folder. These should export the following keys:
+ `schedule`, which is a [cron-formatted string](https://crontab.guru/).
+ `timezone`, which is the [english-named
  timezone](https://code2care.org/pages/java-timezone-list-utc-gmt-offset) like
  `America/New_York`.
+ `execute`, which is a function that takes in a `client` and returns a
  function to be run on a cron schedule.

### Local Development
1. Create your own bot using the [the discord developer portal](https://discord.com/developers/applications).
2. Make sure your bot has the proper server authorizations.
3. Create a server, invite the bot to it, and give it a good permissions.
4. Clone this repo, and set the following environment variables below. I
   recommend [direnv](https://direnv.net/) to manage this.
5. Navigate to this directory.
6. `$ npm ci`
7. `$ node index.js`
8. You should be greeted with something that looks like:

```
Logged in as BotUser#123!
Successfully registered application commands.
```

### Environment Configuration

+ `TOKEN`: The token for the discord bot from the discord API.
+ `ROLE`: The role-id for threads registration.
+ `GUILD`: The id of the server. Any link to a discord message has the
  following structure:
  https://discord.com/channels/GUID_ID/CHANNEL_ID/MESSAGE_ID.
