/**
 * Created By : Lalit Umbarkar
 * Created On : 03/11/20
 */

var gameLoader = (function () {

    const graphQLEndpoint = "https://sharing-magpie-86.hasura.app/v1/graphql";
    let showNewUser = true;

    const getById = (_id) => {
        return document.getElementById(_id);
    }
    const newUserRegistered = () => {
        let name = getById("users-name-input").value;
        if (!name) {
            getById("users-name-input").classList.add("error");
            return;
        }
        queries.mutation.updateLocalUserName(name);
        showNewUser = false;
        gameLoader.render();
    }
    const updateGameList = () => {
        queries.execGraphQL(graphQLEndpoint, ...queries.query.getAllGames())
            .then((res) => {
                if (res["data"] && res["data"]["games"])
                    getById("complete-game-list").innerHTML = getGameListHTML(res["data"]["games"]);
            });
    }

    const getGameListHTML = (gameList) => {
        let gameHTML = "";
        for (let eachGame of gameList) {
            gameHTML += `<div class="item" id="game_list_${eachGame["game_id"]}">
                            <div class="right floated content">
                                <div class="ui labeled button">
                                    <div class="ui red inverted button">
                                        <i class="heart icon"></i> Like
                                    </div>
                                    <a class="ui basic red inverted left pointing label">1,048</a>
                                </div>
                            </div>
                            <div class="content">
                                <div class="header">${eachGame["game_name"]}</div>
                                <div class="description">Check the 
                                    <a href="${eachGame["game_link"]}" target="_blank">Github repo</a>
                                </div>
                            </div>
                        </div>`;
        }
        return gameHTML;
    }

    return {
        init: () => {
            showNewUser = !queries.query.getLocalUserName();
            gameLoader.registerListeners();
            gameLoader.render();
        },
        registerListeners: () => {
            getById("save-username-btn").onclick = newUserRegistered;
        },
        render: () => {
            if (showNewUser) {
                getById("new-user-block").setAttribute("style", "display: block");
                getById("game-block").setAttribute("style", "display: none");
                return;
            }
            getById("new-user-block").setAttribute("style", "display: none");
            getById("game-block").setAttribute("style", "display: block");
            updateGameList();
        }
    }
})();
