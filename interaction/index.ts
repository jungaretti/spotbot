import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default httpTrigger;

function parseSongURL(url: string) {
    if (!url) {
        // throw error or send a message in discord asking for input
        return null
    }
    else {
        const uri = url.substring(
            url.lastIndexOf("track/") + 1, 
            url.lastIndexOf("?")
        )
        console.log("Song URI is: ", uri)
        return uri
    } 
    
}

function parsePlaylistURL(url: string) {
    if (!url) {
        // throw error or send a message in discord asking for input
        return null
    }
    else {
        const uri = url.substring(
            url.lastIndexOf("playlist/") + 1, 
            url.lastIndexOf("?")
        )
        console.log("Playlist URI is: ", uri)
        return uri
    } 
    
}

//  DISCORD JUNK COPIED FROM MATTBOT FOR USE HERE


// module.exports = async function (context, req) {
//     if (!verifyRequest(req)) {
//       // Ignore unsigned requests
//       context.res = resInv();
//       return;
//     }
  
//     const interaction = req.body;
//     if (interaction.type === 1) {
//       // Acknowledge pings
//       context.res = resAck();
//     } else {
//       // Reply to interactions
//       switch (interaction.data.name) {
//         case "movie":
//           const movie = pickRandom(movies);
//           context.res = resMsg(buildRecommendation(movie));
//           break;
//         default:
//           context.res = resMsg("Alright, alright, alright!");
//           break;
//       }
//     }
//   };
//
// // "You must validate the request each time you receive an interaction."
// // https://discord.com/developers/docs/interactions/slash-commands#security-and-authorization
// function verifyRequest(req) {
//     // prettier-ignore
//     const publicKey="71c0aebfcef970766575bc42497d1b9334b97b62fd6879a88d4a815f8536f864";
//     const signature = req.headers["x-signature-ed25519"];
//     const timestamp = req.headers["x-signature-timestamp"];
  
//     // Invalid requests may not have those headers
//     return (
//       signature &&
//       timestamp &&
//       nacl.sign.detached.verify(
//         Buffer.from(timestamp + req.rawBody),
//         Buffer.from(signature, "hex"),
//         Buffer.from(publicKey, "hex")
//       )
//     );
//   }
  
  
//   const resInv = () => {
//     return {
//       status: 401,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: {
//         error: "Invalid request signature",
//       },
//     };
//   };
  
//   const resAck = () => {
//     return {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: {
//         type: 1,
//       },
//     };
//   };
  
//   const resMsg = (content) => {
//     return {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: {
//         type: 4,
//         data: {
//           content,
//         },
//       },
//     };
//   };
  
  