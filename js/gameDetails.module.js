// Display selected game info
export class Details {
    constructor() {
        this.details = [];
    }

    async gameDetails(gameId) {
        const header = document.querySelector('header');
        const loader = document.getElementById('loader');

        const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;
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

            const response = await fetch(url, options);
            const data = await response.json();
            this.details = data;

            this.showDetails();

        } catch (error) {
            console.error(error);
        } finally {
            loader.classList.add('d-none');
        }
    }

    showDetails() {
        const {
            title,
            genre,
            platform,
            publisher,
            developer,
            release_date,
            description,
            minimum_system_requirements = {},
            screenshots = [],
            thumbnail,
            game_url
        } = this.details;


        const allImgs = [{ image: thumbnail }, ...screenshots];


        const indicators = allImgs.map((_, i) =>
            `<button type="button" data-bs-target="#carousel" data-bs-slide-to="${i}" class="${i === 0 ? 'active' : ''}" aria-label="Slide ${i + 1}"></button>`
        ).join('');

        const carouselItems = allImgs.map((img, i) =>
            `<div class="carousel-item ${i === 0 ? 'active' : ''} data-bs-interval="3000">
                <img src="${img.image}" class="d-block w-100" alt="${title} Image ${i + 1}">
            </div>`
        ).join('');

        const gameDetails = document.getElementById('details');

        gameDetails.innerHTML = `
        <div id="close" class="text-end mb-4">
            <button type="button" id="closeBtn" class="btn-close" aria-label="Close"></button>
        </div>
        
        <div id="carousel" class="carousel slide carousel-fade mb-5 w-75 m-auto" data-bs-ride="carousel">
            <div class="carousel-indicators">
                ${indicators}
            </div>
            <div class="carousel-inner">
                ${carouselItems}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

        <div id="gameInfo" class="text-center">
            <div class="row g-3">
                <div class="col-md-4 col-sm-6"><h2 class="h4">Title:</h2><p>${title}</p></div>
                <div class="col-md-4 col-sm-6"><h2 class="h4">Genre:</h2><p>${genre}</p></div>
                <div class="col-md-4 col-sm-6"><h2 class="h4">Platform:</h2><p>${platform}</p></div>
                <div class="col-md-4 col-sm-6"><h2 class="h4">Publisher:</h2><p>${publisher}</p></div>
                <div class="col-md-4 col-sm-6"><h2 class="h4">Developer:</h2><p>${developer}</p></div>
                <div class="col-md-4 col-sm-6"><h2 class="h4">Release Date:</h2><p>${release_date}</p></div>
            </div>

            <div id="description" class="my-4">
                <h3 class="h4">Description:</h3>
                <p>${description}</p>
            </div>

            <div id="requirements">
                <h3 class="h4 mb-3">Minimum System Requirements</h3>
                <div class="row g-3">
                    <div class="col-md-4 col-sm-6"><h4 class="h5">OS</h4><p>${minimum_system_requirements.os || 'N/A'}</p></div>
                    <div class="col-md-4 col-sm-6"><h4 class="h5">Processor</h4><p>${minimum_system_requirements.processor || 'N/A'}</p></div>
                    <div class="col-md-4 col-sm-6"><h4 class="h5">Memory</h4><p>${minimum_system_requirements.memory || 'N/A'}</p></div>
                    <div class="col-md-4 col-sm-6"><h4 class="h5">Graphics</h4><p>${minimum_system_requirements.graphics || 'N/A'}</p></div>
                    <div class="col-md-4 col-sm-6"><h4 class="h5">Storage</h4><p>${minimum_system_requirements.storage || 'N/A'}</p></div>
                </div>
            </div>
        </div>

        <div class="text-center mt-4">
            <a href="${game_url}" target="_blank" class="btn btn-primary">Game Site</a>
        </div>
        `;

        document.getElementById('gameDetails').classList.remove('d-none');
        document.getElementById('allGames').classList.add('d-none');

        document.getElementById('closeBtn').addEventListener('click', () => {
            document.getElementById('gameDetails').classList.add('d-none');
            document.getElementById('allGames').classList.remove('d-none');
            document.querySelector('header').classList.remove('d-none');
        });

        const carousel = document.getElementById('carousel');
        const slider = new bootstrap.Carousel(carousel, {
            interval: 3000,
        });
    }
}
