const loadData = async(search) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
    const data = await res.json()
    displayData(data.data);
}

const displayData = phones => {
    const phonesContainer = document.querySelector('.phones-container');
    phonesContainer.innerHTML = '';
    phones = phones.slice(0, 20)
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

const search = () => {
    const searchInput = document.querySelector('#search-input');
    loadData(searchInput.value)
    spinner(true);
}

const spinner = (isLoading) => {
    if(isLoading){
        const spinClass = document.querySelector('.spinner');
        spinClass.classList.remove('d-none');
    } else {
        const spinClass = document.querySelector('.spinner');
        spinClass.classList.add('d-none');
    }
}