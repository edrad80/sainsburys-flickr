  var prefix = "localImageStore-";
         function RewriteFromStorage() {
            
                $("#saved-photos").empty();
                for(var i = 0; i < localStorage.length; i++)   {
                        var key = localStorage.key(i);             
                        if(key.indexOf(prefix) == 0) {
                        var value = localStorage.getItem(key);  
                        var shortkey = key.replace(prefix, "")             
                        $("#saved-photos").append($("<div class='col-lg-1 col-md-1 col-xs-1 resized'>").html("<a href='" + key + "' style='display:none'></a><img src=" + value + " class='thumbnail fimagesaved' id='selected' title='Click to save for later viewing' alt='Click to remove from the list later viewing' /></div>"));
                        };
                };
        };
                         
       $(document).ready(function () {
        
                $(document).on('click', 'img.fimage', function(event){
                        key = $(this).siblings().attr('href');
                        var value = $(this).attr('src');
                        var  key = $(this).siblings().attr('href');
                        localStorage.setItem(prefix + key, value);
                        var URL = $(this).attr('src');
                        $(this).addClass("selected");
                        event.preventDefault;
                        RewriteFromStorage();
                        $(this).addClass("selected");
                        event.preventDefault;            
                });
                      
                $(document).on('click', '.resized', function(event){
                        key = $(this).children('a').attr('href');
                        console.log(prefix + key);
                        localStorage.removeItem(key);
                        event.preventDefault;
                        RewriteFromStorage();
                });
                     
                    
                $(document).on('click', 'img.selected', function(event){
                        var URL = $(this).attr('src');
                        $(this).removeClass("selected");
                        event.preventDefault;
                        localStorage.removeItem('savedimage');
                });
                    
                var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=?";
                var myrequest = "london";
                var flickrOptions = {
                tags: myrequest,
                format: "json"
                };
                
                function displayPhotos(data) {
                        var photoHTML = '<div class="row">';
                        $.each( data.items, function (i, photo) {
                        photoHTML += '<div class="col-lg-3 col-md-4 col-xs-6 thumb">';
                        photoHTML += '<img src="' + photo.media.m + '" class="thumbnail fimage" id="selected" title="Click to save for later viewing" alt="Click to save for later viewing">';
                        photoHTML += '<a href="' + photo.link + '" class="btn btn-success" target="_blank">View on Flickr</a></div>';
                });
                        photoHTML += '</div>';
                        $('#photos').html(photoHTML);
                      }
                      $.getJSON(flickerAPI, flickrOptions, displayPhotos);
          //              });                   
                  }); //end ready
