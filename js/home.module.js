import { Details } from './gameDetails.module.js';

export class Games {
    constructor() {
        this.games = [];
        this.details = new Details();
        this.allGames();
    }

    async allGames() {
        const loader = document.getElementById('loader');
        const header = document.querySelector('header');

        const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'cbc05b0861msh253908aae4ed7d9p181052jsnff0a8378d9e8',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        try {
            loader.classList.remove('d-none');
            header.classList.add('d-none');

            const res = await fetch(url, options);
            const data = await res.json();
            this.games = data;
            this.displayGames();
        } catch (error) {
            console.error(error);
        } finally {
            header.classList.remove('d-none');
            loader.classList.add('d-none');
        }
    }

    displayGames(games = this.games) {
        const gamesContainer = document.getElementById('games');
        let html = '';

        games.forEach(game => {
            html += `
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="inner game-card" game-id="${game.id}">
                        <img src="${game.thumbnail}" alt="${game.title}" class="w-100 rounded-3 thumbnail">
                        <div class="shortInfo text-center d-flex flex-column justify-content-center">
                            <h4 class="gameTitle">${game.title}</h4>
                            <p class="shortDesc">${game.short_description}</p>
                            <div class="d-flex justify-content-around">
                                <p class="bg-dark-subtle p-2 rounded-3 fw-medium m-0 genre">${game.genre}</p>
                                <p class="bg-dark-subtle p-2 rounded-3 fw-medium m-0 platform">${game.platform}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        gamesContainer.innerHTML = html;

        const gameCards = gamesContainer.querySelectorAll('.game-card');
        gameCards.forEach(card => {
            card.addEventListener('click', () => {
                const gameId = card.getAttribute('game-id');
                this.details.gameDetails(gameId);
            });
        });
    }
}
