/**
 * Created By : Lalit Umbarkar
 * Created On : 03/11/20
 */

var queries = (function () {
    return {
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
                return `query MyQuery {
                    }`
            },
        },
    }
})();
