console.log("POKEMON HOMEWORK")

const cardHolder = document.getElementById('big-card-holder')
const errorCard = document.getElementById('error-card')
const getFormData = async (e) => {
    e.preventDefault()
    const pokeID = e.target.pokemon.value;
    console.log(pokeID)
    

    const url = `https://pokeapi.co/api/v2/pokemon/${pokeID.toLowerCase()}`
    console.log(url)
     
    let data
    try {
        const res = await fetch(url)
        data = await res.json()
    } catch (error) {
        // console.error(error)
        cardHolder.hidden = true
        errorCard.hidden = false
        return
    }
    
    drawCard(data)
}

const drawCard = (data) => {
    errorCard.hidden = true
    cardHolder.hidden = false
    document.getElementById("card-id").innerText = data['id']
    document.getElementById("card-title").innerText = data['name']
    document.getElementById("card-sprite").src = data['sprites']['front_default']
    let typeList = []
    for (pokeType of data['types']) {
        typeList.push(pokeType['type']['name'].toLowerCase())
    }
    document.getElementById("card-type").innerText = "Type: "+typeList.join("/")
    document.getElementById("card-ability").innerText = "Ability: "+data['abilities'][0]['ability']['name']
    document.getElementById("card-move").innerText = "Move: " + data['moves'][0]['move']['name']
}

const form = document.getElementById('myForm');
form.addEventListener('submit', getFormData)