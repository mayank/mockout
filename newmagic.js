$(document).ready(function() {
    animateSearchAsGoogle()
    enableSearchPlugin()
})

function animateSearchAsGoogle() {
    $('#typo').keyup(function() {
        if ($(this).val().length > 0) {
            $('#mainFrame').removeClass('jumbotron').addClass('well')
            $('#tip-text').hide()
            $('#mimic').hide()
            $('#small-mimic').removeClass('hide')
        }
    })
}

function enableSearchPlugin() {
    $('#typo').keyup(function(e) {
        if (e.keyCode === 13 && e.shiftKey !== true) {
            searchForApiMention( $(this).val() )
        }
        e.preventDefault()
    });
}

function searchForApiMention(val){
    $.ajax({
        url: 'http://api2.socialmention.com/search',
        data: {
            q: val,
            f: 'jsonp',
            t: 'all',
        },
        dataType: 'jsonp',
        success: function(res){
            createTuples(res)
        }
    })
}

function createTuples(res){
    
    $('#fill-data-*').html('')
    
    for(var i=0;i<30;i++){
        var clone = $('#copy-node').clone()
        $(clone).removeClass('hide')
        var panel = $(clone).children('.panel')
        var body = panel.children('.panel-body')
        
        if( res.items[i].type !== 'microblogs' ) {
            panel.children('.panel-heading').children('.title').html(res.items[i].title)
        }
        
        if( res.items[i].type !== 'bookmarks' ) {
            body.children('.info-image').attr('src', res.items[i].image)
        }
        
        if( res.items[i].type !== 'images' ){
            if( res.items[i].type !== 'microblogs' )
               body.children('.desc').html(res.items[i].description)
            else
              body.children('.desc').html(res.items[i].title)  
        }
        
        panel.children('.panel-footer')
                .children('.source-parent').children('.source')
                .html('<img class="favicon" src="'+res.items[i].favicon+'" /> '+res.items[i].source)
        
        panel.children('.panel-footer')
                .children('.permalink').attr('href', res.items[i].link)
        console.log(res.items[i])
        
        $('#fill-data-'+(i%4+1)).append(clone)
    }
}