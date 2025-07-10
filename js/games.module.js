import { Games } from './home.module.js';

export class Filters {
    constructor() {
        this.gamesInstance = new Games();
        this.platform = 'all';
        this.category = 'all';
        this.sortBy = 'none';

        this.gameFilters();
    }

    gameFilters() {
        // Platform filter
        document.querySelectorAll('[data-platform]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.platform = item.getAttribute('data-platform');
                item.closest('.dropdown').querySelector('.dropdown-toggle').textContent = `${item.textContent}`;
                this.Filtering();
            });
        });

        // Category filter
        document.querySelectorAll('[data-category]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.category = item.getAttribute('data-category');
                item.closest('.dropdown').querySelector('.dropdown-toggle').textContent = `${item.textContent}`;
                this.Filtering();
            });
        });

        // Sort By filter
        document.querySelectorAll('[data-sort]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.sortBy = item.getAttribute('data-sort');
                item.closest('.dropdown').querySelector('.dropdown-toggle').textContent = `${item.textContent}`;
                this.Filtering();
            });
        });
    }

    Filtering() {
        const platform = this.platform === 'all' ? '' : this.platform;
        const category = this.category === 'all' ? '' : this.category;
        const sortBy = this.sortBy === 'none' ? '' : this.sortBy;

        const queryParams = new URLSearchParams();
        if (platform) queryParams.append('platform', platform);
        if (category) queryParams.append('category', category);
        if (sortBy) queryParams.append('sort-by', sortBy);

        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?${queryParams.toString()}`;

        this.filteredGames(url);
    }

    async filteredGames(url) {
        const loader = document.getElementById('loader');
        const header = document.querySelector('header');

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
            this.gamesInstance.displayGames(data);
        } catch (err) {
            console.error('Error fetching filtered games:', err);
        } finally {
            header.classList.remove('d-none');
            loader.classList.add('d-none');
        }
    }
}
