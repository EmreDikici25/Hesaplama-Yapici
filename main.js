const fiyatInput = document.getElementById('fiyat')
const harcamaInput = document.getElementById('harcama')
const eklemeBtn = document.getElementById('eklemeBtn')
const liste = document.querySelector('.liste')
const payCheckbox = document.getElementById('odeme')
const toplamSpan = document.getElementById('toplam')

eklemeBtn.addEventListener('click', addExpense)

//LİSTE KISMINDAKİ OLAY İZLEYİCİLER
liste.addEventListener('click', handleClick)

let expenses = []

//TOPLAM BİLGİSİNİ GÜNCELLER
function updateToplam(){
    var toplam = expenses.reduce((toplam,fiyat) => toplam + fiyat, 0);
    toplamSpan.innerText = `${toplam} `;
}

function addExpense(event){
    event.preventDefault();

    //EĞER İNPUTLAR BOŞ İSE FONKSİYONU BİTİR
    if(!fiyatInput.value || !harcamaInput.value){
        alert('Lütfen Boş Alanları Doldurunuz')
        return
    }

    //DİV OLUŞTUR VE İTEM KLASINI EKLE
    const itemBox = document.createElement('div');
    itemBox.classList.add('item');

    //EĞER ÖDENDİ TIKLANDIYSA ÖDENDİ KLASINI EKLE
    if(payCheckbox.checked){
        itemBox.classList.add('odendi')
    }

    //İTEMBOX IN HTML YAPISI
    itemBox.innerHTML = `
        <h1>
            ${harcamaInput.value}
        </h1>
        <h2>
            ${fiyatInput.value}
        </h2>
        <div class="button">
            <img id="edit" src="/img/pay.png" alt="">
            <img id="delete" src="/img/del.png" alt="">
        </div>
    `;

    //İTEMBOX I LİSTEYE EKLEME
    liste.appendChild(itemBox)

    //FİYATLAR DİVİNE FİYAT DEĞERİNİ GÖNDER
    if(!payCheckbox.checked){
        expenses.push(Number(fiyatInput.value))
    }

    updateToplam()

    //İNPUT DEĞERLERİNİ SIFIRLAMA
    fiyatInput.value = ''
    harcamaInput.value = ''
}

//TIKLAMA İŞLEMİNE GÖRE ALINACAK AKSİYON
function handleClick(e){
    const element = e.target
    if(e.target.id == 'delete'){
        const harcama = element.parentElement.parentElement
        //ELEMANI SİLME
        harcama.remove()
        //ELEMANIN İÇİNDEKİ 
        const cikarilacak = harcama.querySelector('h2').innerText
        //FİYATIN EKSİLİ HALİNİ GÖNDERDİK
        expenses.push(-Number(cikarilacak));
        updateToplam()
    }
}