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

async function addSongtoPlaylist(playlistUri:string, songUri: string) {
    // Trying to mimic this curl command:

    // curl -X "POST" "https://api.spotify.com/v1/playlists/<INSERT PLAYLIST URI HERE>/tracks?uris=spotify%3Atrack%3A<INSERT SONG URI HERE>" 
    // -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQCA9lvSH-Vlgothb6-1vP-FLIQtxwsAFaYMJ5NyK-" +
    // "Q0dLDAe36edoMvi1M1zIE2VDVghFFaJJ9-482jWAb3a9YojPtAjUdQKb2WYpIZwp2chHHaXXujAaajl4QSGTc6pNjdhaVtSA_b78UM2MyUMvqyYQ5KzsaUgVcTnZuYW9DcOBOZcwuv6UKBqE5D5tgXAQ"

    const fetchURL = "https://api.spotify.com/v1/playlists/" + playlistUri + "/tracks?uris=spotify%3Atrack%3A" + songUri

    const response = await fetch(fetchURL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer BQCA9lvSH-Vlgothb6-1vP-FLIQtxwsAFaYMJ5NyK-Q0dLDAe36edoMvi1M1zIE2VDVghFFaJJ9-482jWAb3a9YojPtAjUdQKb2WYpIZwp2chHHa' + 
        'XXujAaajl4QSGTc6pNjdhaVtSA_b78UM2MyUMvqyYQ5KzsaUgVcTnZuYW9DcOBOZcwuv6UKBqE5D5tgXAQ'
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}