function getGithubInfo(gituser) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it.
    // The function should finally return the object(it now contains the response!)

    var git_username = gituser;
    var repurl   = 'https://api.github.com/users/'+git_username;
    var reposurl  = 'https://api.github.com/users/'+git_username+'/repos';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        let jsonResponse;
        if (xhr.readyState === 4) {
            if (xhr.status == 200) {
                jsonResponse=JSON.parse(xhr.responseText)
                showUser(jsonResponse, reposurl);
            }
            else {
                noSuchUser(git_username)
            }
        }
    }
    xhr.open('GET', repurl, true);
    xhr.send('');
}

function showUser(gituser,reposurl) {
    // debugger;
    var git_name   = gituser.name;
    var git_username   = gituser.login;
    var profimg     = gituser.avatar_url;
    var profileurl = gituser.html_url;
    var profcreated = gituser.created_at;
    var proflast = gituser.updated_at;
    var bio=gituser.bio;
   // if(git_name == undefined) { git_name = git_username; }

    var outhtml = '<h2 style="color: red">Hi '+git_name+', Please find GitHub Details following <h2>';
    outhtml = outhtml + '<div class="prof"><a href="'+profileurl+'" target="_blank"><img src="'+profimg+'" width="80" height="80" alt="'+git_username+'"></a></div>';
    outhtml = outhtml + '<div>Link to User:<a href="'+profileurl+'" target="_blank">'+git_username+'</a></div>';
    outhtml = outhtml + '<h3>Bio :'+bio+'<h3>';
    outhtml = outhtml + '<p>Profile Created on : '+profcreated+'</p>';
    outhtml = outhtml + '<p>Profile Last Updated on : '+proflast+'</p>';
    outhtml = outhtml + '<div>';

    var repositories;
    $.getJSON(reposurl, function(json){
        repositories = json;
        outputPageContent();
    });
    function outputPageContent() {
        if(repositories.length == 0) {
            outhtml = outhtml + '<p>No repositories!</p></div>';
        }
        else {
            outhtml = outhtml + '<h3><strong>Repositories List:</strong></h3> <ul>';
            $.each(repositories, function(index) {
                outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li>';
            });
            outhtml = outhtml + '</ul></div>';
        }

        $('#profile').html(outhtml);
    }

    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
}

function noSuchUser(git_username) {
    //3. set the elements such that a suitable message is displayed
    alert('No Username: '+git_username+' Found');
}

$(document).ready(function () {
    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            gituser = $(this).val();
            $(this).val("");
            getGithubInfo(gituser);
        }
    })
});
