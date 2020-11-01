var numOfSlide = $(".slide-off").length,
    currentSlide = Math.floor(numOfSlide / 2)

$('#slide-container').children().eq(currentSlide).attr('class', 'slide-on')

$(".previous").click(function () {

    $('#slide-container').children().eq(currentSlide).attr('class', 'slide-off')
    $('#slide-container').children().eq(currentSlide + 1).attr('class', 'slide-on')
    $('.slider-text').text($('#slide-container').children().eq(currentSlide + 1).attr("alt"))
    slideLeft(currentSlide)
});

$(".next").click(function () {

    $('#slide-container').children().eq(currentSlide).attr('class', 'slide-off')
    $('#slide-container').children().eq(currentSlide - 1).attr('class', 'slide-on')
    $('.slider-text').text($('#slide-container').children().eq(currentSlide - 1).attr("alt"))
    slideRight(currentSlide)
});

function slideLeft() {

    let img = $('#slide-container img:first')
    img.remove()
    $("#slide-container").append(img)

}

function slideRight() {

    let img = $('#slide-container img:last')
    img.remove()
    $("#slide-container").prepend(img)

}

$(".send").click(function () {
    let numOfValidFields = 0;
    const fname = $("#fname")
    const lname = $("#lname")
    const phone = $("#phone")
    const email = $("#email")
    const msg = {
                  name: `${fname.val()} ${lname.val()}`, 
                  phone: phone.val(), 
                  email: email.val()
    }

    if (fname.val() === "") fname.siblings().text('אנא הכנס שם פרטי')
    else {
        fname.siblings().text('')
        numOfValidFields++
    }
    if (lname.val() === "") lname.siblings().text('אנא הכנס שם משפחה')
    else {
        lname.siblings().text('')
        numOfValidFields++
    }
    if (
        phone.val()[0] !== '0' ||
        phone.val()[1] !== '5' ||
        phone.val().length !== 10 ||
        !/^\d+$/.test(phone.val())
    ) {
        phone.siblings().text('אנא הכנס מספר טלפון תקין')
    } else {
        phone.siblings().text('')
        numOfValidFields++
    }
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.val()))
        email.siblings().text('אנא הכנס אימייל תקין')
    else {
        email.siblings().text('')
        numOfValidFields++
    }
    if (numOfValidFields == 4) {
        $.post(`/send`, msg) 
        $("form").css('visibility','hidden')
        $(".sent").css('visibility','visible')
    }
})
$("form").submit(function (e) {
    return false;
});