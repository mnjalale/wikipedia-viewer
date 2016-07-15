$(document).ready(function(){

            $(".search-section").hide();

            $("#searchButton").on("click",function(){
                $(".search-button").hide();
                $(".search-section").show();
                $("#searchInput").focus();
                //$(".search-call-to-action").hide();
            });

            $("#searchButtonInline").on("click",function(){
                $("#searchInput").val('');
                $("#searchList").html('');
                $(".search-button").show();
                $(".search-section").hide();
                $(".search-call-to-action").show();
            });

            $("#searchInput").on("keydown",function(e){
                if(e.which==13){
                    var searchString = $("#searchInput").val();
                    var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" + searchString + "";

                    $.ajax({
                        url: url,
                        jsonp: "callback",
                        dataType: 'jsonp',
                        xhrFields: { withCredentials: true },
                        success: function(val) {
                            $(".search-call-to-action").hide();
                            var list = val.query.search;

                            var html = '';
                            for(i=0;i<list.length;i++){
                                var item = list[i];
                                var wikipediaUrl = "https://en.wikipedia.org/wiki/" + item.title.replace(' ','_');
                                /*html += "<blockquote class='well text-left'>" +
                                        "<h4>" + item.title + "</h4>" +
                                        "<p>" + item.snippet + "<a href='" + wikipediaUrl + "' target='_blank'>......</a></p>" +
                                        "</blockquote>";*/
                                html += "<a href='" + wikipediaUrl + "' target='_blank' class='article-link'>" +
                                        "<blockquote class='well text-left'>" +
                                        "<h4 style='font-size: 20px'>" + item.title + "</h4>" +
                                        "<p style='font-size: 15px'>" + item.snippet + "...</p>" +
                                        "</blockquote>"
                                        "</a>";
                            }

                            $("#searchList").html(html);
                        }
                    });

                }
            });
        });