let API_KEY = 'b971c2f0de8767f08d2bb84160ba24b7'

// let API_KEY = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'

let tokenTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1`
let tokenPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`
let tokenUpComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=1`

let local = JSON.parse(window.localStorage.getItem('data')) || []





let allAPI = [tokenTop, tokenPopular, tokenUpComing]
let ApiData = []

let lastApiClick = tokenTop

let start = true
console.log(tokenTop);

let min = document.querySelector("#min")
let max = document.querySelector("#max")
let search = document.querySelector("#search")
let score = document.querySelector("#score")


let btn = document.querySelector("#btn")


    ; (async () => {
        for (let val of allAPI) {
            let res = await fetch(val)
            res = await res.json()
            ApiData.push(...await res.results)
            // console.log(await res);
        }
    })()





class Movies {
    async render(api, page = 1) {
        films.innerHTML = null
        api = api.slice(0, -1) + page
        let res = await fetch(api)
        res = await res.json()
        res = await res.results

        for (let val of res) {
            let data = `
        <div class="movie">
            <img src="https://image.tmdb.org/t/p/w500/${val.poster_path}" alt="${val.original_title}">

        <div class="movie-info">
            <h3>${val.original_title}</h3>
            <span class="orange">${val.vote_average}</span>
            </div>
            <span class="date">${val.release_date}</span>
        </div>
        `
            films.innerHTML += data
        }
    }

    pages(page) {
        this.render(lastApiClick, page)
    }


    filter(search = undefined, min = undefined, max = undefined, score = undefined) {
        films.innerHTML = null

        if (search) {

            let trash = [...ApiData]
            ApiData = []
            for (let film of trash) {
                if (film.original_title.toLowerCase().split(" ").includes(search.toLowerCase())) {
                    ApiData.push(film)
                }
            }
        }


        if (min || max) {
            min ? min : 0
            max ? max : 3000

            let trash = [...ApiData]
            ApiData = []
            for (let film of trash) {
                if (film.release_date.split("-")[0] >= min || film.release_date.split("-")[0] <= max) {
                    ApiData.push(film)
                }
            }
        }

        if (score) {
            let trash = [...ApiData]
            ApiData = []
            for (let film of trash) {
                if (+film.vote_average >= score) {
                    ApiData.push(film)
                }
            }

        }

        for (let val of ApiData) {
            let data = `
            <div class="movie">
                <img src="https://image.tmdb.org/t/p/w500/${val.poster_path}" alt="${val.original_title}">

            <div class="movie-info">
                <h3>${val.original_title}</h3>
                <span class="orange">${val.vote_average}</span>
                </div>
                <span class="date">${val.release_date}</span>
            </div>
            `
            films.innerHTML += data
        }
    }
}

let movies = new Movies()


if (start) {
    start = false
    // console.log(local[local.length - 1]);
    movies.render(local[local.length - 1])
}






















function topfilms(e) {

    pagenumber.textContent = 1
    local.push(tokenTop)
    window.localStorage.setItem("data", JSON.stringify(local))
    movies.render(tokenTop)
    lastApiClick = tokenTop

}

function popular(e) {
    pagenumber.textContent = 1
    local.push(tokenPopular)
    window.localStorage.setItem("data", JSON.stringify(local))
    movies.render(tokenPopular)
    lastApiClick = tokenPopular
}

function upcoming(e) {
    pagenumber.textContent = 1
    local.push(tokenUpComing)
    window.localStorage.setItem("data", JSON.stringify(local))
    movies.render(tokenUpComing)
    lastApiClick = tokenUpComing
}

























let minvalue = undefined
let maxvalue = undefined
let searchvalue = undefined
let scorevalue = undefined


min.addEventListener("keyup", (e) => {
    minvalue = e.target.value
})

max.addEventListener("keyup", (e) => {
    maxvalue = e.target.value
})

search.addEventListener("keyup", (e) => {
    searchvalue = e.target.value
})

score.addEventListener("keyup", (e) => {
    scorevalue = e.target.value
})




btn.addEventListener('click', () => {

    movies.filter(searchvalue, minvalue, maxvalue, scorevalue)
})


function next(e) {
    if (!pagenumber.textContent) return
    pagenumber.textContent = +pagenumber.textContent + 1
    movies.render(lastApiClick, pagenumber.textContent)
}


function prev(e) {
    if (+pagenumber.textContent - 1 <= 0) return
    pagenumber.textContent = +pagenumber.textContent - 1
    movies.render(lastApiClick, pagenumber.textContent)
}


function minyears(event) {
    let a = event.value
    btn.onclick = e => {
        console.log(a);
    }
}

function maxyears() {
    btn.onclick = e => {
        console.log('monima');
    }
}