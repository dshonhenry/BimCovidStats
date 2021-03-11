var key = "1yHk5gHZ2yuNyIuggGdiGrjHSXESWn7r-pcWFtJmiGug";
$('.stat').css('transform', 'scale(0)')

async function getData() {
    var start = new Date(2021, 0, 26);
    var today = new Date();
    var timeDif =  Math.floor((today.getTime() - start.getTime())/(1000*3600*24)) + 1;
    var url = `https://docs.google.com/spreadsheet/pub?key=${key}&range=B${timeDif}:K${timeDif}&output=csv`;
    var data = await fetch(url).then(response => response.text());
    if (data)
        populate(data);
    else {
        timeDif--;
        var url = `https://docs.google.com/spreadsheet/pub?key=${key}&range=B${timeDif}:K${timeDif}&output=csv`;
        data = await fetch(url).then(response => response.text());
        populate(data);
    }
}

async function populate(dataString){
    var data = dataString.split(',');
    $('#active').html(data[2]);
    $('#cases').html(data[9].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $('#vaccines').html(data[8]);
    $('#deaths').html(data[4]);
    anime({
        targets: '.stat',
        scale: 1.0,
        delay: anime.stagger(100)
    })
};

window.addEventListener("load", getData);
