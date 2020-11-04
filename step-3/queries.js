/**
 * Created By : Lalit Umbarkar
 * Created On : 03/11/20
 */

var queries = (function () {
    return {
        execGraphQL: async (endpoint, query, operationName, variables) => {
            const result = await fetch(endpoint,
                {
                    method: "POST",
                    body: JSON.stringify({query, variables, operationName})
                }
            );
            return await result.json();
        },
        mutation: {
            addGame: (gameName, gameURL) => {
                return `mutation MyQuery {
                      insert_games(objects: {game_name: "${gameName}", game_url: "${gameURL}"}) {
                        returning {
                          game_id
                        }
                      }
                    }`
            },
            addUser: (userName) => {
                return ``
            },
            addFavGame: () => {
                return ``
            },
            updateLocalUserName: (username) => {
                return localStorage.setItem("username", username);
            },
        },
        query: {
            getLocalUserName: () => {
                return localStorage.getItem("username")
            },
            getAllGames: () => {
                return [`query MyQuery {
                          games {
                            game_name
                            game_url
                            game_id
                          }
                        }`, "MyQuery", {}];
            },
        },
    }
})();
