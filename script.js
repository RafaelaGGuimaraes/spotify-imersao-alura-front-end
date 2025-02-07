const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');
const gridContainer = document.querySelector('.grid-container');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result))
}

function displayResults(result) {
    resultPlaylist.classList.add("hidden")
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
    });

    resultArtist.classList.remove('hidden');
}

function displayNoResults() {
    gridContainer.innerHTML = 
    ` 
    <div class="no-results">
        <div class="no-results__content-title">
            <h1 class="no-results__title">Oops!</h1>
            <div class="circle">
                <span class="fa-solid fa-x"></span>
            </div>
        </div>
        <p class="no-results__subtitle">Não achamos nenhum artista com esse nome.</p>
    </div>
    `;
    resultArtist.classList.remove('hidden');
    resultPlaylist.classList.add('hidden');
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        gridContainer.innerHTML = '';        
        return
    }
    
    requestApi(searchTerm);
})

document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('lilacat-theme');
    document.querySelector('.toggle-ball').classList.toggle('active');
  });