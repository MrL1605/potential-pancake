/**
 * Created By : Lalit Umbarkar
 * Created On : 03/11/20
 */

var gameLoader = (function () {

    const graphQLEndpoint = "";
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
        }
    }
})();
