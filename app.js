const loadData = async(search, dataLimit) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
    const data = await res.json()
    displayData(data.data, dataLimit);
}

const displayData = (phones, dataLimit) => {
    const phonesContainer = document.querySelector('.phones-container');
    phonesContainer.innerHTML = '';
    const loadMore = document.getElementById('load-more');
    if(dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        loadMore.classList.remove('d-none');
    } else {
        loadMore.classList.add('d-none');
    }
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList.add('col');
        phoneCard.innerHTML = `
                <div class="card">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                    </div>
                </div>
            `;

        phonesContainer.appendChild(phoneCard);
    });
    spinner(false);
}

const searchProcess = dataLimit => {
    const searchInput = document.querySelector('#search-input');
    loadData(searchInput.value, dataLimit)
    spinner(true);
}

document.getElementById('search-btn').addEventListener('click', ()=>{
    searchProcess(10);
});

document.getElementById('search-input').addEventListener('keypress', (e)=> {
    if(e.key === 'Enter'){
        searchProcess(10);
    }
});

document.getElementById('load-more-btn').addEventListener('click', ()=>{
    searchProcess();
});

const spinner = (isLoading) => {
    if(isLoading){
        const spinClass = document.querySelector('.spinner');
        spinClass.classList.remove('d-none');
    } else {
        const spinClass = document.querySelector('.spinner');
        spinClass.classList.add('d-none');
    }
}